/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskDialogueComponent } from './create-task-dialogue.component';

describe('CreateTaskDialogueComponent', () => {
  let component: CreateTaskDialogueComponent;
  let fixture: ComponentFixture<CreateTaskDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
