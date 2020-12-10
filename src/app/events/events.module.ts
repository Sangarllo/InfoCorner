import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventViewComponent } from '@app/events/event-view/event-view.component';
import { EventEditComponent } from '@app/events/event-edit/event-edit.component';
import { SharedModule } from '@shared/shared.module';
import { EventPlaceDialogComponent } from './event-place-dialog/event-place-dialog.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventViewComponent,
    EventEditComponent,
    EventPlaceDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
