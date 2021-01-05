import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AuthService } from '@auth/auth.service';
import { Base, IBase, BaseType } from '@models/base';
import { IAppointment } from '@models/appointment';
import { IEvent, Event } from '@models/event';
import { IUser } from '@models/user';
import { EventService } from '@services/events.service';
import { AppointmentsService } from '@services/appointments.service';
import { SwalMessage, UtilsService } from '@services/utils.service';

import { EventBasicDialogComponent } from '@app/events/event-basic-dialog/event-basic-dialog.component';
import { EventStatusDialogComponent } from '@app/events/event-status-dialog/event-status-dialog.component';
import { EventAppointmentDialogComponent } from '@app/events/event-appointment-dialog/event-appointment-dialog.component';
import { EventImageDialogComponent } from '@app/events/event-image-dialog/event-image-dialog.component';
import { EventNewBaseDialogComponent } from '@app/events/event-new-base-dialog/event-new-base-dialog.component';
import { AuditType } from '@app/shared/models/audit';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  private currentUser: IUser;
  public event: IEvent;
  public idEvent: string;
  readonly SECTION_BLANK: Base = Base.InitDefault();
  public dialogConfig = new MatDialogConfig();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private eventSrv: EventService,
    private appointmentSrv: AppointmentsService
  ) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '500px';
  }

  ngOnInit(): void {

    this.authSrv.currentUser$.subscribe( (user: any) => {
      this.currentUser = user;
    });

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

  public gotoList(): void {
    this.router.navigate([`/${Event.PATH_URL}`]);
  }

  public editItem(): void {
    this.router.navigate([`/${Event.PATH_URL}/${this.idEvent}/editar`]);
  }

  openEventBasicDialog(): void {
    this.dialogConfig.data = this.event;
    const dialogRef = this.dialog.open(EventBasicDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      this.event.name = eventDialog.name;
      this.event.description = eventDialog.description;
      this.event.categories = eventDialog.categories;
      this.eventSrv.updateEvent(this.event, AuditType.UPDATED_INFO, this.currentUser);
    });
  }

  openEventImageDialog(): void {
    this.dialogConfig.data = this.event;
    const dialogRef = this.dialog.open(EventImageDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      this.event.image = eventDialog.image;
      this.event.images = eventDialog.images;
      this.eventSrv.updateEvent(this.event, AuditType.UPDATED_INFO, this.currentUser, 'Modificada imagen');
    });
  }

  openEventStatusDialog(): void {
    this.dialogConfig.data = this.event;
    const dialogRef = this.dialog.open(EventStatusDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      this.event.status = eventDialog.status;
      this.event.active = eventDialog.active;
      this.event.focused = eventDialog.focused;
      this.eventSrv.updateEvent(this.event, AuditType.UPDATED_STATUS, this.currentUser);
    });
  }

  openPlaceDialog(): void {
    this.dialogConfig.data = BaseType.PLACE;
    const dialogRef = this.dialog.open(EventNewBaseDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((newBase: IBase) => {
      if ( newBase ) {
        this.event.placeItems.push(newBase);
        this.eventSrv.updateEvent(this.event, AuditType.UPDATED_INFO, this.currentUser, 'Añadida ubicacíon');
      } else {
        this.utilsSrv.swalFire(SwalMessage.NO_CHANGES);
      }
    });
  }


  openEntityDialog(): void {
    this.dialogConfig.data = BaseType.ENTITY;
    const dialogRef = this.dialog.open(EventNewBaseDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((newBase: IBase) => {
      if ( newBase ) {
        this.event.entityItems.push(newBase);
        this.eventSrv.updateEvent(this.event, AuditType.UPDATED_INFO, this.currentUser, 'Añadida entidad');
      } else {
        this.utilsSrv.swalFire(SwalMessage.NO_CHANGES);
      }
    });
  }

  openAppointmentDialog(): void {
    this.dialogConfig.data = this.event;
    const dialogRef = this.dialog.open(EventAppointmentDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((appointmentDialog: IAppointment) => {
      console.log(`appointment: ${JSON.stringify(appointmentDialog)}`);
      this.appointmentSrv.updateAppointment(appointmentDialog);
    });
  }
}
