import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from '../shared/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesService } from './favorites.service';
import { FavoritesComponent } from './favorites.component';
import { FavoriteCoinComponent } from './favorite-coin/favorite-coin.component';
import { DropDeleteComponent } from './drop-delete/drop-delete.component';

@NgModule({
  imports: [
    DragulaModule,
    SharedModule,
    FavoritesRoutingModule
  ],
  declarations: [
    FavoritesComponent,
    FavoriteCoinComponent,
    DropDeleteComponent
  ],
  providers: [
    FavoritesService
  ]
})
export class FavoritesModule { }
