import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../../shared/buttons/action-button/action-button.component';


@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: any;
  @Output() taskUpdated = new EventEmitter<void>();


  // Gledaj zadatak
  viewTask() {
    console.log('Viewing task', this.task);
  }

  // Uredi zadatak
  editTask() {
    console.log('Editing task', this.task);
    // Prikazivanje forme za editiranje ili nešto slično
  }

  // Obriši zadatak
  deleteTask() {
    console.log('Deleting task', this.task);
    
  }
}