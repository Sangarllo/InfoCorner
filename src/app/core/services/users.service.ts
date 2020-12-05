import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { IUser } from '@shared/models/user';
import { UserRole } from '@models/user-role.enum';

const USERS_COLLECTION = 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection!: AngularFirestoreCollection<IUser>;
  private userDoc!: AngularFirestoreDocument<IUser>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection(USERS_COLLECTION);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.userCollection.valueChanges();
  }

  getOneUser(idUser: string): Observable<IUser | undefined> {
    return this.userCollection.doc(idUser).valueChanges({ idField: 'uid' });
  }

  addUser(user: IUser): void {
    user.uid = this.afs.createId();
    this.userCollection.doc(user.uid).set(user);
  }

  updateUser(user: IUser): void {
    const idUser = user.uid;
    this.userDoc = this.afs.doc<IUser>(`${USERS_COLLECTION}/${idUser}`);
    this.userDoc.update(user);
  }

  deleteUser(idUser: string): void {
    this.userDoc = this.afs.doc<IUser>(`${USERS_COLLECTION}/${idUser}`);
    this.userDoc.delete();
  }

  updateUserData(user: IUser): Promise<void> {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(
      `${USERS_COLLECTION}/${user.uid}`
    );

    const data: IUser = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      active: user.active ?? true,
      role: user.role ?? UserRole.Lector,
      entitiesAdmin: user.entitiesAdmin ?? []
    };

    return userRef.set(data, { merge: true });
  }
    }
