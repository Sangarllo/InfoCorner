import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EventService } from '@services/events.service';
import { IEvent, Event } from '@models/event';
import { Base } from '@models/base';

import { EventEntityDialogComponent } from '@app/events/event-entity-dialog/event-entity-dialog.component';
import { EventPlaceDialogComponent } from '@app/events/event-place-dialog/event-place-dialog.component';
import { EventBasicDialogComponent } from '@app/events/event-basic-dialog/event-basic-dialog.component';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  public event: IEvent;
  public idEvent: string;
  readonly SECTION_BLANK: Base = Base.InitDefault();

  public dialogConfig = new MatDialogConfig();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private eventSrv: EventService,
  ) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '500px';
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
      this.eventSrv.updateEvent(this.event);
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
      this.eventSrv.updateEvent(this.event);
    });
  }

  openEntityDialog(): void {
    this.dialogConfig.data = this.event;
    const dialogRef = this.dialog.open(EventEntityDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      this.event.entity = ( eventDialog.entity.id === Base.ID_DEFAULT ) ?
        null :
        eventDialog.entity;
      this.event.entityRol = eventDialog.entityRol;
      this.eventSrv.updateEvent(this.event);
    });
  }

}
