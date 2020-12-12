import { Component, Input } from '@angular/core';
import { IEvent } from '@models/event';

@Component({
  selector: 'app-event-place-detail',
  templateUrl: './event-place-detail.component.html',
  styleUrls: ['./event-place-detail.component.scss']
})
export class EventPlaceDetailComponent {

  @Input() event: IEvent;

  constructor() { }
}
