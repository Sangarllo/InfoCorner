import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NoticeService } from '@services/notices.service';
import { Observable } from 'rxjs';
import { INotice } from '@shared/models/notice';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  public notices$!: Observable<INotice[]>;
  displayedColumns: string[] = [ 'image', 'active', 'id', 'name', 'description', 'actions3'];

  constructor(
    private router: Router,
    private noticeSrv: NoticeService,
  ) { }

  ngOnInit(): void {
    this.notices$ = this.noticeSrv.getAllNotices();
  }

  public gotoItem(notice: INotice): void {
    this.router.navigate([`avisos/${notice.id}`]);
  }

  public editItem(notice: INotice): void {
    this.router.navigate([`avisos/${notice.id}/editar`]);
  }

  public deleteItem(notice: INotice): void {
    console.log(`deleting ${notice.id}`);
  }

  public addItem(): void {
    this.router.navigate([`avisos/0/editar`]);
  }
}
