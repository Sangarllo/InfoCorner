import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { PlaceService } from '@services/places.service';
import { IPlace } from '@models/place';
import { Base } from '@models/base';
import { IEvent } from '@models/event';

@Component({
  selector: 'app-event-place-dialog',
  templateUrl: './event-place-dialog.component.html',
  styleUrls: ['./event-place-dialog.component.scss']
})
export class EventPlaceDialogComponent implements OnInit {

  placeForm: FormGroup;
  placeCtrl = new FormControl();
  placeSelected: Base;
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

    this.placeSelected = ( this.data.place ) ? {
      id: this.data.place.id,
      name: this.data.place.name,
      image: this.data.place.image
    } : this.SECTION_BLANK;

    this.placeForm = this.fb.group({
      locality: [ this.data.locality, []],
      place: [ this.placeSelected, []],
  });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.placeForm.value);
  }

  compareFunction(o1: any, o2: any): boolean {
    return (o1.name === o2.name && o1.id === o2.id);
   }
}
