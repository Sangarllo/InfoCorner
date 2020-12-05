import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { UserService } from '@services/users.service';
import { IUser, User } from '@shared/models/user';
import { finalize } from 'rxjs/operators';
import { UserRole } from '@models/user-role.enum';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm!: FormGroup;
  pageTitle = 'Creación de un nuevo usuario';
  errorMessage = '';
  uploadPercent: Observable<number>;

  public user!: IUser | undefined;
  public ROLES: UserRole[] = User.ROLES;

  constructor(
    private afStorage: AngularFireStorage,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersSrv: UserService) { }

  ngOnInit(): void {

    const idUser = this.route.snapshot.paramMap.get('id');
    if ( idUser ) {
      console.log(`id asked ${idUser}`);
      this.getDetails(idUser);
    }

    this.userForm = this.fb.group({
      id: [{value: '0', disabled: true}],
      active: true,
      email: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      emailVerified: false,
      displayName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      password: '',
      photoURL: User.IMAGE_DEFAULT,
      role: UserRole.Lector,
      entitiesAdmin: []
    });

  }

  private getDetails(idUser: string): void {
    console.log(`id asked ${idUser}`);

    if ( idUser === '0' ) {
      this.pageTitle = 'Creación de un nuevo usuario';
      this.user = User.InitDefault();
    } else {
      this.usersSrv.getOneUser(idUser)
      .subscribe({
        next: (user: IUser | undefined) => {
          this.user = user;
          this.displayUser();
          console.log(JSON.stringify(this.user));
        },
        error: err => {
          this.errorMessage = `Error: ${err}`;
        }
      });
    }
  }


  displayUser(): void {

    if (this.userForm) {
      this.userForm.reset();
    }

    if (this.user.uid === '0') {
      this.pageTitle = 'Creando un nuevo usuario';
    } else {
      this.pageTitle = `Editando al usuario ${this.user.displayName}`;
    }

    // Update the data on the form
    this.userForm.patchValue({
      id: this.user.uid,
      active: this.user.active,
      email: this.user.email,
      emailVerified: this.user.emailVerified,
      displayName: this.user.displayName,
      password: this.user.password ?? '',
      photoURL: this.user.photoURL ?? User.IMAGE_DEFAULT,
      role: this.user.role,
      entitiesAdmin: this.user.entitiesAdmin,
    });

    // tslint:disable-next-line:no-string-literal
    this.userForm.controls['id'].setValue(this.user.uid);
  }

  // deleteCourse(): void {
  //   if (this.entity.id === '0') {
  //     // Don't delete, it was never saved.
  //     this.onSaveComplete();
  //   } else {
  //     if (confirm(`Realmente quieres eliminar: ${this.entity.name}?`)) {
  //       this.entitiesSrv.deleteEntity(this.entity.id);
  //       /*
  //         .subscribe({
  //           next: () => this.onSaveComplete(),
  //           error: err => this.errorMessage = err
  //         });
  //       */
  //     }
  //   }
  // }

  onResetForm(): void {
     this.userForm.reset();
  }

  onSaveForm(): void {
    if (this.userForm.valid) {

        const userItem = { ...this.user, ...this.userForm.value };

        if (userItem.id === '0') {
          this.usersSrv.addUser(userItem);
        } else {
          this.usersSrv.updateUser(userItem);
        }

        this.router.navigate([ User.PATH_URL]);

    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.userForm.reset();
    Swal.fire({
      icon: 'success',
      title: 'Datos guardados con éxito',
      text: `Los datos de ${this.user.displayName} se han guardado correctamente`,
      // footer: '<a href>Why do I have this issue?</a>'
    });
    this.router.navigate([`/${User.PATH_URL}`]);
  }

  gotoList(): void {
    this.userForm.reset();
    this.router.navigate([`/${User.PATH_URL}`]);
  }

  // goBack(): void {
  //   // Reset the form to clear the flags
  //   this.entityForm.reset();
  //   this.router.navigate([`/${Course.PATH_URL}/${this.entity.id}`]);
  // }

  uploadImage(event): void {
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            ( photoURL: string ) => {

              this.user.photoURL = photoURL;

              // Update the data on the form
              this.userForm.patchValue({
                photoURL: this.user.photoURL
              });
          });
        })
     )
    .subscribe();
  }

}
