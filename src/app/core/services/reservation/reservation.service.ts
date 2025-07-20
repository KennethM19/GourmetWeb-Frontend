import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IReservation, IReservationCreated } from '../../../interface/IReservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private createReservationApiUrl = `${environment.apiURL}/api/reservation/create/`;
  private getReservationApiUrl = `${environment.apiURL}/api/reservation/get/`;

  constructor(private httpClient: HttpClient ) { }

  crearReservation(reservation: IReservationCreated): Observable<any> {
    return this.httpClient.post(this.createReservationApiUrl, reservation)
  }

  getReservation(): Observable<IReservation[]> {
    return this.httpClient.get<IReservation[]>(this.getReservationApiUrl)
  }
}
