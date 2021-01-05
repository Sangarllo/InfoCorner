import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, combineLatest, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';

import { BaseType, IBase } from '@models/base';
import { IEvent } from '@models/event';
import { IUser } from '@models/user';
import { AuditItem, AuditType } from '@models/audit';
import { AppointmentsService } from '@services/appointments.service';
import { colors } from '@shared/utils/colors';

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
      map(events => events.map(event => {
        if ( event.active ) {
          return {
            id: event.id,
            active: event.active,
            name: event.name,
            image: event.image,
            baseType: BaseType.EVENT,
            desc: event.description
          };
        }
      }))
    );
  }

  getOneEvent(idEvent: string): Observable<IEvent | undefined> {
    return this.eventCollection.doc(idEvent).valueChanges({ idField: 'id' });
  }

  addEvent(event: IEvent, currentUser: IUser): string {

    const timeStamp = this.appointmentSrv.getTimestamp();
    const auditItem = AuditItem.InitDefault(AuditType.CREATED, currentUser, timeStamp);
    event.auditItems.push({...auditItem});

    const id: string = this.afs.createId();
    event.id = id;
    event.appointmentId = id;
    this.appointmentSrv.addAppointment(id);
    this.eventCollection.doc(event.id).set(event, { merge: true });
    return id;
  }

  addEventFromEntity(event: IEvent, currentUser: IUser, entityBase: IBase): string {

    const timeStamp = this.appointmentSrv.getTimestamp();
    const auditItem = AuditItem.InitDefault(AuditType.CREATED, currentUser, timeStamp);
    event.auditItems.push({...auditItem});

    const id: string = this.afs.createId();
    event.id = id;

    event.name = `Nuevo evento de ${entityBase.name}`;

    const newEntityItem: IBase = {
      id: entityBase.id,
      active: true,
      name: entityBase.name,
      image: entityBase.image,
      baseType: BaseType.ENTITY,
      desc: entityBase.desc,
    };
    event.entityItems = [ newEntityItem ];

    event.images = [];
    const newImage = entityBase.image;
    if ( newImage ) {
      event.image = newImage;
      event.images.push(newImage);
    }
    event.appointmentId = id;
    this.appointmentSrv.addAppointment(id);

    const newEvent = { ...event, entityItems: event.entityItems, placeItems: event.placeItems };
    this.eventCollection.doc(event.id).set(newEvent, { merge: true });
    return id;
  }

  updateEvent(event: IEvent, auditType: AuditType, currentUser: IUser, descExtra?: string): void {

    const timeStamp = this.appointmentSrv.getTimestamp();
    const auditItem = AuditItem.InitDefault(auditType, currentUser, timeStamp, descExtra);
    event.auditItems.push({...auditItem});

    const idEvent = event.id;
    this.eventDoc = this.afs.doc<IEvent>(`${EVENTS_COLLECTION}/${idEvent}`);
    this.eventDoc.set(event, { merge: true });
  }

  deleteEvent(event: IEvent, currentUser: IUser): void {
    const timeStamp = this.appointmentSrv.getTimestamp();
    const auditItem = AuditItem.InitDefault(AuditType.DELETED, currentUser, timeStamp);
    event.auditItems.push({...auditItem});

    const idEvent = event.id;
    event.active = false;
    this.eventDoc = this.afs.doc<IEvent>(`${EVENTS_COLLECTION}/${idEvent}`);
    this.eventDoc.update(event);
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
