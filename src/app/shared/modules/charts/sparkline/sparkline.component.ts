import { Component, OnInit, OnChanges, Input, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { UtilsService } from '../../../services/utils.service';
import * as c3 from 'c3';
import * as moment from 'moment';

@Component({
  selector: 'app-sparkline',
  templateUrl: './sparkline.component.html',
  styleUrls: ['./sparkline.component.scss']
})
export class SparklineComponent implements OnInit, OnChanges {

  // Input variables
  @Input() data: any;
  @Input() height: number = 50;
  @Input() width: number = 200;
  @Input() colors: Array<string> = ['#673ab7', '#E91E63', '#FF9800', '#4CAF50'];
  @Input() toSymbolDisplay: string = '$';

  chart: any;

  constructor(private utils: UtilsService,
              private el: ElementRef,
              @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit() {

  }

  /**
   * Generate sparkline chart or reload data on changes
   */
  ngOnChanges() {
    // Stop render if platform is server
    if (isPlatformServer(this.platformId)) return;
    if (!this.data) return;

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
        height: this.height,
        width: this.width,
      },
      color: {
        pattern: this.colors
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
            format: (value) => {
              return this.utils.convertPriceToDisplay(this.toSymbolDisplay + ' ', value);
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
