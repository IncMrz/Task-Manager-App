import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../../shared/buttons/action-button/action-button.component';
import { TaskModel } from '../../model/Task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  taskForm: FormGroup = new FormGroup({});
  taskObj: TaskModel = new TaskModel();
  taskList: TaskModel[] = [];

  someActionFunction() {
    console.log('blksajd');
  }
  constructor() {
    this.createForm();
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const oldData = localStorage.getItem('TaskData');
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.taskList = parseData;
      }
    }
  }

  createForm() {
    this.taskForm = new FormGroup({
      taskId: new FormControl(this.taskObj.taskId),
      title: new FormControl(this.taskObj.title),
      description: new FormControl(this.taskObj.description),
      category: new FormControl(this.taskObj.category),
      dateTime: new FormControl(this.taskObj.dateTime),
      status: new FormControl(this.taskObj.status),
    });
  }

  onSave() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const oldData = localStorage.getItem('TaskData');
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.taskForm.controls['taskId'].setValue(parseData.length + 1);
        this.taskList.unshift(this.taskForm.value);
      } else {
        this.taskList.unshift(this.taskForm.value);
      }
      localStorage.setItem('TaskData', JSON.stringify(this.taskList));
    }
  }
  onEdit(item: TaskModel) {
    this.taskObj = item;
    this.createForm();
  }
}
