import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJs
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

// Models
import { ExchangesList } from './models/exchanges-list';

@Injectable()
export class ExchangesService {

  private API_URL = 'https://min-api.cryptocompare.com/data';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get all exchanges
   */
  public getExchangesList(): Observable<ExchangesList[]> {
    let exchanges: ExchangesList[] = [];

    return this.http.get(this.API_URL + '/all/exchanges')
      .pipe(
        map((res) => {
          if(res instanceof Object && Object.keys(res).length) {
            for(var index in res) {
              exchanges.push({
                name: index,
                pairs: res[index],
                toSymbols: this.getExhangeToSymbols(res[index])
              });
            }
          } else {
            throw Error('Exchanges list empty')
          }

          return exchanges;
        })
      );
  }

  /**
   * Get toSymbols availible on exchange
   */
  private getExhangeToSymbols(exchange: Array<any>): Array<string> {
    let toSymbols: Array<string> = [];

    for(var index in exchange) {
      exchange[index].forEach((fsym) => {
        if(toSymbols.indexOf(fsym) === -1) {
          toSymbols.push(fsym);
        }
      })
    }

    return toSymbols;
  }
}
