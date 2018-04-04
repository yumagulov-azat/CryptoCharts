import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';


import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { CoinsService } from './coins/coins.service';
import { FavoritesService } from './favorites/favorites.service';
import { UtilsService } from './shared/services/utils.service';
import { NotificationsService } from './shared/services/notifications.service';
import { StorageService } from './shared/services/storage.service';
import { LoadingService } from './shared/services/loading.service';

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'CryptoCharts',
    defaults: {
      title: 'CryptoCharts'
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'crypto-charts'}),
    BrowserTransferStateModule,
    HttpClientModule,
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    })
  ],
  providers: [
    UtilsService,
    NotificationsService,
    StorageService,
    CoinsService,
    FavoritesService,
    LoadingService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
