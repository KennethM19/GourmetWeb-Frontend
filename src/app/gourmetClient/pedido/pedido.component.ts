import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar/sidebar.service';
import { PedidoService } from '../../core/services/pedido/pedido.service';
import { Router } from '@angular/router';
import { IOrder } from '../../interface/IOrder';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
})
export default class PedidoComponent implements OnInit, OnDestroy {
  private sidebarService = inject(SidebarService);
  private intervalId: any;
  isCollapsed$ = this.sidebarService.isCollapsed$;
  mostrarModal = false;
  orderData: IOrder[] = [];

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadOrder();
    }
  }

  loadOrder() {
    this.pedidoService.getPedido().subscribe({
      next: (order) => {
        this.orderData = order.map((o) => ({
          ...o,
          date_created: this.formatDate(o.date_created),
        }));
      },
      error: (err) => {
        console.error('Error al obtener los pedidos:', err);
      },
    });
  }

  cancelarPedido(): void {
    const motivo = prompt(
      'Ingrese el motivo de cancelación y su correo electrónico:'
    );
    if (motivo) {
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  volverDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
