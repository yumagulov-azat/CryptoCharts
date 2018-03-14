import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SymbolSelectComponent } from '../../shared/components/symbol-select/symbol-select.component';

// RxJs
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';

// Services
import { CoinsService } from '../coins.service';
import { FavoritesService } from '../../favorites/favorites.service';
import { PageService } from '../../shared/modules/page/page.service';

// Models
import { CoinsList } from '../models/coins-list.model';


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

  // Data-table
  displayedColumns: Array<any> = ['position', 'name', 'price', 'marketCap', 'changePct24Hour', 'change7d', 'sparkline', 'favorite'];
  coinsList: any = new MatTableDataSource();
  pageSize: number = 50;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(SymbolSelectComponent) symbolSelect: SymbolSelectComponent;

  coinsListSubscription: Subscription;


  constructor(private coinsService: CoinsService,
              private route: ActivatedRoute,
              private router: Router,
              private meta: MetaService,
              private favoritesService: FavoritesService,
              private pageService: PageService) {

  }

  ngOnInit() {
    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: any) => {
        this.paginator.pageIndex = res.params.page - 1;
        this.getCoinsList(this.pageSize, this.paginator.pageIndex, this.symbolSelect.symbolSelected);

        const metaPage: string = this.paginator.pageIndex > 1 ? ', page ' + this.paginator.pageIndex : '';
        this.meta.setTitle(`List${metaPage} | Coins`);
      });

    this.paginator.page.subscribe(res => {
      this.router.navigate(['/coins/list/', this.paginator.pageIndex + 1]);
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
      .subscribe((res: CoinsList[]) => {
        this.renderData(res);
        this.pageService.hideError();
      }, error => {
        this.pageService.showError();
      });
  }


  /**
   * Past data to data-table
   * @param data
   */
  renderData(data: CoinsList[]): void {
    this.coinsList.data = data;
    this.coinsList.sort = this.sort;
    this.renderSparklines();
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

    if (this.coinsListSubscription) { this.coinsListSubscription.unsubscribe(); }

    let i = 0;
    this.coinsListSubscription = this.coinsService.getCoinsHistory(coins, 6, 'histoday', this.symbolSelect.symbolSelected)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.length > 0) {
          // Change 7d
          const historyFirst = res[0].close,
              historyLast = res[res.length - 1].close;
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

}
