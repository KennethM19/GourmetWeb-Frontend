import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SidebarService} from '../../services/sidebar.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBars, faChair, faClipboardList, faSignOutAlt, faTimes, faUser} from '@fortawesome/free-solid-svg-icons';
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

  constructor(private authService: AuthService) {
  }

  isLoggedIn: boolean = false;


  userName: string = 'lucia Ramirez';
  avatarUrl: string = 'https://api.dicebear.com/7.x/avataaars/svg';
  menuItems = [
    {icon: faUser, label: 'Detalles de perfil', route: '/profile'},
    {icon: faClipboardList, label: 'Productos', route: '/productos'},
    {icon: faChair, label: 'Reservaciones', route: '/reservar-mesa'},
    {icon: faSignOutAlt, label: 'Cerrar sesión', route: '/logout'}
  ];

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    })
  }

  logout() {
    this.authService.logout();
  }

  faBars = faBars;
  faTimes = faTimes;
  faUser = faUser;

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
