import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  title: string = 'All coins';

  public showBackButton: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    // this.route
    // console.log(this.route)
  }

}
