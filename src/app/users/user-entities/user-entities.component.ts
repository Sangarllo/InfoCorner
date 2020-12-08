import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IEntity, Entity } from '@models/entity';

@Component({
  selector: 'app-user-entities',
  templateUrl: './user-entities.component.html',
  styleUrls: ['./user-entities.component.scss']
})
export class UserEntitiesComponent {

  @Input() entities: IEntity[];

  displayedColumns: string[] = [ 'image', 'active', 'id', 'name'];

  constructor(
    private router: Router,
  ) {
  }

  public gotoEntity(entity: IEntity): void {
    this.router.navigate([`${Entity.PATH_URL}/${entity.id}`]);
  }
}
