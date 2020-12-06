import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { EventService } from '@services/events.service';
import { IEvent, Event } from '@shared/models/event';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  public event$: Observable<IEvent | undefined> | null = null;
  public idEvent: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventSrv: EventService,
  ) { }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('id');
    if ( this.idEvent ) {
      console.log(`id asked ${this.idEvent}`);
      this.getDetails(this.idEvent);
    }
  }

  getDetails(idEvent: string): void {
    console.log(`id asked ${idEvent}`);
    this.event$ = this.eventSrv.getOneEvent(idEvent);
  }

  public gotoList(): void {
    this.router.navigate([`/${Event.PATH_URL}`]);
  }

  public editItem(): void {
    this.router.navigate([`/${Event.PATH_URL}/${this.idEvent}/editar`]);
  }
}
