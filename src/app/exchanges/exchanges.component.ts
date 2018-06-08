import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ExchangesService } from './exchanges.service';
import { PageService } from '@app/shared/modules/page/page.service';

// Models
import { Exchange } from './models/exchange';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss']
})
export class ExchangesComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();

  exchangesList: Exchange[] = [];

  constructor(
    private route: ActivatedRoute,
    private exchangesService: ExchangesService,
    private pageService: PageService
  ) {
  }

  ngOnInit() {
    this.exchangesService.getExchangesList()
      .subscribe((res: Exchange[]) => {
        if (res.length) {
          this.exchangesList = res;
        }
      });

    this.route.paramMap
      .subscribe((route: any) => {
        console.log(this.route.children)
        if (!this.route.children.length) {
          this.pageService.showError('Select Exchange', 'compare_arrows');
        }
      });
  }

  /**
   * Unsubscribe from Observables on destroy
   */
  ngOnDestroy() {
    // this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
  }

}
