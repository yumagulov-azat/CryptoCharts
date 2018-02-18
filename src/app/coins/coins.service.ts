import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {CCC} from '../../utilities/ccc-streamer-utilities';

/**
 * Work with cryptocompare API
 */

@Injectable()
export class CoinsService {

  private apiUrl: string = '';

  constructor(private http: HttpClient) {
  }

  /**
   * Get coins list
   */
  getCoinsList(limit: number = 50, page: number = 0): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('tsym', 'USD');

    return this.http.get('https://min-api.cryptocompare.com/data/top/totalvol', {params: params})
    .map((res: {Message: string, Data: any}) => {
      let coinsList: Array<{}> = [];
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
   */
  getCoinsListFullData(limit: number = 50, page: number = 0): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('tsym', 'USD');

    return this.http.get('https://min-api.cryptocompare.com/data/top/totalvol', {params: params})
      .map((res: {Message: string, Data: any}) => {
        let coinsList: Array<{}> = [];

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
      // .flatMap((coinsList: any) => {
      //   return this.getCoinsHistoryByDays(coinsList, 7)
      //     .map(coinsHistory=> {
      //       coinsList.forEach((coin, index) => {
      //         coinsList[index].weekHistory = coinsHistory[index].Data;
      //       });
      //       return coinsList;
      //     }, error => {
      //       return error;
      //     });
      // });
  }

  /**
   * Get multiply coins history by days
   */
  getCoinsHistoryByDays(coins: Array<any>, limit: number = 365): Observable<any> {
    let coinsRequests = [];

    if(coins) {
      coins.forEach((coin, index) => {
        let params = new HttpParams()
          .set('limit', limit.toString())
          .set('fsym', coin.name)
          .set('tsym', 'USD');

        coinsRequests.push(this.http.get('https://min-api.cryptocompare.com/data/histoday', {params: params}));
      });

      return Observable.forkJoin(coinsRequests);

    } else {
      return Observable.create((observer) => observer.error('Empty coins list'));
    }
  }


  /**
   * Get coin data
   */
  getCoinFullData(coinName: string): Observable<any> {
    let coinShapshot: any = {
      finance: {},
      info: {},
      daysHistory: []
    };

    let params = new HttpParams()
      .set('fsym', coinName)
      .set('tsym', 'USD');

    // Request coin main info
    let coinInfoRequest = this.http.get('https://min-api.cryptocompare.com/data/top/exchanges/full', {params: params})
      .map(res => res)
      .flatMap((res: any) => {
        if(res.Data){
          let finane = res.Data.AggregatedData;
          coinShapshot.finance = {
            price: CCC.convertValueToDisplay('$', finane.PRICE),
            change24Hour: CCC.convertValueToDisplay('$', finane.CHANGE24HOUR),
            changeDay: CCC.convertValueToDisplay('$', finane.CHANGEDAY),
            changePct24Hour: finane.CHANGEPCT24HOUR.toFixed(2),
            changePctDay: finane.CHANGEPCTDAY.toFixed(2),
            high24Hour: CCC.convertValueToDisplay('$', finane.HIGH24HOUR),
            highDay: CCC.convertValueToDisplay('$', finane.HIGHDAY),
            low24Hour: CCC.convertValueToDisplay('$', finane.LOW24HOUR),
            lowDay: CCC.convertValueToDisplay('$', finane.LOWDAY),
            open24Hour: CCC.convertValueToDisplay('$', finane.OPEN24HOUR),
            openDay: CCC.convertValueToDisplay('$', finane.OPENDAY),
            marketCap: CCC.convertValueToDisplay('$', finane.MKTCAP, 'short'),
          };
        }

        return this.http.get('https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=' + res.Data.CoinInfo.Id)
          .map((res: any) => {
            if(res.Data){
              coinShapshot.info = res.Data.General;
            }
            return coinShapshot;
          }, err => {
            return err;
          });
      });

      // Reques coin history by days
      let coinDaysHistoryRequest = this.getCoinHistoryByDays(coinName)

      // Paralell Request
      return Observable.forkJoin([coinInfoRequest, coinDaysHistoryRequest]).
        map((res: any) => {
          coinShapshot.daysHistory = res[1];
          return coinShapshot;
        });


  }

  /**
   * Get coin history by days
   */
  getCoinHistoryByDays(coinName: string, limit: number = 365): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('fsym', coinName)
      .set('tsym', 'USD');

    return this.http.get('https://min-api.cryptocompare.com/data/histoday', {params: params})
      .map((res: {Data: any}) => {
        return res.Data
      });
  }

}
