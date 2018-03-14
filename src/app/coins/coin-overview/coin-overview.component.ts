import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';

// RxJs
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';

// Services
import { CoinsService } from '../coins.service';
import { NotificationsService } from '../../shared/services/notifications.service';
import { PageService } from '../../shared/modules/page/page.service';

// Models
import { CoinSnapshot } from '../models/coin-snapshot.model';
import { ChartFilter } from '../models/chart-filter.model';


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

  coin: CoinSnapshot;
  coinName: string;
  chartFilter: ChartFilter = {
    period: 30,
    periodType: 'histoday',
    data: ['close']
  }

  constructor(private coinsService: CoinsService,
              private route: ActivatedRoute,
              private router: Router,
              private notifications: NotificationsService,
              private pageService: PageService,
              private meta: MetaService) {

  }

  ngOnInit() {
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.coinName = this.route.snapshot.paramMap.get('name');
        this.getCoinInfo();
        this.meta.setTitle(`${this.coinName} | Coins`);
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
   * Get coin info
   * @param toSymbol
   */
  getCoinInfo(toSymbol: string = 'USD'): void {

    this.coinsService.getCoinFullData(this.coinName, this.chartFilter.period, toSymbol)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((coin: CoinSnapshot) => {
        this.coin = coin;
      }, err => {
        this.pageService.showError();
      });
  }


  /**
   * Get coin history
   * @param filter
   * @param toSymbol
   */
  getCoinHistory(filter: ChartFilter, toSymbol: string = 'USD'): void {
    this.coinsService.getCoinHistory(this.coinName, filter.period, filter.periodType, toSymbol)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.coin.history = res;
        this.chartFilter = filter;
      }, err => {
        this.notifications.show('API Error');
      });
  }

}
