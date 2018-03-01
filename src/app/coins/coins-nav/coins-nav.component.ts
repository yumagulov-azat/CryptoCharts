import { Component, OnInit, Input } from '@angular/core';

/**
 * Coins page nav
 */

@Component({
  selector: 'app-coins-nav',
  templateUrl: './coins-nav.component.html',
  styleUrls: ['./coins-nav.component.scss']
})
export class CoinsNavComponent implements OnInit {

  @Input() coinsList: Array<any> = [];

  constructor() {
  }

  ngOnInit() {

  }
}
