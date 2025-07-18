import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IOrderCreated, IOrder } from '../../../interface/IOrder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private pedidoCreateApiUrl = `${environment.apiURL}/api/order/create/`;
  private pedidoGetApiUrl = `${environment.apiURL}/api/order/get/`;

  constructor(private http: HttpClient) {}

  crearPedido(pedido: IOrderCreated): Observable<any> {
    return this.http.post(this.pedidoCreateApiUrl, pedido);
  }

  getPedido(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.pedidoGetApiUrl);
  }
}
