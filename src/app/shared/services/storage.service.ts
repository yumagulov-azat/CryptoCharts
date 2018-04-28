import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// RxJs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mergeMap } from 'rxjs/operators';

/**
 * Storage service.
 * LocalStorage
 */

@Injectable()
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  getItem(key: string): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return of(localStorage.getItem(key));
    } else {
      return of('');
    }
  }

  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  getItemAsArray(key: string): Observable<Array<any>> {
    if (isPlatformBrowser(this.platformId)) {
      return of(localStorage.getItem(key))
        .pipe(
          map(res => {
            if (res) {
              return res.split(',');
            } else {
              return null;
            }
          })
        );
    } else {
      return Observable.of([]);
    }
  }

  addToArray(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      let array: any = localStorage.getItem(key);

      if (array && array !== '') {
        array = array.split(',');
      } else {
        array = [];
      }

      if (!array.find((item) => item === value )) {
        array.push(value);
        this.setItem(key, array);
      }
    }
  }

  removeFromArray(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const array = localStorage.getItem(key).split(',');
      array.splice(array.indexOf(value), 1);
      this.setItem(key, array);
    }
  }

  checkInArray(key: string, value: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const array = localStorage.getItem(key);

      if (array) {
        const element = array.split(',').find((element) => {
          return element === value;
        });
        return element ? true : false;
      } else {
        return false;
      }

    } else {
      return false;
    }
  }
}
