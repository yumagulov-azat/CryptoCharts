import { Component } from '@angular/core';

import { CoinsService } from './coins/coins.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appNav: AppNav[];

  constructor(
    private coinsService: CoinsService
  ) {
    this.coinsService.toSymbol.subscribe(res => {
      this.appNav = [
        {
          name: 'Favorites',
          link: '/favorites',
          icon: 'star'
        },
        {
          name: 'Coins',
          link: '/coins/list/' + (res || 'USD') + '/1',
          icon: 'album'
        },
        {
          name: 'Exchanges',
          link: '/exchanges',
          icon: 'compare_arrows'
        },
        {
          name: 'News',
          link: '/news',
          icon: 'view_list'
        }
      ]
    });
  }
}

export interface AppNav {
  name: string;
  link: string;
  icon: string;
}
