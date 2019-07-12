import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// RxJs
import { Subject } from 'rxjs';

// Services
import { CoinsService } from '../../coins.service';

// Models
import { CoinsList } from '../../models/coins-list.model';
import { takeUntil } from 'rxjs/operators';


/**
 * Coins page nav
 */

@Component({
  selector: 'app-coins-nav',
  templateUrl: './coins-nav.component.html',
  styleUrls: ['./coins-nav.component.scss']
})
export class CoinsNavComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() coinsList: CoinsList[];
  toSymbol: string = 'USD';

  constructor(
    private coinsService: CoinsService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.coinsService.toSymbol
      .pipe(
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(res => {
        this.toSymbol = res;
      });
  }

  /**
   * Unsubscribe from Observables on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isLinkActive(instruction: any[]): boolean {
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }
}
