import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { INotice } from '@models/notice';
import { NoticeService } from '@services/notices.service';

@Component({
  selector: 'app-notices-dashboard',
  templateUrl: './notices-dashboard.component.html',
  styleUrls: ['./notices-dashboard.component.scss']
})
export class NoticesDashboardComponent implements OnInit {

  public notices$: Observable<INotice[]>;

  constructor(
    private noticesSrv: NoticeService
  ) { }

  ngOnInit(): void {
    this.notices$ = this.noticesSrv.getAllNotices();
  }

}
