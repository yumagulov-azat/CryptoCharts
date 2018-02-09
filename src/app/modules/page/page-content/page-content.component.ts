import { Component, OnInit } from '@angular/core';

/**
* App page content
*/
@Component({
  selector: 'app-page-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
