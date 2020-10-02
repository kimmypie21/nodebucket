/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: September 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

//components
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: BaseLayoutComponent,
    children: [
      {path: '', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'about', component: AboutComponent},
    ]
  },

  { path: 'session', component: AuthLayoutComponent,
    children: [
      {path: "signin", component: SigninComponent},
      {path: 'not-found', component: NotFoundComponent}
    ]
  },

  { path: '**', redirectTo: 'session/not-found' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
