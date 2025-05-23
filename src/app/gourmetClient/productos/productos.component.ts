import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SidebarService} from '../../shared/services/sidebar.service';
import {IImagenProducto, IProducto, ProductoService} from '../../core/services/producto/producto.service';
import {Router} from '@angular/router';
import {PedidoService} from '../../core/services/pedido/pedido.service';

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
  imagenesProductos: { [key: number]: string } = {};
  resumenPedidos: IProducto[] = [];
  private sidebarService = inject(SidebarService);
  categorias = [
    {id: '1', nombre: 'Platos Principales'},
    {id: '2', nombre: 'Bebidas'},
    {id: '3', nombre: 'Entradas'},
    {id: '4', nombre: 'Postre'},
  ];
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

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private pedidoService: PedidoService
  ) {
  }

  ngOnInit(): void {
    this.productoService.getProducts().subscribe((data) => {
      this.productos = data.map(producto => ({
        ...producto,
        cantidad_selecionada: 0,
      }));

      this.productos.forEach(producto => {
        this.cargarImagen(producto.id, '1');
      })
    });
  }

  get productosFiltrados(): IProducto[] {
      if (!this.categoriaSeleccionada || this.categoriaSeleccionada === '') {
    return this.productos;
  }
    return this.productos.filter(producto => producto.tipo == this.categoriaSeleccionada);
  }

  cambiarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    console.log(this.categoriaSeleccionada);
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
          cantidad_selecionada: producto.cantidad_selecionada,
        });
      } else {
        productoEnResumen.cantidad_selecionada += producto.cantidad_selecionada;
      }
      producto.cantidad_selecionada = 0;
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

  confirmarPedido(): void {
    setTimeout(() => {
      const pedidoExitoso = this.pedidoService.iniciarNuevoPedido(this.resumenPedidos);

      if (pedidoExitoso) {
        alert('Pago realizado');
        this.router.navigate(['/detalle-pedido']);
      } else {
        alert('Ya tienes un pedido en proceso. Espera a que se complete.');
      }
    }, 2000);
  }

  cargarImagen(productoId: number, productoTipo: string): void {
    const apiImagen = `https://server.rest.devmb.top/admin-res/api/v1/archivo/producto/${productoId}/${productoTipo}`;
    this.productoService.getImage(apiImagen).subscribe((data: IImagenProducto[]) => {
      if (data && data.length > 0) {
        this.imagenesProductos[productoId] = 'https://server.rest.devmb.top/' + data[0].ruta_parcial;
      } else {
        this.imagenesProductos[productoId] = 'assets/default-image.jpg';
      }
    });
  }

  getImagenProducto(productoId: number): string {
    return this.imagenesProductos[productoId] || 'assets/default-image.jpg';
  }

  borrarfiltro() {
    this.categoriaSeleccionada = '';
    console.log(this.categoriaSeleccionada);
  }
}
