import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../shared/services/storage.service';

@Injectable()
export class FavoritesService {

  constructor(private storage: StorageService ) { }

  getFavoriteCoins(): Observable<any> {
    return this.storage.getItem('favorites')
      .map(res => {
        return res.split(',')
      })
  }

  setFavoriteCoins(coins: Array<any>): void {
    this.storage.setItem('favorites', coins);
  }

  addCoin(coin: string): void {

  }

}
