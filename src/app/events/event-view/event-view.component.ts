import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@auth/auth.service';
import { Base } from '@models/base';
import { IEvent, Event } from '@models/event';
import { IUser } from '@models/user';
import { EventService } from '@services/events.service';
import { UserService } from '@services/users.service';
import { UserRole } from '@models/user-role.enum';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  public userLogged: IUser;
  public adminAllowed: boolean;
  public event: IEvent;
  public idEvent: string;
  readonly SECTION_BLANK: Base = Base.InitDefault();

  constructor(
    public authSvc: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userSrv: UserService,
    private eventSrv: EventService,
  ) {
    this.adminAllowed = false;
    this.authSvc.afAuth.user.subscribe( (user: any) => {
      this.userSrv.getOneUser(user.uid).subscribe( (userLogged: any ) => {
        console.log(`constructor ${JSON.stringify(userLogged)}`);
        this.userLogged = userLogged;
        this.adminAllowed = this.canAdmin(this.userLogged);
      });
    });
  }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('id');
    if ( this.idEvent ) {
      this.getDetails(this.idEvent);
    }
  }

  getDetails(idEvent: string): void {
    this.eventSrv.getOneEvent(idEvent)
    .subscribe((event: IEvent) => {
      this.event = event;
    });
  }

  public adminItem(): void {
    this.router.navigate([`/${Event.PATH_URL}/${this.idEvent}/admin`]);
  }

  private canAdmin(userLogged: IUser): boolean {
    if ( userLogged.role !== UserRole.Lector) {
      return true;
    }
    return false;
  }
}
