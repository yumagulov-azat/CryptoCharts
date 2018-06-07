import { Component, OnInit, Input } from '@angular/core';

// Models
import { Exchange } from '../../models/exchange';

@Component({
  selector: 'app-exchanges-list',
  templateUrl: './exchanges-list.component.html',
  styleUrls: ['./exchanges-list.component.scss']
})
export class ExchangesListComponent implements OnInit {

  @Input() exchangesList: Exchange[] = [];

  constructor() { }

  ngOnInit() {
  }

}
