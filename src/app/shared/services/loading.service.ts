import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Loading state service
 */

@Injectable()
export class LoadingService {

  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public showLoading(): void {
    this.loading.next(true);
  }

  public hideLoading(): void {
    this.loading.next(false);
  }

}
