import { Component, OnInit, Input } from '@angular/core';

// Models
import { NewsList } from '../../models/news-list';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  @Input() newsList: NewsList[] = [];

  constructor() { }

  ngOnInit() {
  }

}
