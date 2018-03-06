import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from './modules/app-material/app-material.module';
import { PageModule } from './modules/page/page.module';
import { AppChartsModule } from './modules/app-charts/app-charts.module';
import { ProgressLoadingComponent } from './components/progress-loading/progress-loading.component';
import { CryptoCurrencyPipe } from './pipes/crypto-currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    PageModule,
    AppChartsModule
  ],
  declarations: [
    ProgressLoadingComponent,
    CryptoCurrencyPipe
  ],
  exports: [
    CommonModule,
    AppMaterialModule,
    PageModule,
    AppChartsModule,
    ProgressLoadingComponent,
    CryptoCurrencyPipe
  ]
})
export class SharedModule { }
