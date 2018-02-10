import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CoinsService } from './coins.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  title: string = 'All coins';
  coinsList = [];

  constructor(private coinsService: CoinsService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSortedCoinsList();
  }

  /**
   * Get coins list then sort and push
   */
  getSortedCoinsList(): void {
    this.coinsService.getSortedCoinsList()
      .subscribe(res => {
        this.coinsList = res;
      });
  }

}
