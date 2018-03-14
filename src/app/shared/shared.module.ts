import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from './modules/material/material.module';
import { PageModule } from './modules/page/page.module';
import { ChartsModule } from './modules/charts/charts.module';

// Components
import { LoadingComponent } from './components/loading/loading.component';
import { SymbolSelectComponent } from './components/symbol-select/symbol-select.component';

// Pipes
import { CryptoCurrencyPipe } from './pipes/crypto-currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PageModule,
    ChartsModule
  ],
  declarations: [
    LoadingComponent,
    CryptoCurrencyPipe,
    SymbolSelectComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    PageModule,
    ChartsModule,
    LoadingComponent,
    CryptoCurrencyPipe,
    SymbolSelectComponent
  ]
})
export class SharedModule { }
