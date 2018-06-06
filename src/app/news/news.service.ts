import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

// RxJs
import { Observable, of } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

// Services
import { LoadingService } from '@app/shared/services/loading.service';

// Models
import { News } from './models/news';
import { NewsCategories } from './models/news-categories';


@Injectable()
export class NewsService {

  private API_URL = 'https://min-api.cryptocompare.com/data/news/';

  // Cache
  newsCategoriesCache: NewsCategories[];

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
  }

  /**
   * Get latest news
   * @param category
   * @returns {Observable<T>}
   */
  getNewsList(category: string = ''): Observable<News[]> {
    this.loadingService.showLoading();

    let params = new HttpParams()
      .set('lang', 'EN');

    if (category !== 'all') {
      params = params.append('categories', category);
    }

    return this.http.get(this.API_URL, {params: params})
      .pipe(
        map((res: any) => {
          const newsList: News[] = [];

          if (res && res instanceof Array) {
            res.forEach((item: any) => {
              newsList.push({
                date: moment.unix(item.published_on).fromNow(),
                title: item.title,
                anons: item.body,
                imageUrl: item.imageurl,
                url: item.url,
                source: {
                  name: item.source_info.name,
                  img: item.source_info.img
                },
              });
            });
          } else {
            throw new Error('News list empty');
          }

          return newsList;
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  /**
   * Get news categories list
   * @returns {Observable<R>}
   */
  getNewsCategories(): Observable<NewsCategories[]> {
    if (this.newsCategoriesCache) {
      return of(this.newsCategoriesCache);
    } else {
      return this.http.get(this.API_URL + 'categories')
        .pipe(
          map((res: any) => {
            const newsCategories: NewsCategories[] = [];
            if (res) {
              res.forEach((item: any) => {
                newsCategories.push({
                  name: item.categoryName
                });
              });
            } else {
              throw new Error('News categories list empty');
            }

            this.newsCategoriesCache = newsCategories;
            return newsCategories;
          })
        );
    }
  }

}
