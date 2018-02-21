// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Libs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { CCC } from '../../utilities/ccc-streamer-utilities';

// Models
import { CoinsList, CoinsListFullData } from '../models/coins-list';


@Injectable()
export class CoinsService {

  private apiUrl: string = 'https://min-api.cryptocompare.com/data';

  constructor(private http: HttpClient) {
  }

  /**
   * Get coins list
   * @param limit
   * @param page
   * @returns {Observable<R>}
   */
  getCoinsList(limit: number = 50, page: number = 0): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('tsym', 'USD');

    let coinsList: CoinsList[] = [];

    return this.http.get(this.apiUrl + '/top/totalvol', {params: params})
      .map((res: any) => {
        if (res.Message == 'Success' && res.Data.length > 0) {
          res.Data.forEach((item, index) => {
            coinsList.push({
              position: page * limit + (index + 1),
              name: item.CoinInfo.Name,
              fullName: item.CoinInfo.FullName,
            });
          });
        }
        return coinsList;
      })
  }


  /**
   * Get coins list with full data
   * @param limit
   * @param page
   * @returns {Observable<R>}
   */
  getCoinsListFullData(limit: number = 50, page: number = 0): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('tsym', 'USD');

    let coinsList: CoinsListFullData[] = [];

    return this.http.get(this.apiUrl + '/top/totalvol', {params: params})
      .map((res: any) => {

        if (res.Message == 'Success' && res.Data.length > 0) {
          res.Data.forEach((item, index) => {
            let coinInfo       = item.CoinInfo,
                conversionInfo = item.ConversionInfo,
                priceInfo      = CCC.CURRENT.unpack(conversionInfo.RAW[0]);

            coinsList.push({
              position: page * limit + (index + 1),
              name: coinInfo.Name,
              fullName: coinInfo.FullName,
              imageUrl: coinInfo.ImageUrl,
              price: CCC.convertValueToDisplay('$', priceInfo.PRICE),
              changePct24Hour: ((priceInfo.PRICE - priceInfo.OPEN24HOUR) / priceInfo.OPEN24HOUR * 100).toFixed(2),
              marketCap: CCC.convertValueToDisplay('$', priceInfo.PRICE * conversionInfo.Supply, 'short'),
              weekHistory: []
            });
          });
        }
        return coinsList;
      })
      .flatMap((coinsList: any) => {
        return this.getCoinsHistoryByDays(coinsList, 7)
          .map(coinsHistory=> {
            coinsList.forEach((coin, index) => {
              coinsList[index].weekHistory = coinsHistory[index].Data;
            });
            return coinsList;
          }, error => {
            return error;
          });
      });
  }

  /**
   * Get multiply coins history by days
   * @param coinsList
   * @param limit
   * @returns {Observable<R>}
   */
  getCoinsHistoryByDays(coinsList: Array<any>, limit: number = 365): Observable<any> {
    let coinsRequests = [];

    if (coinsList.length > 0) {
      coinsList.forEach((coin, index) => {
        let params = new HttpParams()
          .set('limit', limit.toString())
          .set('fsym', coin.name)
          .set('tsym', 'USD');

        coinsRequests.push(this.http.get(this.apiUrl + '/histoday', {params: params}));
      });

      return Observable.forkJoin(coinsRequests);

    } else {
      throw 'Empty coins list';
    }
  }


  /**
   * Get coin data
   * @param coinName
   * @returns {Observable<R>}
   */
  getCoinFullData(coinName: string, historyDays: number = 7): Observable<any> {
    let coinShapshot: any = {
      finance: {},
      info: {},
      daysHistory: []
    };

    let params = new HttpParams()
      .set('fsym', coinName)
      .set('tsym', 'USD');

    // Request coin main info
    let coinInfoRequest = this.http.get(this.apiUrl + '/top/exchanges/full', {params: params});

    // Request coin history by days
    let coinDaysHistoryRequest = this.getCoinHistoryByDays(coinName, historyDays);

    return Observable.forkJoin([coinInfoRequest, coinDaysHistoryRequest])
      .map((res: any) => {
        let finance = res[0].Data.AggregatedData;

        coinShapshot.info = res[0].Data.CoinInfo;
        coinShapshot.finance = {
          price: CCC.convertValueToDisplay('$', finance.PRICE),
          change24Hour: CCC.convertValueToDisplay('$', finance.CHANGE24HOUR),
          changeDay: CCC.convertValueToDisplay('$', finance.CHANGEDAY),
          changePct24Hour: finance.CHANGEPCT24HOUR.toFixed(2),
          changePctDay: finance.CHANGEPCTDAY.toFixed(2),
          high24Hour: CCC.convertValueToDisplay('$', finance.HIGH24HOUR),
          highDay: CCC.convertValueToDisplay('$', finance.HIGHDAY),
          low24Hour: CCC.convertValueToDisplay('$', finance.LOW24HOUR),
          lowDay: CCC.convertValueToDisplay('$', finance.LOWDAY),
          open24Hour: CCC.convertValueToDisplay('$', finance.OPEN24HOUR),
          openDay: CCC.convertValueToDisplay('$', finance.OPENDAY),
          marketCap: CCC.convertValueToDisplay('$', finance.MKTCAP, 'short'),
        };
        coinShapshot.daysHistory = res[1];
        return coinShapshot;
      });


  }

  /**
   * Get coin history by days
   * @param coinName
   * @param limit
   * @returns {Observable<R>}
   */
  getCoinHistoryByDays(coinName: string, limit: number = 365): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('fsym', coinName)
      .set('tsym', 'USD');

    return this.http.get(this.apiUrl + '/histoday', {params: params})
      .map((res: any) => {
        return res.Data
      });
  }

}
