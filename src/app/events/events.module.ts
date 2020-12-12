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
import { EventEntityDetailComponent } from '@app/events/event-entity-detail/event-entity-detail.component';
import { EventBasicDialogComponent } from '@app/events/event-basic-dialog/event-basic-dialog.component';
import { EventBasicDetailComponent } from '@app/events/event-basic-detail/event-basic-detail.component';
import { EventStatusDialogComponent } from '@app/events/event-status-dialog/event-status-dialog.component';
import { EventStatusDetailComponent } from '@app/events/event-status-detail/event-status-detail.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventViewComponent,
    EventEditComponent,
    EventPlaceDialogComponent,
    EventPlaceDetailComponent,
    EventEntityDialogComponent,
    EventEntityDetailComponent,
    EventBasicDialogComponent,
    EventBasicDetailComponent,
    EventStatusDialogComponent,
    EventStatusDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
