import { Component, OnInit } from '@angular/core';
import { CoinsService } from '../coins.service';

/**
* Coins page nav
*/

@Component({
  selector: 'coins-nav',
  templateUrl: './coins-nav.component.html',
  styleUrls: ['./coins-nav.component.scss']
})
export class CoinsNavComponent implements OnInit {

  coinsList: Array<any> = [];

  constructor(private coinsService: CoinsService) { }

  ngOnInit() {
     this.coinsService.getCoinsList()
      .subscribe(res => {
        this.coinsList = res;
      });
  }
}
