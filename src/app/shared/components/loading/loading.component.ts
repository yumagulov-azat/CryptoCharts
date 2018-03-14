import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loading = false;

  constructor(private loadingService: LoadingService) {
    loadingService.loading.subscribe(next => {
      this.loading = next;
    });
  }

  ngOnInit() {
  }

}
