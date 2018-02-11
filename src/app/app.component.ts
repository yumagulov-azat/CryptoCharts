import { Component } from '@angular/core';
import * as shape from 'd3-shape';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  appNav = [
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
