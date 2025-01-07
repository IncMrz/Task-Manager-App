import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActionButtonComponent } from '../../shared/buttons/action-button/action-button.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent, TaskFormComponent],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  task: any;
  showEditModal = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  //On initialization get id from url and convert it to number, find task with that id
  ngOnInit(): void {
    this.localStorageService.tasks$.subscribe((tasks) => {
      const taskId = Number(this.route.snapshot.paramMap.get('id'));
      this.task = tasks.find((tsk: any) => tsk.id === taskId);
    });
  }
  //Open task form modal
  openEditModal(): void {
    this.showEditModal = true;
  }

  //Use service function for update, close modal
  onSaveTask(updatedTask: any): void {
    this.localStorageService.updateTask(updatedTask);
    alert('Task updated successfully!');
    this.task = updatedTask;
    this.closeEditModal();
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  //Change status completed/pending, sync changes
  toggleTaskStatus(): void {
    this.task.completed = !this.task.completed;
    this.localStorageService.updateTask(this.task);
    const tasks = this.localStorageService.getTasks();
    this.task = tasks.find((t: any) => t.id === this.task.id);
  }

  //Use service function to delete this task, redirect to home (all tasks)
  deleteTask(): void {
    this.localStorageService.deleteTask(this.task.id);
    this.router.navigate(['/']);
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
