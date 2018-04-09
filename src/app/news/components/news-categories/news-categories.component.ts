import { Component, OnInit, Input } from '@angular/core';

// models
import { NewsCategories } from '../../models/news-categories';

@Component({
  selector: 'app-news-categories',
  templateUrl: './news-categories.component.html',
  styleUrls: ['./news-categories.component.scss']
})
export class NewsCategoriesComponent implements OnInit {

  @Input() newsCategories: NewsCategories[] = [];

  constructor() { }

  ngOnInit() {
  }

}
