import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoinsComponent } from './coins.component';
import { CoinsListComponent } from './coins-list/coins-list.component';
import { CoinOverviewComponent } from './coin-overview/coin-overview.component';

const routes: Routes = [
  {
    path: '',
    component: CoinsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list/1'
      },
      {
        path: 'list',
        redirectTo: 'list/1'
      },
      {
        path: 'list/:page',
        component: CoinsListComponent,
        data: {
          title: 'All coins'
        }
      },
      {
        path: ':name',
        component: CoinOverviewComponent,
        data: {
          title: 'Coin'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }
