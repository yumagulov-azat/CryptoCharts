import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// RxJs
import { Observable } from 'rxjs/Observable';

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
export class FavoriteCoinComponent implements OnInit {

  @Input() coin: any;
  coinData: CoinSnapshot;
  coinChartData: any;
  @Output() coinDeleted: EventEmitter<any> = new EventEmitter();

  state: any = {
    loading: <boolean>true,
    error: <boolean>false
  }

  constructor(private coinsService: CoinsService,
              private pageService: PageService) {
  }

  ngOnChanges() {
    this.coinsService.getCoinFullData(this.coin, 30)
      .subscribe(res => {
        this.coinData = res;
        this.prepareChartData();
        this.state.loading = false;
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
    }
  }

  deleteCoin(coinName): void {
    this.coinDeleted.emit(coinName);
  }

}
