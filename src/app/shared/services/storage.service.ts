import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// RxJs
import { Observable ,  of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

/**
 * Storage service.
 * LocalStorage
 */

@Injectable()
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  public getItem(key: string): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return of(localStorage.getItem(key));
    } else {
      return of('');
    }
  }

  public setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  public getItemAsArray(key: string): Observable<Array<any>> {
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
      return of([]);
    }
  }

  public addToArray(key: string, value: string): void {
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

  public removeFromArray(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const array = localStorage.getItem(key).split(',');
      array.splice(array.indexOf(value), 1);
      this.setItem(key, array);
    }
  }

  public checkInArray(key: string, value: string): boolean {
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
