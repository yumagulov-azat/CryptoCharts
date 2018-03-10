import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FavoritesService } from './favorites.service'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  viewProviders: [ DragulaService ]
})
export class FavoritesComponent implements OnInit {

  coins: Array<any> = [];
  deletedCoins: Array<any> = [];

  coinDeleting: boolean = false; // when coin over delete block
  drag: boolean = false; // when coin draged

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
      this.drag = false;
      this.onDrop();
    });

    dragulaService.over.subscribe((value) => {
      let [e, el, container] = value;
      this.onOver(container)
    });

    dragulaService.cancel.subscribe((value) => {
      this.drag = false;
    });
  }

  ngOnInit() {
    // this.favoritesService.setFavoriteCoins(['BTC', 'DOGE', 'LTC']);

    this.favoritesService.getFavoriteCoins()
      .subscribe((res: any) => {
        this.coins = res;
      });
  }

  /**
   * Save coins sort
   **/
  onDrop(): void {
    this.favoritesService.setFavoriteCoins(this.coins);
  }

  /**
   * On element over bag
   **/
  onOver(container): void {
    if(container.tagName === 'APP-DROP-DELETE') {
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
    this.favoritesService.setFavoriteCoins(this.coins);
  }

}
