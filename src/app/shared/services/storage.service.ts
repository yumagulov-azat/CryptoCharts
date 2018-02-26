import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class StorageService {

  constructor() { }

  getItem(key: string): Observable<any> {
    return Observable.of(localStorage.getItem(key));
  }

  setItem(key: string, value: any): Observable<any> {
    return Observable.of(localStorage.setItem(key, value));
  }
}
