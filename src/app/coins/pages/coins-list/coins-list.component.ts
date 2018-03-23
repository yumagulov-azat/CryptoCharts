import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

// RxJs
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';

// Services
import { CoinsService } from '../../coins.service';
import { FavoritesService } from '../../../favorites/favorites.service';
import { PageService } from '../../../shared/modules/page/page.service';

// Models
import { CoinsList } from '../../models/coins-list.model';


/**
 * Coins list page
 */

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();
  coinsListSubscription: Subscription;

  displayedColumns: Array<any> = ['position', 'name', 'price', 'marketCap', 'changePct24Hour', 'change7d', 'sparkline', 'favorite'];
  coinsList: any = new MatTableDataSource();
  pageSize: number = 50;
  toSymbol: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private coinsService: CoinsService,
              private route: ActivatedRoute,
              private router: Router,
              private meta: MetaService,
              private favoritesService: FavoritesService,
              private pageService: PageService) {

  }

  ngOnInit() {
    this.paginator.page
      .subscribe((page: any) => {
        this.router.navigate(['/coins/list/', this.toSymbol, this.paginator.pageIndex + 1]);
      });

    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .subscribe((route: any) => {
        this.paginator.pageIndex = route.params.page - 1;
        this.toSymbol = route.params.toSymbol;

        this.setPageTitle();
        this.getCoinsList(this.pageSize, this.paginator.pageIndex, this.toSymbol);
      });
  }


  /**
   * Unsubscribe from Observables on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  /**
   * Get coins list
   * @param limit
   * @param page
   * @param toSymbol
   */
  getCoinsList(limit: number = 50, page: number = 0, toSymbol: string = 'USD'): void {
    this.coinsService.getCoinsList(limit, page, toSymbol)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((coinsListData: CoinsList[]) => {
        this.coinsList.data = coinsListData;
        this.coinsList.sort = this.sort;
        this.renderSparklines();
        this.pageService.hideError();
      }, error => {
        this.pageService.showError();
      });
  }


  /**
   * Render sparklines after coins linst loaded
   * because paralell loading is very slow
   */
  renderSparklines(): void {
    const coins = this.coinsList.data.map(item => {
      return {
        name: item.name
      };
    });

    if (this.coinsListSubscription) {
      this.coinsListSubscription.unsubscribe();
    }

    let i = 0;
    this.coinsListSubscription = this.coinsService.getCoinsHistory(coins, 6, 'histoday', this.toSymbol)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.length > 0) {
          // Change 7d
          const historyFirst = res[0].close,
                historyLast  = res[res.length - 1].close;
          this.coinsList.data[i].historyChange = historyLast && historyFirst ? (((historyLast - historyFirst) / historyFirst) * 100).toFixed(2) : 0;

          // Pass chart data
          this.coinsList.data[i].history = {
            json: res,
            keys: {
              x: 'time',
              value: ['close'],
            },
            type: 'area-spline'
          };
        }
        i++;
      });
  }

  /**
   * Add coin to favorite
   **/
  addToFavorite(coin): void {
    if (!coin.favorite) {
      this.favoritesService.addCoin(coin.name);
    } else {
      this.favoritesService.deleteCoin(coin.name);
    }
    coin.favorite = !coin.favorite;
  }

  /**
   * Change route when toSymbol changed
   * @param toSymbol
   */
  toSymbolChanged(toSymbol): void {
    this.router.navigate(['/coins/list/', toSymbol, this.paginator.pageIndex + 1]);
  }

  /**
   * Set page title
   */
  setPageTitle(): void {
    const metaPage: string = this.paginator.pageIndex > 0 ? ', page ' + (this.paginator.pageIndex + 1) : '';
    this.meta.setTitle(`List${metaPage} | Coins`);
  }

}
