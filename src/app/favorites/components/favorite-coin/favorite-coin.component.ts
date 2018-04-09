import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

// Services
import { CoinsService } from '../../../coins/coins.service';
import { PageService } from '../../../shared/modules/page/page.service';

// Models
import { CoinSnapshot } from '../../../coins/models/coin-snapshot.model';
import { HistoryLimit } from '../../../coins/models/history-limit';

@Component({
  selector: 'app-favorite-coin',
  templateUrl: './favorite-coin.component.html',
  styleUrls: ['./favorite-coin.component.scss'],
})
export class FavoriteCoinComponent implements OnInit, OnChanges {

  @Input() coin: string;
  @Input() toSymbol: string;
  @Input() historyLimit: HistoryLimit;
  @Output() coinDeleted: EventEmitter<any> = new EventEmitter();

  coinData: CoinSnapshot;
  coinChartData: any;
  coinTrend: number = 0;

  toSymbolDisplay = '$';


  state: any = {
    loading: <boolean>true,
    error: <boolean>false
  };

  constructor(private coinsService: CoinsService,
              private pageService: PageService) {
  }

  ngOnChanges() {
    this.coinsService.getCoinData(this.coin, this.historyLimit.value, this.historyLimit.type, this.toSymbol)
      .subscribe(res => {
        this.coinData = res;
        this.coinTrend = res.finance.changePct24Hour;
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
      colors: {
        'close': this.coinData.finance.changePct24Hour > 0 ? '#4caf50' : '#E91E63'
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
