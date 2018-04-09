import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';

// RxJs
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

// Services
import { NewsService } from './news.service';

// Models
import { NewsList } from './models/news-list';
import { NewsCategories } from './models/news-categories';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  ngUnsubscribe: Subject<void> = new Subject<void>();

  newsList: NewsList[] = [];
  newsCategories: NewsCategories[] = [];

  activeCategory: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meta: MetaService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.getNewsCategories();

    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .subscribe((route: any) => {
        const category = route.params.categoryName;
        this.getNewsList(category);

        if(category !== 'all') {
          this.meta.setTitle(`${category} | News`);
          this.activeCategory = category;
        } else {
          this.meta.setTitle('News');
          this.activeCategory = '';
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getNewsList(category: string = ''): void {
    this.newsService.getNewsList(category)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: NewsList[]) => {
          this.newsList = res;
      }, (err) => {
        console.log(err)
      });
  }

  getNewsCategories(): void {
    this.newsService.getNewsCategories()
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: NewsCategories[]) => {
          this.newsCategories = res;
      }, (err) => {
        console.log(err)
      });
  }


}
