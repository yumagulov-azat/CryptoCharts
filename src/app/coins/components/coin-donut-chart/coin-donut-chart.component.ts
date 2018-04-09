import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-coin-donut-chart',
  templateUrl: './coin-donut-chart.component.html',
  styleUrls: ['./coin-donut-chart.component.scss']
})
export class CoinDonutChartComponent implements OnInit, OnChanges {

  @Input() chartData: any;
  @Input() title: string = '';

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {

  }

}
