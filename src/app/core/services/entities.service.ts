import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { IEntity } from '@models/entity';

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

  getAllEntities(): Observable<IEntity[]> {
    return this.entityCollection.valueChanges();
  }

  getOneEntity(idEntity: string): Observable<IEntity | undefined> {
    return this.entityCollection.doc(idEntity).valueChanges({ idField: 'id' });
  }

  addEntity(entity: IEntity): void {
    entity.id = this.afs.createId();
    this.entityCollection.doc(entity.id).set(entity);
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
