import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../layout/home-layout/home-layout.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CardComponent } from './card/card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { Layouts } from '../app.component'
const routes: Routes = [
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
    path: 'tradelinestore',
    component: StoreComponent,
    data: { layout: Layouts.Home }
  },
  {
    path: 'tradelinestore/productdetails',
    component: ProductDetailsComponent,
    data: { layout: Layouts.Home }
  },
   {
    path: 'cart',
    component: CartComponent,
    data: { layout: Layouts.Home }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { layout: Layouts.Home }
  }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
