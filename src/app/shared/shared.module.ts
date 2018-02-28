import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from './modules/app-material/app-material.module';
import { PageModule } from './modules/page/page.module';
import { AppChartsModule } from './modules/app-charts/app-charts.module';
import { ProgressLoadingComponent } from './components/progress-loading/progress-loading.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    PageModule,
    AppChartsModule
  ],
  declarations: [
    ProgressLoadingComponent
  ],
  exports: [
    CommonModule,
    AppMaterialModule,
    PageModule,
    AppChartsModule,
    ProgressLoadingComponent
  ]
})
export class SharedModule { }
