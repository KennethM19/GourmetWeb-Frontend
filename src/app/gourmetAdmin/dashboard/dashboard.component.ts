import {Component} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBell, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  menuHidden: boolean = true;
  faUser = faUser;
  fabell = faBell;

  toggleMenu(): void {
    this.menuHidden = !this.menuHidden;
  }
}
