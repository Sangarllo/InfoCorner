import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { EntityService } from '@services/entities.service';
import { Entity, IEntity } from '@shared/models/entity';


@Component({
  selector: 'app-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.scss']
})
export class EntityEditComponent implements OnInit {

  entityForm!: FormGroup;
  pageTitle = 'Creación de una nueva entidad';
  errorMessage = '';

  // public entity$: Observable<IEntity | undefined> | null = null;
  public entity!: IEntity | undefined;
  public TYPES: any[] = Entity.TYPES;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private entitiesSrv: EntityService) { }

  ngOnInit(): void {

    const idEntity = this.route.snapshot.paramMap.get('id');
    if ( idEntity ) {
      console.log(`id asked ${idEntity}`);
      this.getDetails(idEntity);
    }

    this.entityForm = this.fb.group({
      id: [{value: '0', disabled: true}],
      active: true,
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      image: Entity.IMAGE_DEFAULT,
      type: [ Entity.TYPE_DEFAULT, Validators.required],
    });

  }

  private getDetails(idEntity: string): void {
    console.log(`id asked ${idEntity}`);
    this.entitiesSrv.getOneEntity(idEntity)
      .subscribe({
        next: (entity: IEntity | undefined) => {
          this.entity = entity;
          this.displayEntity();
          console.log(JSON.stringify(this.entity));
        },
        error: err => {
          this.pageTitle = 'Creación de una nueva entidad';
          this.errorMessage = `Error: ${err}`;
        }
      });
    }


  displayEntity(): void {

    if (this.entityForm) {
      this.entityForm.reset();
    }

    if (this.entity.id === '0') {
      this.pageTitle = 'Creando una nueva entidad';
    } else {
      this.pageTitle = `Editando la entidad ${this.entity.name}`;
    }

    // Update the data on the form
    this.entityForm.patchValue({
      id: this.entity.id,
      active: this.entity.active,
      name: this.entity.name,
      image: this.entity.image ?? Entity.IMAGE_DEFAULT,
      type: this.entity.type
    });

    // tslint:disable-next-line:no-string-literal
    this.entityForm.controls['id'].setValue(this.entity.id);
  }

  // deleteCourse(): void {
  //   if (this.entity.id === '0') {
  //     // Don't delete, it was never saved.
  //     this.onSaveComplete();
  //   } else {
  //     if (confirm(`Realmente quieres eliminar: ${this.entity.name}?`)) {
  //       this.entitiesSrv.deleteEntity(this.entity.id);
  //       /*
  //         .subscribe({
  //           next: () => this.onSaveComplete(),
  //           error: err => this.errorMessage = err
  //         });
  //       */
  //     }
  //   }
  // }

  onResetForm(): void {
     this.entityForm.reset();
  }

  onSaveForm(): void {
    if (this.entityForm.valid) {

        const entityItem = { ...this.entity, ...this.entityForm.value };

        if (entityItem.id === '0') {
          this.entitiesSrv.addEntity(entityItem);
        } else {
          this.entitiesSrv.updateEntity(entityItem);
        }

        this.router.navigate([ Entity.PATH_URL]);

    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.entityForm.reset();
    Swal.fire({
      icon: 'success',
      title: 'Datos guardados con éxito',
      text: `Los datos de ${this.entity.name} se han guardado correctamente`,
      // footer: '<a href>Why do I have this issue?</a>'
    });
    this.router.navigate([`/${Entity.PATH_URL}`]);
  }

  gotoList(): void {
    this.entityForm.reset();
    this.router.navigate([`/${Entity.PATH_URL}`]);
  }

  // goBack(): void {
  //   // Reset the form to clear the flags
  //   this.entityForm.reset();
  //   this.router.navigate([`/${Course.PATH_URL}/${this.entity.id}`]);
  // }

}
