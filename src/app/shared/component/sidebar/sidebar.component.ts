import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SidebarService} from '../../../core/services/sidebar/sidebar.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBars, faChair, faClipboardList, faSignOutAlt, faTimes, faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../../core/services/auth/auth.service';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { IUser } from '../../../interface/IUser';

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

  constructor(private authService: AuthService, private profileService: ProfileService) {
  }

  isLoggedIn: boolean = false;
  userData: IUser | null = null;
  userName: string = '';
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

      if(loggedIn) {
        this.profileService.getUserProfile().subscribe({
          next:(user) => {
            this.userData = user;
            this.userName = this.userData.first_name
          }
        })
      }
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
