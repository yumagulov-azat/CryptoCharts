import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ExchangesRoutingModule } from './exchanges-routing.module';
import { ExchangesComponent } from './exchanges.component';

@NgModule({
  imports: [,
    SharedModule,
    ExchangesRoutingModule,
  ],
  declarations: [ExchangesComponent]
})
export class ExchangesModule { }
