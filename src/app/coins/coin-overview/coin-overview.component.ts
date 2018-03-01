import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// RxJs
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';

// Services
import { StorageService } from '../../shared/services/storage.service';
import { CoinsService } from '../shared/coins.service';
import { NotificationsService } from '../../shared/services/notifications.service';

// Models
import { CoinSnapshot } from '../../shared/models/coin-snapshot';

export interface CoinOvervieData {

}

/**
 * Coin overview page
 */

@Component({
  selector: 'app-coin-overview',
  templateUrl: './coin-overview.component.html',
  styleUrls: ['./coin-overview.component.scss']
})
export class CoinOverviewComponent implements OnInit {

  ngUnsubscribe: Subject<void> = new Subject<void>();

  state: any = {
    loading: <boolean>true,
    firstShow: <boolean>true,
    error: <boolean>false,
  };

  coin: CoinSnapshot;
  coinName: string;
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

  constructor(private coinsService: CoinsService,
              private route: ActivatedRoute,
              private notifications: NotificationsService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCoinInfo();
    });
  }

  /**
   * Unsubscribe from Observables on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Get main coin info
   */
  getCoinInfo(): void {
    this.coinName = this.route.snapshot.paramMap.get('name');
    this.state.loading = true;

    this.coinsService.getCoinFullData(this.coinName, this.chartPeriodsSelected)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((coin: CoinSnapshot) => {
        this.pastCoinData(coin);
      }, err => {
        this.notifications.show('API Error');
        this.state.loading = false;
        this.state.error = true;
      });
  }

  /**
   *
   * @param coin
   */
  pastCoinData(coin: CoinSnapshot): void {
    this.coin = coin;
    this.chartData = this.prepareChartData(coin.history);
    this.state.loading = false;
    this.state.error = false;
    this.state.firstShow = false;
  }

  /**
   * Get coin history
   * @param limit
   * @param type
   */
  getCoinHistory(limit: number = this.chartPeriodsSelected, type: string = 'histoday'): void {
    this.state.loading = true;

    type = this.chartPeriods.filter(item => {
      return item.value === limit;
    })[0].type;

    this.coinsService.getCoinHistory(this.coinName, limit, type)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.chartData = this.prepareChartData(res);
        this.state.loading = false;
      }, err => {
        this.notifications.show('API Error');
        this.state.loading = false;
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
