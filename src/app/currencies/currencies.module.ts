import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies.component';
import { CurrenciesService } from './currencies.service';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { CurrenciesNavComponent } from './currencies-nav/currencies-nav.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    CurrenciesRoutingModule
  ],
  declarations: [
    CurrenciesComponent,
    CurrenciesListComponent,
    CurrencyDetailComponent,
    CurrenciesNavComponent
  ],
  exports: [
    CurrenciesComponent
  ],
  providers: [
    CurrenciesService
  ]
})
export class CurrenciesModule { }
