import { Component, OnInit, OnDestroy, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

// RxJs
import { Subscription,  Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


// Services
import { CoinsService } from '../../coins.service';
import { FavoritesService } from '@app/favorites/favorites.service';
import { PageService } from '@app/shared/modules/page/page.service';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private coinsService: CoinsService,
              private route: ActivatedRoute,
              private router: Router,
              private meta: MetaService,
              private favoritesService: FavoritesService,
              private pageService: PageService,
              @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit() {

    // When paginator page changed change url
    this.paginator.page
      .subscribe((page: any) => {
        this.router.navigate(['/coins/list/', this.toSymbol, this.paginator.pageIndex + 1]);
      });

    // Get params from url then get coins list
    this.route.paramMap
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((route: any) => {
        this.paginator.pageIndex = route.params.page - 1;
        this.toSymbol = route.params.toSymbol;

        this.getCoinsList();
        this.setPageTitle();
        this.coinsService.toSymbol.next(this.toSymbol);
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
  getCoinsList(limit: number = this.pageSize, page: number = this.paginator.pageIndex, toSymbol: string = this.toSymbol): void {
    this.coinsService.getCoinsList(limit, page, toSymbol)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((coinsListData: CoinsList[]) => {
        this.coinsList.data = coinsListData;
        this.pageService.hideError();

        // TODO Remove setTimeout
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.renderSparklines();
          }, 100);
        }
      }, err => {
        console.error(err);
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
        name: item.symbol
      };
    });

    if (this.coinsListSubscription) {
      this.coinsListSubscription.unsubscribe();
    }

    let i = 0;
    this.coinsListSubscription = this.coinsService.getCoinsHistory(coins, 6, 'histoday', this.toSymbol)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
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
      this.favoritesService.addCoin(coin.symbol);
    } else {
      this.favoritesService.deleteCoin(coin.symbol);
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
