import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { IEntity } from '@models/entity';
import { IUser } from '@models/user';
import { UserService } from '@services/users.service';
import { EntityService } from '@services/entities.service';

@Component({
  selector: 'app-user-entities',
  templateUrl: './user-entities.component.html',
  styleUrls: ['./user-entities.component.scss']
})
export class UserEntitiesComponent implements OnInit {

  public uidUser: string;
  // public user$!: Observable<IUser>;
  public user: IUser;
  public filteredEntities: Observable<IEntity[]>;

  entities: IEntity[];
  entityCtrl = new FormControl();
  entityForm!: FormGroup;
  selectedEntity: IEntity;

  displayedColumns: string[] = [ 'image', 'active', 'id', 'name', 'type' , 'actions3'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSrv: UserService,
    private entitySrv: EntityService,
  ) {

    this.entitySrv.getAllEntities().subscribe(
      (entities: IEntity[]) => {
        this.entities = entities;
        this.filteredEntities = this.entityCtrl.valueChanges
        .pipe(
          startWith(''),
          map(entity => entity ? this._filterEntities(entity) : this.entities.slice())
        );
      }
    );
  }

  private _filterEntities(value: string): IEntity[] {
    const filterValue = value.toLowerCase();

    return this.entities.filter(entity => entity.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {

    this.uidUser = this.route.snapshot.paramMap.get('uid');
    if ( this.uidUser ) {
      this.userSrv.getOneUser(this.uidUser)
        .subscribe( (user: IUser) => {
          this.user = user;
          this.user.entitiesAdmin = this.user.entitiesAdmin ?? [];
        });
    }
  }

  onSelectedOption(entity: IEntity): void {
    this.selectedEntity = entity;
    console.log(`onSelectedOption: ${JSON.stringify(entity)}`);
  }


  public gotoEntity(entity: IEntity): void {
    this.router.navigate([`entidades/${entity.id}`]);
  }

  public deleteUserEntity(deletedEntity: IEntity): void {

    this.user.entitiesAdmin = this.user.entitiesAdmin.filter( entity => entity.id !== deletedEntity.id );

    this.userSrv.updateUser(this.user);

    Swal.fire({
        icon: 'success',
        title: 'Datos guardados con éxito',
        text: `${this.user.displayName} ya no gestiona la entidad ${deletedEntity.name}`,
      });
  }

  public addUserEntity(): void {

    const filter = this.user.entitiesAdmin.filter( entity => entity.id === this.selectedEntity.id );

    if ( filter.length === 0 ) {
      this.user.entitiesAdmin.push(this.selectedEntity);
      this.userSrv.updateUser(this.user);
      Swal.fire({
        icon: 'success',
        title: 'Datos guardados con éxito',
        text: `${this.user.displayName} ya puede gestionar la entidad ${this.selectedEntity.name}`,
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No ha sido posible',
        text: `${this.user.displayName} ya podía gestionar la entidad ${this.selectedEntity.name}`,
        footer: '<i>En caso de dudas, consulta con el administrador</>'
      });
    }

    this.selectedEntity = undefined;
  }

  public cancel(): void {
    console.log(`Asociada!`);
    this.selectedEntity = undefined;
  }
}
