import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { LineChartComponent } from './line-chart/line-chart.component';
import { SparklineComponent } from './sparkline/sparkline.component';

@NgModule({
  imports: [
    MatProgressSpinnerModule
  ],
  declarations: [
    LineChartComponent,
    SparklineComponent
  ],
  exports: [
    LineChartComponent,
    SparklineComponent
  ]
})
export class ChartsModule { }
