import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AppointmentsService } from '@services/appointments.service';
import { IEvent } from '@models/event';
import { IAppointment } from '@models/appointment';

@Component({
  selector: 'app-event-appointment-detail',
  templateUrl: './event-appointment-detail.component.html'
})
export class EventAppointmentDetailComponent implements OnInit {

  @Input() event: IEvent;
  appointment$: Observable<IAppointment>;

  constructor(
    private appointmentSrv: AppointmentsService
  ) { }

  ngOnInit(): void {
    const idAppointment = this.event.appointmentId;
    this.appointment$ = this.appointmentSrv.getOneAppointment(idAppointment);
  }
}