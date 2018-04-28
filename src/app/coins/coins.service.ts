import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJs
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import { map, mergeMap, concatMap, finalize} from 'rxjs/operators';

// Services
import { UtilsService } from '@app/shared/services/utils.service';
import { FavoritesService } from '@app/favorites/favorites.service';
import { LoadingService } from '@app/shared/services/loading.service';
import { StorageService } from '@app/shared/services/storage.service';

// Models
import { CoinsList } from './models/coins-list.model';
import { CoinSnapshot } from './models/coin-snapshot.model';



/**
 * Bidirectional service
 */

@Injectable()
export class CoinsService {

  private API_URL = 'https://min-api.cryptocompare.com/data';

  coinsList = new Subject<any>();
  toSymbol = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    private favoritesService: FavoritesService,
    private loadingService: LoadingService,
    private storageService: StorageService
  ) {

    // Get toSymbol from storage
    this.storageService.getItem('toSymbol').subscribe((res: string) => {
      if(res !== '') {
        this.toSymbol.next(res);
      } else {
        this.toSymbol.next('USD');
      }
    });

    // Save toSymbol to storage
    this.toSymbol.subscribe(res => {
      if(res !== '') {
        this.storageService.setItem('toSymbol', res)
      }
    });

  }

  /**
   * Get coins list
   * @param limit
   * @param page
   * @param toSymbol
   * @returns {Observable<CoinsList[]>}
   */
  getCoinsList(limit: number = 50, page: number = 0, toSymbol: string = 'USD'): Observable<CoinsList[]> {
    this.loadingService.showLoading();

    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('tsym', toSymbol);

    const coinsList: CoinsList[] = [];

    return this.http.get<CoinsList[]>(this.API_URL + '/top/totalvol', {params: params})
      .pipe(
        map((res: any) => {
          if (res.Message === 'Success' && res.Data.length > 0) {
            res.Data.forEach((item, index) => {
              const coinInfo: any       = item.CoinInfo,
                    conversionInfo: any = item.ConversionInfo || { Supply: 0, RAW: ['']};

              let priceInfo: any;

              if (conversionInfo.RAW.length > 1) {
                priceInfo = this.utils.cccUnpackMulti(conversionInfo.RAW);
              } else {
                priceInfo = this.utils.cccUnpack(conversionInfo.RAW[0]);
              }

              coinsList.push({
                position: page * limit + (index + 1),
                symbol: coinInfo.Name,
                name: coinInfo.FullName,
                imageUrl: coinInfo.ImageUrl,
                price: priceInfo.PRICE || 0,
                changePct24Hour: priceInfo.PRICE && priceInfo.OPEN24HOUR ? Math.round(((priceInfo.PRICE - priceInfo.OPEN24HOUR) / priceInfo.OPEN24HOUR * 100) * 100) / 100 : 0,
                marketCap: priceInfo.PRICE * conversionInfo.Supply || 0,
                history: null,
                historyChange: 0,
                conversionSymbol: toSymbol,
                favorite: this.favoritesService.checkFavorite(coinInfo.Name),
                toSymbolDisplay: this.utils.getSymbolFromCurrency(toSymbol),
              });
            });

            this.coinsList.next(coinsList);
            return coinsList;

          } else {
            throw new Error('Coin list empty');
          }
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      )
  }


  /**
   * Get coin data
   * @param coinName
   * @param historyLimit
   * @param historyType
   * @param toSymbol
   * @returns {any}
   */
  getCoinData(coinSymbol: string, historyLimit: number = 7, historyType: string = 'histoday', toSymbol: string = 'USD'): Observable<CoinSnapshot> {
    this.loadingService.showLoading();

    const coinSnapshot: CoinSnapshot = {
      info: {},
      finance: {},
      history: [],
      exchanges: [],
      pairs: [],
      toSymbols: [],
      volumeByCurrency: []
    };

    return this.getVolumeByCurrency(coinSymbol, 20)
      .pipe(
        mergeMap((pairs: any) => {

          // Find USD. If USD not found, get first pair
          toSymbol = pairs.Data.find(item => item.toSymbol == toSymbol) ? toSymbol : pairs.Data[0].toSymbol;

          const params = new HttpParams()
            .set('fsym', coinSymbol)
            .set('tsym', toSymbol);

          // Request coin main info
          const coinInfoRequest = this.http.get<CoinSnapshot>(this.API_URL + '/top/exchanges/full', {params: params});

          // Request coin history by days
          const coinDaysHistoryRequest = this.getCoinHistory(coinSymbol, historyLimit, historyType, toSymbol);

          return forkJoin([coinInfoRequest, coinDaysHistoryRequest])
            .pipe(
              map((res: any) => {
                if (res[0].Response === 'Success') {
                  const finance = res[0].Data.AggregatedData;

                  coinSnapshot.info = res[0].Data.CoinInfo;
                  coinSnapshot.history = res[1];
                  coinSnapshot.finance = {
                    toSymbol: toSymbol,
                    toSymbolDisplay: this.utils.getSymbolFromCurrency(toSymbol),
                    price: finance.PRICE,
                    change24Hour: finance.CHANGE24HOUR,
                    changeDay: finance.CHANGEDAY,
                    changePct24Hour: finance.CHANGEPCT24HOUR.toFixed(2),
                    changePctDay: finance.CHANGEPCTDAY.toFixed(2),
                    high24Hour: finance.HIGH24HOUR,
                    highDay: finance.HIGHDAY,
                    low24Hour: finance.LOW24HOUR,
                    lowDay: finance.LOWDAY,
                    open24Hour: finance.OPEN24HOUR,
                    openDay: finance.OPENDAY,
                    marketCap: finance.MKTCAP,
                    volume24Hour: finance.VOLUME24HOUR,
                  };
                  coinSnapshot.pairs = pairs.Data;
                  coinSnapshot.toSymbols = pairs.Data.map((item: any) => item.toSymbol);
                  coinSnapshot.exchanges = res[0].Data.Exchanges;
                  coinSnapshot.volumeByCurrency = pairs.Data

                  return coinSnapshot;
                } else {
                  throw new Error('Coin data empty');
                }
              })
            );
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );

  }


  /**
   * Get coin history
   * @param coinName
   * @param limit
   * @param type
   * @returns {Observable<R>}
   */
  getCoinHistory(coinSymbol: string, historyLimit: number = 365, historyType: string = 'histoday', toSymbol: string = 'USD'): Observable<any> {
    this.loadingService.showLoading();

    const params = new HttpParams()
      .set('limit', historyLimit.toString())
      .set('fsym', coinSymbol)
      .set('tsym', toSymbol);

    return this.http.get(this.API_URL + '/' + historyType, {params: params})
      .pipe(
        map((res: any) => {
          return res.Data;
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }


  /**
   * Get multiply coins history
   * @param coinsList
   * @param limit
   * @param type
   * @returns {Observable<R>}
   */
  getCoinsHistory(coinsList: Array<any>, limit: number = 365, type: string = 'histoday', toSymbol: string = 'USD'): Observable<any> {
    const coinsRequests = [];

    if (coinsList.length > 0) {
      coinsList.forEach((coin) => {
        coinsRequests.push(this.getCoinHistory(coin.name, limit, type, toSymbol));
      });

      return from(coinsRequests)
        .pipe(
          concatMap((value) => {
            return value;
          })
        );
    } else {
      throw new Error('Coins list empty');
    }
  }


  /**
   * Get top pairs by volume for a currency
   * @param coinSymbol
   * @param limit
   * @returns {Observable<Object>}
   */
  getVolumeByCurrency(coinSymbol: string, limit: number = 5): Observable<any> {
    const params = new HttpParams()
      .set('fsym', coinSymbol)
      .set('limit', limit.toString());

    return this.http.get(this.API_URL + '/top/pairs', { params: params} )
  }

}
