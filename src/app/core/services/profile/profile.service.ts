import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../interface/IUser';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiURL}/api/users/profile/`;

  constructor(private httpClient: HttpClient) {}

  getUserProfile(): Observable<IUser> {
    return this.httpClient.get<IUser>(this.apiUrl);
  }
}
