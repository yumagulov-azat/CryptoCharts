import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Loading state service
 */

@Injectable()
export class LoadingService {

  private readonly _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor() { }

  showLoading(): void {
    this._loading.next(true);
  }

  hideLoading(): void {
    this._loading.next(false);
  }

}
