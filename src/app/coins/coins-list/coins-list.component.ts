import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { CoinsService } from '../coins.service';

/**
 * Coins list page
 */

@Component({
  selector: 'coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {

  loading: boolean = true;

  // Data-table
  displayedColumns: Array<any> = ['position', 'name', 'price', 'marketCap', 'changePct24Hour', 'weekHistory'];
  coinsList: any = new MatTableDataSource();
  pageSize: number = 50;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private coinsService: CoinsService, private route: ActivatedRoute, private router: Router, public snackBar: MatSnackBar) {

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
   * Get coins list and past data to data-table
   * @param limit
   * @param page
   */
  getCoinsList(limit: number = 50, page: number = 0): void {
    this.loading = true;

    this.coinsService.getCoinsListFullData(limit, page)
      .subscribe(res => {
        this.coinsList.data = res;
        this.coinsList.sort = this.sort;
        this.loading = false;
        this.renderSparklines();
      }, error => {
        this.snackBar.open('API Error', 'OK');
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
      .subscribe(res => {
        this.coinsList.data[i].weekHistory = {
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
