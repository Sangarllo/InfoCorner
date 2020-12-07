import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { NoticeService } from '@services/notices.service';
import { Notice, INotice } from '@shared/models/notice';
import { finalize } from 'rxjs/operators';
import { Status } from '@models/status.enum';


@Component({
  selector: 'app-notice-edit',
  templateUrl: './notice-edit.component.html',
  styleUrls: ['./notice-edit.component.scss']
})
export class NoticeEditComponent implements OnInit {

  noticeForm!: FormGroup;
  pageTitle = 'Creación de un nuevo aviso';
  errorMessage = '';
  uploadPercent: Observable<number>;

  public notice!: INotice | undefined;
  public TYPES: any[] = Notice.TYPES;
  public STATUS: Status[] = Notice.STATUS;

  constructor(
    private afStorage: AngularFireStorage,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private NoticeSrv: NoticeService) { }

  ngOnInit(): void {

    const idNotice = this.route.snapshot.paramMap.get('id');
    if ( idNotice ) {
      console.log(`id asked ${idNotice}`);
      this.getDetails(idNotice);
    }

    this.noticeForm = this.fb.group({
      id: [{value: '0', disabled: true}],
      active: true,
      status: [ Status.Editing, Validators.required],
      focused: true,
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      image: Notice.IMAGE_DEFAULT,
      type: [ Notice.TYPE_DEFAULT, Validators.required],
      text: ''
    });

  }

  private getDetails(idNotice: string): void {
    console.log(`id asked ${idNotice}`);

    if ( idNotice === '0' ) {
      this.pageTitle = 'Creación de un nuevo aviso';
      this.notice = Notice.InitDefault();
    } else {
      this.NoticeSrv.getOneNotice(idNotice)
      .subscribe({
        next: (notice: INotice | undefined) => {
          this.notice = notice;
          this.displayNotice();
          console.log(JSON.stringify(this.notice));
        },
        error: err => {
          this.errorMessage = `Error: ${err}`;
        }
      });
    }
  }


  displayNotice(): void {

    if (this.noticeForm) {
      this.noticeForm.reset();
    }

    if (this.notice.id === '0') {
      this.pageTitle = 'Creando un nuevo aviso';
    } else {
      this.pageTitle = `Editando el aviso ${this.notice.name}`;
    }

    // Update the data on the form
    this.noticeForm.patchValue({
      id: this.notice.id,
      active: this.notice.active,
      status: this.notice.status,
      focused: this.notice.focused,
      name: this.notice.name,
      image: this.notice.image ?? Notice.IMAGE_DEFAULT,
      type: this.notice.type,
      locality: ''
    });

    // tslint:disable-next-line:no-string-literal
    this.noticeForm.controls['id'].setValue(this.notice.id);
  }

  onResetForm(): void {
     this.noticeForm.reset();
  }

  onSaveForm(): void {
    if (this.noticeForm.valid) {

        const noticeItem = { ...this.notice, ...this.noticeForm.value };

        if (noticeItem.id === '0') {
          this.NoticeSrv.addNotice(noticeItem);
        } else {
          this.NoticeSrv.updateNotice(noticeItem);
        }

        this.router.navigate([ Notice.PATH_URL]);

    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.noticeForm.reset();
    Swal.fire({
      icon: 'success',
      title: 'Datos guardados con éxito',
      text: `Los datos de ${this.notice.name} se han guardado correctamente`,
      // footer: '<a href>Why do I have this issue?</a>'
    });
    this.router.navigate([`/${Notice.PATH_URL}`]);
  }

  gotoList(): void {
    this.noticeForm.reset();
    this.router.navigate([`/${Notice.PATH_URL}`]);
  }

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
            ( imageUrl: string ) => {

              this.notice.image = imageUrl;

              // Update the data on the form
              this.noticeForm.patchValue({
                image: this.notice.image
              });
          });
        })
     )
    .subscribe();
  }


}
