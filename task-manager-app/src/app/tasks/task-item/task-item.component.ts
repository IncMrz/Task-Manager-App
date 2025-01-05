import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../../shared/buttons/action-button/action-button.component';
import { TaskModel } from '../../model/Task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: TaskModel;
  @Output() taskSelected = new EventEmitter<TaskModel>();

 
  editTask(task: TaskModel) {
    this.taskSelected.emit(task);
  }
  deleteTask() {
    console.log('Deleting task', this.task);
  }
}
