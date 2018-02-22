import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart/line-chart.component';
import { SparklineComponent } from './sparkline/sparkline.component';

@NgModule({
  imports: [],
  declarations: [
    LineChartComponent,
    SparklineComponent
  ],
  exports: [
    LineChartComponent,
    SparklineComponent
  ]
})
export class AppChartsModule { }
