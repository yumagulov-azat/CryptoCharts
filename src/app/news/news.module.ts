import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsCategoriesComponent } from './components/news-categories/news-categories.component';
import { NewsListItemComponent } from './components/news-list-item/news-list-item.component';

@NgModule({
  imports: [
    SharedModule,
    NewsRoutingModule
  ],
  declarations: [
    NewsComponent,
    NewsListComponent,
    NewsCategoriesComponent,
    NewsListItemComponent
  ]
})
export class NewsModule { }
