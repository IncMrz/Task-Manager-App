import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../../shared/buttons/action-button/action-button.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  someActionFunction() {
    console.log("click")
  }
}
