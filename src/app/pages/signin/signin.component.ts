/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Validators }  from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor( private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  login(){
    const empId = this.form.controls['empId'].value;
    this.http.get('/api/employees/' + empId).subscribe(res =>{
      if (res) {
        this.cookieService.set('session_user', empId, 1);//set the emp id to the cookie, session user name
        this.router.navigate(['/']); 
      }else{
        this.error="The Employee Id you entered is invalid. Please try again."
      }
    })
  } 
}