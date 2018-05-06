import { Injectable } from '@angular/core';

// RxJs
import { Subject } from 'rxjs';

@Injectable()
export class PageService {

  pageError = new Subject<any>();

  constructor() { }

  showError(message: string = 'API error', icon: string = 'cloud_of'): void {
    this.pageError.next({
      show: true,
      message: message,
      icon: icon
    });
  }

  hideError(): void {
    this.pageError.next(false);
  }

}
