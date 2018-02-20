import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-loading',
  templateUrl: './progress-loading.component.html',
  styleUrls: ['./progress-loading.component.scss']
})
export class ProgressLoadingComponent implements OnInit {

  @Input() loading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
