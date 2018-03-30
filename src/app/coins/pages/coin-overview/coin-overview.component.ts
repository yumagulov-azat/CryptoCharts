import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';

// RxJs
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

// Services
import { CoinsService } from '../../coins.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { PageService } from '../../../shared/modules/page/page.service';

// Models
import { CoinSnapshot } from '../../models/coin-snapshot.model';
import { ChartFilter } from '../../models/chart-filter.model';


/**
 * Coin overview page
 */

@Component({
  selector: 'app-coin-overview',
  templateUrl: './coin-overview.component.html',
  styleUrls: ['./coin-overview.component.scss']
})
export class CoinOverviewComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();

  coinName: string;
  toSymbol: string;

  coin: CoinSnapshot;
  chartFilter: ChartFilter = {
    period: 30,
    periodType: 'histoday',
    data: ['close']
  };

  constructor(private coinsService: CoinsService,
              private route: ActivatedRoute,
              private router: Router,
              private notifications: NotificationsService,
              private pageService: PageService,
              private meta: MetaService) {

  }

  ngOnInit() {
    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .subscribe((route: any) => {
        this.coinName = route.params.coinName;
        this.toSymbol = route.params.toSymbol;

        this.getCoinInfo();
        this.coinsService.toSymbol.next(this.toSymbol);
        this.meta.setTitle(`${this.coinName} → ${this.toSymbol} | Coins`);
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
   */
  getCoinInfo(): void {
    this.coinsService.getCoinData(this.coinName, this.chartFilter.period, this.chartFilter.periodType, this.toSymbol)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((coin: CoinSnapshot) => {
        this.coin = coin;
        this.pageService.hideError();

        if(!this.coin.toSymbols.filter((item: string) => item === this.toSymbol ).length) {
          this.router.navigate(['/coins/', this.coinName, this.coin.toSymbols[0]]);
        }
      }, err => {
        console.error(err);
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
      .subscribe((history: any) => {
        this.coin.history = history;
        this.chartFilter = filter;
      }, err => {
        this.notifications.show('API Error');
      });
  }

  /**
   * Change route when toSymbol changed
   * @param toSymbol
   */
  toSymbolChanged(toSymbol): void {
    this.router.navigate(['/coins/', this.coinName, toSymbol]);
  }

}
