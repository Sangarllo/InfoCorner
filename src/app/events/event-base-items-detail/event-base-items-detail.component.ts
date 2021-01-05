import { Component, Input } from '@angular/core';
import { IBase } from '@models/base';

@Component({
  selector: 'app-event-base-items-detail',
  templateUrl: './event-base-items-detail.component.html'
})
export class EventBaseItemsDetailComponent {

  @Input() baseItems: IBase[];

  constructor() { }
}
