/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/


import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { Item } from '../../shared/item.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  tasks: any;
  todo:Array<Item>;
  done: Array<Item>;

  constructor(private taskService: TaskService) { 
    this.taskService.findAllTasks().subscribe(res =>{
      this.todo = res['data'].todo;
      this.done = res['data'].done;
      console.log(this.todo);
      console.log(this.done);
    }, err =>{
      console.log(err);
    })
  }

  ngOnInit(): void {
  }

}
