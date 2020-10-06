/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  sessionUser: string;
  baseUrl: string;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.sessionUser= this.cookieService.get('session_user');
    this.baseUrl = 'http://localhost:3000';//testing URL
   }

   //findAllTasks service
  findAllTasks(){
    return this.http.get('/api/employees/' + this.sessionUser + '/tasks')
    }



  //createTasks service



  //updateTasks service



  //deleteTasks service




}




