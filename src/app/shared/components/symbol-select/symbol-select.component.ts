import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-symbol-select',
  templateUrl: './symbol-select.component.html',
  styleUrls: ['./symbol-select.component.scss']
})
export class SymbolSelectComponent implements OnInit {

  @Input() symbols: Array<string> = [
    "USD",
    "RUB",
    "BTC",
    "ETH",
    "EUR",
    "GBP",
    "JPY",
    "KRW",
  ];
  @Input() symbolSelected: string = 'USD';
  @Input() storageKey: Array<string>;
  @Output() symbolChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  changeSymbol() {
    this.symbolChange.emit(this.symbolSelected)
  }
}
