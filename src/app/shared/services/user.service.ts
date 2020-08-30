import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import * as moment from "moment";
//import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: any;
  loggedUser:any;
  users:any;
  location = {
    lat: null,
    lon: null
  };

  constructor(
    private db: AngularFirestore ,
 private firebaseAuth: AngularFireAuth
    ) { 
   this.users = db.collection('users');
   //console.log(this.users);
 //this.getUsers();
  }

  
   getUsers() {
    //this.users = this.db.list("clients");
    
 
    return this.users;
  }
  createUser(data){
    console.log(data);
  	data.location = this.location;
    data.createdOn = moment(new Date()).format("X");
    data.isAdmin = false;
   return  this.users.add(data);
}

  isAdmin(emailId: string) {
    return this.db.collection('users', ref =>
      ref.where("email", "==", emailId)
    );
  }
  getuser(userid: string) {
    console.log(userid);
    return this.db.collection('users', ref =>
      ref.where("uid", "==", userid)
    ).valueChanges();
  }

 
  updateUser(user) {
    this.users.update(user.uid, user);
  }

  setLocation(user,lat, lon) {
    // let curr_user=this.db.collection('users', ref =>
    //   ref.where("email", "==", user.email).orderBy("email")
    // );
    this.location.lat = lat;
    this.location.lon = lon;

   // curr_user.update(user.$key, user);

  }
}
