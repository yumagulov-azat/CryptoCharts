import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../shared/modules/app-material/app-material.module';
import { PageModule } from '../shared/modules/page/page.module';
import { AppChartsModule } from '../shared/modules/app-charts/app-charts.module';
import { ProgressLoadingComponent } from '../shared/components/progress-loading/progress-loading.component';

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
    PageModule,
    AppChartsModule,
  ],
  declarations: [
    CoinsComponent,
    CoinsNavComponent,
    CoinsListComponent,
    CoinOverviewComponent,
    ProgressLoadingComponent
  ],
  exports: [
    CoinsComponent
  ],
  providers: [
    CoinsService
  ]
})
export class CoinsModule { }
