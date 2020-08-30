import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../shared/services/user.service";
import { AuthService } from "../../shared/services/auth.service";

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/img/profile_placeholder.png';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: Observable<firebase.User>;
  currentUser: firebase.User;
  profilePicStyles: {};
  date=Date();

  constructor(
    public afs: AngularFirestore,
    public db: AngularFireDatabase,
  private router: Router,
  private userservice: UserService,
    private Authservice: AuthService,
    private route: ActivatedRoute,
     public afAuth: AngularFireAuth,
      public snackBar: MatSnackBar

      ) {
    this.user = afAuth.authState;



   }

  ngOnInit() {

    //$(document).ready();
 //  $.getScript('/assets/front/js/main.js');

  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
