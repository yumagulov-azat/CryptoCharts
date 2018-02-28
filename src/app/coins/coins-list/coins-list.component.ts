import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CoinsService } from '../shared/coins.service';
import { NotificationsService } from '../../shared/services/notifications.service';

/**
 * Coins list page
 */

@Component({
  selector: 'coins-list',
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

  constructor(private coinsService: CoinsService,
              private route: ActivatedRoute,
              private router: Router,
              private notifications: NotificationsService) {

  }

  ngOnInit() {
    this.paginator.pageIndex = parseInt(this.route.snapshot.paramMap.get('page')) - 1;
    this.getCoinsList(this.pageSize, this.paginator.pageIndex);


    this.paginator.page.subscribe(res => {
      this.router.navigate(['/coins/list/' + (this.paginator.pageIndex + 1)]);
      this.getCoinsList(this.paginator.pageSize, this.paginator.pageIndex);
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
   * Get coins list and past data to data-table
   * @param limit
   * @param page
   */
  getCoinsList(limit: number = 50, page: number = 0): void {
    this.loading = true;

    this.coinsService.getCoinsListFullData(limit, page)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.coinsList.data = res;
        this.coinsList.sort = this.sort;
        this.loading = false;
        this.renderSparklines();
      }, error => {
        this.notifications.show('API Error');
        this.loading = false;
      });
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

    let i = 0;
    this.coinsService.getCoinsHistoryByDays(coins, 6)
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
