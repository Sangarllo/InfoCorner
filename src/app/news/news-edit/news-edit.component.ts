import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { EVENT_CATEGORIES, Category } from '@models/category.enum';
import { INewsItem, NewsItem } from '@models/news';
import { Status } from '@models/status.enum';
import { AppointmentsService } from '@services/appointments.service';
import { NewsService } from '@services/news.services';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit {

  newsItemForm!: FormGroup;
  pageTitle = 'Creación de una nueva noticia';
  errorMessage = '';
  uploadPercent: Observable<number>;

  public newsItem!: INewsItem | undefined;
  public STATUS: Status[] = NewsItem.STATUS;
  public CATEGORIES: Category[] = EVENT_CATEGORIES;

  constructor(
    private afStorage: AngularFireStorage,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentSrv: AppointmentsService,
    private newsSrv: NewsService) { }

  ngOnInit(): void {

    const idNewsItem = this.route.snapshot.paramMap.get('id');
    if ( idNewsItem ) {
      console.log(`id asked ${idNewsItem}`);
      this.getDetails(idNewsItem);
    }

    this.newsItemForm = this.fb.group({
      id: [{value: '0', disabled: true}],
      active: true,
      status: [ Status.Editing, Validators.required],
      focused: true,
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]],
      image: NewsItem.IMAGE_DEFAULT,
      categories: null,
      description: '',
      timestamp: null,
      sourceName: '',
      sourceUrl: ['', [Validators.required]]
    });
  }

  private getDetails(idNewsItem: string): void {
    console.log(`id asked ${idNewsItem}`);

    if ( idNewsItem === '0' ) {
      this.pageTitle = 'Creación de una nueva noticia';
      this.newsItem = NewsItem.InitDefault();
    } else {
      this.newsSrv.getOneNewsItem(idNewsItem)
      .subscribe({
        next: (newsItem: INewsItem | undefined) => {
          this.newsItem = newsItem;
          this.displayNewsItem();
          console.log(JSON.stringify(this.newsItem));
        },
        error: err => {
          this.errorMessage = `Error: ${err}`;
        }
      });
    }
  }


  displayNewsItem(): void {

    if (this.newsItemForm) {
      this.newsItemForm.reset();
    }

    if (this.newsItem.id === '0') {
      this.pageTitle = 'Creando una nueva noticia';
    } else {
      this.pageTitle = `Editando la noticia ${this.newsItem.name}`;
    }

    // Update the data on the form
    this.newsItemForm.patchValue({
      id: this.newsItem.id,
      active: this.newsItem.active,
      status: this.newsItem.status,
      focused: this.newsItem.focused,
      name: this.newsItem.name,
      image: this.newsItem.image ?? NewsItem.IMAGE_DEFAULT,
      categories: this.newsItem.categories ?? [],
      description: this.newsItem.description ?? '',
      timestamp: this.newsItem.timestamp ?? '',
      sourceName: this.newsItem.sourceName ?? '',
      sourceUrl: this.newsItem.sourceUrl ?? '',
    });

    // tslint:disable-next-line:no-string-literal
    this.newsItemForm.controls['id'].setValue(this.newsItem.id);
  }

  onResetForm(): void {
     this.newsItemForm.reset();
  }

  onSaveForm(): void {
    if (this.newsItemForm.valid) {

      this.newsItem.timestamp = this.appointmentSrv.getTimestamp();
      const newsItem = { ...this.newsItem, ...this.newsItemForm.value };

      if (newsItem.id === '0') {
          this.newsSrv.addNewsItem(newsItem);
      } else {
          this.newsSrv.updateNewsItem(newsItem);
      }

      this.router.navigate([ NewsItem.PATH_URL]);

    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.newsItemForm.reset();
    Swal.fire({
      icon: 'success',
      title: 'Datos guardados con éxito',
      text: `Los datos de ${this.newsItem.name} se han guardado correctamente`,
      // footer: '<a href>Why do I have this issue?</a>'
    });
    this.router.navigate([`/${NewsItem.PATH_URL}`]);
  }

  gotoList(): void {
    this.newsItemForm.reset();
    this.router.navigate([`/${NewsItem.PATH_URL}`]);
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

              this.newsItem.image = imageUrl;

              // Update the data on the form
              this.newsItemForm.patchValue({
                image: this.newsItem.image
              });
          });
        })
     )
    .subscribe();
  }
}
