import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { PlaceService } from '@services/places.service';
import { Base } from '@models/base';
import { IEvent } from '@models/event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-place-dialog',
  templateUrl: './event-place-dialog.component.html',
  styleUrls: ['./event-place-dialog.component.scss']
})
export class EventPlaceDialogComponent implements OnInit {

  title = 'Selecciona la ubicación del evento';
  placeForm: FormGroup;
  placeCtrl = new FormControl();
  placeBaseSelected: Base;
  readonly SECTION_BLANK: Base = Base.InitDefault();
  places$: Observable<Base[]>;

  constructor(
    private fb: FormBuilder,
    private placeSrv: PlaceService,
    public dialogRef: MatDialogRef<EventPlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent) {
  }

  ngOnInit(): void {

    this.places$ = this.placeSrv.getAllPlacesBase();

    this.placeBaseSelected = ( this.data.place ) ?
      this.data.place as Base
      : this.SECTION_BLANK;

    this.placeForm = this.fb.group({
      place: [ this.placeBaseSelected, []],
      placeLocality: [ this.data.placeLocality, []],
      placeDesc: [ this.data.placeDesc, []],
  });
  }

  onSelectionChanged(event: any): void {
    this.placeBaseSelected = event.value;
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
      text: `La ubicación ha sido cambiada correctamente`,
    });
    this.dialogRef.close(this.placeForm.value);
  }
}
