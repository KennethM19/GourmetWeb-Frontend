import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar/sidebar.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProfileService } from '../../core/services/profile/profile.service';
import { IUser } from '../../interface/IUser';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css',
})
export default class DetalleUsuarioComponent implements OnInit {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;

  userData: IUser | null = null;

  constructor(
    private profileService: ProfileService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.profileService.getUserProfile().subscribe({
        next: (user) => {
          this.userData = user;
          console.log('Perfil:', user);
        },
        error: (err) => {
          console.error('Error al obtener el perfil:', err);
        }
      });
    }
  }
}
