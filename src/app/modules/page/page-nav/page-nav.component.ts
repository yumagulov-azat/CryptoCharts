import { Component, OnInit } from '@angular/core';

/**
* App page navigation component
*/
@Component({
  selector: 'app-page-nav',
  template: '<ng-content></ng-content>',
  styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
