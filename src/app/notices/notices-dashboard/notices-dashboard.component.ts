import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { INotice, Notice } from '@models/notice';
import { NoticeService } from '@services/notices.service';

@Component({
  selector: 'app-notices-dashboard',
  templateUrl: './notices-dashboard.component.html',
  styleUrls: ['./notices-dashboard.component.scss']
})
export class NoticesDashboardComponent implements OnInit {

  public notices$: Observable<INotice[]>;

  constructor(
    private router: Router,
    private noticesSrv: NoticeService
  ) { }

  ngOnInit(): void {
    this.notices$ = this.noticesSrv.getAllNotices();
  }

  gotoNotice(notice: INotice): void {
    this.router.navigate([`/${Notice.PATH_URL}/${notice.id}`]);
  }

}
