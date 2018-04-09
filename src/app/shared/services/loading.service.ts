import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Loading state service
 */

@Injectable()
export class LoadingService {

  loading = new BehaviorSubject<boolean>(false);

  constructor() { }

  showLoading(): void {
    this.loading.next(true);
  }

  hideLoading(): void {
    this.loading.next(false);
  }

}
