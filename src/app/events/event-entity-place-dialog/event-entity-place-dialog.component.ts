import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

import { Base, IBase } from '@models/base';
import { Entity, IEntity } from '@models/entity';
import { IEvent } from '@models/event';
import { EntityService } from '@services/entities.service';
import { PlaceService } from '@services/places.service';
import { UtilsService, SwalMessage } from '@services/utils.service';

@Component({
  selector: 'app-event-entity-place-dialog',
  templateUrl: './event-entity-place-dialog.component.html'
})
export class EventEntityPlaceDialogComponent implements OnInit {

  title = 'Selecciona los responsables del evento';
  entityForm: FormGroup;
  entitySelected: IEntity;
  placeBaseSelected: Base;
  readonly ENTITY_BLANK: IEntity = Entity.InitDefault();
  readonly SECTION_BLANK: Base = Base.InitDefault();

  entities$: Observable<IEntity[]>;
  places$: Observable<Base[]>;

  constructor(
    private fb: FormBuilder,
    private utilsSrv: UtilsService,
    private entitySrv: EntityService,
    private placeSrv: PlaceService,
    public dialogRef: MatDialogRef<EventEntityPlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent) { // TODO: ¿data?
  }

  ngOnInit(): void {

    this.entities$ = this.entitySrv.getAllEntities();
    this.places$ = this.placeSrv.getAllPlacesBase();

    this.entitySelected = this.ENTITY_BLANK;

    this.entityForm = this.fb.group({
      entity: [ this.entitySelected, [Validators.required]],
      entityRol: [ this.entitySelected.roleDefault, []],
      place: [ this.SECTION_BLANK, []]
    });
  }

  onEntitySelectionChanged(event: any): void {
    this.entitySelected = event.value;

    let roleDefault = '';
    if ( !this.utilsSrv.compareFunction(this.entitySelected, this.ENTITY_BLANK) ) {
      roleDefault = this.entitySelected.roleDefault;
    }
    this.entityForm.controls.entityRol.setValue( this.entitySelected.roleDefault );

    let entityPlace: Base = this.SECTION_BLANK;
    if ( this.entitySelected.place ) {
      entityPlace = this.entitySelected.place as Base;
    }
    console.log(`entityPlace: ${JSON.stringify(entityPlace)}`);
    this.entityForm.controls.place.setValue( entityPlace );
  }

  onPlaceSelectionChanged(event: any): void {
    this.placeBaseSelected = event.value;
  }

  compareFunction(o1: IBase, o2: IBase): boolean {
    return this.utilsSrv.compareFunction(o1, o2);
  }

  onNoClick(): void {
    this.utilsSrv.swalFire(SwalMessage.NO_CHANGES);
    this.dialogRef.close();
  }

  create(): void {
    if ( this.entitySelected === this.ENTITY_BLANK ) {
      Swal.fire({
        icon: 'error',
        title: 'Evento no creado',
        text: `Has de escoger una entidad para poder crear el evento`,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: `Evento de ${this.entitySelected.name} iniciado con éxito`,
        text: `Completa el resto de datos de este evento`,
      });
      this.dialogRef.close(this.entityForm.value);
    }
  }
}
