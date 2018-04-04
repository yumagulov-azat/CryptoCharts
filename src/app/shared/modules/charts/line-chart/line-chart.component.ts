import { Component, OnInit, OnChanges, Input, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

// 3rd
import * as c3 from 'c3';
import * as moment from 'moment';

// Services
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {


  @Input() data: any;
  @Input() height: number = 400;
  @Input() chartColors: Array<any> = ['#673ab7', '#E91E63', '#FF9800', '#4CAF50'];
  @Input() subchart: boolean = true;
  @Input() toSymbolDisplay: string = '$';
  @Input() showY: boolean = true;
  @Input() showX: boolean = true;
  @Input() axis: any;

  chart: any;

  constructor(private utils: UtilsService,
              private el: ElementRef,
              @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit() {

  }

  /**
   * Generate chart or reload data on changes
   */
  ngOnChanges() {
    // Stop render if platform is server
    if (isPlatformServer(this.platformId)) return;
    if (!this.data) return;

    // Prepare chart axis options
    if (!this.axis) {
      this.axis = {
        y: {
          show: this.showY,
          inner: true,
          tick: {
            count: 6,
            format: (value) => {
              return this.utils.convertPriceToDisplay(this.toSymbolDisplay + ' ', value);
            }
          }
        },
        x: {
          show: this.showX,
          padding: 0,
          tick: {
            format: (date) => {
              return moment(new Date(date * 1000)).format('DD MMM YYYY, HH:mm');
            }
          }
        }
      };
    }

    // Render chart
    if (this.chart) {
      this.chart.load(this.data);
    } else {
      this.chart = c3.generate(this.chartOptions);
    }
  }

  /**
   * Chart options for c3
   */
  get chartOptions(): any {
    return {
      bindto: this.el.nativeElement.children[0],
      data: this.data || [],
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
    }
  }

}
