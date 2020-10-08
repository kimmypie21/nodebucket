/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-task-dialogue',
  templateUrl: './create-task-dialogue.component.html',
  styleUrls: ['./create-task-dialogue.component.css']
})
export class CreateTaskDialogueComponent implements OnInit {//works 10.8

  taskForm: FormGroup;

  constructor( private dialogRef: MatDialogRef<CreateTaskDialogueComponent>, private fb: FormBuilder) {

   }

  ngOnInit(): void {//works 10.8
    this.taskForm = this.fb.group({
      text: [ null, Validators.compose([Validators.required])]//requires entry 
    })
  }
  createTask(){//works 10.8
    this.dialogRef.close(this.taskForm.value);//adds new task and closes dialog
  }
  cancel(){//works 10.8
    this.dialogRef.close(); //closes dialog on click of cancel button
  }
}
