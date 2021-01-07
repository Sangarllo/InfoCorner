import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { IBase, Base, BaseType } from '@models/base';
import { IEvent } from '@models/event';
import { UtilsService, SwalMessage } from '@services/utils.service';
import { AppointmentsService } from '@services/appointments.service';
import { Appointment, IAppointment } from '@models/appointment';

@Component({
  selector: 'app-event-schedule-dialog',
  templateUrl: './event-schedule-dialog.component.html',
  styleUrls: ['./event-schedule-dialog.component.scss']
})
export class EventScheduleDialogComponent implements OnInit {

  title = 'Configura un acto para este evento';
  appointment: IAppointment;
  scheduleItemForm: FormGroup;
  imageSelected: string;
  dateIni: string;
  readonly IMAGE_BLANK: string = Base.IMAGE_DEFAULT;

  constructor(
    private fb: FormBuilder,
    private utilsSrv: UtilsService,
    private appointmentSrv: AppointmentsService,
    public dialogRef: MatDialogRef<EventScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: IEvent) {
  }

  ngOnInit(): void {
    const eventId = this.event.id;
    if ( eventId ) {
      this.getDetails(eventId);
    }

    this.scheduleItemForm = this.fb.group({
      image: [ '', []],
      name: [ '', []],
      dateIni: [ '', []],
      timeIni: [ Appointment.HOUR_DEFAULT, []],
  });
  }

  getDetails(eventId: string): void {
    this.appointmentSrv.getOneAppointment(eventId)
      .subscribe((appointment: IAppointment) => {
          this.appointment = appointment;
          this.dateIni = this.appointment.dateIni;
          this.displayDetails();
      });
  }

  displayDetails(): void {

    this.imageSelected = this.event.image;
    this.scheduleItemForm.patchValue({
      image: this.imageSelected,
      name: this.event.name,
      dateIni: this.appointment.dateIni,
      timeIni: this.appointment.timeIni,
    });
  }

  onSelectedImage(path: string): void {
    this.imageSelected = path;
  }

  onDateIniChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    const newDate = this.appointmentSrv.formatDate(event.value);
    this.dateIni = newDate;
  }

  onNoClick(): void {
    this.utilsSrv.swalFire(SwalMessage.NO_CHANGES);
    this.dialogRef.close();
  }

  save(): void {

    const timeIni = this.scheduleItemForm.controls.timeIni.value;
    const dateIniStr = `${this.dateIni} ${timeIni}`;

    const newBase: IBase = {
      id: '0',
      active: true,
      name: this.scheduleItemForm.controls.name.value,
      image: this.imageSelected,
      baseType: BaseType.EVENT,
      desc: dateIniStr
    };

    this.utilsSrv.swalFire(SwalMessage.OK_CHANGES, newBase.name);
    this.dialogRef.close(newBase);
  }
}
