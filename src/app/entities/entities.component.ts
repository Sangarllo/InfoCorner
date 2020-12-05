import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { EntityService } from '@services/entities.service';
import { IEntity } from '@models/entity';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  public entities$!: Observable<IEntity[]>;
  displayedColumns: string[] = [ 'image', 'active', 'id', 'name', 'type' , 'actions3'];

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
    console.log(`deleting ${entity.id}`);
  }

  public addEntity(): void {
    this.router.navigate([`entidades/0/editar`]);
  }
}
