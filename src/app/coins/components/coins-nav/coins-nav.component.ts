import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Models
import { CoinsList } from '../../models/coins-list.model';


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
