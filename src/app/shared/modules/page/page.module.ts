import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../app-material/app-material.module'
import { PageComponent } from './page.component';
import { PageContentComponent } from './page-content/page-content.component';
import { PageNavComponent } from './page-nav/page-nav.component';

/**
* Components for app pages layout
*/

@NgModule({
  imports: [
    AppMaterialModule
  ],
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
