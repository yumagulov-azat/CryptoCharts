import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../currencies.service';

@Component({
  selector: 'app-currencies-nav',
  templateUrl: './currencies-nav.component.html',
  styleUrls: ['./currencies-nav.component.scss']
})
export class CurrenciesNavComponent implements OnInit {

  coinsList = [];

  constructor(private currenciesService: CurrenciesService) { }

  ngOnInit() {
    this.getCoinsList();
  }

  /**
   * Get coins list then sort and push 
   */
  getCoinsList(): void {
    this.currenciesService.getCoinsList().subscribe(result => {
      if(result.Data) {
        // Object to array
        Object.keys(result.Data).forEach(key => {
          this.coinsList.push(result.Data[key])
        });

        // Sort coinsList
        this.coinsList.sort(function(a, b){
            return a.SortOrder-b.SortOrder
        });
      }
    });
  }

}
