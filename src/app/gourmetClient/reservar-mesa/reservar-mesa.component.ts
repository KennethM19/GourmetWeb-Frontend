import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar-mesa',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './reservar-mesa.component.html',
  styleUrl: './reservar-mesa.component.css'
})
export default class ReservarMesaComponent {
  formRegister: FormGroup = new FormGroup({});
  registerError: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit(): void {




    this.formRegister = new FormGroup({
      numeroPersonas: new FormControl('', [
        Validators.required,
      ]),
      fecha: new FormControl('', [
        Validators.required,
      ]),
      hora: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', [
        Validators.required,
      ]),
    });

  }

}

