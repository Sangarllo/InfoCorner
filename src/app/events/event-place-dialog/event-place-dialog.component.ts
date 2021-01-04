import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { IBase, Base } from '@models/base';
import { IEvent } from '@models/event';
import { PlaceService } from '@services/places.service';
import { UtilsService, SwalMessage } from '@services/utils.service';

@Component({
  selector: 'app-event-place-dialog',
  templateUrl: './event-place-dialog.component.html',
  styleUrls: ['./event-place-dialog.component.scss']
})
export class EventPlaceDialogComponent implements OnInit {

  title = 'Selecciona la ubicación del evento';
  placeForm: FormGroup;
  placeCtrl = new FormControl();
  placeBaseSelected: IBase;
  readonly SECTION_BLANK: Base = Base.InitDefault();
  places$: Observable<IBase[]>;

  constructor(
    private fb: FormBuilder,
    private utilsSrv: UtilsService,
    private placeSrv: PlaceService,
    public dialogRef: MatDialogRef<EventPlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent) {
  }

  ngOnInit(): void {

    this.places$ = this.placeSrv.getAllPlacesBase();

    this.placeBaseSelected = this.SECTION_BLANK;

    this.placeForm = this.fb.group({
      place: [ this.placeBaseSelected, []],
      placeDesc: [ this.placeBaseSelected.desc, []],
  });
  }

  onSelectionChanged(event: any): void {
    this.placeBaseSelected = event.value;
  }

  compareFunction(o1: IBase, o2: IBase): boolean {
      return this.utilsSrv.compareFunction(o1, o2);
  }

  onNoClick(): void {
    this.utilsSrv.swalFire(SwalMessage.NO_CHANGES);
    this.dialogRef.close();
  }

  save(): void {
    this.utilsSrv.swalFire(SwalMessage.OK_CHANGES, 'ubicación');
    this.dialogRef.close(this.placeForm.value);
  }
}
