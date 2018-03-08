import { Component, OnInit, OnChanges, Input, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UtilsService } from '../../../services/utils.service';
import * as c3 from 'c3';
import * as moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  // Input variables
  @Input() data: any;
  @Input() height: number = 400;
  @Input() chartColors: Array<any> = ['#673ab7', '#E91E63', '#FF9800', '#4CAF50'];
  @Input() subchart: boolean = true;
  @Input() toSymbolDisplay: string = '$';
  @Input() axis: any = {
    y: {
      inner: true,
      tick: {
        count: 6,
        format: (value)=> {
          return this.utils.convertPriceToDisplay(this.toSymbolDisplay + ' ', value);
        }
      }
    },
    x: {
      padding: 0,
      tick: {
        format: (date) => {
          return moment(new Date(date * 1000)).format('DD MMM YYYY, HH:mm');
        }
      }
    }
  };

  chart: any;
  chartOptions: any;

  constructor(private utils: UtilsService, private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.chartOptions) { this.setChartOptions(); }
      this.chartOptions.data = this.data;

      if (this.data) {
        if (this.chart) {
          this.chart.load(this.data);
        } else {
          this.chart = c3.generate(this.chartOptions);
        }
      }
    }
  }

  setChartOptions(): void {
    this.chartOptions = {
      bindto: this.el.nativeElement.children[0],
      data: [],
      size: {
        height: this.height
      },
      color: {
        pattern: this.chartColors
      },
      legend: {
        show: false
      },
      point: {
        r: 0,
        focus: {
          expand: {
            r: 4
          }
        }
      },
      axis: this.axis,
      area: {
        zerobased: false
      },
      subchart: {
        show: this.subchart,
        size: {
          height: 50
        }
      }
    };
  }

}
