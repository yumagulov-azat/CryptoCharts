import { Component, OnInit, Input, ElementRef } from '@angular/core';
import * as c3 from 'c3'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() data: any;


  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.data) {
      let chart = c3.generate({
        bindto: '#line-chart',
        data: this.data
      });
    }
  }
}
