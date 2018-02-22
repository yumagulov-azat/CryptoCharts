import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';
import * as c3 from 'c3';
import { UtilsService } from '../../../services/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  // Input variables
  @Input() data: any;
  @Input() height = 400;
  @Input() chartColors: Array<any> = ['#673ab7', '#E91E63', '#FF9800', '#4CAF50'];
  @Input() subchart = true;
  @Input() axis: any = {
    y: {
      inner: true,
      tick: {
        count: 6,
        format: (value)=> {
          return this.utils.convertPriceToDisplay('$', value);
        }
      }
    },
    x: {
      padding: 0,
      tick: {
        format: (date) => {
          return moment(new Date(date * 1000)).format('DD MMM YYYY');
        }
      }
    }
  };

  chart: any;
  chartOptions: any;

  constructor(private utils: UtilsService, private el: ElementRef) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (!this.chartOptions) { this.setChartOptions(); }

    console.log(this.data)

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
    // console.log(this.el.nativeElement.children)
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
