import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { IEntity, Entity } from '@models/entity';

@Component({
  selector: 'app-user-entities',
  templateUrl: './user-entities.component.html',
  styleUrls: ['./user-entities.component.scss']
})
export class UserEntitiesComponent implements OnInit {

  @Input() entities: IEntity[];
  dataSource: MatTableDataSource<IEntity>;

  displayedColumns: string[] = [ 'image', 'active', 'id', 'name'];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.entities);
  }

  public gotoEntity(entity: IEntity): void {
    this.router.navigate([`${Entity.PATH_URL}/${entity.id}`]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
