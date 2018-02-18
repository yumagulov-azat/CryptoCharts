import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppMaterialModule } from './modules/app-material/app-material.module';
import { PageModule } from './modules/page/page.module';
import { AppChartsModule } from './modules/app-charts/app-charts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'crypto-charts'}),
    HttpClientModule,
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    PageModule,
    AppChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
