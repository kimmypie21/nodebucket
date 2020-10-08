/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
    
   }

   //findAllTasks service
  findAllTasks(empId:string): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks')
    }

  //createTasks service
  createTask(empId: string, task: string): Observable<any>{
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    })
}

  //updateTasks service
    updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
      return this.http.put('/api/employees/' + empId + '/tasks',{
        todo, done
      })
    }


  //deleteTasks service
    deleteTask(empId: string, taskId: string): Observable<any> {
      return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId) 
    }
}




