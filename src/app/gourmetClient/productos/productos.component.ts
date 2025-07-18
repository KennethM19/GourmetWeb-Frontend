import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../../core/services/sidebar/sidebar.service';
import { ProductoService } from '../../core/services/producto/producto.service';
import { IProduct } from '../../interface/IProduct';
import { Router } from '@angular/router';
import { PedidoService } from '../../core/services/pedido/pedido.service';
import { IOrder, IOrderCreated } from '../../interface/IOrder';

export interface IResumenPedido extends IProduct {
  cant_select: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export default class PedidosComponent implements OnInit {
  cantidadesSeleccionadas: { [productoId: number]: number } = {};
  cant_selected: number = 0;
  productos: IProduct[] = [];
  imagenesProductos: { [key: number]: string } = {};
  resumenPedidos: IResumenPedido[] = [];
  private sidebarService = inject(SidebarService);
  categorias = [
    { id: '1', nombre: 'Entradas' },
    { id: '2', nombre: 'Platos principales' },
    { id: '3', nombre: 'Postres' },
    { id: '4', nombre: 'Bebidas' },
  ];
  categoriaSeleccionada: string = '';
  isCollapsed$ = this.sidebarService.isCollapsed$;

  codigoPromocion: string = '';

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.productoService.getProducts().subscribe((data) => {
      this.productos = data.map((producto) => ({
        ...producto,
        cantidad_selecionada: 0,
      }));

      this.productos.forEach((producto) => {
        this.cantidadesSeleccionadas[producto.id] = 0;
      });
    });
  }

  getNombreCategoria(id: number): string {
    const categoria = this.categorias.find((cat) => Number(cat.id) === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  get productosFiltrados(): IProduct[] {
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === '') {
      return this.productos;
    }
    return this.productos.filter(
      (producto) =>
        producto.productType.id == Number(this.categoriaSeleccionada)
    );
  }

  cambiarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }

  incrementarProducto(producto: IProduct): void {
    if (this.cantidadesSeleccionadas[producto.id] < producto.cant_available) {
      this.cantidadesSeleccionadas[producto.id]++;
    }
  }

  disminuirProducto(producto: IProduct): void {
    if (this.cantidadesSeleccionadas[producto.id] > 0) {
      this.cantidadesSeleccionadas[producto.id]--;
    }
  }

  agregarProducto(producto: IProduct): void {
    const cantidad = this.cantidadesSeleccionadas[producto.id];

    if (cantidad > 0) {
      const productoEnResumen = this.resumenPedidos.find(
        (p) => p.id === producto.id
      );

      if (!productoEnResumen) {
        this.resumenPedidos.push({ ...producto, cant_select: cantidad });
      } else {
        productoEnResumen.cant_select += cantidad;
      }
      this.cantidadesSeleccionadas[producto.id] = 0;
    }
  }

  quitarProducto(producto: IProduct): void {
    if (this.cant_selected > 0) {
      this.cant_selected--;
      if (this.cant_selected === 0) {
        this.resumenPedidos = this.resumenPedidos.filter(
          (p) => p.id !== producto.id
        );
      }
    }
  }
  calcularTotal(): number {
    return this.resumenPedidos.reduce(
      (total, producto) => total + this.cant_selected * producto.price,
      0
    );
  }

  volverDashboard() {
    this.router.navigate(['/dashboard']);
  }

confirmarPedido(): void {
  const pedido: IOrderCreated = {
    items: this.resumenPedidos.map(producto => ({
      product: producto.id,
      quantity: producto.cant_select
    }))
  };

  this.pedidoService.crearPedido(pedido).subscribe({
    next: res => {
      console.log('Pedido creado:', res);
      this.resumenPedidos = [];
      alert('¡Pedido confirmado!');
      this.router.navigate(['/dashboard']);
    },
    error: err => {
      console.error('Error al crear pedido:', err);
      alert('Ocurrió un error al confirmar el pedido.');
    }
  });
}

  getImagenProducto(producto: IProduct): string {
    if (!producto.image) {
      return 'assets/default-image.jpg';
    } else {
      return this.productoService.getImagenProductoCompleta(producto.image);
    }
  }

  borrarfiltro() {
    this.categoriaSeleccionada = '';
  }
}
