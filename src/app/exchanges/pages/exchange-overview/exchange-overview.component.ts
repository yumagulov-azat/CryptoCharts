// Libs
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// RxJs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { ExchangesService } from '@app/exchanges/exchanges.service';

@Component({
  selector: 'app-exchange-overview',
  templateUrl: './exchange-overview.component.html',
  styleUrls: ['./exchange-overview.component.scss']
})
export class ExchangeOverviewComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();

  public exchangeName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exchangesService: ExchangesService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((route: any) => {
        this.exchangeName = route.params.exchange;
        this.getExchangePairsData(this.exchangeName);
      });
  }

  /**
   * Unsubscribe from Observables on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public toSymbolChanged(toSymbol) {

  }

  private getExchangePairsData(exchangeName: string) {
    this.exchangesService.getExchangePairsData('BTC', exchangeName)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

}
