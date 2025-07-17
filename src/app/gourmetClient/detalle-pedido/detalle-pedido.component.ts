import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarService} from '../../core/services/sidebar/sidebar.service';
import { PedidoService} from '../../core/services/pedido/pedido.service';
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



  platoFrecuente = {
    nombre: 'Volcan de Chocolate',
    imagen: 'https://i.ibb.co/5XQSqf3/volcandechocolate.jpg'
  };

  mostrarModal = false;


  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  cancelarPedido(): void {
    const motivo = prompt('Ingrese el motivo de cancelación y su correo electrónico:');
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
}
