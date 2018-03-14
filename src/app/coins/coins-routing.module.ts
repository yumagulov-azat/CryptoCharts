import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

// Components
import { CoinsComponent } from './coins.component';
import { CoinsListComponent } from './coins-list/coins-list.component';
import { CoinOverviewComponent } from './coin-overview/coin-overview.component';

const routes: Routes = [
  {
    path: '',
    component: CoinsComponent,
    canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        redirectTo: 'list/USD/1'
      },
      {
        path: 'list',
        redirectTo: 'list/USD/1'
      },
      {
        path: 'list/:toSymbol/:page',
        component: CoinsListComponent,
        data: {
          meta: {
            title: 'List | Coins'
          }
        }
      },
      {
        path: ':coinName/:toSymbol',
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
