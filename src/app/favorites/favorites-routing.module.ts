import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

// Components
import { FavoritesComponent } from './favorites.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Favorites'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
