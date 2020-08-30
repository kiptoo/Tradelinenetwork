import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { ClientareaRoutingModule } from './clientarea-routing.module';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from '../material.module';
import { ProfileCreateComponent } from './account/profile-create/profile-create.component';
import { ProfileEditComponent } from './account/profile-edit/profile-edit.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { CartComponent } from './products/cart/cart.component';
import { CheckoutComponent } from './products/checkout/checkout.component';
import { OrdersComponent } from './account/orders/orders.component';
import { TransactionsComponent } from './account/transactions/transactions.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileViewComponent } from './account/profile-view/profile-view.component';
import { OrderDetailsComponent } from './account/order-details/order-details.component';
import { TransactionDetailsComponent } from './account/transaction-details/transaction-details.component';


@NgModule({
  declarations: [AccountComponent, ProfileCreateComponent, ProfileEditComponent, ProductsComponent, ProductsListComponent, ProductsDetailsComponent, CartComponent, CheckoutComponent, OrdersComponent, TransactionsComponent, AuthComponent, ProfileViewComponent, OrderDetailsComponent, TransactionDetailsComponent],
  imports: [
    CommonModule,
    ClientareaRoutingModule,
    // RouterModule.forChild([]),
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
export class ClientareaModule { }
