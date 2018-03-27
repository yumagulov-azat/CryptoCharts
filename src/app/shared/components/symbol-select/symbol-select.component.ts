import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { StorageService } from '../../services/storage.service';

/**
 * Currency symbol select component
 */

@Component({
  selector: 'app-symbol-select',
  templateUrl: './symbol-select.component.html',
  styleUrls: ['./symbol-select.component.scss']
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
  @Input() storageKey: string;
  @Output() symbolChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {

  }

  changeSymbol() {
    this.symbolChange.emit(this.symbolSelected);

    if(this.storageKey) {
      this.storage.setItem(this.storageKey, this.symbolSelected);
    }
  }
}
