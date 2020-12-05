import { NgModule } from '@angular/core';

import { LoginRoutingModule } from '@app/login/login-routing.module';
import { LoginComponent } from '@app/login/login.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    SharedModule,
  ]
})
export class LoginModule { }
