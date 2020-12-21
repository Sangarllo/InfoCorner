import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { EntityService } from '@services/entities.service';
import { Base } from '@models/base';
import { IEvent } from '@models/event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-image-dialog',
  templateUrl: './event-image-dialog.component.html',
  styleUrls: ['./event-image-dialog.component.scss']
})
export class EventImageDialogComponent implements OnInit {

  title = 'Selecciona la imagen del evento';
  imageForm: FormGroup;
  imageSelected: string; // TODO: image must be IImage
  readonly IMAGE_BLANK: string = Base.IMAGE_DEFAULT;

  entities$: Observable<Base[]>;

  constructor(
    private fb: FormBuilder,
    private entitySrv: EntityService,
    public dialogRef: MatDialogRef<EventImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent) {
  }

  addImage(): void {
    console.log(`adding other image`);
  }

  onSelectedImage(path: string): void {
    console.log(`selected image: ${path}`);
    this.imageSelected = path;
    this.data.image = path;
  }

  ngOnInit(): void {

    this.imageSelected = this.data.image ??
    this.IMAGE_BLANK;

    this.imageForm = this.fb.group({
      image: [ this.imageSelected, []],
      images: [ this.data.images, []],
  });
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
      text: `La imagen ha sido cambiada correctamente`,
    });
    this.dialogRef.close(this.imageForm.value);
  }
}
