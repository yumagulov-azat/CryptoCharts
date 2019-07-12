import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * Currency symbol select component
 */

@Component({
  selector: 'app-symbol-select',
  templateUrl: './symbol-select.component.html',
  styleUrls: ['./symbol-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolSelectComponent implements OnInit {

  @Input() symbols: Array<string> = [
    'USD',
    'RUB',
    'BTC',
    'ETH',
    'EUR',
    'GBP',
    'JPY',
    'KRW',
  ];
  @Input() symbolSelected = 'USD';
  @Output() symbolChanged: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  changeSymbol() {
    this.symbolChanged.emit(this.symbolSelected);
  }
}
