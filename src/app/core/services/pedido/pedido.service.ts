import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../../interface/IOrder';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private pedidoCreateApiUrl = `${environment.apiURL}/api/order/create/`;
  private pedidoGetApiUrl = `${environment.apiURL}/api/order/get/`;

  constructor(private http: HttpClient) {}

  crearPedido(pedido: IOrder) {
    return this.http.post(this.pedidoCreateApiUrl, pedido);
  }
}
