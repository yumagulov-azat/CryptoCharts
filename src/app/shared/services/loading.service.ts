import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Loading state service
 */

@Injectable()
export class LoadingService {

  loading: Subject<boolean> = new Subject();

  constructor() { }

  showLoading(): void {
    this.loading.next(true);
  }

  hideLoading(): void {
    this.loading.next(false);
  }

}
