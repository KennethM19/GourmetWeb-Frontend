import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../shared/services/sidebar.service';

interface Pedido {
  plato: string;
  cantidad: number;
  subtotal: number;
  estado: 'Recibido' | 'En preparación' | 'En ruta' | 'Entregado';
}

interface HistorialPedido {
  fecha: string;
  platos: number;
  total: number;
  estado: string;
}

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css'
})
export default class DetallePedidoComponent {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;

  pedidoActual: Pedido = {
    plato: 'Ensalada César',
    cantidad: 2,
    subtotal: 18.00,
    estado: 'En preparación'
  };

  historialPedidos: HistorialPedido[] = [
    {
      fecha: '15/09/2023',
      platos: 2,
      total: 25.00,
      estado: 'Entregado'
    }
  ];

  platoFrecuente = {
    nombre: 'Volcán de Chocolate',
    imagen: 'https://i.ibb.co/5XQSqf3/volcandechocolate.jpg'
  };

  verDetallesPedido(pedido: HistorialPedido): void {
    // Aquí irá la lógica para mostrar los detalles del pedido
    console.log('Mostrando detalles del pedido:', pedido);
  }
}