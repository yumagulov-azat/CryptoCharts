import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FavoritesService } from './favorites.service'
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  viewProviders: [DragulaService],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100px)', opacity: 0}),
          animate('0.6s cubic-bezier(0.075, 0.82, 0.165, 1)', style({transform: 'translateY(0)', opacity: 1}))
        ])
      ]
    )
  ]
})
export class FavoritesComponent implements OnInit {

  coins: Array<any>;
  deletedCoins: Array<any> = [];

  coinDeleting: boolean = false; // when coin enter delete block
  drag: boolean = false; // when coin draged

  toSymbol: string = 'USD';
  toSymbols: Array<string> = [
    "USD",
    "RUB",
    "BTC",
    "ETH",
    "EUR",
    "GBP",
    "JPY",
    "KRW",
  ]

  constructor(private favoritesService: FavoritesService, private dragulaService: DragulaService) {
    dragulaService.setOptions('favorites-coins-bag', {
      moves: function (el, container, handle) {
        return handle.classList.contains('favorite-coin__drag-handle');
      }
    });

    dragulaService.drag.subscribe((value) => {
      this.drag = true;
    });

    dragulaService.dropModel.subscribe((value) => {
      this.onDrop();
    });

    dragulaService.over.subscribe((value) => {
      this.onOver(value);
    });

    dragulaService.cancel.subscribe((value) => {
      this.drag = false;
    });
  }

  ngOnInit() {
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
   **/
  onOver(value): void {
    let [e, el, container] = value;

    if (container.tagName === 'APP-DROP-DELETE') {
      this.coinDeleting = true;
    } else {
      this.coinDeleting = false;
    }
  }

  /**
   * Delete coin from favorites
   **/
  deleteCoin(coinName): void {
    this.coins.splice(this.coins.indexOf(coinName), 1);
    this.favoritesService.deleteCoin(coinName);
  }

  /**
   *
   */
  updateCoins(toSymbol): void {

  }

}
