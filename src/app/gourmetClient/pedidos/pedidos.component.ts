import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../shared/services/sidebar.service';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export default class PedidosComponent {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;
  
  categorias = ['Entradas', 'Platos Principales', 'Postres', 'Bebidas'];
  categoriaSeleccionada: string = 'Platos Principales';
  
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

  carrito: ItemCarrito[] = [];
  notasEspeciales: string = '';

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
  }

  getProductosFiltrados(): Producto[] {
    return this.productos.filter(p => p.categoria === this.categoriaSeleccionada);
  }

  agregarAlCarrito(producto: Producto, cantidad: number) {
    const itemExistente = this.carrito.find(item => item.producto.id === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.carrito.push({ producto, cantidad });
    }
  }

  eliminarDelCarrito(productoId: number) {
    this.carrito = this.carrito.filter(item => item.producto.id !== productoId);
  }

  actualizarCantidad(productoId: number, nuevaCantidad: number) {
    const item = this.carrito.find(item => item.producto.id === productoId);
    if (item) {
      if (nuevaCantidad <= 0) {
        this.eliminarDelCarrito(productoId);
      } else {
        item.cantidad = nuevaCantidad;
      }
    }
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => 
      total + (item.producto.precio * item.cantidad), 0);
  }

  confirmarPedido() {
    // Aquí implementarías la lógica para procesar el pedido
    console.log('Pedido confirmado', {
      items: this.carrito,
      notas: this.notasEspeciales,
      total: this.calcularTotal()
    });
  }

  volver() {
    // Implementar navegación hacia atrás
    window.history.back();
  }
}