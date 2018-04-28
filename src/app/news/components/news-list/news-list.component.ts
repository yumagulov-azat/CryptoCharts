import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

// Models
import { News } from '../../models/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {

  @Input() newsList: News[] = [];

  constructor() { }

  ngOnInit() {
  }

}
