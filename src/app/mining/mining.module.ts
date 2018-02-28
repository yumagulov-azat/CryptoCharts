import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MiningRoutingModule } from './mining-routing.module';
import { MiningComponent } from './mining.component';

@NgModule({
  imports: [
    SharedModule,
    MiningRoutingModule
  ],
  declarations: [MiningComponent]
})
export class MiningModule { }
