import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { EventsRoutingModule } from '@app/events/events-routing.module';
import { EventsComponent } from '@app/events/events.component';
import { EventViewComponent } from '@app/events/event-view/event-view.component';
import { EventEditComponent } from '@app/events/event-edit/event-edit.component';
import { EventPlaceDialogComponent } from '@app/events/event-place-dialog/event-place-dialog.component';
import { EventPlaceDetailComponent } from '@app/events/event-place-detail/event-place-detail.component';
import { EventEntityDialogComponent } from '@app/events/event-entity-dialog/event-entity-dialog.component';
import { EventEntityPlaceDialogComponent } from '@app/events/event-entity-place-dialog/event-entity-place-dialog.component';
import { EventEntityDetailComponent } from '@app/events/event-entity-detail/event-entity-detail.component';
import { EventBasicDialogComponent } from '@app/events/event-basic-dialog/event-basic-dialog.component';
import { EventBasicDetailComponent } from '@app/events/event-basic-detail/event-basic-detail.component';
import { EventStatusDialogComponent } from '@app/events/event-status-dialog/event-status-dialog.component';
import { EventStatusDetailComponent } from '@app/events/event-status-detail/event-status-detail.component';
import { EventAppointmentDialogComponent } from '@app/events/event-appointment-dialog/event-appointment-dialog.component';
import { EventAppointmentDetailComponent } from '@app/events/event-appointment-detail/event-appointment-detail.component';
import { EventImageDialogComponent } from '@app/events/event-image-dialog/event-image-dialog.component';
import { EventImageDetailComponent } from '@app/events/event-image-detail/event-image-detail.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventViewComponent,
    EventEditComponent,
    EventPlaceDialogComponent,
    EventPlaceDetailComponent,
    EventEntityDialogComponent,
    EventEntityPlaceDialogComponent,
    EventEntityDetailComponent,
    EventBasicDialogComponent,
    EventBasicDetailComponent,
    EventStatusDialogComponent,
    EventStatusDetailComponent,
    EventAppointmentDialogComponent,
    EventAppointmentDetailComponent,
    EventImageDialogComponent,
    EventImageDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule
  ],
  exports: [
    EventEntityPlaceDialogComponent
  ]
})
export class EventsModule { }
