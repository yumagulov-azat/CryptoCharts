import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import {forkJoin} from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {CCC} from '../../utilities/ccc-streamer-utilities';
// console.log(CCC.CURRENT.unpack())

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
    return Observable.create((observer) => {
      this.http.get('https://min-api.cryptocompare.com/data/top/totalvol', {
        params: {
          limit: limit,
          page: page,
          tsym: 'USD'
        }
      }).subscribe((res: {Message: string, Data: any}) => {
        let coinsList: Array<{}> = [];

        if (res.Message == 'Success') {
          res.Data.forEach((item, index) => {
            let coinInfo       = item.CoinInfo,
                conversionInfo = item.ConversionInfo,
                priceInfo      = CCC.CURRENT.unpack(conversionInfo.RAW[0]);

            // console.log(item)
            coinsList.push({
              position: page*limit + (index+1),
              name: coinInfo.Name,
              fullName: coinInfo.FullName,
              imageUrl: coinInfo.ImageUrl,
              price: priceInfo.PRICE,
              open24Hour: priceInfo.OPEN24HOUR,
              change24Hour: priceInfo.PRICE - priceInfo.OPEN24HOUR,
              changePct24Hour: ((priceInfo.PRICE - priceInfo.OPEN24HOUR) / priceInfo.OPEN24HOUR * 100).toFixed(2),
              coinsMined: conversionInfo.Supply,
              marketCap: priceInfo.PRICE * conversionInfo.Supply
            });
          });

          observer.next(coinsList);
          observer.complete();

        } else {
          observer.error('API error');
        }
      });

    });
  }


  // getCoinsList(limit: number = 50, page: number = 0): Observable<any> {
  //   return this.http.get('https://min-api.cryptocompare.com/data/top/totalvol', {
  //       params: {
  //         limit: limit,
  //         page: page,
  //         tsym: 'USD'
  //       }
  //     })
  // }

  /**
   * Get coin data
   */
  getCoinFullData(coinName: string): Observable<any> {
    return this.http.get('https://www.cryptocompare.com/api/data/coinsnapshot/', {
      params: {
        fsym: coinName,
        tsym: 'USD'
      }
    })
  }

  /**
   * Get coin history by days
   */
  getCoinHistoryByDays(coinName: string, limit: number = 365): Observable<any> {
    return this.http.get('https://min-api.cryptocompare.com/data/histoday', {
      params: {
        fsym: coinName,
        tsym: 'USD',
        limit: limit
      }
    })
  }

}
