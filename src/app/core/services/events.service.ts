import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { IEvent } from '@shared/models/event';

const EVENTS_COLLECTION = 'eventos';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventCollection!: AngularFirestoreCollection<IEvent>;
  private eventDoc!: AngularFirestoreDocument<IEvent>;

  constructor(private afs: AngularFirestore) {
    this.eventCollection = afs.collection(EVENTS_COLLECTION);
  }

  getAllEvents(): Observable<IEvent[]> {

    return this.eventCollection.valueChanges();
  }

  getOneEvent(idEvent: string): Observable<IEvent | undefined> {
    return this.eventCollection.doc(idEvent).valueChanges({ idField: 'id' });
  }

  addEvent(event: IEvent): void {
    event.id = this.afs.createId();
    this.eventCollection.doc(event.id).set(event);
  }

  updateEvent(event: IEvent): void {
    const idEvent = event.id;
    this.eventDoc = this.afs.doc<IEvent>(`${EVENTS_COLLECTION}/${idEvent}`);
    this.eventDoc.update(event);
  }

  deleteEvent(idEvent: string): void {
    this.eventDoc = this.afs.doc<IEvent>(`${EVENTS_COLLECTION}/${idEvent}`);
    this.eventDoc.delete();
  }
}
