import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SidebarService} from '../../shared/services/sidebar.service';
import {IProducto, ProductoService} from '../../core/services/producto/producto.service';
import { Router } from '@angular/router';

interface IPromocion {
  codigo: string;
  descripcion: string;
  descuento: number;
  minimoCompra?: number;
  activa: boolean;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class PedidosComponent implements OnInit {
  productos: IProducto[] = [];
  resumenPedidos: IProducto[] = [];
  private sidebarService = inject(SidebarService);
  categorias = ['1', '2', '3', '4'];
  categoriaSeleccionada: string = '';
  isCollapsed$ = this.sidebarService.isCollapsed$;

  promociones: IPromocion[] = [
    {
      codigo: 'PROMO20',
      descripcion: '20% de descuento en tu primer pedido',
      descuento: 20,
      minimoCompra: 50,
      activa: true
    },
    {
      codigo: 'HAPPY2025',
      descripcion: '15% en pedidos superiores a S/100',
      descuento: 15,
      minimoCompra: 100,
      activa: true
    }
  ];

  promocionAplicada: IPromocion | null = null;
  codigoPromocion: string = '';

  constructor(private productoService: ProductoService, private router: Router) {
  }

  ngOnInit(): void {
    this.productoService.getProducts().subscribe((data) => {
      this.productos = data.map(producto => ({
        ...producto,
        cantidad_selecionada: 0,
      }));
      console.log(data);
    });
  }

  get productosFiltrados(): IProducto[] {
    return this.productos.filter(producto => producto.tipo == this.categoriaSeleccionada);
  }

  cambiarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    console.log('categoria=', this.categoriaSeleccionada);
  }

  incrementarProducto(producto: IProducto): void {
    if (producto.cantidad_selecionada < producto.cantidad_disponible) {
      producto.cantidad_selecionada++;
    }
  }

  disminuirProducto(producto: IProducto): void {
    if (producto.cantidad_selecionada > 0) {
      producto.cantidad_selecionada--;
    }
  }

  agregarProducto(producto: IProducto): void {
    if (producto.cantidad_selecionada < producto.cantidad_disponible) {
      const productoEnResumen = this.resumenPedidos.find(p => p.id === producto.id);

      if (!productoEnResumen) {
        this.resumenPedidos.push({
          ...producto,
          cantidad_selecionada: 1
        });
      } else {
        productoEnResumen.cantidad_selecionada++;
      }
    }
  }

  quitarProducto(producto: IProducto): void {
    if (producto.cantidad_selecionada > 0) {
      producto.cantidad_selecionada--;
      if (producto.cantidad_selecionada === 0) {
        this.resumenPedidos = this.resumenPedidos.filter(p => p.id !== producto.id)
      }
    }
  }

  aplicarPromocion(): void {
    const promocion = this.promociones.find(
      p => p.codigo === this.codigoPromocion.toUpperCase() && p.activa
    );

    if (promocion) {
      const subtotal = this.calcularSubtotal();
      if (subtotal >= (promocion.minimoCompra || 0)) {
        this.promocionAplicada = promocion;
      } else {
        alert(`El pedido mínimo para esta promoción es S/${promocion.minimoCompra}`);
      }
    } else {
      alert('Código de promoción inválido o expirado');
    }
  }

  calcularSubtotal(): number {
    return this.resumenPedidos.reduce(
      (total, producto) => total + (producto.cantidad_selecionada * producto.precio),
      0
    );
  }

  calcularDescuento(): number {
    if (!this.promocionAplicada) return 0;
    return (this.calcularSubtotal() * this.promocionAplicada.descuento) / 100;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() - this.calcularDescuento();
  }

  volverDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
