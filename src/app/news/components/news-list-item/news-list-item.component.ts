import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

// Models
import { News } from '../../models/news';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListItemComponent implements OnInit {

  @Input() news: News;

  constructor() { }

  ngOnInit() {
  }

}
