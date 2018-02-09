import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrenciesComponent } from './currencies.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component'

const currenciesRoutes: Routes = [
  {
    path: '',
    component: CurrenciesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CurrenciesListComponent
      },
      {
        path: ':id',
        component: CurrencyDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(currenciesRoutes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule { }
