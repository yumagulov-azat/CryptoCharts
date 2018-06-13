// Libs
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Material
import { MatPaginator, MatTableDataSource } from '@angular/material';

// RxJs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { ExchangesService } from '@app/exchanges/exchanges.service';
import { PageService } from '@app/shared/modules/page/page.service';

// Models
import { Exchange } from '@app/exchanges/models/exchange';


@Component({
  selector: 'app-exchange-overview',
  templateUrl: './exchange-overview.component.html',
  styleUrls: ['./exchange-overview.component.scss']
})
export class ExchangeOverviewComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public exchange: Exchange;
  public exchangeName: string = '';
  public displayedColumns: Array<any> = ['pair', 'price', 'open24Hour', 'range24Hour', 'changePct24Hour'];
  public exchangePairs: any = new MatTableDataSource();

  public toSymbol: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exchangesService: ExchangesService,
    private pageService: PageService
  ) {
  }

  ngOnInit() {
    this.pageService.hideError();

    // this.paginator.page
    //   .subscribe((page: any) => {
    //     this.router.navigate(['/exchanges/', this.exchangeName, this.toSymbol, this.paginator.pageIndex + 1]);
    //   });

    this.route.paramMap
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((route: any) => {
        this.exchangeName = route.params.exchange;
        this.toSymbol = route.params.toSymbol;
        this.getExchange(route.params.exchange);
      });
  }

  /**
   * Unsubscribe from Observables on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public toSymbolChanged(toSymbol: string) {
    this.router.navigate(['/exchanges/', this.exchangeName, toSymbol]);
  }

  private getExchange(exchangeName: string) {
    this.exchangesService.getExchange(this.toSymbol, exchangeName)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((res) => {
        this.exchange = res;
        this.exchangePairs.data = this.exchange.pairsFull;
        this.pageService.hideError();
      }, (err) => {
        this.pageService.showError();
        console.error(err);
      });
  }

}
