import { Component, Input } from '@angular/core';
import { IEvent } from '@models/event';

@Component({
  selector: 'app-event-entity-detail',
  templateUrl: './event-entity-detail.component.html'
})
export class EventEntityDetailComponent {

  @Input() event: IEvent;

  constructor() { }
}
