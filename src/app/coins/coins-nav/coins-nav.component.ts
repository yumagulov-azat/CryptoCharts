import { Component, OnInit, Input } from '@angular/core';

// Models
import { CoinsList } from '../shared/models/coins-list';


/**
 * Coins page nav
 */

@Component({
  selector: 'app-coins-nav',
  templateUrl: './coins-nav.component.html',
  styleUrls: ['./coins-nav.component.scss']
})
export class CoinsNavComponent implements OnInit {

  @Input() coinsList: CoinsList[];


  constructor() {
  }

  ngOnInit() {

  }
}
