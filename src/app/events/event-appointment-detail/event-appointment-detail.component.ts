import { Component, Input } from '@angular/core';
import { IEvent } from '@models/event';

@Component({
  selector: 'app-event-appointment-detail',
  templateUrl: './event-appointment-detail.component.html'
})
export class EventAppointmentDetailComponent {

  @Input() event: IEvent;

  constructor() { }
}
