import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../modules/app-material/app-material.module';
import { PageModule } from '../modules/page/page.module';

import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsService } from './coins.service';

import { CoinsComponent } from './coins.component';
import { CoinsNavComponent } from './coins-nav/coins-nav.component';
import { CoinsListComponent } from './coins-list/coins-list.component';
import { CoinOverviewComponent } from './coin-overview/coin-overview.component';

@NgModule({
  imports: [
    CommonModule,
    CoinsRoutingModule,
    AppMaterialModule,
    PageModule
  ],
  declarations: [
    CoinsComponent,
    CoinsNavComponent,
    CoinsListComponent,
    CoinOverviewComponent
  ],
  exports: [
    CoinsComponent
  ],
  providers: [
    CoinsService
  ]
})
export class CoinsModule { }
