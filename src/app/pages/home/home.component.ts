/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/


import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from 'src/app/shared/task.service';
import { Item } from '../../shared/item.interface';
import { Employee} from '../../shared/employee-interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CreateTaskDialogueComponent } from 'src/app/shared/create-task-dialogue/create-task-dialogue.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  //tasks: any;
  todo: Item[];//declaring todo array
  done: Item[];//declaring done array
  empId: string; //define empId
  employee: Employee;//Employee interface

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) { 

    this.empId = this.cookieService.get('session_user');//get currently logged in empId from cookieService
    this.taskService.findAllTasks(this.empId).subscribe(res =>{
      console.log('--findAllTasks server response--');
      console.log(res);
      this.employee = res.data;
      console.log('--Employee object--');
      console.log(this.employee);
    }, err =>{
      console.log(err);
    }, () => {//run on complete to avoid undefined error
      this.todo = this.employee.todo;
      this.done = this.employee.done;
      console.log("--This is the complete function--");
      console.log(this.todo);
      console.log(this.done);
    })
  }

  ngOnInit(): void {
  }

  //drag and drop functionality
  drop(event: CdkDragDrop<any[]>){

    //change order in same container
    if (event.previousContainer === event.container){//check current container 
      moveItemInArray(event.container.data, 
                      event.previousIndex, 
                      event.currentIndex);//if same container, change order in array
      console.log('--Reordered the existing list of tasks--');
      this.updateTaskList(this.empId, this.todo, this.done);//call updated list of tasks
    }else{//if not same container, move to new container
      transferArrayItem(event.previousContainer.data, 
                        event.container.data, 
                        event.previousIndex, 
                        event.currentIndex);
      console.log ("--Moved Task Item to New Container--");
      this.updateTaskList(this.empId, this.todo, this.done);//call updated list of tasks
    }
  }
  //update task private function
  private updateTaskList(empId: string, todo: Item[], done: Item[]): void{
    this.taskService.updateTask(empId, todo, done).subscribe(res =>{
      this.employee = res.data;
    }, err => {
      console.log (err)
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    }
    )
  }
  //open dialog to create task
  openCreateTaskDialogue(){
    const dialogRef = this.dialog.open(CreateTaskDialogueComponent, {
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(data => {
      if (data){
        this.taskService.createTask(this.empId, data.text).subscribe(res =>{
          this.employee = res.data; 
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  //delete task function
  deleteTask(taskId: string){
    if (taskId){
      console.log('--Task Item: ${taskId} was deleted');
      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
      }, err =>{
        console.log(err);
      }, ()=>{
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })
    }
  }

}
