import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
//import { User } from "../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
//import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
//import {asObservable} from "./asObservable";
import {BehaviorSubject} from "rxjs/Rx";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  userDetails: firebase.User = null;
  loggedUser;
  dbUser:any;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) { 
    this.user = firebaseAuth.authState;
    //this.dbUser = new User();
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;


        // userService
        //   .isAdmin(this.userDetails.email)
        //   .snapshotChanges()
        //   .subscribe(data => {
        //     data.forEach(el => {
        //       const y = el.payload;
        //       this.dbUser = y;
        //     });
        //   });
      } else {
        this.userDetails = null;
      }
    });

  }
  isLoggedIn(): boolean {
    if (this.userDetails !== null) {
      return true;
    }
  }

  logout() {
    this.loggedUser = null;
    this.firebaseAuth.auth.signOut().then(res => this.router.navigate(["/home"]));
  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(
      emailID,
      password
    );
  }


 getLoggedInUser(){
     let loggedUser;
    return new Promise<any>((resolve, reject) => {
      
    const cuser = this.firebaseAuth.authState;
    cuser.subscribe(user => {
    
 console.log(user);

    if (user) {

     // this.userDetails = user;
      let data:any;
      let getuser= this.userService.getuser(user.uid).subscribe((user) => {
      // .snapshotChanges()
      //     .subscribe(data => {
         data=user[0];
          console.log(data.name);

           if (data != null) {
        loggedUser = {
          email:data.name,
          displayName:data.name,
          name:data.name,
          uid: data.uid,
          isAdmin:data.isAdmin,
          verified_email:data.emailVerified,
          phoneNumber: data.phoneNumber,
          photoURL: data.picture
        };
        console.log(loggedUser);

        resolve(loggedUser);
      }

          });
      
      
    } else {
      reject(user);
     // this.userDetails = null;
    }
  });
   
     

  });
  }



 isAdmin() {
    // const user = this.getLoggedInUser();
    // // console.log("loggedUSer", user)
    // if (user != null) {
    //   if (user.isAdmin === true) {
    //     return true;
    //   }
    // }
  }

signInRegular(email,password){
const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);

	
}
  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }


}


