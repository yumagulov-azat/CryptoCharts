import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from '../shared/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { FavoriteCoinComponent } from './components/favorite-coin/favorite-coin.component';
import { FavoritesDropDeleteComponent } from './components/favorites-drop-delete/favorites-drop-delete.component';
import { FavoritesEmptyComponent } from './components/favorites-empty/favorites-empty.component';

@NgModule({
  imports: [
    DragulaModule,
    SharedModule,
    FavoritesRoutingModule
  ],
  declarations: [
    FavoritesComponent,
    FavoriteCoinComponent,
    FavoritesDropDeleteComponent,
    FavoritesEmptyComponent
  ]
})
export class FavoritesModule { }
