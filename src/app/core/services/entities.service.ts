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
    this.entityCollection = this.afs.collection<IEntity>(
      ENTITIES_COLLECTION,
      ref => ref.where('active', '==', true)
                .orderBy('name')
    );

    return this.entityCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IEntity;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
      )
    );
  }

  getAllEntitiesBase(): Observable<Base[]> {
    this.entityCollection = this.afs.collection<IEntity>(
      ENTITIES_COLLECTION,
      ref => ref.where('active', '==', true)
                .orderBy('name')
    );

    return this.entityCollection.valueChanges().pipe(
      map(entities => entities.map(entity => {
        if ( entity.active ) {
          const id = entity.id;
          const active = entity.active;
          const name = entity.name;
          const image = entity.image;
          const desc = entity.roleDefault;
          return {
            id, active, name, image, desc
          };
        }
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

  deleteEntity(entity: IEntity): void {
    const idEntity = entity.id;
    entity.active = false;
    this.entityDoc = this.afs.doc<IEntity>(`${ENTITIES_COLLECTION}/${idEntity}`);
    this.entityDoc.update(entity);
  }
}
