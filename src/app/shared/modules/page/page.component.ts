import { Component, OnInit, Input } from '@angular/core';

/**
* Root component of page layout
*/

@Component({
  selector: 'app-page',
  template: '<ng-content></ng-content>',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input() loading: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
