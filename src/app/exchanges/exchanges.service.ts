import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJs
import { Observable, of, forkJoin, BehaviorSubject } from 'rxjs';
import { map, finalize, mergeMap } from 'rxjs/operators';

// Services
import { LoadingService } from '@app/shared/services/loading.service';

// Models
import { Exchange } from './models/exchange';
import { ExchangePair } from './models/exchage-pair';


@Injectable()
export class ExchangesService {

  private API_URL = 'https://min-api.cryptocompare.com/data';

  public toSymbol: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private exchangesCache: Exchange[];

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
                  pairsFull: [],
                  pairsCount: Object.keys(res[index]).length,
                  toSymbols: this.getExchangeToSymbols(res[index])
                });
              }
              this.exchangesCache = exchanges;
            } else {
              throw Error('Exchanges list empty');
            }

            return exchanges;
          })
        );
    }
  }

  /**
   * Get Exchange pairs data
   * @param {string} toSymbol
   * @param {string} exchangeName
   * @returns {Observable<ExchangePair[]>}
   */
  public getExchange(toSymbol: string, exchangeName: string, page: number = 1, limit: number = 50): Observable<Exchange> {
    this.loadingService.showLoading();

    return this.getExchangesList()
      .pipe(
        mergeMap((exchanges: Exchange[]) => {
          const exchange: Exchange = exchanges.find((item) => item.name === exchangeName);
          const requests: Array<any> = [];

          if (exchange) {
            exchange.pairsFull = [];

            Object.entries(exchange.pairs).slice((page - 1) * limit, (limit * page) - 1).forEach((item: Array<any>) => {
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
                  res
                    .filter(item => item.Response !== 'Error')
                    .forEach((item: any) => {
                      exchange.pairsFull.push({
                        fromSymbol: item.RAW.FROMSYMBOL,
                        toSymbol: item.RAW.TOSYMBOL,
                        toSymbolDisplay: item.DISPLAY.TOSYMBOL,
                        price: item.RAW.PRICE,
                        open24Hour: item.RAW.OPEN24HOUR,
                        high24Hour: item.RAW.HIGH24HOUR,
                        low24Hour: item.RAW.LOW24HOUR,
                        changePct24Hour: item.RAW.PRICE && item.RAW.OPEN24HOUR ? Math.round(((item.RAW.PRICE - item.RAW.OPEN24HOUR) / item.RAW.OPEN24HOUR * 100) * 100) / 100 : 0
                      });
                    });

                  return exchange;
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
