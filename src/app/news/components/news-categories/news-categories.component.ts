import { Component, OnInit, Input } from '@angular/core';

// models
import { NewsCategory } from '../../models/news-category';

@Component({
  selector: 'app-news-categories',
  templateUrl: './news-categories.component.html',
  styleUrls: ['./news-categories.component.scss']
})
export class NewsCategoriesComponent implements OnInit {

  @Input() newsCategories: NewsCategory[] = [];

  constructor() { }

  ngOnInit() {
  }

}
