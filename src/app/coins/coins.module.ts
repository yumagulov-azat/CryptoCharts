import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsService } from './coins.service';

import { CoinsComponent } from './coins.component';
import { CoinsNavComponent } from './coins-nav/coins-nav.component';
import { CoinsListComponent } from './coins-list/coins-list.component';
import { CoinOverviewComponent } from './coin-overview/coin-overview.component';

@NgModule({
  imports: [
    SharedModule,
    CoinsRoutingModule,
  ],
  declarations: [
    CoinsComponent,
    CoinsNavComponent,
    CoinsListComponent,
    CoinOverviewComponent,
  ],
  exports: [
    CoinsComponent
  ],
  providers: [
    CoinsService
  ]
})
export class CoinsModule { }
