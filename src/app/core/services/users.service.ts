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

  getOneUser(uidUser: string): Observable<IUser | undefined> {
    return this.userCollection.doc(uidUser).valueChanges({ uidField: 'uid' });
  }

  // TODO When creating, perhaps existing as authenticated (check email)
  addUser(user: IUser): void {
    const uidUser = this.afs.createId();
    user.uid = uidUser;
    console.log(`addUser: ${user.uid}`);
    console.log(`addUser: ${JSON.stringify(user, null, 2)}`);
    this.userCollection.doc(user.uid).set(user);
  }

  updateUser(user: IUser): void {
    const uidUser = user.uid;
    this.userDoc = this.afs.doc<IUser>(`${USERS_COLLECTION}/${uidUser}`);
    this.userDoc.update(user);
  }

  deleteUser(uidUser: string): void {
    this.userDoc = this.afs.doc<IUser>(`${USERS_COLLECTION}/${uidUser}`);
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
