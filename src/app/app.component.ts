import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import {  Router, Data, RoutesRecognized, ActivatedRoute } from "@angular/router";
import { UserService } from "./shared/services/user.service";
import { AuthService } from "./shared/services/auth.service";
const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/img/profile_placeholder.png';

export enum Layouts {
   Clientarea,
   Home
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  Layouts = Layouts
  layout: Layouts;

  user: Observable<firebase.User>;
  currentUser: firebase.User;
  title = 'Front';
  profilePicStyles: {};
  date=Date();

  constructor(

    public afs: AngularFirestore,public db: AngularFireDatabase,
   private router: Router,
    private route: ActivatedRoute,
    private userservice: UserService,
    private Authservice: AuthService,
   public afAuth: AngularFireAuth, public snackBar: MatSnackBar
   ){

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
  // });
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeoLocation.bind(this));
    }
    //this.saveMessagingDeviceToken();
}

 ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.layout = data.state.root.firstChild.data.layout;
      }
    });
  }
  setGeoLocation(position: any) {
    console.log(position);
    this.userservice.setLocation(
      this.user,
      position["coords"].latitude,
      position["coords"].longitude
    );
  }

  // Returns true if user is signed-in. Otherwise false and displays a message.
  checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    if (this.currentUser) {
      return true;
    }

    this.snackBar
      .open('You must sign-in first', 'Sign in', {
        duration: 5000
      })
      .onAction()
      //redirect to login page
     // .subscribe(() => this.login());

    return false;
  };
  // // Saves the messaging device token to the datastore.
  // saveMessagingDeviceToken() {
  //   return firebase.messaging().getToken()
  //     .then((currentToken) => {
  //       if (currentToken) {
  //         console.log('Got FCM device token:', currentToken);
  //         // Save the Device Token to the datastore.
  //         // firebase.database()
  //         //   .ref('/fcmTokens')
  //         //   .child(currentToken)
  //         //   .set(this.currentUser.uid);


  //     //    let fcmtokens = firebase.collection("fcmTokens");
  //     //    fcmtokens.doc().set({
		//     // user: this.currentUser.uid,
		//     // token: currentToken
  //     //   });
           
  //          let fcmTokensRef=this.afs.collection('fcmTokens');
  //           fcmTokensRef.add({
  //          user: this.currentUser.uid,
  //          token: currentToken
  //          });
		// 	// if(this.currentUser){
		//  //           fcmTokensRef.add({
		//  //           user: this.currentUser.uid,
		//  //           token: currentToken 
		// 	// 	      });
		//  //      }
		//  //       else{
		//  //         	fcmTokensRef.add({
		//  //            user: "unknown",
		//  //           token: currentToken 
		//  //            });

		//  //       }

  //       } else {
  //         // Need to request permissions to show notifications.
  //         return this.requestNotificationsPermissions();
  //       }
  //     }).catch((err) => {
  //       this.snackBar.open('Unable to get messaging token.', null, {
  //         duration: 5000
  //       });
  //       console.error(err);
  //     });
  // };
logout() {
    this.afAuth.auth.signOut();
    this.currentUser=undefined;
  }
  // // Requests permissions to show notifications.
  // requestNotificationsPermissions() {
  //   console.log('Requesting notifications permission...');
  //   return firebase.messaging().requestPermission()
  //     // Notification permission granted.
  //     .then(() => this.saveMessagingDeviceToken())
  //     .catch((err) => {
  //       this.snackBar.open('Unable to get permission to notify.', null, {
  //         duration: 5000
  //       });
  //       console.error(err);
  //     });
  // };


}
