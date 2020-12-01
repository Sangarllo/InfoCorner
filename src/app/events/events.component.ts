import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventService } from '@services/events.service';
import { Observable } from 'rxjs';
import { IEvent } from '@shared/models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public events$!: Observable<IEvent[]>;
  displayedColumns: string[] = [ 'image', 'active', 'status', 'id', 'name', 'type' , 'actions3'];

  constructor(
    private router: Router,
    private eventSrv: EventService,
  ) { }

  ngOnInit(): void {
    this.events$ = this.eventSrv.getAllEvents();
  }

  public gotoItem(event: IEvent): void {
    this.router.navigate([`eventos/${event.id}`]);
  }

  public editItem(event: IEvent): void {
    this.router.navigate([`eventos/${event.id}/editar`]);
  }

  public deleteItem(event: IEvent): void {
    console.log(`deleting ${event.id}`);
  }

  public addItem(): void {
    this.router.navigate([`eventos/0/editar`]);
  }
}
