import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;
  
  userName: string = 'lucia Ramirez';
  avatarUrl: string = 'https://api.dicebear.com/7.x/avataaars/svg';
  menuItems = [
    { icon: 'PERFIL', label: 'Detalles de perfil', route: '/profile' },
    { icon: 'PEDIDOS', label: 'Historial de pedidos', route: '/orders' },
    { icon: 'MESAS', label: 'Reservaciones', route: '/reservations' },
    { icon: 'LOGOUT', label: 'Cerrar sesión', route: '/logout' }
  ];

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
