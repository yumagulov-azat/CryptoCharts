import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
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
  displayedColumns = ['position', 'name', 'price', 'marketCap', 'changePct24Hour', 'weekHistory'];
  coinsList = new MatTableDataSource();
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
   */
  getCoinsList(limit: number = 50, page: number = 0): void {
    this.loading = true;

    this.coinsService.getCoinsListFullData(limit, page)
      .subscribe(res => {
        this.coinsList.data = res;
        this.coinsList.sort = this.sort;
        this.loading = false;
      }, error => {
        this.snackBar.open('API Error', 'OK');
        this.loading = false;
      });
  }

}
