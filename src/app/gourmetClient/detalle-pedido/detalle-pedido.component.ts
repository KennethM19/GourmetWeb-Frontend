import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarService} from '../../core/services/sidebar/sidebar.service';
import {HistorialPedido, Pedido, PedidoService} from '../../core/services/pedido/pedido.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css'
})
export default class DetallePedidoComponent implements OnInit, OnDestroy {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;
  private intervalId: any;

  pedidoActual: Pedido | null = null;
  historialPedidos: HistorialPedido[] = [];

  platoFrecuente = {
    nombre: 'Volcan de Chocolate',
    imagen: 'https://i.ibb.co/5XQSqf3/volcandechocolate.jpg'
  };

  mostrarModal = false;
  pedidoSeleccionado: HistorialPedido | null = null;

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.pedidoService.pedidoActual$.subscribe(pedido => {
      this.pedidoActual = pedido;
    });

    this.pedidoService.historialPedidos$.subscribe(historial => {
      this.historialPedidos = historial;
    });
  }

  cancelarPedido(): void {
    const motivo = prompt('Ingrese el motivo de cancelación y su correo electrónico:');
    if (motivo) {
      this.pedidoService.cancelarPedido();
      alert('Se recibió el motivo, se estará validando el pedido y se le reembolsará la compra. Le llegará una verificación por email.');
    }
  }

  verDetallesPedido(pedido: HistorialPedido): void {
    this.pedidoSeleccionado = pedido;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.pedidoSeleccionado = null;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  volverDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
