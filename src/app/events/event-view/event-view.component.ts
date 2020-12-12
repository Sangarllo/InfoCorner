import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EventPlaceDialogComponent } from '@app/events/event-place-dialog/event-place-dialog.component';
import { EventService } from '@services/events.service';
import { IEvent, Event } from '@models/event';
import { Base } from '@models/base';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  public event: IEvent;
  public idEvent: string;
  readonly SECTION_BLANK: Base = Base.InitDefault();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private eventSrv: EventService,
  ) { }

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

  openPlaceDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = this.event;

    const dialogRef = this.dialog.open(EventPlaceDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((eventDialog: IEvent) => {
      this.event.place = ( eventDialog.place.id === Base.ID_DEFAULT ) ?
        null :
        eventDialog.place;
      this.event.placeLocality = eventDialog.placeLocality;
      this.event.placeDesc = eventDialog.placeDesc;
      this.eventSrv.updateEvent(this.event);
    });
  }
}
