import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesComponent } from './entities.component';
import { EntityViewComponent } from './entity-view/entity-view.component';
import { EntityEditComponent } from './entity-edit/entity-edit.component';


@NgModule({
  declarations: [EntitiesComponent, EntityViewComponent, EntityEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    EntitiesRoutingModule
  ]
})
export class EntitiesModule { }
