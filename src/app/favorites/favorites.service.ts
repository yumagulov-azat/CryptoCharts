import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../shared/services/storage.service';

@Injectable()
export class FavoritesService {

  constructor(private storage: StorageService ) { }

  /**
   * Get all favorite coins
   **/
  getFavoriteCoins(): Observable<any> {
    return this.storage.getItemAsArray('favorites');
  }

  /**
   * Save favorite coins
   * @param coin
   **/
  setFavoriteCoins(coins: Array<any>): void {
    this.storage.setItem('favorites', coins);
  }

  /**
   * Add coin to favorites
   * @param coin
   **/
  addCoin(coin: string): void {
    this.storage.addToArray('favorites', coin);
  }

  /**
   * Delete coin from favorites
   * @param coin
   **/
  deleteCoin(coin: string): void {
    this.storage.removeFromArray('favorites', coin);
  }

  /**
   * Check coin in favorites
   * @param coin
   **/
  checkFavorite(coin: string): boolean {
    return this.storage.checkInArray('favorites', coin);
  }

}
