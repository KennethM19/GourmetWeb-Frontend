import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export default class RegisterComponent {
  user = {
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    username: '',
    password: '',
    dni: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    const apiUrl = 'https://server.rest.devmb.top/admin-res/api/v1/usuarios/';
    
    this.http.post(apiUrl, this.user).subscribe({
      next: () => {
        console.log('Registro exitoso');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error durante el registro', error);
      }
    });
  }
}
