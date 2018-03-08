import { Component, OnInit, Input } from '@angular/core';

/**
* App page content
*/

@Component({
  selector: 'app-page-content',
  templateUrl: 'page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit {

  @Input() toolbarTitle: string = '';

  constructor() { }

  ngOnInit() {
  }

}
