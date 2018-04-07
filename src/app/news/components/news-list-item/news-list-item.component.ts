import { Component, OnInit, Input } from '@angular/core';

// Models
import { NewsList } from '../../models/news-list';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss']
})
export class NewsListItemComponent implements OnInit {

  @Input() news: NewsList;

  constructor() { }

  ngOnInit() {
  }

}
