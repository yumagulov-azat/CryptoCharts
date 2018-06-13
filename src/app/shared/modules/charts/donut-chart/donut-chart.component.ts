import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  Inject,
  PLATFORM_ID,
  NgZone,
  AfterViewInit
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import * as c3 from 'c3';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() data: Array<any>;
  @Input() chartColors: Array<any> = ['#b39ddb', '#f48fb1', '#ffab91', '#a5d6a7', '#80cbc4', '#ff8a65', '#ffd54f'];

  chart: any;
  oldData: Array<any> = [];

  constructor(private el: ElementRef,
              private zone: NgZone,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    // Stop render if platform is server
    if (isPlatformServer(this.platformId) || !this.data) return;

    // Render chart
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.load({
          columns: this.data
        });
        this.chart.unload(this.unloadData);
      } else {
        this.chart = c3.generate(this.chartOptions);
      }
    });

    this.oldData = this.data;
  }

  /**
   * Chart options for c3
   */
  get chartOptions(): any {
    return {
      bindto: this.el.nativeElement.children[0],
      data: {
        columns: this.data,
        type: 'donut',
      },
      color: {
        pattern: this.chartColors
      },
      legend: {
        // show: false
      },
      transition: {
        duration: 600
      }
    };
  }

  ngAfterViewInit() {
    // Hack :(
    // C3js not show chart after ssr
    if (!isPlatformServer(this.platformId)) {
      setTimeout(() => {
        this.chart.resize();
      }, 100);
    }
  }

  /**
   * Return data columns for unload
   * @returns {Array}
   */
  get unloadData(): Array<string> {
    const columns: Array<string> = [];

    this.oldData.forEach((oldItem) => {
      const some = this.data.some((newItem) => newItem[0] === oldItem[0] );

      if (!some) {
        columns.push(oldItem[0]);
      }
    });

    return columns;
  }

}
