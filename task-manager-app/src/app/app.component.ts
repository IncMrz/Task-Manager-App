import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation/navigation.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { ActionButtonComponent } from './shared/buttons/action-button/action-button.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskDetailsComponent, TaskFormComponent, NavigationComponent, ActionButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pageTitle: string = 'Task Manager App';
}
