import { Component, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns = ['position', 'name', 'price', 'marketCap', 'changePct24Hour'];
  coinsList = new MatTableDataSource();
  pageSize: number = 50;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private coinsService: CoinsService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCoinsList(this.pageSize);

    this.paginator.page.subscribe(res => {
      this.getCoinsList(this.paginator.pageSize, this.paginator.pageIndex);
    });
  }

  /**
   * Get coins list and past data to data-table
   */
  getCoinsList(limit: number = 50, page: number = 0): void {
    this.loading = true;

    this.coinsService.getCoinsList(limit, page)
      .subscribe(res => {
        this.coinsList.data = res;
        this.coinsList.sort = this.sort;
        this.loading = false;
      }, error => {
        this.snackBar.open(error, 'OK')
      });
  }

}
