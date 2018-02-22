import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CoinsService } from '../coins.service';

/**
 * Coin overview page
 */

export interface CoinSnapshot {
  finance: any;
  info: any;
  daysHistory: Array<any>;
}

@Component({
  selector: 'coin-overview',
  templateUrl: './coin-overview.component.html',
  styleUrls: ['./coin-overview.component.scss']
})
export class CoinOverviewComponent implements OnInit {

  loading: boolean = true;

  coinName: string;

  coin: CoinSnapshot = {
    finance: {},
    info: {
      Description: ''
    },
    daysHistory: []
  };

  chartData: any;

  // Chart data select
  chartDataFilter: Array<any> = [
    {value: 'close', viewValue: 'Close'},
    {value: 'open', viewValue: 'Open'},
  ];
  chartDataFilterSelected: Array<any> = ['close'];

  // Chart period select
  chartPeriods: Array<any> = [
    {value: 59, viewValue: '1 hour', type: 'histominute'},
    {value: 23, viewValue: '1 day', type: 'histohour'},
    {value: 6, viewValue: '1 week', type: 'histoday'},
    {value: 30, viewValue: '1 month', type: 'histoday'},
    {value: 90, viewValue: '3 month', type: 'histoday'},
    {value: 180, viewValue: '6 month', type: 'histoday'},
    {value: 364, viewValue: '1 year', type: 'histoday'}
  ];
  chartPeriodsSelected: number = 30;

  constructor(private coinsService: CoinsService, private route: ActivatedRoute, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCoinInfo();
    });
  }

  /**
   * Get main coin info
   */
  getCoinInfo(): void {
    this.coinName = this.route.snapshot.paramMap.get('name');
    this.loading = true;

    this.coinsService.getCoinFullData(this.coinName, this.chartPeriodsSelected)
      .subscribe(res => {
        this.coin = res;
        this.chartData = this.prepareChartData(res.daysHistory);
        this.loading = false;
        console.log(this.coin)
      }, err => {
        this.snackBar.open('API Error', 'OK');
        this.loading = false;
      });
  }

  /**
   * Get coin history
   * @param limit
   */
  getCoinHistory(limit: number = this.chartPeriodsSelected, type: string = 'histoday'): void {
    this.loading = true;

    type = this.chartPeriods.filter(item => {
      return item.value === limit;
    })[0].type;

    this.coinsService.getCoinHistory(this.coinName, limit, type)
      .subscribe(res => {
        this.chartData = this.prepareChartData(res);
        this.loading = false;
      }, err => {
        this.snackBar.open('API Error', 'OK');
        this.loading = false;
      });
  }

  /**
   * Prepare data for chart
   * @param data
   * @returns {{json: any, keys: {x: string, value: Array<any>}, type: string}}
   */
  prepareChartData(data: any): any {
    return {
      json: data,
      keys: {
        x: 'time',
        value: this.chartDataFilterSelected,
      },
      type: 'area-spline'
    }
  }


}
