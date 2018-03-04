import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// RxJs
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';

// Services
import { StorageService } from '../../shared/services/storage.service';
import { CoinsService } from '../shared/coins.service';
import { NotificationsService } from '../../shared/services/notifications.service';

import { CoinChartComponent } from '../coin-chart/coin-chart.component'

// Models
import { CoinSnapshot } from '../shared/models/coin-snapshot';
import { ChartFilter } from '../shared/models/chart-filter';


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

    this.coinsService.getCoinFullData(this.coinName, 30)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((coin: CoinSnapshot) => {
        this.coin = coin;
        this.state.loading = false;
        this.state.error = false;
        this.state.firstShow = false;
      }, err => {
        this.notifications.show('API Error');
        this.state.loading = false;
        this.state.error = true;
      });
  }


  /**
   * Get coin history
   * @param limit
   * @param type
   */
  getCoinHistory(filter: ChartFilter): void {
    this.state.loading = true;

    this.coinsService.getCoinHistory(this.coinName, filter.period, filter.periodType)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.coin.history = res;
        this.state.loading = false;
      }, err => {
        this.notifications.show('API Error');
        this.state.loading = false;
      });
  }

}
