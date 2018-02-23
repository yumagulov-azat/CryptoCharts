import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  toolbarTitle = 'All coins';

  public showBackButton = false;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {

  }

  ngOnChanges() {

  }

}
