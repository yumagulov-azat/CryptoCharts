import { Injectable } from '@angular/core';

// RxJs
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PageService {

  public pageError: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() { }

  /**
   * Show page error
   * @param {string} message
   * @param {string} icon
   */
  public showError(message: string = 'API error', icon: string = 'cloud_of'): void {
    this.pageError.next({
      show: true,
      message: message,
      icon: icon
    });
  }

  /**
   * Hide error
   */
  public hideError(): void {
    this.pageError.next(false);
  }

}
