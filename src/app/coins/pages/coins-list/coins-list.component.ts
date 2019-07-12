import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// RxJs
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


// Services
import { CoinsService } from '../../coins.service';
import { FavoritesService } from '@app/favorites/favorites.service';
import { PageService } from '@app/shared/modules/page/page.service';

// Models
import { CoinsList } from '../../models/coins-list.model';
import { MediaMatcher } from '@angular/cdk/layout';


/**
 * Coins list page
 */

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoinsListComponent implements OnInit, OnDestroy, AfterViewInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private coinsListSubscription: Subscription;

  displayedColumns: Array<any> = [
    'position',
    'name',
    'price',
    'marketCap',
    'change24h',
    'change7d',
    'sparkline',
    'favorite'
  ];
  coinsList: any = new MatTableDataSource();
  pageSize: number = 50;
  toSymbol: string;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private coinsService: CoinsService,
              private route: ActivatedRoute,
              private router: Router,
              private meta: MetaService,
              private favoritesService: FavoritesService,
              private pageService: PageService,
              private changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              @Inject(PLATFORM_ID) private platformId: Object) {

    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
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
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   * Get coins list
   * @param limit
   * @param page
   * @param toSymbol
   */
  private getCoinsList(limit: number = this.pageSize, page: number = this.paginator.pageIndex, toSymbol: string = this.toSymbol): void {
    this.coinsService.getCoinsList(limit, page, toSymbol)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((coinsListData: CoinsList[]) => {
        this.coinsList.data = coinsListData;
        this.pageService.hideError();

        // TODO Remove setTimeout
        if (isPlatformBrowser(this.platformId) && !this.mobileQuery.matches) {
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
   * Render sparkLines after coins list loaded
   * because parallel loading is very slow
   */
  private renderSparklines(): void {
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
            historyLast = res[res.length - 1].close,
            historyChangePercent = (((historyLast - historyFirst) / historyFirst) * 100).toFixed(2);

          this.coinsList.data[i].historyChange = historyLast && historyFirst ? historyChangePercent : 0;

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
        this.changeDetectorRef.detectChanges();
      });
  }

  /**
   * Add coin to favorite
   * @param coin
   */
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
  private setPageTitle(): void {
    const metaPage: string = this.paginator.pageIndex > 0 ? ', page ' + (this.paginator.pageIndex + 1) : '';
    this.meta.setTitle(`List${metaPage} | Coins`);
  }

}
