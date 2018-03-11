import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

// Components
import { PageComponent } from './page.component';
import { PageContentComponent } from './page-content/page-content.component';
import { PageNavComponent } from './page-nav/page-nav.component';
import { PageErrorComponent } from './page-error/page-error.component';

// Service
import { PageService } from './page.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    PageComponent,
    PageContentComponent,
    PageNavComponent,
    PageErrorComponent
  ],
  exports: [
    PageComponent,
    PageContentComponent,
    PageNavComponent,
    PageErrorComponent
  ],
  providers: [
    PageService
  ]
})
export class PageModule { }
