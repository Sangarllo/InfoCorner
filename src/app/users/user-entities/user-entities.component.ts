import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  public idUser: string;
  public user$!: Observable<IUser>;
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

    this.idUser = this.route.snapshot.paramMap.get('id');
    if ( this.idUser ) {
      this.user$ = this.userSrv.getOneUser(this.idUser);
    }
  }

  onSelectedOption(entity: IEntity): void {
    this.selectedEntity = entity;
    console.log(`onSelectedOption: ${JSON.stringify(entity)}`);
  }


  public gotoEntity(entity: IEntity): void {
    this.router.navigate([`entidades/${entity.id}`]);
  }

  public deleteUserEntity(entity: IEntity): void {
    // TODO
  }

  public addUserEntity(): void {
    console.log(`Asociada!`);
    this.selectedEntity = undefined;
  }

  public cancel(): void {
    console.log(`Asociada!`);
    this.selectedEntity = undefined;
  }
}
