import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { EventService } from '@services/events.service';
import { Event, IEvent } from '@shared/models/event';
import { finalize } from 'rxjs/operators';
import { Status, STATUS_MODES } from '@models/status.enum';


@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  eventForm!: FormGroup;
  pageTitle = 'Creación de un nuevo evento';
  errorMessage = '';
  uploadPercent: Observable<number>;

  public event!: IEvent | undefined;
  public TYPES: any[] = Event.TYPES;
  public STATUS: Status[] = Event.STATUS;

  constructor(
    private afStorage: AngularFireStorage,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private EventSrv: EventService) { }

  ngOnInit(): void {

    const idEvent = this.route.snapshot.paramMap.get('id');
    if ( idEvent ) {
      console.log(`id asked ${idEvent}`);
      this.getDetails(idEvent);
    }

    this.eventForm = this.fb.group({
      id: [{value: '0', disabled: true}],
      active: true,
      status: [ Status.Editing, Validators.required],
      focused: true,
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      image: Event.IMAGE_DEFAULT,
      type: [ Event.TYPE_DEFAULT, Validators.required],
    });

  }

  private getDetails(idEvent: string): void {
    console.log(`id asked ${idEvent}`);

    if ( idEvent === '0' ) {
      this.pageTitle = 'Creación de un nuevo evento';
      this.event = Event.InitDefault();
    } else {
      this.EventSrv.getOneEvent(idEvent)
      .subscribe({
        next: (event: IEvent | undefined) => {
          this.event = event;
          this.displayEvent();
          console.log(JSON.stringify(this.event));
        },
        error: err => {
          this.errorMessage = `Error: ${err}`;
        }
      });
    }
  }


  displayEvent(): void {

    if (this.eventForm) {
      this.eventForm.reset();
    }

    if (this.event.id === '0') {
      this.pageTitle = 'Creando un nuevo evento';
    } else {
      this.pageTitle = `Editando el evento ${this.event.name}`;
    }

    // Update the data on the form
    this.eventForm.patchValue({
      id: this.event.id,
      active: this.event.active,
      status: this.event.status,
      focused: this.event.focused,
      name: this.event.name,
      image: this.event.image ?? Event.IMAGE_DEFAULT,
      type: this.event.type,
    });

    // tslint:disable-next-line:no-string-literal
    this.eventForm.controls['id'].setValue(this.event.id);
  }

  onResetForm(): void {
     this.eventForm.reset();
  }

  onSaveForm(): void {
    if (this.eventForm.valid) {

        const eventItem = { ...this.event, ...this.eventForm.value };

        if (eventItem.id === '0') {
          this.EventSrv.addEvent(eventItem);
        } else {
          this.EventSrv.updateEvent(eventItem);
        }

        this.router.navigate([ Event.PATH_URL]);

    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.eventForm.reset();
    Swal.fire({
      icon: 'success',
      title: 'Datos guardados con éxito',
      text: `Los datos de ${this.event.name} se han guardado correctamente`,
      // footer: '<a href>Why do I have this issue?</a>'
    });
    this.router.navigate([`/${Event.PATH_URL}`]);
  }

  gotoList(): void {
    this.eventForm.reset();
    this.router.navigate([`/${Event.PATH_URL}`]);
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

              this.event.image = imageUrl;

              // Update the data on the form
              this.eventForm.patchValue({
                image: this.event.image
              });
          });
        })
     )
    .subscribe();
  }
}
