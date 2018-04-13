import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { LineChartComponent } from './line-chart/line-chart.component';
import { SparklineComponent } from './sparkline/sparkline.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';

@NgModule({
  imports: [
    MatProgressSpinnerModule
  ],
  declarations: [
    LineChartComponent,
    SparklineComponent,
    DonutChartComponent
  ],
  exports: [
    LineChartComponent,
    SparklineComponent,
    DonutChartComponent
  ]
})
export class ChartsModule { }
