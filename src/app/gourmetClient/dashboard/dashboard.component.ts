import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarService} from '../../shared/services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;

  platillos = [
    {
      imagen: 'https://i.ibb.co/LQSBMKs/comida-1.jpg',
      descripcion: 'Delicioso plato gourmet con una presentación artística que resalta los colores vibrantes de los ingredientes.'
    },
    {
      imagen: 'https://i.ibb.co/X8pDnwt/filete.jpg',
      descripcion: 'Jugoso filete acompañado de una guarnición de verduras asadas, resaltando la frescura y calidad de los ingredientes.'
    },
    {
      imagen: 'https://i.ibb.co/DVsQLZG/ensalada.jpg',
      descripcion: 'Ensalada vibrante con verduras frescas y coloridas, perfecta para una experiencia culinaria saludable y deliciosa.'
    }
  ];
}
