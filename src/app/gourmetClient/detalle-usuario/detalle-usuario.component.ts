import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar/sidebar.service';
import { ProfileService } from '../../core/services/profile/profile.service';
import { IUser } from '../../interface/IUser';
import { ICard } from '../../interface/ICards';
import { IAddress } from '../../interface/IAddress';
import { IAddressCreated } from '../../interface/IAddress';
import { ICardCreated } from '../../interface/ICards';
import { FormsModule } from '@angular/forms';
import { AddCardsComponent } from '../modals/add-cards/add-cards.component';
import { AddAddressComponent } from '../modals/add-address/add-address.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, AddAddressComponent, AddCardsComponent],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css',
})
export default class DetalleUsuarioComponent implements OnInit {
  private sidebarService = inject(SidebarService);
  isCollapsed$ = this.sidebarService.isCollapsed$;

  userData: IUser | null = null;
  cardData: ICard[] = [];
  addressData: IAddress[] = [];

  showCardModal = false;
  showAddressModal = false;

  constructor(
    private profileService: ProfileService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserData();
      this.loadCards();
      this.loadAddresses();
    }
  }

  // Funciones de carga
  loadUserData() {
    this.profileService.getUserProfile().subscribe({
      next: (user) => {
        this.userData = user;
      },
      error: (err) => {
        console.error('Error al obtener el perfil:', err);
      },
    });
  }

  loadCards() {
    this.profileService.getCardData().subscribe({
      next: (cards) => {
        this.cardData = cards;
      },
      error: (err) => {
        console.error('Error al conseguir la tarjeta:', err);
      },
    });
  }

  loadAddresses() {
    this.profileService.getAddresData().subscribe({
      next: (addresses) => {
        this.addressData = addresses;
      },
      error: (err) => {
        console.error('Error al conseguir la dirección:', err);
      },
    });
  }

  // Handlers para los modals
  handleNewCard(card: ICardCreated) {
    this.profileService.addCard(card).subscribe({
      next: () => {
        this.loadCards();
        this.showCardModal = false;
      },
      error: (err) => {
        console.error('Error al agregar tarjeta', err);
      },
    });
  }

  handleNewAddress(address: IAddressCreated) {
    this.profileService.addAddress(address).subscribe({
      next: () => {
        this.loadAddresses();
        this.showAddressModal = false;
      },
      error: (err) => {
        console.error('Error al agregar dirección', err);
      },
    });
  }

  deleteCard(cardId: number) {
    this.profileService.deleteCard(cardId).subscribe({
      next: () => {
        this.loadCards();
      },
      error: (err) => {
        console.error('Error al eliminar', err);
      },
    });
  }

  deleteAddress(addressId: number) {
    this.profileService.deleteAddress(addressId).subscribe({
      next: () => {
        this.loadAddresses();
      },
      error: (err) => {
        console.error('Error al eliminar', err);
      },
    });
  }

  volverDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
