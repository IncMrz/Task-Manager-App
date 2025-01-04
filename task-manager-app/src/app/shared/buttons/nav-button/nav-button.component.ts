import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.css'

})
export class NavButtonComponent {
 @Input() img: string = '';
 @Input() text: string = '';  
  @Input() action: Function | null = null;  
}
