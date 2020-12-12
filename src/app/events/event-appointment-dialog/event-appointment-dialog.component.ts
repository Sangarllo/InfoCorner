import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { EntityService } from '@services/entities.service';
import { Base } from '@models/base';
import { IEvent } from '@models/event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-appointment-dialog',
  templateUrl: './event-appointment-dialog.component.html'
})
export class EventAppointmentDialogComponent implements OnInit {

  title = 'Selecciona los responsables del evento';
  entityForm: FormGroup;
  entityBaseSelected: Base;
  readonly SECTION_BLANK: Base = Base.InitDefault();

  entities$: Observable<Base[]>;

  constructor(
    private fb: FormBuilder,
    private entitySrv: EntityService,
    public dialogRef: MatDialogRef<EventAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent) {
  }

  ngOnInit(): void {

    this.entities$ = this.entitySrv.getAllEntitiesBase();

    this.entityBaseSelected = ( this.data.entity ) ? {
      id: this.data.entity.id,
      name: this.data.entity.name,
      image: this.data.entity.image
    } : this.SECTION_BLANK;

    this.entityForm = this.fb.group({
      entity: [ this.entityBaseSelected, []],
      entityRol: [ this.data.entityRol, []],
  });
  }

  onSelectionChanged(event: any): void {
    this.entityBaseSelected = event.value;
  }

  compareFunction(o1: any, o2: any): boolean {
    return (o1.name === o2.name && o1.id === o2.id);
   }

   onNoClick(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Datos no modificados',
      text: `Has cerrado la ventana sin guardar ningún cambio`,
    });
    this.dialogRef.close();
  }

  save(): void {
    Swal.fire({
      icon: 'success',
      title: 'Datos guardados con éxito',
      text: `La entidad ha sido cambiada correctamente`,
    });
    this.dialogRef.close(this.entityForm.value);
  }
}
