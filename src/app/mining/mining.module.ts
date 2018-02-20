import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiningRoutingModule } from './mining-routing.module';
import { MiningComponent } from './mining.component';

@NgModule({
  imports: [
    CommonModule,
    MiningRoutingModule
  ],
  declarations: [MiningComponent]
})
export class MiningModule { }
