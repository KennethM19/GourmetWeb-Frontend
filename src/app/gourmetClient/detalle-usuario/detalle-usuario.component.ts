import {Component, inject, OnInit} from '@angular/core';
import { SidebarService } from '../../core/services/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css',
})
export default class DetalleUsuarioComponent {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;
}
