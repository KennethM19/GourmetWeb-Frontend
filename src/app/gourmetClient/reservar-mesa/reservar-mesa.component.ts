import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarService } from '../../shared/services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservar-mesa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservar-mesa.component.html',
  styleUrls: ['./reservar-mesa.component.css']
})
export default class ReservarMesaComponent {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;
  
  private http = inject(HttpClient); // Inyectamos HttpClient para realizar solicitudes
  reservaForm: FormGroup; // Formulario reactivo
  
  constructor(private router: Router) {
    // Definición del formulario reactivo
    this.reservaForm = new FormGroup({
      numeroPersonas: new FormControl('', [Validators.required, Validators.min(1)]),
      fecha: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern(/^9\d{8}$/) // Valida un número peruano (9 dígitos, comienza con 9)
      ])
    });
  }

  // Método para manejar el envío del formulario
  registrarReserva(): void {
    if (this.reservaForm.valid) {
      const data = this.reservaForm.value;

      // Realizar la solicitud HTTP a la API
      this.http.post('https://server.rest.devmb.top/admin-res/api/v1/reservas/', data).subscribe({
        next: (response) => {
          alert('Reserva registrada exitosamente');
          this.reservaForm.reset(); // Resetea el formulario
          
        },
        error: (error) => {
          console.error('Error al registrar la reserva:', error);
          alert('Error al registrar la reserva. Por favor, intenta nuevamente.');
        }
      });
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }
}
