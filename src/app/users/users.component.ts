import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '@services/users.service';
import { IUser } from '@models/user';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción de borrado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userSrv.deleteUser(user);
        Swal.fire(
          '¡Borrado!',
          `${user.displayName} ha sido borrado`,
          'success'
        );
      }
    });
  }

  public addUser(): void {
    this.router.navigate([`usuarios/0/editar`]);
  }
}
