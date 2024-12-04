import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../shared/services/sidebar.service';

interface Producto {
  id: number;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export default class PedidosComponent {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;

  categorias = ['Entradas', 'Platos Principales', 'Postres', 'Bebidas'];

  productos: Producto[] = [
    {
      id: 1,
      categoria: 'Platos Principales',
      nombre: 'Ensalada Gourmet',
      descripcion: 'Fresca y saludable con un toque de limón.',
      precio: 24.00,
      imagen: 'https://i.ibb.co/DVsQLZG/ensalada.jpg'
    },
    {
      id: 2,
      categoria: 'Platos Principales',
      nombre: 'Bistec a la Parrilla',
      descripcion: 'Jugoso y tierno, acompañado de papas al romero.',
      precio: 18.00,
      imagen: 'https://i.ibb.co/X8pDnwt/filete.jpg'
    },
    {
      id: 3,
      categoria: 'Postres',
      nombre: 'Volcán de Chocolate',
      descripcion: 'Postre irresistible con chocolate fundido.',
      precio: 8.00,
      imagen: 'https://i.ibb.co/5XQSqf3/volcandechocolate.jpg'
    },
    {
      id: 4,
      categoria: 'Postres',
      nombre: 'Pai de limón',
      descripcion: 'Postre irresistible con limón.',
      precio: 12.00,
      imagen: 'https://i.ibb.co/7gstJgx/Pie-de-Limon.jpg'
    },
    {
      id: 5,
      categoria: 'Postres',
      nombre: 'Tiramisu de avellanas',
      descripcion: 'Postre irresistible con avellanas.',
      precio: 10.00,
      imagen: 'https://i.ibb.co/CbR1p88/tiramisu.jpg'
    }
  ];

  carrito: any[] = [
    { producto: 'Ensalada Gourmet', cantidad: 2, precio: 24.00 },
    { producto: 'Bistec a la Parrilla', cantidad: 1, precio: 18.00 },
    { producto: 'Volcán de Chocolate', cantidad: 1, precio: 8.00 },
    { producto: 'Pai de limón', cantidad: 1, precio: 12.00 },
    { producto: 'Tiramisu de avellanas', cantidad: 1, precio: 12.00 }
  ];

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
}
