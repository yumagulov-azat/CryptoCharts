import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../shared/modules/app-material/app-material.module';
import { PageModule } from '../shared/modules/page/page.module';

import { ExchangesRoutingModule } from './exchanges-routing.module';
import { ExchangesComponent } from './exchanges.component';

@NgModule({
  imports: [,
    CommonModule,
    AppMaterialModule,
    PageModule,
    ExchangesRoutingModule,
  ],
  declarations: [ExchangesComponent]
})
export class ExchangesModule { }
