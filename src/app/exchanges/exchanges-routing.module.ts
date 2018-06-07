import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangesComponent } from './exchanges.component';
import { ExchangeOverviewComponent } from './pages/exchange-overview/exchange-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangesComponent,
    children: [
      {
        path: ':exchange/:toSymbol',
        component: ExchangeOverviewComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangesRoutingModule { }
