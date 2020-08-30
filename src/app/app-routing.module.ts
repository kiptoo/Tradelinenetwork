import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
 {
    path: 'home',
   //redirectTo: '/home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'account',
     //redirectTo: '/account',
    loadChildren: () => import('./clientarea/clientarea.module').then(m => m.ClientareaModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
