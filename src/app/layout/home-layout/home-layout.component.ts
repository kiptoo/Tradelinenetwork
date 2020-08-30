import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import {  Router, Data, RoutesRecognized, ActivatedRoute } from "@angular/router";
import { UserService } from "../../shared/services/user.service";
import { AuthService } from "../../shared/services/auth.service";
const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/front/img/profile_placeholder.png';
declare var $: any;
@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {
user: Observable<firebase.User>;
  currentUser: firebase.User;
  title = 'Front';
  profilePicStyles: {};
  date=Date();


  constructor(
 public afs: AngularFirestore,
 public db: AngularFireDatabase,
   private router: Router,
    private route: ActivatedRoute,
    private userservice: UserService,
    private Authservice: AuthService,
   public afAuth: AngularFireAuth, 
   public snackBar: MatSnackBar


  ) { 

	this.user = afAuth.authState;
  // this.user.subscribe((user: firebase.User) => {
  //  this.currentUser = user;
  this.Authservice.getLoggedInUser().then(curruser => {
  console.log(curruser.displayName);
  if (curruser) {

    this.currentUser = curruser;
     this.profilePicStyles = {
          'background-image':  `url(${this.currentUser.photoURL})`
        };
  }
  else{
    this.profilePicStyles = {
          'background-image':  PROFILE_PLACEHOLDER_IMAGE_URL
        };

  }

});


  }

  ngOnInit() {
   //$.getScript('/assets/front/js/functions.js');
   //$.getScript('/assets/front/js/main.js');

  }
  logout(){
  this.Authservice.logout();
  }

}
