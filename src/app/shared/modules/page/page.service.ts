import { Injectable } from '@angular/core';

// RxJs
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PageService {

  pageError: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() { }

  /**
   * Show page error
   * @param {string} message
   * @param {string} icon
   */
  showError(message: string = 'API error', icon: string = 'cloud_of'): void {
    this.pageError.next({
      show: true,
      message: message,
      icon: icon
    });
  }

  /**
   * Hide error
   */
  hideError(): void {
    this.pageError.next(false);
  }

}
