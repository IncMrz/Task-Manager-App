import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation/navigation.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskDetailsComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pageTitle: string = 'Task Manager App';
}
