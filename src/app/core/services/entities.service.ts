import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { IEntity } from '@models/entity';
import { Base } from '@models/base';
import { map } from 'rxjs/operators';

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

  getAllEntitiesBase(): Observable<Base[]> {
    return this.entityCollection.valueChanges().pipe(
      map(entities => entities.map(entity => {
        const id = entity.id;
        const name = entity.name;
        const image = entity.image;
        return {
          id, name, image
        };
      }))
    );
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

    const updEntity = { ...entity, place: entity.place };
    this.entityDoc.set(updEntity, { merge: true });
  }

  deleteEntity(idEntity: string): void {
    this.entityDoc = this.afs.doc<IEntity>(`${ENTITIES_COLLECTION}/${idEntity}`);
    this.entityDoc.delete();
  }
}
