import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ExchangesRoutingModule } from './exchanges-routing.module';
import { ExchangesComponent } from './exchanges.component';
import { ExchangesListComponent } from './components/exchanges-list/exchanges-list.component';
import { ExchangeOverviewComponent } from './pages/exchange-overview/exchange-overview.component';

@NgModule({
  imports: [
    SharedModule,
    ExchangesRoutingModule
  ],
  declarations: [ExchangesComponent, ExchangesListComponent, ExchangeOverviewComponent]
})
export class ExchangesModule { }
