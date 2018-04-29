import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJs
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, concatMap, finalize} from 'rxjs/operators';

// Services
import { UtilsService } from '@app/shared/services/utils.service';
import { FavoritesService } from '@app/favorites/favorites.service';
import { LoadingService } from '@app/shared/services/loading.service';
import { StorageService } from '@app/shared/services/storage.service';
import { CoinsServiceHelpers } from './coins.service.helpers';

// Models
import { CoinsList } from './models/coins-list.model';
import { CoinSnapshot } from './models/coin-snapshot.model';

@Injectable()
export class CoinsService {

  private API_URL = 'https://min-api.cryptocompare.com/data';

  coinsList: Subject<any> = new Subject<any>();
  toSymbol: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // Cache
  coinDataCache: any = {};
  coinHistoryCache: any = {};
  volumeByCurrencyCache: any = {}

  coinsServiceHelpers: any;

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    private favoritesService: FavoritesService,
    private loadingService: LoadingService,
    private storageService: StorageService,
  ) {

    this.coinsServiceHelpers = new CoinsServiceHelpers(utils, favoritesService);

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

    return this.http.get(this.API_URL + '/top/totalvol', {params: params})
      .pipe(
        map((res: any) => {
          if (res.Message === 'Success' && res.Data.length > 0) {
            let coinsList = this.coinsServiceHelpers.convertDataToCoinsList(res.Data, page, limit, toSymbol);
            this.coinsList.next(coinsList);
            return coinsList;
          } else {
            throw new Error('Coins list empty');
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
   * @returns {Observable<CoinSnapshot>}
   */
  getCoinData(coinSymbol: string, historyLimit: number = 7, historyType: string = 'histoday', toSymbol: string = 'USD'): Observable<CoinSnapshot> {
    this.loadingService.showLoading();

    return this.getVolumeByCurrency(coinSymbol, 20)
      .pipe(
        mergeMap((pairs: any) => {
          // Find USD. If USD not found, get first pair
          toSymbol = pairs.Data.find(item => item.toSymbol == toSymbol) ? toSymbol : pairs.Data[0].toSymbol;

          const params = new HttpParams()
            .set('fsym', coinSymbol)
            .set('tsym', toSymbol);

          const cacheKey = coinSymbol + toSymbol;

          // If request in cache return cache
          if(this.coinDataCache[cacheKey]) {
            this.loadingService.hideLoading();
            return of(this.coinDataCache[cacheKey]);
          } else {
            return forkJoin([
              this.http.get<CoinSnapshot>(this.API_URL + '/top/exchanges/full', {params: params}),
              this.getCoinHistory(coinSymbol, historyLimit, historyType, toSymbol)
            ])
              .pipe(
                map((res: any) => {
                  if (res[0].Response === 'Success') {
                    let coinSnapshot = this.coinsServiceHelpers.convertDataToCoinShanpshot(res, pairs, toSymbol);
                    this.coinDataCache[cacheKey] = coinSnapshot;
                    return coinSnapshot;
                  } else {
                    throw new Error('Coin data empty');
                  }
                })
              );
          }
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
  getCoinHistory(coinSymbol: string, historyLimit: number = 365, historyType: string = 'histoday', toSymbol: string = 'USD', fromCache: boolean = true): Observable<any> {
    this.loadingService.showLoading();

    const params = new HttpParams()
      .set('limit', historyLimit.toString())
      .set('fsym', coinSymbol)
      .set('tsym', toSymbol);

    let cacheKey = historyType + historyLimit.toString() + coinSymbol + toSymbol;

    // If request in cache return cache
    if(this.coinHistoryCache[cacheKey] && fromCache) {
      this.loadingService.hideLoading();
      return of(this.coinHistoryCache[cacheKey])
    } else {
      return this.http.get(this.API_URL + '/' + historyType, {params: params})
        .pipe(
          map((res: any) => {
            // Cache pair in variable
            this.coinHistoryCache[cacheKey] = res.Data;
            return res.Data;
          }),
          finalize(() => {
            this.loadingService.hideLoading();
          })
        );
    }
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
        coinsRequests.push(this.getCoinHistory(coin.name, limit, type, toSymbol, false));
      });

      return from(coinsRequests)
        .pipe(
          concatMap((history) => {
            return history;
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

    let cacheKey = '/top/pairs/' + coinSymbol + limit.toString();

    // If request in cache return cache
    if(this.volumeByCurrencyCache[cacheKey]) {
      return of(this.volumeByCurrencyCache[cacheKey])
    } else {
      return this.http.get(this.API_URL + '/top/pairs', { params: params} )
        .pipe(
          map((res) => {
            // Cache pair in variable
            this.volumeByCurrencyCache[cacheKey] = res;
            return res;
          })
        );
    }
  }
}
