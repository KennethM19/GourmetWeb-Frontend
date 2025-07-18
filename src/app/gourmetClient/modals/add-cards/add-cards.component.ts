import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ICardCreated } from '../../../interface/ICards';

@Component({
  selector: 'app-add-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-cards.component.html',
  styleUrl: './add-cards.component.css',
})
export class AddCardsComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submitCard = new EventEmitter<ICardCreated>();
  currentYear = new Date().getFullYear();

  card: ICardCreated = {
    number: '',
    exp_month: 0,
    exp_year: 0,
    owner: '',
    is_credit: false,
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitCard.emit(this.card);
      this.close.emit();
    } else {
      form.control.markAllAsTouched();
    }
  }

  onClose() {
    this.close.emit();
  }
}
