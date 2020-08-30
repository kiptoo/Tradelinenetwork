import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from '../material.module';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CardComponent } from './card/card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [AuthComponent,HomeComponent, StoreComponent, CartComponent, CheckoutComponent, CardComponent, ProductDetailsComponent],
  imports: [
    //RouterModule.forChild([]),
    CommonModule,
    HomeRoutingModule,
    // BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    // BrowserAnimationsModule,
    // //MatSnackBarModule,
    // MaterialModule,
    // AngularFirestoreModule.enablePersistence(),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule
  ]
})
export class HomeModule { }
