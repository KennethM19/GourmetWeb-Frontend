import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarService} from '../../shared/services/sidebar.service';
import {IProducto, ProductoService} from '../../core/services/producto/producto.service';


@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export default class PedidosComponent implements OnInit {
  productos: IProducto[] = [];
  private sidebarService = inject(SidebarService);
  categorias = ['Entradas', 'plato', 'Postres', 'bebida'];
  categoriaSeleccionada: string = '';
  isCollapsed$ = this.sidebarService.isCollapsed$;

  constructor(private productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.productoService.getProducts().subscribe((data) => {
      this.productos = data;
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

}
