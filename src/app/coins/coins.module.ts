import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { SharedModule } from '../shared/shared.module';
import { CoinsRoutingModule } from './coins-routing.module';

// Components
import { CoinsComponent } from './coins.component';
import { CoinsListComponent } from './pages/coins-list/coins-list.component';
import { CoinOverviewComponent } from './pages/coin-overview/coin-overview.component';
import { CoinsNavComponent } from './components/coins-nav/coins-nav.component';
import { CoinChartComponent } from './components/coin-chart/coin-chart.component';
import { CoinDonutChartComponent } from './components/coin-donut-chart/coin-donut-chart.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CoinsRoutingModule,
  ],
  declarations: [
    CoinsComponent,
    CoinsNavComponent,
    CoinsListComponent,
    CoinOverviewComponent,
    CoinChartComponent,
    CoinDonutChartComponent,
  ],
  exports: [
    CoinsComponent
  ],
  providers: []
})
export class CoinsModule { }
