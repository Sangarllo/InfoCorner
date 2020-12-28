import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from '@app/home/home-routing.module';
import { HomeComponent } from '@app/home/home.component';
import { CalendarEventsModule } from '@app/calendar/calendar.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    CalendarEventsModule,
    SharedModule,
  ]
})
export class HomeModule { }
