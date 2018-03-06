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
          meta: {
            title: 'List | Coins'
          }
        }
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
