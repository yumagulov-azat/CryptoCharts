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
    path: 'mining',
    loadChildren: 'app/mining/mining.module#MiningModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
