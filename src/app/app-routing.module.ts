import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'coins',
    pathMatch: 'full',
  },
  {
    path: 'favorites',
    loadChildren: 'app/favorites/favorites.module#FavoritesModule',
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Favorites'
      }
    }
  },
  {
    path: 'coins',
    loadChildren: 'app/coins/coins.module#CoinsModule',
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Coins'
      }
    }
  },
  {
    path: 'exchanges',
    loadChildren: 'app/exchanges/exchanges.module#ExchangesModule',
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Exchanges'
      }
    }
  },
  {
    path: 'news',
    loadChildren: 'app/news/news.module#NewsModule',
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'News'
      }
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { initialNavigation: 'enabled' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
