import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from '@app/users/users.component';
import { UserViewComponent } from '@app/users/user-view/user-view.component';
import { UserEditComponent } from '@app/users/user-edit/user-edit.component';
import { UserAdminEntitiesComponent } from '@app/users/user-admin-entities/user-admin-entities.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: ':uid',
    component: UserViewComponent,
  },
  {
    path: ':uid/editar',
    component: UserEditComponent,
  },
  {
    path: ':uid/entidades',
    component: UserAdminEntitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
