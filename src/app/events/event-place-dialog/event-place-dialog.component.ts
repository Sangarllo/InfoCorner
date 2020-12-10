import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

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
export class EventPlaceDialogComponent {

  // pristine: boolean = true;
  // placeCtrl = new FormControl();
  // sectionSelected: Base;
  // readonly SECTION_BLANK: Base = Base.InitDefault();

  // public places$: Observable<IPlace[]>;

  constructor(
    // private placeSrv: PlaceService,
    public dialogRef: MatDialogRef<EventPlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent) {

      console.log(`data.locality: ${JSON.stringify(data.locality)}`);
      /*
      this.places$ = this.placeSrv.getAllPlaces();
      */
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // setLocation() {
  //   this.pristine = false;
  //   this.sectionSelected = new Base(
  //       this.placeCtrl.value._id,
  //       this.placeCtrl.value.name,
  //       this.placeCtrl.value.image
  //     );
  // }

}
