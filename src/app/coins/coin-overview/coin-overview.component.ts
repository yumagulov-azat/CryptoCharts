import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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

  // Chart data select
  chartDataFilter: Array<any> = [
    {value: 'close', viewValue: 'Close'},
    {value: 'open', viewValue: 'Open'},
  ];
  chartDataFilterSelected: Array<any> = ['close'];

  // Chart period select
  chartPeriods: Array<any> = [
    {value: 7, viewValue: '7 days'},
    {value: 30, viewValue: '1 month'},
    {value: 90, viewValue: '3 month'},
    {value: 180, viewValue: '6 month'},
    {value: 364, viewValue: '1 year'}
  ];
  chartPeriodsSelected: number = 30;

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

    this.coinsService.getCoinFullData(this.coinName, this.chartPeriodsSelected)
      .subscribe(res => {
        this.coin = res;
        this.chartData = {
          json: res.daysHistory,
          keys: {
            x: 'time',
            value: this.chartDataFilterSelected,
          },
          type: 'area-spline'
          // type: 'line'
        }

        this.loading = false;

      }, err => {
        this.snackBar.open('API Error', 'OK');
        this.loading = false;
      });
  }

  getCoinHistoryByDays(limit: number = this.chartPeriodsSelected): void {
    this.coinsService.getCoinHistoryByDays(this.coinName, limit)
      .subscribe(res => {
        this.chartData = {
          json: res,
          keys: {
            x: 'time',
            value: this.chartDataFilterSelected,
          },
          type: 'area-spline'
        }

      }, err => {
        this.snackBar.open('API Error', 'OK');
      });
  }




}
