import { Component, OnInit } from '@angular/core';
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

  error: boolean = false;
  errorMesage: string;
  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.pageService.pageError
      .subscribe(res => {
        this.error = res.show;
        this.errorMesage = res.message;
      });
  }

}
