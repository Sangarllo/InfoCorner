import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  public login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  // tslint:disable-next-line: typedef
  public logout() {
    this.auth.signOut();
  }


}
