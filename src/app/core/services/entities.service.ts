import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEntity } from '../../shared/models/entity';

const ENTITIES_COLLECTION = 'entidades';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private entityCollection!: AngularFirestoreCollection<IEntity>;
  private entityDoc!: AngularFirestoreDocument<IEntity>;

  constructor(private afs: AngularFirestore) {
    this.entityCollection = afs.collection(ENTITIES_COLLECTION);
  }

  /*
  getAllEntities2(): Observable<IEntity[]> {
    this.entityCollection = this.afs.collection<IEntity>(ENTITIES_COLLECTION);
    return this.entityCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as IEntity;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }
  */

  getAllEntities(): Observable<IEntity[]> {

    // this.entityCollection = this.afs.collection(
    //    ENTITIES_COLLECTION,
    //    ref => ref.where('active', '==', true)
    //              .orderBy('name')
    // );

    return this.entityCollection.valueChanges();
  }

  getOneEntity(idEntity: string): Observable<IEntity | undefined> {
    return this.entityCollection.doc(idEntity).valueChanges({ idField: 'id' });
  }

  // getEntity(idEntity: string): Observable<IEntity | null> {
  //    this.entityDoc = this.afs.doc<IEntity>(`${ENTITIES_COLLECTION}/${idEntity}`);
  //    return this.entityDoc.valueChanges()
  //      .pipe(map(action => {
  //      if (action.payload.exists === false) {
  //        return null;
  //      } else {
  //        const data = action.payload.data() as IEntity;
  //        data.id = action.payload.id;
  //        return data;
  //      }
  //    }));
  // }

  addEntity(entity: IEntity): void {
    this.entityCollection.add(entity);
  }

  updateEntity(entity: IEntity): void {
    const idEntity = entity.id;
    this.entityDoc = this.afs.doc<IEntity>(`${ENTITIES_COLLECTION}/${idEntity}`);
    this.entityDoc.update(entity);
  }

  deleteEntity(idEntity: string): void {
    this.entityDoc = this.afs.doc<IEntity>(`${ENTITIES_COLLECTION}/${idEntity}`);
    this.entityDoc.delete();
  }

}
