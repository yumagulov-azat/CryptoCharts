import { Component, OnInit, Input, ElementRef } from '@angular/core';
import * as c3 from 'c3'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() data: any;


  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.data) {
      let chart = c3.generate({
        bindto: '#line-chart',
        data: this.data,
        color: {
          pattern: ['#673ab7', '#E91E63', '#9C27B0']
        },
        legend: {
          show: false
        },
        point: {
          show: false
        },
        size: {
          height: 350
        },
        // axis: {
        //   y: {
        //     max: 13000,
        //     min: 6000,
        //     // Range includes padding, set 0 if no padding needed
        //     // padding: {top:0, bottom:0}
        //   }
        // },
        // subchart: {
        //   show: true
        // }
      });
    }
  }
}
