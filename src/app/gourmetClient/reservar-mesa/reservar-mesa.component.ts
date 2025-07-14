import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SidebarService} from '../../core/services/sidebar/sidebar.service';

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

  formRegister: FormGroup = new FormGroup({});
  reservaError: boolean = false;
  registerSucess: boolean = false;
  
  constructor(private http: HttpClient, private router: Router) {
  }
  
  ngOnInit(): void {
    this.formRegister = new FormGroup({
      numeroMesa: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      numeroPersonas: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      fecha: new FormControl('', [
        Validators.required,
      ]),
      hora: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern(/^9\d{8}$/),
      ]),
      observaciones: new FormControl(''),
    });
  }

  reservar(): void {
    const apiUrl = 'https://server.rest.devmb.top/admin-res/api/v1/reservas/';
    const {numeroMesa, numeroPersonas, fecha, hora, telefono, observaciones} = this.formRegister.value;

    // Verificar que todos los campos sean válidos
    if (this.formRegister.invalid) {
      this.reservaError = true;
      console.error('Por favor, completa todos los campos requeridos correctamente.');
      return;
    }

    // Convertir fecha y hora a formato ISO 8601

    const fechaISO = new Date(`${fecha}T${hora}`)
    fechaISO.setHours(fechaISO.getHours() - 5);

    const fechaISO2 = fechaISO.toISOString();
    console.log(numeroMesa);

    const reserva = {

      fecha_reserva: fechaISO2,
      mesa: numeroMesa,
      numero_personas: numeroPersonas,
      observaciones: observaciones || 'Sin observaciones',
      usuario: 1, // Cambiar según el usuario actual si aplica
      estado: 1, // Estado por defecto
    };

    this.http.post(apiUrl, reserva).subscribe({
      next: () => {
        console.log('Reserva registrada con éxito');
        this.registerSucess = true;
        this.formRegister.reset();
        // Redirige a una página después de la reserva

      },
      error: (error) => {
        this.reservaError = true;
        console.error('Error al registrar la reserva', error);
      }
    });
  }
}
