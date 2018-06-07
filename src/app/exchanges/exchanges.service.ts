import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJs
import { Observable, of, forkJoin } from 'rxjs';
import { map, finalize, mergeMap } from 'rxjs/operators';

// Services
import { LoadingService } from '@app/shared/services/loading.service';

// Models
import { Exchange } from './models/exchange';
import { ExchangePairData } from './models/exchage-pair-data';



@Injectable()
export class ExchangesService {

  private API_URL = 'https://min-api.cryptocompare.com/data';

  // Cache
  exchangesCache: Exchange[];

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) {
  }

  /**
   * Get all exchanges
   */
  public getExchangesList(): Observable<Exchange[]> {
    if (this.exchangesCache) {
      return of(this.exchangesCache);
    } else {
      return this.http.get(this.API_URL + '/all/exchanges')
        .pipe(
          map((res) => {
            const exchanges: Exchange[] = [];

            if (res instanceof Object && Object.keys(res).length) {
              for (let index in res) {
                exchanges.push({
                  name: index,
                  pairs: res[index],
                  toSymbols: this.getExchangeToSymbols(res[index])
                });
              }
              console.log(exchanges);
            } else {
              throw Error('Exchanges list empty');
            }

            this.exchangesCache = exchanges;
            return exchanges;
          })
        );
    }
  }

  /**
   * Get Exchange pairs data
   * @param {string} toSymbol
   * @param {string} exchangeName
   * @returns {Observable<ExchangePairData[]>}
   */
  public getExchangePairsData(toSymbol: string, exchangeName: string): Observable<ExchangePairData[]> {
    this.loadingService.showLoading();

    return this.getExchangesList()
      .pipe(
        mergeMap((exchanges: Exchange[]) => {
          const exchangeData: Exchange = exchanges.find((item) => item.name === exchangeName);
          const requests: Array<any> = [];

          if (exchangeData) {
            Object.entries(exchangeData.pairs).slice(0, 49).forEach((item: Array<any>) => {
              if (item[1].find(symbol => toSymbol)) {
                const params = new HttpParams()
                  .set('fsym', item[0])
                  .set('tsym', toSymbol)
                  .set('e', exchangeName);
                requests.push(this.http.get(`${this.API_URL}/generateAvg`, {params: params}));
              }
            });

            return forkJoin(requests)
              .pipe(
                map((res: any) => {
                  const exchangePairsData: ExchangePairData[] = [];
                  res
                    .filter(item => item.Response !== 'Error')
                    .forEach((item: any) => {
                      exchangePairsData.push({
                        fromSymbol: item.RAW.FROMSYMBOL,
                        toSymbol: item.RAW.TOSYMBOL,
                        price: item.RAW.PRICE
                      });
                    });

                  return exchangePairsData;
                })
              );

          } else {
            throw new Error('Exchange not found');
          }
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  /**
   * Get toSymbols availible on exchange
   */
  private getExchangeToSymbols(exchange: Array<any>): Array<string> {
    const toSymbols: Array<string> = [];

    for (var index in exchange) {
      exchange[index].forEach((fsym) => {
        if (toSymbols.indexOf(fsym) === -1) {
          toSymbols.push(fsym);
        }
      });
    }

    return toSymbols;
  }
}
