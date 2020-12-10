import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EventService } from '@services/events.service';
import { IEvent, Event } from '@shared/models/event';
import { EventPlaceDialogComponent } from '@app/events/event-place-dialog/event-place-dialog.component';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  // public event$: Observable<IEvent | undefined> | null = null;
  public event: IEvent;
  public idEvent: string;

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
    const dialogRef = this.dialog.open(EventPlaceDialogComponent, {
      width: '400px',
      data: this.event
    });

    dialogRef.afterClosed().subscribe((data: IEvent) => {
      console.log(`The dialog was closed: ${JSON.stringify(data)}`);
    });
  }
}
