import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  platillos = [
    {
      imagen: 'https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png',
      descripcion: 'Delicioso plato gourmet con una presentación artística que resalta los colores vibrantes de los ingredientes.'
    },
    {
      imagen: 'https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png',
      descripcion: 'Jugoso filete acompañado de una guarnición de verduras asadas, resaltando la frescura y calidad de los ingredientes.'
    },
    {
      imagen: 'https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png',
      descripcion: 'Ensalada vibrante con verduras frescas y coloridas, perfecta para una experiencia culinaria saludable y deliciosa.'
    }
  ];
}
