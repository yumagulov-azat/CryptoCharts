import { Component, OnInit } from '@angular/core';
import { FavoritesService } from './favorites.service'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.favoritesService.setFavoriteCoins(['BTC', 'ETH']);

    this.favoritesService.getFavoriteCoins('BTC')
      .subscribe((res: any) => {
        console.log(res)
      });
  }

}
