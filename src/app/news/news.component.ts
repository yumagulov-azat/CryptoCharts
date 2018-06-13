// Libs
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';

// RxJs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { NewsService } from './news.service';

// Models
import { News } from './models/news';
import { NewsCategory } from './models/news-category';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newsList: News[] = [];
  public newsCategories: NewsCategory[] = [];
  public activeCategory: string = '';

  constructor(
    private route: ActivatedRoute,
    private meta: MetaService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.getNewsCategories();

    // Load news list on route params changed
    this.route.paramMap
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((route: any) => {
        const category = route.params.categoryName;
        this.getNewsList(category);

        // Set title
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

  /**
   * Get latest news
   * @param category
   */
  private getNewsList(category: string = ''): void {
    this.newsService.getNewsList(category)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((res: News[]) => {
          this.newsList = res;
      }, (err) => {
        console.log(err);
      });
  }

  /**
   * Get categories list
   */
  private getNewsCategories(): void {
    this.newsService.getNewsCategories()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((res: NewsCategory[]) => {
          this.newsCategories = res;
      }, (err) => {
        console.log(err);
      });
  }


}
