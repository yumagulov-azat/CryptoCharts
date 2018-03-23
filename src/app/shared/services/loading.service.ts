import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Loading state service
 */

@Injectable()
export class LoadingService {

  loading = new Subject<boolean>();

  constructor() { }

  showLoading(): void {
    this.loading.next(true);
  }

  hideLoading(): void {
    this.loading.next(false);
  }

}
