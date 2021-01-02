import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, combineLatest, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';

import { Base, IBase } from '@models/base';
import { IEntity } from '@models/entity';
import { IEvent } from '@models/event';
import { IPlace } from '@models/place';
import { IUser } from '@models/user';
import { AppointmentsService } from '@services/appointments.service';
import { AuditType } from '@app/shared/models/audit';
import { colors } from '@app/shared/utils/colors';
import { IAppointment } from '@models/appointment';

const EVENTS_COLLECTION = 'eventos';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventCollection!: AngularFirestoreCollection<IEvent>;
  private eventDoc!: AngularFirestoreDocument<IEvent>;

  constructor(
    private afs: AngularFirestore,
    private appointmentSrv: AppointmentsService
  ) {
    this.eventCollection = afs.collection(EVENTS_COLLECTION);
  }

  getAllEvents(): Observable<IEvent[]> {
    this.eventCollection = this.afs.collection<IEvent>(
      EVENTS_COLLECTION,
      ref => ref.where('active', '==', true)
                .orderBy('name')
    );

    return this.eventCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IEvent;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
      )
    );
  }

  // TODO: paging
  getAllCalendarEvents(): Observable<CalendarEvent[]> {
    this.eventCollection = this.afs.collection<IEvent>(
      EVENTS_COLLECTION,
      ref => ref.where('active', '==', true)
                .orderBy('name')
    );

    return this.eventCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IEvent;
        const id = a.payload.doc.id;

        const newCalendarEvent = {
          id,
          title: data.name,
          start: new Date(),
          color: colors.indigo,
          allDay: false
        };

        return newCalendarEvent;
      })
      )
    );
  }

  getAllCalendarEventsAppointments(): Observable<CalendarEvent[]> {
    const events$ = this.getAllEvents();
    const appointments$ = this.appointmentSrv.getAllAppointments();

    return combineLatest([
      events$,
      appointments$
    ])
      .pipe(
        map(([events, appointments]) => events.map(event => ({
          // ...event,
          id: event.id,
          title: event.name,
          color: colors.indigo,
          allDay: false,
          start: new Date(appointments.find(a => a.id === event.id)?.dateIni)
        }) as CalendarEvent)),
        // tap(data => console.log('event:  ', JSON.stringify(data))),
    );
  }

  getAllEventsBase(): Observable<IBase[]> {
    this.eventCollection = this.afs.collection<IEvent>(
      EVENTS_COLLECTION,
      ref => ref.where('active', '==', true)
                .orderBy('name')
    );

    return this.eventCollection.valueChanges().pipe(
      map(places => places.map(place => {
        if ( place.active ) {
          const id = place.id;
          const active = place.active;
          const name = place.name;
          const image = place.image;
          return {
            id, active, name, image
          };
        }
      }))
    );
  }

  getOneEvent(idEvent: string): Observable<IEvent | undefined> {
    return this.eventCollection.doc(idEvent).valueChanges({ idField: 'id' });
  }

  addEvent(event: IEvent, currentUser: IUser): void {
    event = this.setCreationInfo(event, currentUser);
    const id: string = this.afs.createId();
    event.id = id;
    event.appointmentId = id;
    this.appointmentSrv.addAppointment(id);
    this.eventCollection.doc(event.id).set(event, { merge: true });
  }

  addEventFromEntity(event: IEvent, currentUser: IUser, entity: IEntity, entityRol?: string, place?: IPlace): string {
    event = this.setCreationInfo(event, currentUser);
    const id: string = this.afs.createId();
    event.id = id;

    event.name = `Nuevo evento de ${entity.name}`;

    const newEntityItem: IBase = {
      id: entity.id,
      active: true,
      name: entity.name,
      image: entity.image,
      desc: entityRol,
    };
    event.entityItems = [ newEntityItem ];

    event.images = [];
    const newImage = entity.image;
    if ( newImage ) {
      event.image = newImage;
      event.images.push(newImage);
    }
    if ( place.id !== Base.ID_DEFAULT ) {
      const placeImage = entity.place?.image;
      event.place = entity.place;
      event.images.push(placeImage);
    }

    event.appointmentId = id;
    this.appointmentSrv.addAppointment(id);

    const newEvent = { ...event, entityItems: event.entityItems, place: event.place };
    this.eventCollection.doc(event.id).set(newEvent, { merge: true });
    return id;
  }

  updateEvent(event: IEvent, currentUser: IUser): void {
    event = this.setUpdateInfo(event, currentUser);
    const idEvent = event.id;
    this.eventDoc = this.afs.doc<IEvent>(`${EVENTS_COLLECTION}/${idEvent}`);
    this.eventDoc.set(event, { merge: true });
  }

  deleteEvent(event: IEvent, currentUser: IUser): void {
    event = this.setDeleteInfo(event, currentUser);
    const idEvent = event.id;
    event.active = false;
    this.eventDoc = this.afs.doc<IEvent>(`${EVENTS_COLLECTION}/${idEvent}`);
    this.eventDoc.update(event);
  }

  private setCreationInfo(event: IEvent, user: IUser): IEvent {
    const timestamp = this.appointmentSrv.getTimestamp();
    event.createdBy = user.uid;
    event.createdAt = timestamp;
    event.updatedBy = user.uid;
    event.updatedAt = timestamp;
    event.updatedType = AuditType.Created;
    return event;
  }

  private setUpdateInfo(event: IEvent, user: IUser): IEvent {
    event.updatedBy = user.uid;
    event.updatedAt = this.appointmentSrv.getTimestamp();
    event.updatedType = AuditType.Updated;
    return event;
  }

  private setDeleteInfo(event: IEvent, user: IUser): IEvent {
    event.updatedBy = user.uid;
    event.updatedAt = this.appointmentSrv.getTimestamp();
    event.updatedType = AuditType.Deleted;
    return event;
  }

  public getEventCalendar(): Observable<CalendarEvent[]> {

    const EVENTS: CalendarEvent[] = [
      {
        title: 'Título 1',
        start: new Date(),
        color: colors.indigo,
        allDay: false,
        meta: ''
      },
      {
        title: 'Título 2',
        start: new Date(),
        color: colors.yellow,
        allDay: false,
        meta: ''
      },
    ];

    return of(EVENTS);
  }
}
