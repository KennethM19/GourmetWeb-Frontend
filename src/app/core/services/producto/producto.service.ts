import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IProduct } from '../../../interface/IProduct';
import { environment } from '../../../../environments/environment';

export interface IImagenProducto {
  nombre: string;
  ext: string;
  ruta_parcial: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productUrl = `${environment.apiURL}/api/order/products/`;

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl);
  }

  getImagenProductoCompleta(path: string | null): string {
  return `${environment.apiURL}${path}`;
}
}
