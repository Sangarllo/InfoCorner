import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { IEvent } from '@models/event';
import { IEntity } from '@models/entity';
import { AppointmentsService } from '@services/appointments.service';

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
    return this.eventCollection.valueChanges();
  }

  getOneEvent(idEvent: string): Observable<IEvent | undefined> {
    return this.eventCollection.doc(idEvent).valueChanges({ idField: 'id' });
  }

  addEvent(event: IEvent): void {
    const id: string = this.afs.createId();
    event.id = id;
    event.appointmentId = id;
    this.appointmentSrv.addAppointment(id);
    this.eventCollection.doc(event.id).set(event, { merge: true });
  }

  addEventFromEntity(event: IEvent, entity: IEntity, entityRol?: string): string {

    console.log(`addEventFromEntity: ${JSON.stringify(entity)}`);

    const id: string = this.afs.createId();
    event.id = id;
    event.name = `Nuevo evento de ${entity.name}`;
    event.entity = entity;
    event.entityRol = entityRol;
    const newImage = entity.image;
    if ( newImage ) {
      event.image = newImage;
      event.images.push(newImage);
    }
    if ( entity.place ) {
      const placeImage = entity.place.image;
      event.place = entity.place;
      event.images.push(placeImage);
    }

    event.appointmentId = id;
    this.appointmentSrv.addAppointment(id);

    const newEvent = { ...event, entity: event.entity, place: event.place };
    this.eventCollection.doc(event.id).set(newEvent, { merge: true });
    return id;
  }

  updateEvent(event: IEvent): void {
    const idEvent = event.id;
    this.eventDoc = this.afs.doc<IEvent>(`${EVENTS_COLLECTION}/${idEvent}`);
    this.eventDoc.set(event, { merge: true });
  }

  deleteEvent(idEvent: string): void {
    this.eventDoc = this.afs.doc<IEvent>(`${EVENTS_COLLECTION}/${idEvent}`);
    this.eventDoc.delete();
  }
}
