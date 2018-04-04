import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// Models
import { ChartFilter } from '../../models/chart-filter.model';
import { HistoryLimit } from '../../models/history-limit';


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
  @Input() coinSymbol: string;
  @Input() toSymbol: string;
  @Input() toSymbolDisplay = '$';
  @Input() showToolbar = true;
  @Input() filter: ChartFilter;
  @Output() filterChanged: EventEmitter<ChartFilter> = new EventEmitter();

  // chartDataShow options
  chartDataList: chartDataList[] = [
    {value: 'close', viewValue: 'Close'},
    {value: 'open', viewValue: 'Open'},
  ];

  // chartPeriod options
  historyLimits: HistoryLimit[] = [
    {value: 59, viewValue: '1 hour', type: 'histominute'},
    {value: 23, viewValue: '1 day', type: 'histohour'},
    {value: 6, viewValue: '1 week', type: 'histoday'},
    {value: 30, viewValue: '1 month', type: 'histoday'},
    {value: 90, viewValue: '3 month', type: 'histoday'},
    {value: 180, viewValue: '6 month', type: 'histoday'},
    {value: 364, viewValue: '1 year', type: 'histoday'}
  ];

  // Form group for chart filter
  chartFilterForm = new FormGroup({
    historyLimit: new FormControl(this.historyLimits[3]),
    chartDataShow: new FormControl(['close'])
  });


  constructor() {
  }

  ngOnInit() {
    // Emit filterChanged when chartFilter changed
    this.chartFilterForm.valueChanges
      .subscribe(res => {
        const filter: ChartFilter = {
          period: res.historyLimit.value,
          periodType: res.historyLimit.type,
          data: res.chartDataShow,
        };
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
    };
  }
}

export interface chartDataList {
  value: string;
  viewValue: string;
}
