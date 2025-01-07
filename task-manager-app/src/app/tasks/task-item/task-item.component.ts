import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionButtonComponent } from '../../shared/buttons/action-button/action-button.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  //Router and storage constructor
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  //Inputs and outputs for data
  @Input() task: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  //Redirect to task details
  viewTask(): void {
    this.router.navigate(['/task', this.task.id]);
  }

  //Emit task for wdit and delete
  editTask(): void {
    this.edit.emit(this.task);
  }

  deleteTask(): void {
    this.delete.emit(this.task.id);
  }
  //Change status between completed and pending and update local storage
  toggleTaskStatus(): void {
    this.task.completed = !this.task.completed;
    this.localStorageService.updateTask(this.task);
  }
}
