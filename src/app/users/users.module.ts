import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from '@app/users/users-routing.module';
import { UsersComponent } from '@app/users/users.component';
import { UserViewComponent } from '@app/users/user-view/user-view.component';
import { UserEditComponent } from '@app/users/user-edit/user-edit.component';
import { UserEntitiesComponent } from '@app/users/user-entities/user-entities.component';
import { UserAdminEntitiesComponent } from '@app/users/user-admin-entities/user-admin-entities.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserViewComponent,
    UserEditComponent,
    UserEntitiesComponent,
    UserAdminEntitiesComponent,
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
