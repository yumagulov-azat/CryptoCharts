import { Component, OnInit, Input } from '@angular/core';

/**
* App page navigation component
*/

@Component({
  selector: 'app-page-nav',
  templateUrl: 'page-nav.component.html',
  styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnInit {

  @Input() title: string = '';

  constructor() { }

  ngOnInit() {
  }

}
