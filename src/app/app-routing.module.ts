import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'coins',
    pathMatch: 'full'
  },
  {
    path: 'coins',
    loadChildren: 'app/coins/coins.module#CoinsModule'
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
