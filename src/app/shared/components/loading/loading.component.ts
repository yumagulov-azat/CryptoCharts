import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

// RxJs
import { Observable } from 'rxjs';

/**
 * App loading progress indicator
 */

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent{

  loading: Observable<boolean> = this.loadingService.loading$;

  constructor(
    private loadingService: LoadingService
  ) {}
}
