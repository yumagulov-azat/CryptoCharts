import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

// RxJs
import { Subscription } from "rxjs";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';

// Services
import { CoinsService } from '../shared/coins.service';
import { NotificationsService } from '../../shared/services/notifications.service';

// Models
import { CoinsList } from '../shared/models/coins-list.model';


/**
 * Coins list page
 */

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {

  ngUnsubscribe: Subject<void> = new Subject<void>();
  loading: boolean = true;

  // Data-table
  displayedColumns: Array<any> = ['position', 'name', 'price', 'marketCap', 'changePct24Hour', 'sparkline'];
  coinsList: any = new MatTableDataSource();
  pageSize: number = 50;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  coinsListSubscription: Subscription;


  constructor(private coinsService: CoinsService,
              private route: ActivatedRoute,
              private router: Router,
              private notifications: NotificationsService,
              private meta: MetaService) {

  }

  ngOnInit() {
    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: any) => {
        this.paginator.pageIndex = res.params.page;
        this.getCoinsList(this.pageSize, this.paginator.pageIndex - 1);

        let metaPage: string = this.paginator.pageIndex > 1 ? ', page ' + this.paginator.pageIndex : '';
        this.meta.setTitle(`List${metaPage} | Coins`);
      });

    this.paginator.page.subscribe(res => {
      this.router.navigate(['/coins/list/' + this.paginator.pageIndex]);
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
   * Get coins list
   * @param limit
   * @param page
   */
  getCoinsList(limit: number = 50, page: number = 0): void {
    this.loading = true;

    this.coinsService.getCoinsList(limit, page)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: CoinsList[]) => {
        this.renderData(res);
      }, error => {
        this.notifications.show('API Error');
        this.loading = false;
      });
  }


  /**
   * Past data to data-table
   * @param data
   */
  renderData(data: CoinsList[]): void {
    this.coinsList.data = data;
    this.coinsList.sort = this.sort;
    this.loading = false;
    this.renderSparklines();
  }


  /**
   * Render sparklines after coins linst loaded
   * because paralell loading is very slow
   */
  renderSparklines(): void {
    let coins = this.coinsList.data.map(item => {
      return {
        name: item.name
      }
    });

    if(this.coinsListSubscription) this.coinsListSubscription.unsubscribe();

    let i = 0;
    this.coinsListSubscription = this.coinsService.getCoinsHistory(coins, 6)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.coinsList.data[i].history = {
          json: res[0],
          keys: {
            x: 'time',
            value: ['close'],
          },
          type: 'area-spline'
        };
        i++;
      });
  }

}
