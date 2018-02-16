import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/debounceTime';
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
    let coinsList: Array<{}> = [];

    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('tsym', 'USD');

    return this.http.get('https://min-api.cryptocompare.com/data/top/totalvol', {params: params})
      .map((res: {Message: string, Data: any}) => {
        if (res.Message == 'Success') {
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
              open24Hour: priceInfo.OPEN24HOUR,
              change24Hour: priceInfo.PRICE - priceInfo.OPEN24HOUR,
              changePct24Hour: ((priceInfo.PRICE - priceInfo.OPEN24HOUR) / priceInfo.OPEN24HOUR * 100).toFixed(2),
              coinsMined: conversionInfo.Supply,
              marketCap: CCC.convertValueToDisplay('$', priceInfo.PRICE * conversionInfo.Supply, 'short')
            });
          });

          return coinsList;
        }
      })
      .flatMap((coinsList: any) => {
        // Add to coins list coin 7d history
        return this.getCoinsHistoryByDays(coinsList, 7)
          .map(coinsHistory=> {
            coinsList.forEach((coin, index) => {
              coinsList[index].weekHistory = coinsHistory[index].Data;
            });
            return coinsList;
          });
      });
  }

  /**
   * Get multiply coins history by days
   */
  getCoinsHistoryByDays(coins: Array<any>, limit: number = 365): Observable<any> {
    let coinsRequests = [];

    coins.forEach(coin => {
      let params = new HttpParams()
        .set('limit', limit.toString())
        .set('fsym', coin.name)
        .set('tsym', 'USD');

      coinsRequests.push(this.http.get('https://min-api.cryptocompare.com/data/histoday', {params: params}));
    });

    return Observable.forkJoin(coinsRequests);
  }


  /**
   * Get coin data
   */
  getCoinFullData(coinName: string): Observable<any> {
    let params = new HttpParams()
      .set('fsym', coinName)
      .set('tsym', 'USD');

    return this.http.get('https://www.cryptocompare.com/api/data/coinsnapshot/', {params: params})
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
