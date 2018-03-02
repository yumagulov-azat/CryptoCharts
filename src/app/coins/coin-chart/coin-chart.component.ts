import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';


/**
 * Coin price history chart component
 */

@Component({
  selector: 'app-coin-chart',
  templateUrl: './coin-chart.component.html',
  styleUrls: ['./coin-chart.component.scss']
})
export class CoinChartComponent implements OnInit, OnChanges {

  @Input() chartData: any;
  @Input() coinName: string;
  @Input() showToolbar: boolean = true;

  // Chart data select
  chartDataFilter: Array<any> = [
    {value: 'close', viewValue: 'Close'},
    {value: 'open', viewValue: 'Open'},
  ];
  chartDataFilterSelected: Array<any> = ['close'];

  // Chart period select
  chartPeriods: Array<any> = [
    {value: 59, viewValue: '1 hour', type: 'histominute'},
    {value: 23, viewValue: '1 day', type: 'histohour'},
    {value: 6, viewValue: '1 week', type: 'histoday'},
    {value: 30, viewValue: '1 month', type: 'histoday'},
    {value: 90, viewValue: '3 month', type: 'histoday'},
    {value: 180, viewValue: '6 month', type: 'histoday'},
    {value: 364, viewValue: '1 year', type: 'histoday'}
  ];
  chartPeriodsSelected: number = 30;


  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {

  }

}
