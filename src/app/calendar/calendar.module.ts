import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarRoutingModule } from '@app/calendar/calendar-routing.module';
import { CalendarComponent } from '@app/calendar/calendar.component';
import { CalendarHeaderComponent } from '@app/calendar/calendar-header.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarHeaderComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ]
})
export class CalendarEventsModule { }
