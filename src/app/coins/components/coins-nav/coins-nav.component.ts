import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { CoinsService } from '../../coins.service';

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
  toSymbol: string = 'USD';

  constructor(private coinsService: CoinsService) {
  }

  ngOnInit() {
    this.coinsService.toSymbol.subscribe(res => {
      this.toSymbol = res;
    })
  }
}
