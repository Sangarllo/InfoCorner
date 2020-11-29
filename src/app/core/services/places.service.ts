import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPlace } from '@shared/models/place';

const PLACES_COLLECTION = 'lugares';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placeCollection!: AngularFirestoreCollection<IPlace>;
  private placeDoc!: AngularFirestoreDocument<IPlace>;

  constructor(private afs: AngularFirestore) {
    this.placeCollection = afs.collection(PLACES_COLLECTION);
  }

  getAllPlaces(): Observable<IPlace[]> {

    return this.placeCollection.valueChanges();
  }

  getOnePlace(idPlace: string): Observable<IPlace | undefined> {
    return this.placeCollection.doc(idPlace).valueChanges({ idField: 'id' });
  }

  addPlace(place: IPlace): void {
    place.id = this.afs.createId();
    this.placeCollection.doc(place.id).set(place);
  }

  updatePlace(place: IPlace): void {
    const idPlace = place.id;
    this.placeDoc = this.afs.doc<IPlace>(`${PLACES_COLLECTION}/${idPlace}`);
    this.placeDoc.update(place);
  }

  deletePlace(idPlace: string): void {
    this.placeDoc = this.afs.doc<IPlace>(`${PLACES_COLLECTION}/${idPlace}`);
    this.placeDoc.delete();
  }

}
