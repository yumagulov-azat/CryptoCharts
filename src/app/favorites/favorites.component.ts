import { Component, OnInit } from '@angular/core';
import { FavoritesService } from './favorites.service'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  coins: Array<any> = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.favoritesService.setFavoriteCoins(['BTC', 'ETH', 'LTC', 'XRP']);

    this.favoritesService.getFavoriteCoins()
      .subscribe((res: any) => {
        this.coins = res;
      });
  }

}
