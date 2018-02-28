import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'coins',
    pathMatch: 'full'
  },
  {
    path: 'favorites',
    loadChildren: 'app/favorites/favorites.module#FavoritesModule'
  },
  {
    path: 'coins',
    loadChildren: 'app/coins/coins.module#CoinsModule'
  },
  {
    path: 'exchanges',
    loadChildren: 'app/exchanges/exchanges.module#ExchangesModule'
  },
  {
    path: 'mining',
    loadChildren: 'app/mining/mining.module#MiningModule'
  },
  {
    path: 'news',
    loadChildren: 'app/news/news.module#NewsModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
