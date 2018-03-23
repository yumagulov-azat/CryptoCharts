import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// RxJs
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

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

  ngUnsubscribe: Subject<void> = new Subject<void>();

  coinsList: CoinsList[];
  coinsListSubscription: Subscription;

  constructor(private route: ActivatedRoute, private coinsService: CoinsService) {

  }

  ngOnInit() {
    // Do not make unnecessary requests
    if (this.route.snapshot.children[0].url[0].path === 'list') {
      this.coinsListSubscription = this.coinsService.coinsListSubject
        .takeUntil(this.ngUnsubscribe)
        .subscribe((res: CoinsList[]) => {
          this.coinsList = res;
          this.coinsListSubscription.unsubscribe();
        });
    } else {
      this.coinsService.getCoinsList()
        .takeUntil(this.ngUnsubscribe)
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
