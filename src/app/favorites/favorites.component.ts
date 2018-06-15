// Libs
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { HistoryLimit } from '@app/coins/models/history-limit';

// RxJs
import { Subject } from 'rxjs';

// Services
import { CoinsService } from '@app/coins/coins.service';
import { LoadingService } from '@app/shared/services/loading.service';
import { FavoritesService } from './favorites.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  viewProviders: [DragulaService],
})
export class FavoritesComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public coins: Array<any>;
  public deletedCoins: Array<any> = [];

  public coinDeleting: boolean = false; // when coin enter delete block
  public drag: boolean = false; // when coin draged

  public toSymbol: string = 'USD';

  public historyLimits: HistoryLimit[] = [
    {value: 59, viewValue: '1 hour', type: 'histominute'},
    {value: 23, viewValue: '1 day', type: 'histohour'},
    {value: 6, viewValue: '1 week', type: 'histoday'},
    {value: 30, viewValue: '1 month', type: 'histoday'},
    {value: 90, viewValue: '3 month', type: 'histoday'},
    {value: 180, viewValue: '6 month', type: 'histoday'},
    {value: 364, viewValue: '1 year', type: 'histoday'}
  ];
  public historyLimit: HistoryLimit = this.historyLimits[3];

  constructor(
    private favoritesService: FavoritesService,
    private dragulaService: DragulaService,
    private coinsService: CoinsService,
    private loadingService: LoadingService
  ) {
    dragulaService.setOptions('favorites-coins-bag', {
      moves: function (el, container, handle) {
        return handle.classList.contains('favorite-coin__drag-handle');
      }
    });

    // Set drag true for animation
    dragulaService.drag.subscribe((value) => {
      this.drag = true;
    });

    // Save sorting when drop
    dragulaService.dropModel.subscribe((value) => {
      this.onDrop();
    });

    // Check bag
    dragulaService.over.subscribe((value) => {
      this.onOver(value);
    });

    dragulaService.cancel.subscribe((value) => {
      this.drag = false;
    });
  }

  ngOnInit() {
    this.coinsService.toSymbol
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(res => {
        if (res) {
          this.toSymbol = res;
        }
      });

    this.favoritesService.getFavoriteCoins()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((res: any) => {
        if (res) {
          this.coins = res;
        }
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
   * Save coins sorting
   **/
  private onDrop(): void {
    this.drag = false;
    this.favoritesService.setFavoriteCoins(this.coins);
  }

  /**
   * On element over bag
   * @param value
   */
  private onOver(value): void {
    const [e, el, container] = value;

    if (container.tagName === 'APP-FAVORITES-DROP-DELETE') {
      this.coinDeleting = true;
    } else {
      this.coinDeleting = false;
    }
  }

  /**
   * Delete coin from favorites
   * @param coinName
   */
  public deleteCoin(coinName): void {
    this.coins.splice(this.coins.indexOf(coinName), 1);
    this.favoritesService.deleteCoin(coinName);
  }

  /**
   * When toSymbol chaged
   * @param toSymbol
   */
  public toSymbolChanged(toSymbol: string): void {
    this.loadingService.showLoading();
    this.toSymbol = toSymbol;
    this.coinsService.toSymbol.next(this.toSymbol);
  }

}
