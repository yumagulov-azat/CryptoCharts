import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './modules/material/material.module';
import { PageModule } from './modules/page/page.module';
import { ChartsModule } from './modules/charts/charts.module';
import { ProgressLoadingComponent } from './components/progress-loading/progress-loading.component';
import { CryptoCurrencyPipe } from './pipes/crypto-currency.pipe';
import { SymbolSelectComponent } from './components/symbol-select/symbol-select.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PageModule,
    ChartsModule
  ],
  declarations: [
    ProgressLoadingComponent,
    CryptoCurrencyPipe,
    SymbolSelectComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    PageModule,
    ChartsModule,
    ProgressLoadingComponent,
    CryptoCurrencyPipe,
    SymbolSelectComponent
  ]
})
export class SharedModule { }
