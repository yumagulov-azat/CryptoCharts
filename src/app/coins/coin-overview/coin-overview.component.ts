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

  isLoaded: boolean = true;
  chartData: Array<any>;

  coin: Coin = {
    name: '',
    price: 0
  }

  constructor(private coinsService: CoinsService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.getCoinInfo();
    });

    this.route.parent.data
      .subscribe(v => console.log(v));
  }

  getCoinInfo(): void {
    this.coin.name = this.route.snapshot.paramMap.get('name');
    this.coinsService.getCoinFullData(this.coin.name).subscribe(res => {
      if(res.Response == 'Success') {
        let data = res.Data;
        console.log(res)
        this.coin.price = data.AggregatedData.PRICE
      } else if(res.Response == 'Error') {
        console.log('error');
      }
    });
  }
}

export interface Coin {
    name: string,
    price: number
}
