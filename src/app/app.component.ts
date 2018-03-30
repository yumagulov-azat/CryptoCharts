import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appNav: AppNav[] = [
    {
      name: 'Favorites',
      link: '/favorites',
      icon: 'star'
    },
    {
      name: 'Coins',
      link: '/coins',
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
  ];
}

export interface AppNav {
  name: string;
  link: string;
  icon: string;
}
