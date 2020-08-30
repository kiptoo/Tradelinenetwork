import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import {  Router, Data, RoutesRecognized, ActivatedRoute } from "@angular/router";
import { UserService } from "../../shared/services/user.service";
import { AuthService } from "../../shared/services/auth.service";
import { DynamicLoadClientAreaService } from '../../shared/services/dynamic-load-client-area.service';


const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/front/img/profile_placeholder.png';
declare var $: any;

@Component({
  selector: 'app-clientarea-layout',
  templateUrl: './clientarea-layout.component.html',
  styleUrls: ['./clientarea-layout.component.css']
})
export class ClientareaLayoutComponent implements OnInit,AfterViewInit {
user: Observable<firebase.User>;
  currentUser: firebase.User;
  title = 'Front';
  profilePicStyles: {};
  date=Date();
  // url = "/assets/admin/js/nephos.js";

  
  constructor(
   private dynamicScriptLoader: DynamicLoadClientAreaService,
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


    // $.getScript('/assets/front/js/main.js');
    //$.getScript('/assets/admin/js/nephos.js');
    // $.getScript('/assets/admin/js/functions.js');
    // $.getScript('/assets/admin/js/authentication.js');
    // $.getScript('/assets/admin/js/app.js');
    // $.getScript('/assets/admin/js/search.js');


   //$.getScript('/assets/admin/js/nephos.js');
// this.loadAPI = new Promise(resolve => {
//   console.log("resolving promise...");
//   this.loadScript();
// });

  }
  ngAfterViewInit() {
     //this.loadScripts();
    // $.getScript('/assets/front/js/main.js');
    // $.getScript('/assets/admin/js/nephos.js');
    // $.getScript('/assets/admin/js/functions.js');
    // $.getScript('/assets/admin/js/authentication.js');
    // $.getScript('/assets/admin/js/app.js');
    // $.getScript('/assets/admin/js/search.js');

  }

    private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load().then(data => {
      // Script Loaded Successfully
      console.log("Successfully loaded js modules");
      console.log(data);
    }).catch(error => console.log(error));
  }
 logout(){
 this.Authservice.logout();
  
  }


}
