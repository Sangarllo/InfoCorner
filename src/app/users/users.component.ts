import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '@services/users.service';
import { IUser } from '@models/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users$!: Observable<IUser[]>;
  displayedColumns: string[] = [ 'photoURL',  'uid', 'displayName', 'email', 'role' , 'actions3'];

  constructor(
    private router: Router,
    private userSrv: UserService,
  ) { }

  ngOnInit(): void {
    this.users$ = this.userSrv.getAllUsers();
  }

  public gotoUser(user: IUser): void {
    this.router.navigate([`usuarios/${user.uid}`]);
  }

  public editUser(user: IUser): void {
    this.router.navigate([`usuarios/${user.uid}/editar`]);
  }

  public deleteUser(user: IUser): void {
    console.log(`deleting ${user.uid}`);
  }

  public addUser(): void {
    this.router.navigate([`usuarios/0/editar`]);
  }
}
