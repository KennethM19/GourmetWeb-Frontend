import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SidebarService} from '../../services/sidebar.service';
import {faCalendar, faShoppingCart, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;

  faUser = faUser;

  constructor(private authService: AuthService) {
  }

  userName: string = 'lucia Ramirez';
  avatarUrl: string = 'https://api.dicebear.com/7.x/avataaars/svg';
  menuItems = [
    {icon: faUser, label: 'Detalles de perfil', route: '/profile'},
    {icon: faShoppingCart, label: 'Historial de productos', route: '/productos'},
    {icon: faCalendar, label: 'Reservaciones', route: '/reservar-mesa'},
    {icon: faSignOutAlt, label: 'Cerrar sesión', route: '/logout'}
  ];
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    })
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }


  logout() {
    this.authService.logout();
  }

}
