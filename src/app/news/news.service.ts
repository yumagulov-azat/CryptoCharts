import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

// RxJs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

// Services
import { LoadingService } from '../shared/services/loading.service';

// Models
import { NewsList } from './models/news-list'
import { NewsCategories } from './models/news-categories'

@Injectable()
export class NewsService {

  private API_URL = 'https://min-api.cryptocompare.com/data/news/';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  /**
   * Get latest news
   * @param category
   * @returns {Observable<T>}
   */
  getNewsList(category: string = ''): Observable<NewsList[]> {
    this.loadingService.showLoading();

    let params = new HttpParams()
      .set('lang', 'EN')
      .set('categories', category === 'all' ? '' : category);

    return this.http.get<NewsList[]>(this.API_URL, { params: params })
      .map((res: any) => {
        const newsList: NewsList[] = [];

        if(res) {
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
            })
          });
        } else {
          throw new Error('News list empty');
        }

        return newsList;
      })
      .finally(() => {
        this.loadingService.hideLoading();
      });
  }

  /**
   * Get news categories list
   * @returns {Observable<R>}
   */
  getNewsCategories(): Observable<NewsCategories[]> {
    return this.http.get(this.API_URL + 'categories')
      .map((res: any) => {
        const newsCategories: NewsCategories[] = [];
        if(res) {
          res.forEach((item: any) => {
            newsCategories.push({
              name: item.categoryName
            })
          });
        } else {
          throw new Error('News categories list empty');
        }

        return newsCategories;
      });
  }

}
