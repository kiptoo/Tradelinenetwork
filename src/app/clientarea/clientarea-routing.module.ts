import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientareaLayoutComponent } from '../layout/clientarea-layout/clientarea-layout.component';
import { AccountComponent } from './account/account.component';
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


import { Layouts } from '../app.component'
const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    data: { layout: Layouts.Clientarea }
  },
  {
    path: 'login',
    component: AuthComponent,
    data: { layout: Layouts.Clientarea }
  },
  // {
  //   path: '',
  //   redirectTo: 'account',
  //   pathMatch: 'full'
  // },
   {
    path: 'account/profile-create',
    component: ProfileCreateComponent,
    data: { layout: Layouts.Clientarea }
  },
  {
    path: 'account/profile-view',
    component: ProfileViewComponent,
    data: { layout: Layouts.Clientarea }
  },
  {
    path: 'account/cart',
    component: CartComponent,
    data: { layout: Layouts.Clientarea }
  },
  {
    path: 'account/checkout',
    component: CheckoutComponent,
    data: { layout: Layouts.Clientarea }
  },
  {
    path: 'account/orders',
    component: OrdersComponent,
    data: { layout: Layouts.Clientarea }
  },
  {
    path: 'account/order-details',
    component: OrderDetailsComponent,
    data: { layout: Layouts.Clientarea }
  },
  {
    path: 'account/transactions',
    component: TransactionsComponent,
    data: { layout: Layouts.Clientarea }
  },
  {
    path: 'account/transaction-details',
    component: TransactionDetailsComponent,
    data: { layout: Layouts.Clientarea }
  },
  {
    path: 'account/tradelinestore',
    component: ProductsListComponent,
    data: { layout: Layouts.Clientarea }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientareaRoutingModule { }
