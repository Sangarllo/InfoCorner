import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { AuthService } from '@auth/auth.service';
import { Base, IBase, BaseType } from '@models/base';
import { IAppointment } from '@models/appointment';
import { IEvent, Event } from '@models/event';
import { IUser } from '@models/user';
import { EventService } from '@services/events.service';
import { AppointmentsService } from '@services/appointments.service';

import { EventEntityDialogComponent } from '@app/events/event-entity-dialog/event-entity-dialog.component';
import { EventPlaceDialogComponent } from '@app/events/event-place-dialog/event-place-dialog.component';
import { EventBasicDialogComponent } from '@app/events/event-basic-dialog/event-basic-dialog.component';
import { EventStatusDialogComponent } from '@app/events/event-status-dialog/event-status-dialog.component';
import { EventAppointmentDialogComponent } from '@app/events/event-appointment-dialog/event-appointment-dialog.component';
import { EventImageDialogComponent } from '@app/events/event-image-dialog/event-image-dialog.component';

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
    })

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
      this.eventSrv.updateEvent(this.event, this.currentUser);
    });
  }

  openEventImageDialog(): void {
    this.dialogConfig.data = this.event;
    const dialogRef = this.dialog.open(EventImageDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      this.event.image = eventDialog.image;
      this.event.images = eventDialog.images;
      this.eventSrv.updateEvent(this.event, this.currentUser);
    });
  }

  openEventStatusDialog(): void {
    this.dialogConfig.data = this.event;
    const dialogRef = this.dialog.open(EventStatusDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      this.event.status = eventDialog.status;
      this.event.active = eventDialog.active;
      this.event.focused = eventDialog.focused;
      this.eventSrv.updateEvent(this.event, this.currentUser);
    });
  }

  openPlaceDialog(): void {
    this.dialogConfig.data = this.event;
    const dialogRef = this.dialog.open(EventPlaceDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      this.event.place = ( eventDialog.place.id === Base.ID_DEFAULT ) ?
        null :
        eventDialog.place;
      this.event.placeLocality = eventDialog.placeLocality;
      this.event.placeDesc = eventDialog.placeDesc;
      this.eventSrv.updateEvent(this.event, this.currentUser);
    });
  }

  openEntityDialog(): void {
    this.dialogConfig.data = this.event;
    const dialogRef = this.dialog.open(EventEntityDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      if ( eventDialog ) {
        console.log(`closing eventDialog: ${JSON.stringify(eventDialog)}`);

        if ( eventDialog?.entity.id !== Base.ID_DEFAULT ) {
          const newEntityItem: IBase = {
            id: eventDialog.entity.id,
            active: true,
            name: eventDialog.entity.name,
            image: eventDialog.entity.image,
            baseType: BaseType.ENTITY,
            desc: eventDialog.entityRol,
          };
          this.event.entityItems.push(newEntityItem);
        }
        this.eventSrv.updateEvent(this.event, this.currentUser);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Datos no modificados',
          text: `Has cerrado la ventana sin guardar ningún cambio`,
        });
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
