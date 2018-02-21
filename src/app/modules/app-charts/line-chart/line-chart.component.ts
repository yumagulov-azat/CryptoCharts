import { Component, OnInit, Input, ElementRef } from '@angular/core';
import * as c3 from 'c3';
import { CCC } from '../../../../utilities/ccc-streamer-utilities';
import * as moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() data: any;

  chart: any;
  chartColors: Array<any> = ['#673ab7', '#E91E63', '#FF9800', '#4CAF50'];
  chartOptions: any = {
    bindto: '#line-chart',
    data: this.data,
    size: {
      height: 400
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
    axis: {
      y: {
        inner: true,
        tick: {
          count: 6,
          format: function (value) {
            return CCC.convertValueToDisplay('$', value);
          }
        }
      },
      x: {
        padding: 0,
        tick: {
          format: function (date) {
            return moment(new Date(date * 1000)).format('YYYY-MM-DD')
          }
        }
      }
    },
    area: {
      zerobased: false
    },
    subchart: {
      show: true,
      size: {
        height: 50
      }
    },
    transition: {
      duration: 300
    }
  }

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.chartOptions.data = this.data;
    console.log(this.data)
    if(this.data) {
      if(this.chart) {
        this.chart.load(this.data);
      } else {
        this.chart = c3.generate(this.chartOptions);
      }
    }
  }
}
