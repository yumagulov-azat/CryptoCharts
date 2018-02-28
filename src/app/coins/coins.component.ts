import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinsService } from './shared/coins.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  coinsList: Array<any> = [];
  coinsListSubscription: Subscription;

  toolbarTitle = 'All coins';
  showBackButton = false;

  constructor(private route: ActivatedRoute, private coinsService: CoinsService) {

  }

  ngOnInit() {
    // Do not make unnecessary requests
    if(this.route.snapshot.children[0].url[0].path == 'list') {
      this.coinsListSubscription = this.coinsService.coinsList.subscribe(res => {
        this.coinsList = res;
        this.coinsListSubscription.unsubscribe();
      });
    } else {
      this.coinsService.getCoinsList()
        .subscribe(res => {
          this.coinsList = res;
        });
    }
  }

}
