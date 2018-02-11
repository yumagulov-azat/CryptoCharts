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
    this.getCoinsList();
  }

  /**
   * Get coins list then sort and push
   */
  getCoinsList(): void {
    this.coinsService.getCoinsList()
      .subscribe(res => {
        this.coinsList = res;
      });
  }

}
