import { Component, OnInit } from '@angular/core';
import { EntityService } from '../core/services/entities.service';
import { Observable } from 'rxjs';
import { IEntity } from '../shared/models/entity';
import { Router } from '@angular/router';

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
