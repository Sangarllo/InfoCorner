import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@services/users.service';
import { IEvent } from '@models/event';
import { Observable } from 'rxjs';
import { IUser } from '@app/shared/models/user';

@Component({
  selector: 'app-event-audit-detail',
  templateUrl: './event-audit-detail.component.html'
})
export class EventAuditDetailComponent implements OnInit {

  @Input() event: IEvent;

  public createdUser$: Observable<IUser>;
  public updatedUser$: Observable<IUser>;

  constructor(
    private userSrv: UserService
  ) {
  }

  ngOnInit(): void {
    this.createdUser$ = this.userSrv.getOneUser(this.event.createdBy);
    this.updatedUser$ = this.userSrv.getOneUser(this.event.updatedBy);
  }

}
