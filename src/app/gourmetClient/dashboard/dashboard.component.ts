import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarService} from '../../core/services/sidebar/sidebar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  private sidebarService = inject(SidebarService);
  private router = inject(Router);
  isCollapsed$ = this.sidebarService.isCollapsed$;

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }

  platillos = [
    {
      imagen: 'https://storage.googleapis.com/www-factornueve-com/2020/02/9eab5278-bigstock-pollock-fish-fillet-with-veget-338718964.jpg',
      descripcion: 'Delicioso plato gourmet con una presentación artística que resalta los colores vibrantes de los ingredientes.'
    },
    {
      imagen: 'https://png.pngtree.com/thumb_back/fw800/background/20231107/pngtree-deliciously-grilled-steak-with-exquisite-presentation-on-a-textured-black-background-image_13805507.png',
      descripcion: 'Jugoso filete acompañado de una guarnición de verduras asadas, resaltando la frescura y calidad de los ingredientes.'
    },
    {
      imagen: 'https://th.bing.com/th/id/OIP.SBqHh-QSguZI0cFtgYHUJgHaE7?cb=iwc2&rs=1&pid=ImgDetMain',
      descripcion: 'Ensalada vibrante con verduras frescas y coloridas, perfecta para una experiencia culinaria saludable y deliciosa.'
    }
  ];
}
