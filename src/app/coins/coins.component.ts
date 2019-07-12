import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// RxJs
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

// Services
import { CoinsService } from './coins.service';

// Models
import { CoinsList } from './models/coins-list.model';


/**
 * Coins module parent component
 */

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  coinsList: CoinsList[];

  constructor(private route: ActivatedRoute, private coinsService: CoinsService) {

  }

  ngOnInit() {
    // Do not make unnecessary requests
    if (this.route.snapshot.children[0].url[0].path === 'list') {
      this.coinsService.coinsList
        .pipe(
          takeUntil(this.ngUnsubscribe),
          take(1)
        )
        .subscribe((res: CoinsList[]) => {
          this.coinsList = res;
        });
    } else {
      this.coinsService.getCoinsList()
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((res: CoinsList[]) => {
          this.coinsList = res;
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
