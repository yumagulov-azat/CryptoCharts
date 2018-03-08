import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesService } from './favorites.service';
import { FavoritesComponent } from './favorites.component';
import { FavoriteCoinComponent } from './favorite-coin/favorite-coin.component';

@NgModule({
  imports: [
    SharedModule,
    FavoritesRoutingModule
  ],
  declarations: [
    FavoritesComponent,
    FavoriteCoinComponent
  ],
  providers: [
    FavoritesService
  ]
})
export class FavoritesModule { }
