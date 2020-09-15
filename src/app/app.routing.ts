/*
Title: NodeBucket
Author: Professor Krasso
Date: September 2020
Modified By: Kimberly Pierce
Description: WEB 450 NodeBucket
*/

import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {HomeComponent} from './pages/home/home.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
      /*
        New components go here...
       */
    ]
  }
];
