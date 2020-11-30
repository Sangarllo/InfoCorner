import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '@auth/auth-firebase.service';
import { IUser } from '@models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<IUser> = this.authSvc.afAuth.user;

  constructor(
    public authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onHomeClick(): void {
    this.router.navigate(['.']);
  }

  public gotoEntities(): void {
    this.router.navigate(['entidades']);
  }

  public gotoPlaces(): void {
    this.router.navigate(['lugares']);
  }

  async onLogout(): Promise<void> {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

}
