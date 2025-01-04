import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-button',
  standalone: true,
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent {
  @Input() img: string = '';        // Slika koja će biti prikazana
  @Input() action: Function | null = null;  // Funkcija koja se poziva kad se gumb pritisne
}