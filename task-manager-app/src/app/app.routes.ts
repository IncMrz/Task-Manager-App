import { Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent }, 
  { path: 'tasks/:id', component: TaskDetailsComponent }, 
  { path: 'task-form', component: TaskFormComponent }
];
