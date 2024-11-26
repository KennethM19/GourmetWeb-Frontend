import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  registerForm = FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
   
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean} | null {
    const password = form.get('pasword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword? null : { passwordMismatch: true };
  }

  onSubmit(): void {
  }
}
