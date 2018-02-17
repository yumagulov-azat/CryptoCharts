import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  appNav = [
    {
      name: 'Favorits',
      link: '/coins',
      icon: 'star'
    },
    {
      name: 'Coins',
      link: '/coins',
      icon: 'album'
    },
    {
      name: 'Mining',
      link: '/coins',
      icon: 'bubble_chart'
    },
    {
      name: 'About',
      link: '/coins',
      icon: 'info'
    }
  ]
}
