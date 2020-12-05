import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AdminRoutingModule } from '@app/admin/admin-routing.module';
import { AdminComponent } from '@app/admin/admin.component';
import { UserProfileComponent } from '@app/admin/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AdminComponent,
    UserProfileComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
