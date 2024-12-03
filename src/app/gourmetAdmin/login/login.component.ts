import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  login(): void {
    const {username, password} = this.formLogin.value;
    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard-admin']);
      },
      error: (error) => {
        this.loginError = true;
        console.error('Error en las credenciales');
      },
    });
  }


}
