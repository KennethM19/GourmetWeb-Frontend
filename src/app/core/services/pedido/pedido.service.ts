import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

const MAX_HISTORIAL = 4;

export interface ProductoPedido {
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Pedido {
  productos: ProductoPedido[];
  subtotal: number;
  estado: 'Recibido' | 'En preparación' | 'En ruta' | 'Entregado';
}

export interface HistorialPedido {
  fecha: string;
  platos: number;
  total: number;
  estado: string;
  productos?: ProductoPedido[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidoActualSubject = new BehaviorSubject<Pedido | null>(null);
  private historialPedidosSubject = new BehaviorSubject<HistorialPedido[]>([]);
  pedidoActual$ = this.pedidoActualSubject.asObservable();
  historialPedidos$ = this.historialPedidosSubject.asObservable();
  private pedidoConfirmado = false;
  private intervalId: any;

  iniciarNuevoPedido(productos: any[]): boolean {
    if (this.pedidoActualSubject.value) {
      return false;
    }

    this.pedidoConfirmado = true;
    const subtotal = productos.reduce((total, p) =>
      total + (p.precio * p.cantidad_selecionada), 0);

    const nuevoPedido: Pedido = {
      productos: productos.map(p => ({
        nombre: p.nombre,
        cantidad: p.cantidad_selecionada,
        precio: p.precio
      })),
      subtotal: subtotal,
      estado: 'Recibido'
    };

    this.pedidoActualSubject.next(nuevoPedido);
    this.iniciarSeguimientoPedido();
    return true;
  }

  private iniciarSeguimientoPedido(): void {
    const estados: Pedido['estado'][] = ['Recibido', 'En preparación', 'En ruta', 'Entregado'];
    let index = 0;

    this.intervalId = setInterval(() => {
      const pedidoActual = this.pedidoActualSubject.value;
      if (pedidoActual && index < estados.length - 1) {
        index++;
        this.actualizarEstadoPedido(estados[index]);
        if (estados[index] === 'Entregado') {
          this.moverAHistorial();
        }
      }
    }, 30000);
  }

  private moverAHistorial(): void {
    const pedido = this.pedidoActualSubject.value;
    if (pedido) {
      const historialActual = this.historialPedidosSubject.value;
      const nuevoPedidoHistorial: HistorialPedido = {
        fecha: new Date().toLocaleDateString(),
        platos: pedido.productos.length,
        total: pedido.subtotal,
        estado: pedido.estado,
        productos: pedido.productos
      };

      const nuevosPedidos = [nuevoPedidoHistorial, ...historialActual]
        .slice(0, MAX_HISTORIAL);

      this.historialPedidosSubject.next(nuevosPedidos);
      this.pedidoActualSubject.next(null);
      this.limpiarIntervalo();
    }
  }

  private limpiarIntervalo(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  actualizarEstadoPedido(nuevoEstado: Pedido['estado']): void {
    const pedidoActual = this.pedidoActualSubject.value;
    if (pedidoActual) {
      this.pedidoActualSubject.next({
        ...pedidoActual,
        estado: nuevoEstado
      });
    }
  }

  isPedidoConfirmado(): boolean {
    return this.pedidoConfirmado;
  }

  resetPedidoConfirmado(): void {
    this.pedidoConfirmado = false;
  }

  cancelarPedido(): void {
    const pedido = this.pedidoActualSubject.value;
    if (pedido) {
      const historialActual = this.historialPedidosSubject.value;
      const pedidoCancelado: HistorialPedido = {
        fecha: new Date().toLocaleDateString(),
        platos: pedido.productos.length,
        total: pedido.subtotal,
        estado: `${pedido.estado} (Cancelado)`,
        productos: pedido.productos
      };

      const nuevosPedidos = [pedidoCancelado, ...historialActual].slice(0, MAX_HISTORIAL);
      this.historialPedidosSubject.next(nuevosPedidos);
      this.pedidoActualSubject.next(null);
      this.limpiarIntervalo();
    }
  }
}
