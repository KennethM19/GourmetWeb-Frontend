import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export default class RegisterComponent implements OnInit {
  formRegister: FormGroup = new FormGroup({});
  registerError: boolean = false;
  user = {
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    username: '',
    password: '',
    dni: '',
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{8}$/),
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern(/^9\d{8}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ])
    });
  }

  register(): void {
    const apiUrl = 'https://server.rest.devmb.top/admin-res/api/v1/usuarios/';

    this.http.post(apiUrl, this.user).subscribe({
      next: () => {
        console.log('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error durante el registro', error);
      },
    });
  }
}
