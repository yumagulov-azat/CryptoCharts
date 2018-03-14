import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

/**
 * Storage service.
 * LocalStorage
 */

@Injectable()
export class StorageService {

  constructor() { }

  getItem(key: string): Observable<any> {
    return Observable.of(localStorage.getItem(key));
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  getItemAsArray(key: string): Observable<Array<any>> {
    return Observable.of(localStorage.getItem(key))
      .map(res => {
        if (res) {
          return res.split(',');
        } else {
          return null;
        }
      });
  }

  addToArray(key: string, value: string): void {
    if (!this.checkInArray(key, value)) {
      let array: any = localStorage.getItem(key);

      if (array !== '') {
        array = array.split(',');
      } else {
        array = [];
      }

      array.push(value);
      this.setItem(key, array);
    }
  }

  removeFromArray(key: string, value: string): void {
    const array = localStorage.getItem(key).split(',');
    array.splice(array.indexOf(value), 1);
    this.setItem(key, array);
  }

  checkInArray(key: string, value: string): boolean {
    const array = localStorage.getItem(key).split(',');
    const element = array.find((element) => {
      return element === value;
    });
    return element ? true : false;
  }
}
