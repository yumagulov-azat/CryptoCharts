import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinsService } from '../coins.service';

/**
* Coin overview page
*/

@Component({
  selector: 'coin-overview',
  templateUrl: './coin-overview.component.html',
  styleUrls: ['./coin-overview.component.scss']
})
export class CoinOverviewComponent implements OnInit {

  loading: boolean = true;
  chartData: Array<any>;

  coinName: string;

  coin: Coin = {
    finance: {},
    info: {},
    daysHistory: []
  };
  
  constructor(private coinsService: CoinsService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.getCoinInfo();
    });
  }

  getCoinInfo(): void {
    this.coinName = this.route.snapshot.paramMap.get('name');
    this.coinsService.getCoinFullData(this.coinName).subscribe(res => {
      this.coin = res;
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }
}
//
export interface Coin {
    finance: any,
    info: any,
    daysHistory: Array<any>
}
