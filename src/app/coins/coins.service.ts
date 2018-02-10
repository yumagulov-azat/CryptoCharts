import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

/**
* Work with cryptocompare API
*/

@Injectable()
export class CoinsService {

  private apiUrl: string = '';

  constructor(private http: HttpClient) { }

  /**
   * Return sorted coins list
   */
  getSortedCoinsList(max: number = 30): Observable<any> {
    return Observable.create((observer) => {
      this.http.get('https://www.cryptocompare.com/api/data/coinlist/')
        .subscribe(
          result => {
            if(result) {
              observer.next(this.sortSliceResult(result.Data, max));
              observer.complete();
            }
          },
          error => {
            observer.error(error);
          });
    });
  }

  /**
   * Return sorted coins list with full data
   */
   // TODO I suspect this is a Fucking GOVNOKOD(very bad code, Russia). Refract!
  getCoinsFullData(coinsList: Array<any>, max: number = 30): Observable<any> {
    let coinsListFull = [];

    return Observable.create((observer) => {
      // Coins array to string for get param
      let coins = '';
      coinsList.forEach(item => {
        coins += item.Name + ','
      });

      // Get params
      let priceMultiFullOptions = {
        params: {
          fsyms: coins,
          tsyms: 'USD'
        }
      };

      // Get coins full data
      this.http.get('https://min-api.cryptocompare.com/data/pricemultifull', priceMultiFullOptions)
        .subscribe(
          res => {
            coinsList.forEach(coin => {
              let coinFull = res.RAW[coin.Name].USD;

              // Add coin full data to array
              coinsListFull.push({
                name: coin.Name,
                coinName: coin.CoinName,
                position: coin.SortOrder,
                price: coinFull.PRICE,
                dayChange: coinFull.CHANGEPCT24HOUR.toFixed(2),
                marketCap: coinFull.MKTCAP
              });
            });

            // Complete observable
            observer.next(coinsListFull);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  /**
   * Return all coins list
   */
  getCoinsList(): Observable<any> {
    return this.http.get('https://www.cryptocompare.com/api/data/coinlist/');
  }

  /**
   * Return coin price
   */
   getCoinPrice(coinName: string): Observable<any> {
     return this.http.get('https://min-api.cryptocompare.com/data/price?fsym=' + coinName + '&tsyms=USD')
   }

   /**
    * Sort and slice
    */
   private sortSliceResult(res: any, max: number = 30, sort: boolean = true): Array<any> {
     let resultList = [];

     // Result object to array
     if(typeof res === 'object') {
       Object.keys(res).forEach(key => {
         resultList.push(res[key]);
       });
     } else {
       resultList = res;
     }

     // Sort
     if(sort) {
       resultList.sort((a, b) => {
           return a.SortOrder-b.SortOrder
       });
     }

     return resultList.slice(0,max)
   }

}
