import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActionButtonComponent } from '../../shared/buttons/action-button/action-button.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskItemComponent,
    TaskFormComponent,
    ActionButtonComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  currentTask: any | null = null;
  showEditModal = false;
  filter: string = 'All';
  searchQuery: string = '';

  constructor(private localStorageService: LocalStorageService) {}

  //On initialization get tasks from storage and show updated data on any changes
  ngOnInit(): void {
    this.localStorageService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.applySearchAndFilter();
    });
  }

  //Apply search and filter to tasks based on user input/select
  applySearchAndFilter(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesFilter =
        this.filter === 'All' ||
        (this.filter === 'Pending' && !task.completed) ||
        (this.filter === 'Completed' && task.completed) ||
        (this.filter === 'Work' && task.category === 'Work') ||
        (this.filter === 'Personal' && task.category === 'Personal');

      const matchesSearch = task.title
        .toLowerCase()
        .startsWith(this.searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }

  //Get filter event on user select
  onFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filter = target?.value || 'All';
    this.applySearchAndFilter();
  }

  //Get searcg event on user input
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target?.value || '';
    this.applySearchAndFilter();
  }

  //Open task form modal based on selected task
  onEditTask(task: any): void {
    this.currentTask = task;
    this.showEditModal = true;
  }

  //Open task form modal with no selected task
  onAddTask(): void {
    this.currentTask = {};
    this.showEditModal = true;
  }

  //Use service functions for add/update, close modal
  onSaveTask(task: any): void {
    if (task.id) {
      this.localStorageService.updateTask(task);
      alert('Task updated successfully!');
    } else {
      this.localStorageService.addTask(task);
    }
    this.showEditModal = false; 
  }

  //Use service function to delete task with task id
  onDeleteTask(taskId: number): void {
    this.localStorageService.deleteTask(taskId);
  }

  //Reset current task and close modal
  closeEditModal(): void {
    this.currentTask = null;
    this.showEditModal = false;
  }
}

