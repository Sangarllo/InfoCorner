import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '@auth/auth-firebase.service';
import { IUser } from '@models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public user$: Observable<IUser> = this.authSvc.afAuth.user;

  constructor(
    public authSvc: AuthService,
    private router: Router
  ) {}

  async onLogout(): Promise<void> {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
