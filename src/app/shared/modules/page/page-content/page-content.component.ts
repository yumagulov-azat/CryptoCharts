// Libs
import { Component, OnDestroy, OnInit } from '@angular/core';

// Services
import { PageService } from '../page.service';

/**
* App page content
*/

@Component({
  selector: 'app-page-content',
  templateUrl: 'page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit {

  error = false;
  errorMessage: string;
  errorIcon: string;

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.pageService.pageError
      .subscribe(res => {
        this.error = res.show;
        this.errorMessage = res.message;
        this.errorIcon = res.icon;
      });
  }


}
