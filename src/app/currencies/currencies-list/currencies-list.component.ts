import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.scss']
})
export class CurrenciesListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('2')
  }

}
