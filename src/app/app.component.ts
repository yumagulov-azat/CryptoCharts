import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'app';

  appNav: Array<any> = [
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
      name: 'Mining',
      link: '/mining',
      icon: 'bubble_chart'
    },
    {
      name: 'About',
      link: '/coins',
      icon: 'info'
    }
  ];
}
