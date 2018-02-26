import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-coin',
  templateUrl: './favorite-coin.component.html',
  styleUrls: ['./favorite-coin.component.scss']
})
export class FavoriteCoinComponent implements OnInit {

  @Input() coinData: any;

  constructor() { }

  ngOnInit() {
  }

}
