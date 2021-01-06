import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatDistance, subDays } from 'date-fns';

import { IBase, BaseType } from '@models/base';
import { INewsItem } from '@models/news';
import { AppointmentsService } from '@services/appointments.service';

const NEWS_COLLECTION = 'noticias';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsCollection!: AngularFirestoreCollection<INewsItem>;
  private newsItemDoc!: AngularFirestoreDocument<INewsItem>;

  constructor(
    private afs: AngularFirestore,
    private appointmentSvc: AppointmentsService,
  ) {
    this.newsCollection = afs.collection(NEWS_COLLECTION);
  }

  getAllNews(): Observable<INewsItem[]> {
    this.newsCollection = this.afs.collection<INewsItem>(
      NEWS_COLLECTION,
      ref => ref.where('active', '==', true)
                .orderBy('timestamp', 'desc')
    );

    return this.newsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as INewsItem;
        data.timestampDate = ( data.timestamp ) ? new Date(data.timestamp) : null; // subDays(new Date(), 3);
        data.timestampDist =  ( data.timestampDate ) ? 'actualizado hace ' + formatDistance(data.timestampDate, new Date()) : '';
        const id = a.payload.doc.id;
        return { id, ...data };
      })
      )
    );
  }

  getAllNewsBase(): Observable<IBase[]> {
    this.newsCollection = this.afs.collection<INewsItem>(
      NEWS_COLLECTION,
      ref => ref.where('active', '==', true)
                .orderBy('name')
    );

    return this.newsCollection.valueChanges().pipe(
      map(news => news.map(newsItem => {
        if ( newsItem.active ) {
          return {
            id: newsItem.id,
            active: newsItem.active,
            name: newsItem.name,
            image: newsItem.image,
            baseType: BaseType.NEWS_ITEM,
            desc: newsItem.description
          };
        }
      }))
    );
  }

  getOneNewsItem(idNewsItem: string): Observable<INewsItem | undefined> {
    return this.newsCollection.doc(idNewsItem).valueChanges({ idField: 'id' });
  }

  addNewsItem(newsItem: INewsItem): void {
    newsItem.id = this.afs.createId();
    newsItem.timestamp = this.appointmentSvc.getTimestamp();
    this.newsCollection.doc(newsItem.id).set(newsItem);
  }

  updateNewsItem(newsItem: INewsItem): void {
    const idNewsItem = newsItem.id;
    this.newsItemDoc = this.afs.doc<INewsItem>(`${NEWS_COLLECTION}/${idNewsItem}`);
    newsItem.timestamp = this.appointmentSvc.getTimestamp();
    this.newsItemDoc.update(newsItem);
  }

  deleteNewsItem(newsItem: INewsItem): void {
    const idNewsItem = newsItem.id;
    newsItem.active = false;
    newsItem.timestamp = this.appointmentSvc.getTimestamp();
    this.newsItemDoc = this.afs.doc<INewsItem>(`${NEWS_COLLECTION}/${idNewsItem}`);
    this.newsItemDoc.update(newsItem);
  }
}
