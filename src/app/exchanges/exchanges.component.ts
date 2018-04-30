import { Component, OnInit } from '@angular/core';

// Services
import { ExchangesService } from './exchanges.service';

// Models
import { ExchangesList } from './models/exchanges-list';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss']
})
export class ExchangesComponent implements OnInit {

  exchangesList: ExchangesList[] = [];

  constructor(
    private exchangesService: ExchangesService
  ) { }

  ngOnInit() {
    this.exchangesService.getExchangesList()
      .subscribe((res: ExchangesList[])=>{
        if(res.length){
          this.exchangesList = res;
        }
      });
  }

}
