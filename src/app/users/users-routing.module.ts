import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from '@app/users/users.component';
import { UserViewComponent } from '@app/users/user-view/user-view.component';
import { UserEditComponent } from '@app/users/user-edit/user-edit.component';
import { UserEntitiesComponent } from '@app/users/user-entities/user-entities.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: ':id',
    component: UserViewComponent,
  },
  {
    path: ':id/editar',
    component: UserEditComponent,
  },
  {
    path: ':id/entidades',
    component: UserEntitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
