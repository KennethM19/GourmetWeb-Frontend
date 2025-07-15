import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../interface/IUser';
import { ICard, ICardCreated } from '../../../interface/ICards';
import { IAddress, IAddressCreated } from '../../../interface/IAddress';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userUrl = `${environment.apiURL}/api/users/profile/`;
  private cardUrl = `${environment.apiURL}/api/users/cards/`;
  private cardCreatedUrl = `${environment.apiURL}/api/users/cards/register/`;
  private addressUrl = `${environment.apiURL}/api/users/addresses/`;
  private addressCreateUrl = `${environment.apiURL}/api/users/addresses/register/`;

  constructor(private httpClient: HttpClient) {}

  getUserProfile(): Observable<IUser> {
    return this.httpClient.get<IUser>(this.userUrl);
  }

  getCardData(): Observable<ICard[]> {
    return this.httpClient.get<ICard[]>(this.cardUrl);
  }

  addCard(card: ICardCreated): Observable<any> {
    return this.httpClient.post(this.cardCreatedUrl, card);
  }

  deleteCard(cardId: number): Observable<any> {
    const url = `${environment.apiURL}/api/users/cards/${cardId}/delete/`;
    return this.httpClient.delete(url);
  }

  getAddresData(): Observable<IAddress[]> {
    return this.httpClient.get<IAddress[]>(this.addressUrl);
  }

  addAddress(address: IAddressCreated): Observable<any> {
    return this.httpClient.post(this.addressCreateUrl, address);
  }

  deleteAddress(addressId: number): Observable<any> {
    const url = `${environment.apiURL}/api/users/addresses/${addressId}/delete/`;
    return this.httpClient.delete(url);
  }
}
