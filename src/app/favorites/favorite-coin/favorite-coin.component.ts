import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

// Services
import { CoinsService } from '../../coins/coins.service';
import { PageService } from '../../shared/modules/page/page.service';

// Moels
import { CoinSnapshot } from '../../coins/models/coin-snapshot.model';

@Component({
  selector: 'app-favorite-coin',
  templateUrl: './favorite-coin.component.html',
  styleUrls: ['./favorite-coin.component.scss'],
})
export class FavoriteCoinComponent implements OnInit, OnChanges {

  @Input() coin: string;
  @Input() toSymbol: string;
  @Input() historyLimit: number;
  @Output() coinDeleted: EventEmitter<any> = new EventEmitter();

  coinData: CoinSnapshot;
  coinChartData: any;

  toSymbolDisplay = '$';


  state: any = {
    loading: <boolean>true,
    error: <boolean>false
  };

  constructor(private coinsService: CoinsService,
              private pageService: PageService) {
  }

  ngOnChanges() {
    this.coinsService.getCoinFullData(this.coin, this.historyLimit, this.toSymbol)
      .subscribe(res => {
        this.coinData = res;
        this.toSymbolDisplay = this.coinData.finance.toSymbolDisplay;
        this.state.loading = false;
        this.prepareChartData();
      }, err => {
        this.pageService.showError();
      });
  }

  ngOnInit() {

  }

  /**
   * Prepare data for chart
   */
  prepareChartData(): void {
    this.coinChartData = {
      json: this.coinData.history,
      keys: {
        x: 'time',
        value: ['close'],
      },
      type: 'area-spline'
    };
  }

  /**
   * Delete coin from favorites
   * @param coinName
   */
  deleteCoin(coinName): void {
    this.coinDeleted.emit(coinName);
  }

}
