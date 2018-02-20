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

  chartDataFilter: Array<any> = [
    {value: 'close', viewValue: 'Close'},
    {value: 'open', viewValue: 'Open'},
    {value: 'high', viewValue: 'High'},
    {value: 'low', viewValue: 'Low'}
  ];
  chartDataFilterSelected: Array<any> = ['close'];

  chartPeriods: Array<any> = [
    {value: 7, viewValue: '7 days'},
    {value: 30, viewValue: '1 month'},
    {value: 90, viewValue: '3 month'},
    {value: 180, viewValue: '6 month'},
    {value: 364, viewValue: '1 year'}
  ];
  chartPeriodsSelected: number = 7;

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

    this.coinsService.getCoinFullData(this.coinName)
      .subscribe(res => {
        this.coin = res;
        this.chartData = {
          json: this.prepareChartDataJson(res.daysHistory),
          keys: {
            x: 'time',
            value: ['close', 'open'],
          },
          type: 'area',
          axis: {
            y: {
              max: 15000,
            }
          }
        }

        this.loading = false;

      }, err => {
        this.snackBar.open('API Error', 'OK');
        this.loading = false;
      });
  }

  prepareChartDataJson(daysHistory: Array<any>): Array<any> {
    return daysHistory.map((item: any) => {
      return {
        // time: moment(new Date(item.time*1000)).format('YYYY-MM-DD'),
        time: item.time,
        close: item.close,
        open: item.open,
        high: item.high
      }
    })
  }

  getCoinHistoryByDays(limit: number = 7): void {
    this.coinsService.getCoinHistoryByDays(this.coinName, limit)
      .subscribe(res => {
        this.chartData = {
          json: this.prepareChartDataJson(res),
          keys: {
            x: 'time',
            value: ['usd'],
          },
          type: 'area-spline'
        }

      }, err => {
        this.snackBar.open('API Error', 'OK');
      });
  }


}
