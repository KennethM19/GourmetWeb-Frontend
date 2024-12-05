import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarService} from '../../shared/services/sidebar.service';
import {IProducto, ProductoService} from '../../core/services/producto/producto.service';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class PedidosComponent implements OnInit {
  productos: IProducto[] = [];
  resumenPedidos: IProducto[] = [];
  private sidebarService = inject(SidebarService);
  categorias = ['Entradas', 'plato', 'Postres', 'bebida'];
  categoriaSeleccionada: string = '';
  isCollapsed$ = this.sidebarService.isCollapsed$;

  constructor(private productoService: ProductoService) {
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
      producto.cantidad_selecionada++;
      const productoEnResumen = this.resumenPedidos.find(p => p.id === producto.id);

      if (!productoEnResumen) {
        this.resumenPedidos.push({...producto});
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

  calcularTotal(): number {
    return this.resumenPedidos.reduce((total, producto) => total + producto.cantidad_selecionada * producto.precio, 0);
  }

}
