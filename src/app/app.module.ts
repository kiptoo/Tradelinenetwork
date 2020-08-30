import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';
import {ClientareaModule} from './clientarea/clientarea.module';
import {HomeModule} from './home/home.module';
import {LayoutModule} from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home/home.component';
import { AuthComponent } from './home/auth/auth.component';
import { AccountComponent } from './clientarea/account/account.component';
import { ClientareaLayoutComponent } from './layout/clientarea-layout/clientarea-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { Layouts } from './app.component'
//import {APP_BASE_HREF} from '@angular/common';

const configErrMsg = `You have not configured and imported the Firebase SDK.
Make sure you go through the codelab setup instructions.`;

const bucketErrMsg = `Your Firebase Storage bucket has not been enabled. Sorry
about that. This is actually a Firebase bug that occurs rarely. Please go and
re-generate the Firebase initialization snippet (step 4 of the codelab) and make
sure the storageBucket attribute is not empty. You may also need to visit the
Storage tab and paste the name of your bucket which is displayed there.`;


if (!environment.firebase) {
  if (!environment.firebase.apiKey) {
    window.alert(configErrMsg);
  } else if (environment.firebase.storageBucket === '') {
    window.alert(bucketErrMsg);
  }
}
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { layout: Layouts.Home }
  },
  {
    path: 'auth',
    component: AuthComponent,
    data: { layout: Layouts.Home }
  },
  {
    path: 'account',
    component: AccountComponent,
    data: { layout: Layouts.Home }
  }
];






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
     { enableTracing: true } 
    ),
    BrowserAnimationsModule,
    //MatSnackBarModule,
    MaterialModule,
    ClientareaModule,
    LayoutModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
