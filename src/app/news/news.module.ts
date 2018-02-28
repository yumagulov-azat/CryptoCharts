import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';

@NgModule({
  imports: [
    SharedModule,
    NewsRoutingModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
