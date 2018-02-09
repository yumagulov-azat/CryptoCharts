import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class CurrenciesService {

  private apiUrl: string = '';

  constructor(private http: HttpClient) { }

  /**
   * Get all coins list
   */
  getCoinsList(): Observable<any> {
    return this.http.get('https://www.cryptocompare.com/api/data/coinlist/')
  }
}
