import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CoinsRoutingModule } from './coins-routing.module';

// Components
import { CoinsComponent } from './coins.component';
import { CoinsNavComponent } from './coins-nav/coins-nav.component';
import { CoinsListComponent } from './coins-list/coins-list.component';
import { CoinOverviewComponent } from './coin-overview/coin-overview.component';
import { CoinChartComponent } from './coin-chart/coin-chart.component';

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
    CoinChartComponent,
  ],
  exports: [
    CoinsComponent
  ],
  providers: []
})
export class CoinsModule { }
