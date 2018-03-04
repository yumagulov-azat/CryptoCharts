import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { find } from 'lodash';

// Models
import { ChartFilter } from '../shared/models/chart-filter';


/**
 * Coin price history chart component
 */

@Component({
  selector: 'app-coin-chart',
  templateUrl: './coin-chart.component.html',
  styleUrls: ['./coin-chart.component.scss']
})
export class CoinChartComponent implements OnInit, OnChanges {

  @Input() chartDataInput: any;
  @Input() chartData: any;
  @Input() coinName: string;
  @Input() showToolbar: boolean = true;
  @Output() filterChanged: EventEmitter<ChartFilter> = new EventEmitter();

  chartFilterForm = new FormGroup ({
    chartPeriod: new FormControl(30),
    chartDataShow: new FormControl(['close'])
  });

  // Chart series select
  chartDataList: Array<any> = [
    {value: 'close', viewValue: 'Close'},
    {value: 'open', viewValue: 'Open'},
  ];

  // Chart period select
  chartPeriodList: Array<any> = [
    {value: 59, viewValue: '1 hour', type: 'histominute'},
    {value: 23, viewValue: '1 day', type: 'histohour'},
    {value: 6, viewValue: '1 week', type: 'histoday'},
    {value: 30, viewValue: '1 month', type: 'histoday'},
    {value: 90, viewValue: '3 month', type: 'histoday'},
    {value: 180, viewValue: '6 month', type: 'histoday'},
    {value: 364, viewValue: '1 year', type: 'histoday'}
  ];


  constructor() { }

  ngOnInit() {
    this.chartFilterForm.valueChanges
      .subscribe(res => {
        const filter: ChartFilter = {
          period: res.chartPeriod,
          periodType: find(this.chartPeriodList, { 'value': res.chartPeriod}).type,
          data: res.chartDataShow,
        }
        this.filterChanged.emit(filter);
      });
  }

  ngOnChanges() {
    this.prepareChartData();
  }

  /**
   * Prepare data for chart
   */
  prepareChartData(): void {
    this.chartData = {
      json: this.chartDataInput,
      keys: {
        x: 'time',
        value: this.chartFilterForm.get('chartDataShow').value,
      },
      type: 'area-spline'
    }
  }

  test(): void {
    console.log('v test')
  }
}
