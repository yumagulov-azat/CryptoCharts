import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  title = 'All coins';

  public showBackButton = false;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    // this.route
    // console.log(this.route)
  }

}
