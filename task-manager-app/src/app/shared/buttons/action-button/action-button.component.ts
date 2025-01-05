import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent {
  @Input() img: string = '';
  @Input() text: string = '';
  @Input() class: string = '';
  @Input() action: Function | null = null;
}
