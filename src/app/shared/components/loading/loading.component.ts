import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

// RxJs
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

/**
 * App loading progress indicator
 */

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();
  loading = false;

  constructor(private loadingService: LoadingService) {
    loadingService.loading
      .takeUntil(this.ngUnsubscribe)
      .subscribe((next: boolean) => {
        this.loading = next;
      });
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
