import { Component, OnInit } from '@angular/core';

// Services
import { ExchangesService } from './exchanges.service';

// Models
import { Exchange } from './models/exchange';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss']
})
export class ExchangesComponent implements OnInit {

  exchangesList: Exchange[] = [];

  constructor(
    private exchangesService: ExchangesService
  ) { }

  ngOnInit() {
    this.exchangesService.getExchangesList()
      .subscribe((res: Exchange[])=>{
        if(res.length){
          this.exchangesList = res;
        }
      });
  }

}
