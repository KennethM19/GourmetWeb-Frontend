import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar/sidebar.service';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { IReservation } from '../../interface/IReservation';

@Component({
  selector: 'app-reservar-mesa',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './reservar-mesa.component.html',
  styleUrls: ['./reservar-mesa.component.css'],
})
export default class ReservarMesaComponent implements OnInit {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;

  formReserva: FormGroup = new FormGroup({});
  reservas: IReservation[] = [];
  errorMensaje = '';
  exitoMensaje = '';

  private reservationService = inject(ReservationService);

  ngOnInit(): void {
    this.formReserva = new FormGroup({
      people: new FormControl('', [Validators.required, Validators.min(1)]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^9\d{8}$/)]),
      notes: new FormControl(''),
    });

    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservationService.getReservation().subscribe({
      next: (data) => this.reservas = data,
      error: () => this.errorMensaje = 'Error al cargar reservaciones.'
    });
  }

  crearReserva(): void {
    if (this.formReserva.invalid) {
      this.errorMensaje = 'Completa todos los campos obligatorios.';
      return;
    }

    const reserva: any = this.formReserva.value;

    this.reservationService.crearReservation(reserva).subscribe({
      next: () => {
        this.exitoMensaje = 'Reservación creada con éxito.';
        this.errorMensaje = '';
        this.formReserva.reset();
        this.cargarReservas();
      },
      error: (error) => {
        this.errorMensaje = error.error?.error || 'No se pudo crear la reservación.';
        this.exitoMensaje = '';
      }
    });
  }
}
