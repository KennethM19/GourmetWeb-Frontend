import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SidebarService} from '../../services/sidebar.service';
import {faCalendar, faShoppingCart, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;

  constructor(private authService: AuthService) {}

  userName: string = 'lucia Ramirez';
  avatarUrl: string = 'https://api.dicebear.com/7.x/avataaars/svg';
  menuItems = [
    {icon: faUser, label: 'Detalles de perfil', route: '/profile'},
    {icon: faShoppingCart, label: 'Historial de pedidos', route: '/pedidos'},
    {icon: faCalendar, label: 'Reservaciones', route: '/reservar-mesa'},
    {icon: faSignOutAlt, label: 'Cerrar sesión', route: '/logout'}
  ];

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
  }
}
