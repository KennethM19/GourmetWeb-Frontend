import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../interface/IUser';
import { ICard } from '../../../interface/ICards';
import { IAddress } from '../../../interface/IAddress';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userUrl = `${environment.apiURL}/api/users/profile/`;
  private cardUrl = `${environment.apiURL}/api/users/cards/`;
  private addressUrl = `${environment.apiURL}/api/users/addresses/`;

  constructor(private httpClient: HttpClient) {}

  getUserProfile(): Observable<IUser> {
    return this.httpClient.get<IUser>(this.userUrl);
  }

  getCardData(): Observable<ICard> {
    return this.httpClient.get<ICard>(this.cardUrl);
  }

  getAddresData(): Observable<IAddress> {
    return this.httpClient.get<IAddress>(this.addressUrl)
  }
}
