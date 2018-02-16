import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoinsComponent } from './coins.component';
import { CoinsListComponent } from './coins-list/coins-list.component';
import { CoinOverviewComponent } from './coin-overview/coin-overview.component';

const routes: Routes = [
  {
    path: '',
    component: CoinsComponent,
    data: {
      coins: ''
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CoinsListComponent
      },
      {
        path: ':name',
        component: CoinOverviewComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }
