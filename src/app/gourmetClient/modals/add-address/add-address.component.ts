import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IAddressCreated } from '../../../interface/IAddress';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css',
})
export class AddAddressComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submitAddress = new EventEmitter<IAddressCreated>();

  address: IAddressCreated = {
    id: 0,
    street: '',
    number: '',
    apartment: '',
    district: '',
    city: '',
    zip_code: '',
  };

  onSubmit() {
    this.submitAddress.emit(this.address);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
