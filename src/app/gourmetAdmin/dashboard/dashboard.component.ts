import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  menuHidden: boolean = true;

  toggleMenu(): void {
    this.menuHidden = !this.menuHidden;
  }
}
