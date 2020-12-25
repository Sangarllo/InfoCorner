import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { EntityService } from '@services/entities.service';
import { IEntity } from '@models/entity';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  public entities$!: Observable<IEntity[]>;
  displayedColumns: string[] = [ 'image', 'id', 'name', 'place', 'roleDefault', 'actions3'];

  constructor(
    private router: Router,
    private entitySrv: EntityService,
  ) { }

  ngOnInit(): void {
    this.entities$ = this.entitySrv.getAllEntities();
  }

  public gotoEntity(entity: IEntity): void {
    this.router.navigate([`entidades/${entity.id}`]);
  }

  public editEntity(entity: IEntity): void {
    this.router.navigate([`entidades/${entity.id}/editar`]);
  }

  public deleteEntity(entity: IEntity): void {
    console.log(`Borrando ${entity.id}`);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción de borrado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entitySrv.deleteEntity(entity);
        Swal.fire(
          '¡Borrado!',
          `${entity.name} ha sido borrado`,
          'success'
        );
      }
    });
  }

  public addEntity(): void {
    this.router.navigate([`entidades/0/editar`]);
  }
}
