import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientareaLayoutComponent } from './clientarea-layout/clientarea-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from '../material.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';


@NgModule({
  declarations: [
  ClientareaLayoutComponent,
   HomeLayoutComponent,
   AuthLayoutComponent
   ],
  imports: [
    RouterModule.forChild([]),
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //MatSnackBarModule,
    MaterialModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
   exports: [
    HomeLayoutComponent,
    ClientareaLayoutComponent
  ],
})
export class LayoutModule { }
