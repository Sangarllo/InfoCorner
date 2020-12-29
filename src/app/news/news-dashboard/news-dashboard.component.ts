import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { INewsItem, NewsItem } from '@models/news';
import { NewsService } from '@services/news.services';

@Component({
  selector: 'app-news-dashboard',
  templateUrl: './news-dashboard.component.html',
  styleUrls: ['./news-dashboard.component.scss']
})
export class NewsDashboardComponent implements OnInit {

  @Input() showHeader = true;
  public news$: Observable<INewsItem[]>;

  constructor(
    private router: Router,
    private newsSrv: NewsService
  ) { }

  ngOnInit(): void {
    this.news$ = this.newsSrv.getAllNews();
  }

  gotoNewsItem(newsItem: INewsItem): void {
    this.router.navigate([`/${NewsItem.PATH_URL}/${newsItem.id}`]);
  }
}
