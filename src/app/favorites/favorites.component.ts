import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FavoritesService } from './favorites.service';
import { animate } from '@angular/animations';
import { HistoryLimit } from '@app/coins/models/history-limit';

import { CoinsService } from '@app/coins/coins.service';

import { slideInUp } from '@app/shared/animations/slide-in-up';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  viewProviders: [DragulaService],
  animations: [slideInUp()]
})
export class FavoritesComponent implements OnInit {

  coins: Array<any>;
  deletedCoins: Array<any> = [];

  coinDeleting: boolean = false; // when coin enter delete block
  drag: boolean = false; // when coin draged

  toSymbol: string = 'USD';

  historyLimits: HistoryLimit[] = [
    {value: 59, viewValue: '1 hour', type: 'histominute'},
    {value: 23, viewValue: '1 day', type: 'histohour'},
    {value: 6, viewValue: '1 week', type: 'histoday'},
    {value: 30, viewValue: '1 month', type: 'histoday'},
    {value: 90, viewValue: '3 month', type: 'histoday'},
    {value: 180, viewValue: '6 month', type: 'histoday'},
    {value: 364, viewValue: '1 year', type: 'histoday'}
  ];
  historyLimit: HistoryLimit = this.historyLimits[3];

  constructor(
    private favoritesService: FavoritesService,
    private dragulaService: DragulaService,
    private coinsService: CoinsService
  ) {
    dragulaService.setOptions('favorites-coins-bag', {
      moves: function (el, container, handle) {
        return handle.classList.contains('favorite-coin__drag-handle');
      }
    });

    // Set drag true for animation
    dragulaService.drag.subscribe((value) => {
      this.drag = true;
    });

    // Save sorting when drop
    dragulaService.dropModel.subscribe((value) => {
      this.onDrop();
    });

    // Check bag
    dragulaService.over.subscribe((value) => {
      this.onOver(value);
    });

    dragulaService.cancel.subscribe((value) => {
      this.drag = false;
    });
  }

  ngOnInit() {
    this.coinsService.toSymbol.subscribe(res => {
      if(res) {
        this.toSymbol = res;
      }
    });

    this.favoritesService.getFavoriteCoins()
      .subscribe((res: any) => {
        if (res) {
          this.coins = res;
        }
      });
  }

  /**
   * Save coins sorting
   **/
  onDrop(): void {
    this.drag = false;
    this.favoritesService.setFavoriteCoins(this.coins);
  }

  /**
   * On element over bag
   * @param value
   */
  onOver(value): void {
    const [e, el, container] = value;

    if (container.tagName === 'APP-FAVORITES-DROP-DELETE') {
      this.coinDeleting = true;
    } else {
      this.coinDeleting = false;
    }
  }

  /**
   * Delete coin from favorites
   * @param coinName
   */
  deleteCoin(coinName): void {
    this.coins.splice(this.coins.indexOf(coinName), 1);
    this.favoritesService.deleteCoin(coinName);
  }

  /**
   * When toSymbol chaged
   * @param toSymbol
   */
  toSymbolChanged(toSymbol: string): void {
    this.toSymbol = toSymbol;
    this.coinsService.toSymbol.next(this.toSymbol);
  }

}
