import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// RxJs
import { Subscription } from "rxjs";

// Services
import { CoinsService } from './shared/coins.service';

// Models
import { CoinsList } from './shared/models/coins-list'

/**
 * Coins module parent component
 */

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  coinsList: CoinsList[];
  coinsListSubscription: Subscription;

  toolbarTitle = 'All coins';
  showBackButton = false;

  constructor(private route: ActivatedRoute, private coinsService: CoinsService) {

  }

  ngOnInit() {
    // Do not make unnecessary requests
    if (this.route.snapshot.children[0].url[0].path == 'list') {
      this.coinsListSubscription = this.coinsService.coinsListSubject
        .subscribe(res => {
          this.coinsList = res;
          this.coinsListSubscription.unsubscribe();
        });
    } else {
      this.coinsService.getCoinsList()
        .subscribe(res => {
          this.coinsList = res;
        });
    }
  }

}
