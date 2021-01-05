import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { EventsRoutingModule } from '@app/events/events-routing.module';
import { EventsComponent } from '@app/events/events.component';
import { EventViewComponent } from '@app/events/event-view/event-view.component';
import { EventAuditDetailComponent } from '@app/events/event-audit-detail/event-audit-detail.component';
import { EventEditComponent } from '@app/events/event-edit/event-edit.component';
import { EventPlaceDetailComponent } from '@app/events/event-place-detail/event-place-detail.component';
import { EventEntityDetailComponent } from '@app/events/event-entity-detail/event-entity-detail.component';
import { EventBasicDialogComponent } from '@app/events/event-basic-dialog/event-basic-dialog.component';
import { EventBasicDetailComponent } from '@app/events/event-basic-detail/event-basic-detail.component';
import { EventStatusDialogComponent } from '@app/events/event-status-dialog/event-status-dialog.component';
import { EventStatusDetailComponent } from '@app/events/event-status-detail/event-status-detail.component';
import { EventAppointmentDialogComponent } from '@app/events/event-appointment-dialog/event-appointment-dialog.component';
import { EventAppointmentDetailComponent } from '@app/events/event-appointment-detail/event-appointment-detail.component';
import { EventImageDialogComponent } from '@app/events/event-image-dialog/event-image-dialog.component';
import { EventImageDetailComponent } from '@app/events/event-image-detail/event-image-detail.component';
import { EventNewBaseDialogComponent } from '@app/events/event-new-base-dialog/event-new-base-dialog.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventViewComponent,
    EventEditComponent,
    EventAuditDetailComponent,
    EventPlaceDetailComponent,
    EventEntityDetailComponent,
    EventBasicDialogComponent,
    EventBasicDetailComponent,
    EventStatusDialogComponent,
    EventStatusDetailComponent,
    EventAppointmentDialogComponent,
    EventAppointmentDetailComponent,
    EventImageDialogComponent,
    EventImageDetailComponent,
    EventNewBaseDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule
  ],
  exports: [
  ]
})
export class EventsModule { }
