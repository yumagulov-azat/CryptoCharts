import { Component, OnInit, Input } from '@angular/core';

// Models
import { ExchangesList } from '../../models/exchanges-list';

@Component({
  selector: 'app-exchanges-list',
  templateUrl: './exchanges-list.component.html',
  styleUrls: ['./exchanges-list.component.scss']
})
export class ExchangesListComponent implements OnInit {

  @Input() exchangesList: ExchangesList[] = [];

  constructor() { }

  ngOnInit() {
  }

}
