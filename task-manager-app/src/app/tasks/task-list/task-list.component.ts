import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskModel } from '../../model/Task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList: TaskModel[] = [];

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const oldData = localStorage.getItem('TaskData');
      if (oldData != null) {
        this.taskList = JSON.parse(oldData);
      }
    }
  }
}
