import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '@services/users.service';
import { IUser, User } from '@shared/models/user';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  public user$: Observable<IUser | undefined> | null = null;
  public idUser: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userSrv: UserService,
  ) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id');
    if ( this.idUser ) {
      console.log(`id asked ${this.idUser}`);
      this.getDetails(this.idUser);
    }
  }

  getDetails(idUser: string): void {
    console.log(`id asked ${idUser}`);
    this.user$ = this.userSrv.getOneUser(idUser);
  }

  public gotoList(): void {
    this.router.navigate([`/${User.PATH_URL}`]);
  }

  public editItem(): void {
    this.router.navigate([`/${User.PATH_URL}/${this.idUser}/editar`]);
  }


}
