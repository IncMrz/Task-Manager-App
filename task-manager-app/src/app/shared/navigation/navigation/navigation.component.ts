import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavButtonComponent } from '../../buttons/nav-button/nav-button.component';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavButtonComponent, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  someActionFunction() {
    console.log('Viewing task');
  }
}
