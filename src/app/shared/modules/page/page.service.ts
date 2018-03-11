import { Injectable } from '@angular/core';

// RxJs
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";

@Injectable()
export class PageService {

  pageError = new Subject<any>();

  constructor() { }

  showError(message: string = 'API error'): void {
    this.pageError.next({
      show: true,
      message: message
    });
  }

  hideError(): void {
    this.pageError.next(false);
  }

}
