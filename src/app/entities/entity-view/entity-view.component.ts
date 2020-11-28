import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';

import { EntityService } from '../../core/services/entities.service';
import { IEntity } from '../../shared/models/entity';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.scss']
})
export class EntityViewComponent implements OnInit {

  public entity$: Observable<IEntity | undefined> | null = null;

  constructor(
    private route: ActivatedRoute,
    // private router: Router
    private entitiesSrv: EntityService,
  ) { }

  ngOnInit(): void {
    const idEntity = this.route.snapshot.paramMap.get('id');
    if ( idEntity ) {
      console.log(`id asked ${idEntity}`);
      this.getDetails(idEntity);
    }
  }

  getDetails(idEntity: string): void {
    console.log(`id asked ${idEntity}`);
    this.entity$ = this.entitiesSrv.getOneEntity(idEntity);
  }
}
