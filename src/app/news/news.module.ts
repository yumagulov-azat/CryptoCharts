import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../shared/modules/app-material/app-material.module';
import { PageModule } from '../shared/modules/page/page.module';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    PageModule,
    NewsRoutingModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
