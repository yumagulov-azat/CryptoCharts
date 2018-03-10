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
  drag: boolean = false;

  constructor(private favoritesService: FavoritesService, private dragulaService: DragulaService) {
    dragulaService.setOptions('favorites-coins-bag', {
      moves: function (el, container, handle) {
        console.log(handle.className)
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

    dragulaService.cancel.subscribe((value) => {
      this.drag = false;
    });
  }

  ngOnInit() {

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

}
