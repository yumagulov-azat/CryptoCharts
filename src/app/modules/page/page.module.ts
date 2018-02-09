import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { PageContentComponent } from './page-content/page-content.component';
import { PageNavComponent } from './page-nav/page-nav.component';

/**
* Components for app pages layout
*/

@NgModule({
  imports: [],
  declarations: [
    PageComponent,
    PageContentComponent,
    PageNavComponent
  ],
  exports: [
    PageComponent,
    PageContentComponent,
    PageNavComponent
  ]
})
export class PageModule { }
