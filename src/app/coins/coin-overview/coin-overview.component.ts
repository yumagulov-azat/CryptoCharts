import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CoinsService } from '../coins.service';

import * as moment from 'moment';

/**
 * Coin overview page
 */

export interface Coin {
  finance: any,
  info: any,
  daysHistory: Array<any>
}


@Component({
  selector: 'coin-overview',
  templateUrl: './coin-overview.component.html',
  styleUrls: ['./coin-overview.component.scss']
})
export class CoinOverviewComponent implements OnInit {

  loading: boolean = true;
  chartData: any;

  coinName: string;

  coin: Coin = {
    finance: {},
    info: {
      Description: ''
    },
    daysHistory: []
  };

  constructor(private coinsService: CoinsService, private route: ActivatedRoute, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCoinInfo();
    });
  }

  getCoinInfo(): void {
    this.coinName = this.route.snapshot.paramMap.get('name');
    this.loading = true;

    this.coinsService.getCoinFullData(this.coinName).subscribe(res => {
      this.coin = res;
      this.chartData = res.daysHistory;
      this.chartData = {
        json: res.daysHistory,
        keys: {
          x: 'time',
          value: ['close'],
        },
        type: 'area-spline'
      }
      this.loading = false;

      console.log(res)

      // let labels = [];
      // let data = [
      //   {
      //     title: 'USD',
      //     color: 'violet',
      //     values: []
      //   }
      // ];
      // this.coin.daysHistory.forEach((item) => {
      //   labels.push(moment(new Date(item.time*1000)).format('YYYY-MM-DD'));
      //   data[0].values.push(item.close);
      // });

    }, err => {
      this.snackBar.open('API Error', 'OK');
      this.loading = false;
    });
  }


}
