import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';
import { trigger, style, animate, transition } from '@angular/animations';

/**
* App page content
*/

@Component({
  selector: 'app-page-content',
  templateUrl: 'page-content.component.html',
  styleUrls: ['./page-content.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ]
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
