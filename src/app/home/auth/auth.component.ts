import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators,NgForm, EmailValidator } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import { DOCUMENT } from '@angular/common';

import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../shared/services/user.service";
import { AuthService } from "../../shared/services/auth.service";

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/img/profile_placeholder.png';

declare var $: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [EmailValidator]
})
export class AuthComponent implements OnInit {
 // @ViewChild('loginForm')  loginForm: NgForm;
 // @ViewChild('userForm')  userForm: NgForm;
 user: Observable<firebase.User>;
  currentUser: any;
  profilePicStyles: {};
  date=Date();
  curuser = {
    emailId: "",
    loginPassword: ""
  };

  errorInUserCreate = false;
  errorMessage: any;
  createUser;
  userForm:FormGroup;
  loginForm:FormGroup
  constructor(
    public afs: AngularFirestore,
    public db: AngularFireDatabase, 
    public afAuth: AngularFireAuth, 
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private userservice: UserService,
    // @Inject(DOCUMENT) private document: Document
   
    ){
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
     $(document).ready();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.userForm = this.formBuilder.group({
     // isAdmin: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.requestNotificationsPermissions();


  }

  loginwithgoogle() {

            // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((curruser) => {

            //  console.log(curruser);


            //   });

            this.authservice
              .signInWithGoogle()
              .then((res) => {
                console.log(res);
                 const user = {
                    email: res.user.email,
                    displayName:res.user.displayName,
                    name:res.user.displayName,
                    uid: res.user.uid,
                    isAdmin:false,
                    verified_email: res.user.emailVerified,
                    phoneNumber: res.user.phoneNumber,
                    picture: res.user.photoURL
                  };

                if (res.additionalUserInfo.isNewUser) {
                  this.userservice.createUser(user);
                   this.currentUser=user;
                  this.saveMessagingDeviceToken();
                }
               // const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
                //location.reload();
                this.snackBar.open("Authentication Success ,Logging in please wait", null, {
              duration: 5000
            });
                //this.router.navigate(["/account"]);
               // this.document.location.href = 'https://stackoverflow.com';
                this.redirectTo("account")
              })
              .catch((err) => {
                this.snackBar.open("Error Occured ,Please try again later", null, {
              duration: 5000
            });
                //this.toastService.error("Error Occured", "Please try again later");
              });
          }

redirectTo(uri:string){
   this.router.navigateByUrl('/account', {skipLocationChange: true}).then(()=>
   this.router.navigate([uri]));
}

   loginwithemail() {
        // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((curruser) => {

        //  console.log(curruser);


        //   });
       // const userForm = this.loginForm.value;
        if (this.loginForm.valid || 1) {
            this.authservice
            .signInRegular(this.loginForm.value.email,this.loginForm.value.password)
            .then((res) => {
              console.log(res);
              this.currentUser=res;
              this.saveMessagingDeviceToken();
             // this.toastService.success("Authentication Success", "Logging in please wait");
             this.snackBar.open('Authentication Success , Logging in please wait', null, {
              duration: 5000
            });
             const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

              setTimeout((router: Router) => {
                this.router.navigate([returnUrl || "/account"]);
              }, 1500);

              this.router.navigate([returnUrl || "/account"]);
            })
            .catch((err) => {
              console.log("not possible");
              console.log(err);
              this.snackBar.open(err.message, null, {
                duration: 5000
              });
              //this.toastService.error("Authentication Failed", "Invalid Credentials, Please Check your credentials");
            });
          }
          else{
            
            this.snackBar.open('Form has one or more errors', null, {
          duration: 5000
        });
          }
  
    }

// register() {
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
addUser() {
    let userForm=this.userForm.value;
    console.log(userForm);
    if (this.userForm.valid || 1) {
    //userForm.value.isAdmin= false;
    this.authservice
      .createUserWithEmailAndPassword(userForm.email, userForm.password)
      .then((res) => {
        console.log(res);
        const user = {
          email: res.user.email,
          displayName:userForm.email,
          name:userForm.name,
          uid: res.user.uid,
          isAdmin:false,
          verified_email: res.user.emailVerified,
          phoneNumber: res.user.phoneNumber,
          picture: res.user.photoURL
        };

        this.userservice.createUser(user);
        this.currentUser=user;
        this.saveMessagingDeviceToken();
       // this.toastservice.success("Registering", "User Registeration");
        this.snackBar.open('sucess Registering,User Registeration.', null, {
          duration: 5000
        });

        setTimeout((router: Router) => {
          //$("#createUserForm").modal("hide");
          this.router.navigate(["/auth"]);
        }, 1500);
      })
      .catch((err) => {
        this.errorInUserCreate = true;
        this.errorMessage = err;
        //this.toastService.error("Error while Creating User", err);
        this.snackBar.open('Error while Creating User', null, {
          duration: 5000
        });
      });

     }
     else{
       this.snackBar.open('Form has one or more errors', null, {
          duration: 5000
        });
     } 
  }


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
      .subscribe(() => this.loginwithgoogle());

    return false;
  };
   // Saves the messaging device token to the datastore.
  saveMessagingDeviceToken() {
    return firebase.messaging().getToken()
      .then((currentToken) => {
        if (currentToken) {
          console.log('Got FCM device token:', currentToken);
          // Save the Device Token to the datastore.
          // firebase.database()
          //   .ref('/fcmTokens')
          //   .child(currentToken)
          //   .set(this.currentUser.uid);

      //     let fcmtokens = firebase.collection("fcmTokens");
      //    fcmtokens.doc().set({
		    // user: this.currentUser.uid,
		    // token: currentToken
      //   });

       let fcmTokensRef=this.afs.collection('fcmTokens');
       fcmTokensRef.add({
          user:this.currentUser.uid,
           token: currentToken
           });
      //  if(this.currentUser){
      //      fcmTokensRef.add({
      //     user: this.currentUser.uid,
      //      token: currentToken 
      // });
      //  }
      //  else{
      //  	fcmTokensRef.add({
      //     user: "unknown",
      //      token: currentToken 
      // });

      //  }
         
 

        } else {
          // Need to request permissions to show notifications.
          return this.requestNotificationsPermissions();
        }
      }).catch((err) => {
        this.snackBar.open('Unable to get messaging token.', null, {
          duration: 5000
        });
        console.error(err);
      });
  };

  // Requests permissions to show notifications.
  requestNotificationsPermissions() {
    console.log('Requesting notifications permission...');
    return firebase.messaging().requestPermission()
      // Notification permission granted.
      .then(() => this.saveMessagingDeviceToken())
      .catch((err) => {
        this.snackBar.open('Unable to get permission to notify.', null, {
          duration: 5000
        });
        console.error(err);
      });
  };

 
}
