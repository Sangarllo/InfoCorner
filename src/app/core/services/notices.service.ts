import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatDistance, subDays } from 'date-fns';

import { Base } from '@models/base';
import { INotice } from '@models/notice';
import { AppointmentsService } from '@services/appointments.service';

const NOTICES_COLLECTION = 'avisos';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private noticeCollection!: AngularFirestoreCollection<INotice>;
  private noticeDoc!: AngularFirestoreDocument<INotice>;

  constructor(
    private afs: AngularFirestore,
    private appointmentSvc: AppointmentsService,
  ) {
    this.noticeCollection = afs.collection(NOTICES_COLLECTION);
  }

  getAllNotices(): Observable<INotice[]> {
    this.noticeCollection = this.afs.collection<INotice>(
      NOTICES_COLLECTION,
      ref => ref.where('active', '==', true)
                .orderBy('name')
    );

    return this.noticeCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as INotice;
        data.timestampDate = ( data.timestamp ) ? new Date(data.timestamp) : null; // subDays(new Date(), 3);
        data.timestampDist =  ( data.timestampDate ) ? 'actualizado hace ' + formatDistance(data.timestampDate, new Date()) : '';
        const id = a.payload.doc.id;
        return { id, ...data };
      })
      )
    );
  }

  getAllNoticesBase(): Observable<Base[]> {
    this.noticeCollection = this.afs.collection<INotice>(
      NOTICES_COLLECTION,
      ref => ref.where('active', '==', true)
                .orderBy('name')
    );

    return this.noticeCollection.valueChanges().pipe(
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

  getOneNotice(idNotice: string): Observable<INotice   | undefined> {
    return this.noticeCollection.doc(idNotice).valueChanges({ idField: 'id' });
  }

  addNotice(notice: INotice): void {
    notice.id = this.afs.createId();
    notice.timestamp = this.appointmentSvc.getTimestamp();
    this.noticeCollection.doc(notice.id).set(notice);
  }

  updateNotice(notice: INotice): void {
    const idNotice = notice.id;
    this.noticeDoc = this.afs.doc<INotice>(`${NOTICES_COLLECTION}/${idNotice}`);
    notice.timestamp = this.appointmentSvc.getTimestamp();
    this.noticeDoc.update(notice);
  }

  deleteNotice(notice: INotice): void {
    const idNotice = notice.id;
    notice.active = false;
    notice.timestamp = this.appointmentSvc.getTimestamp();
    this.noticeDoc = this.afs.doc<INotice>(`${NOTICES_COLLECTION}/${idNotice}`);
    this.noticeDoc.update(notice);
  }
}
