import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from "@angular/router";

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/img/profile_placeholder.png';

declare var $: any;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: Observable<firebase.User>;
  currentUser: firebase.User;
  profilePicStyles: {};
  date=Date();

  constructor(public afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public db: AngularFireDatabase, public afAuth: AngularFireAuth, public snackBar: MatSnackBar) {
    this.user = afAuth.authState;
    // this.user.subscribe((user: firebase.User) => {
    //   console.log(user);
    //   console.log(this.date);
    //   this.currentUser = user;

    //   if (user) { // User is signed in!
    //     this.profilePicStyles = {
    //       'background-image':  `url(${this.currentUser.photoURL})`
    //     };

       

    //     // We save the Firebase Messaging Device token and enable notifications.
    //     this.saveMessagingDeviceToken();
    //   } else { // User is signed out!
    //     this.profilePicStyles = {
    //       'background-image':  PROFILE_PLACEHOLDER_IMAGE_URL
    //     };
    //   }

    // });


   }

  ngOnInit() {
   
  }
//   login() {
//     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((curruser) => {

//      console.log(curruser);
//      let userRef=this.afs.collection('users');
//        userRef.add({
//            username:curruser.user.email,
//            email:curruser.user.email,
//            phone:curruser.user.phoneNumber,
//            profilephoto:curruser.user.photoURL,
//            id:curruser.user.uid,
//            emailVerified:curruser.user.emailVerified
//          });

// });
//   }

  logout() {
    this.afAuth.auth.signOut();
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
     // .subscribe(() => this.login());

    return false;
  };
   // Saves the messaging device token to the datastore.
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

  //     //     let fcmtokens = firebase.collection("fcmTokens");
  //     //    fcmtokens.doc().set({
		//     // user: this.currentUser.uid,
		//     // token: currentToken
  //     //   });

  //      let fcmTokensRef=this.afs.collection('fcmTokens');
  //      fcmTokensRef.add({
  //         user: this.currentUser.uid,
  //          token: currentToken
  //          });
  //     //  if(this.currentUser){
  //     //      fcmTokensRef.add({
  //     //     user: this.currentUser.uid,
  //     //      token: currentToken 
  //     // });
  //     //  }
  //     //  else{
  //     //  	fcmTokensRef.add({
  //     //     user: "unknown",
  //     //      token: currentToken 
  //     // });

  //     //  }
         
 

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
