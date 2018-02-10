import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
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

  isLoaded: boolean = false;

  // Data-table
  displayedColumns = ['position', 'name', 'price', 'dayChange', 'marketCap'];
  coinsList = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private coinsService: CoinsService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initTable();
  }

  /**
   * Get coins list and past data to data-table
   */
  initTable(): void {
    this.coinsService.getSortedCoinsList()
      .subscribe(coins => {
        this.coinsService.getCoinsFullData(coins)
          .subscribe(res => {
            // Past data to data
            this.coinsList.data = res;
            this.coinsList.sort = this.sort;
            this.isLoaded = true;
          });
      });
  }

}
