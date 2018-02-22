import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';
import * as c3 from 'c3';
import { UtilsService } from '../../../services/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sparkline',
  templateUrl: './sparkline.component.html',
  styleUrls: ['./sparkline.component.scss']
})
export class SparklineComponent implements OnInit {

  // Input variables
  @Input() data: any;
  @Input() height = 50;
  @Input() width = 200;

  chart: any;
  chartOptions: any;

  constructor(private utils: UtilsService, private el: ElementRef) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
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

  setChartOptions(): void {
    this.chartOptions = {
      bindto: this.el.nativeElement.children[0],
      data: [],
      size: {
        height: this.height,
        width: this.width,
      },
      color: {
        pattern: ['#673ab7', '#E91E63', '#FF9800', '#4CAF50']
      },
      legend: {
        show: false
      },
      point: {
        r: 0,
        focus: {
          expand: {
            r: 3
          }
        }
      },
      axis: {
        y: {
          show: false,
          tick: {
            format: (value)=> {
              return this.utils.convertPriceToDisplay('$', value);
            }
          }
        },
        x: {
          show: false,
          tick: {
            format: (date) => {
              return moment(new Date(date * 1000)).format('DD MMM') + ':';
            }
          }
        }
      },
      area: {
        zerobased: false
      },
    };
  }

}
