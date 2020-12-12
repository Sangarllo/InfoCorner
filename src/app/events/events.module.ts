import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventViewComponent } from '@app/events/event-view/event-view.component';
import { EventEditComponent } from '@app/events/event-edit/event-edit.component';
import { SharedModule } from '@shared/shared.module';
import { EventPlaceDialogComponent } from './event-place-dialog/event-place-dialog.component';
import { EventPlaceDetailComponent } from './event-place-detail/event-place-detail.component';
import { EventEntityDialogComponent } from './event-entity-dialog/event-entity-dialog.component';
import { EventEntityDetailComponent } from './event-entity-detail/event-entity-detail.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventViewComponent,
    EventEditComponent,
    EventPlaceDialogComponent,
    EventPlaceDetailComponent,
    EventEntityDialogComponent,
    EventEntityDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
