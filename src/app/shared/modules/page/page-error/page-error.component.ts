import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss'],
})
export class PageErrorComponent implements OnInit {

  @Input() errorMessage = '';

  constructor() { }

  ngOnInit() {
  }

}
