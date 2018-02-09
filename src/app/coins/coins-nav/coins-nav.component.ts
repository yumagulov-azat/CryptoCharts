import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CoinsService } from '../coins.service';

/**
* Coins page nav
*/

@Component({
  selector: 'coins-nav',
  templateUrl: './coins-nav.component.html',
  styleUrls: ['./coins-nav.component.scss']
})
export class CoinsNavComponent implements OnInit {

  coinsList = [];

  constructor(private coinsService: CoinsService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCoinsList();
  }

  /**
   * Get coins list then sort and push
   */
  getCoinsList(): void {
    this.coinsService.getCoinsList()
      .subscribe(result => {
        if(result.Data) {
          // Result object to array
          Object.keys(result.Data).forEach(key => {
            this.coinsList.push(result.Data[key]);
          });

          // Sort coinsList
          this.coinsList.sort((a, b) => {
              return a.SortOrder-b.SortOrder
          });
        },
        error => {
          console.log('error')
          this.snackBar.open('API error. Reload page.', 'OK');
        }
      });
  }

}
