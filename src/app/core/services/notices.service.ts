import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { INotice } from '@shared/models/notice';

const NOTICES_COLLECTION = 'avisos';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private noticeCollection!: AngularFirestoreCollection<INotice>;
  private noticeDoc!: AngularFirestoreDocument<INotice>;

  constructor(private afs: AngularFirestore) {
    this.noticeCollection = afs.collection(NOTICES_COLLECTION);
  }

  getAllNotices(): Observable<INotice[]> {
    return this.noticeCollection.valueChanges();
  }

  getOneNotice(idNotice: string): Observable<INotice   | undefined> {
    return this.noticeCollection.doc(idNotice).valueChanges({ idField: 'id' });
  }

  addNotice(notice: INotice): void {
    notice.id = this.afs.createId();
    this.noticeCollection.doc(notice.id).set(notice);
  }

  updateNotice(notice: INotice): void {
    const idNotice = notice.id;
    this.noticeDoc = this.afs.doc<INotice>(`${NOTICES_COLLECTION}/${idNotice}`);
    this.noticeDoc.update(notice);
  }

  deleteNotice(idNotice: string): void {
    this.noticeDoc = this.afs.doc<INotice>(`${NOTICES_COLLECTION}/${idNotice}`);
    this.noticeDoc.delete();
  }
}
