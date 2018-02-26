import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesService } from './favorites.service';
import { FavoritesComponent } from './favorites.component';
import { FavoriteCoinComponent } from './favorite-coin/favorite-coin.component';

@NgModule({
  imports: [
    CommonModule,
    FavoritesRoutingModule
  ],
  declarations: [FavoritesComponent, FavoriteCoinComponent],
  providers: [
    FavoritesService
  ]
})
export class FavoritesModule { }
