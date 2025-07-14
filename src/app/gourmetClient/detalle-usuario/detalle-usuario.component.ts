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
    @Inject(PLATFORM_ID) private platformId: Object
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
        console.log('Perfil:', user);
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
        console.log('Tarjeta:', cards);
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
        console.log('Dirección', addresses);
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
}
