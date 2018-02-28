import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangesComponent } from './exchanges.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangesRoutingModule { }
