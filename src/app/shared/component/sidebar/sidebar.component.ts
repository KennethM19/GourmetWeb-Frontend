import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faClipboardList, faChair, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from '../../services/sidebar.service';

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
  
  userName: string = 'lucia Ramirez';
  avatarUrl: string = 'https://api.dicebear.com/7.x/avataaars/svg';
  menuItems = [
    { icon: faUser, label: 'Detalles de perfil', route: '/profile' },
    { icon: faClipboardList, label: 'Historial de pedidos', route: '/orders' },
    { icon: faChair, label: 'Reservaciones', route: '/reservations' },
    { icon: faSignOutAlt, label: 'Cerrar sesión', route: '/logout' }
  ];

  // Iconos de Font Awesome
  faBars = faBars;
  faTimes = faTimes;
  
  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}