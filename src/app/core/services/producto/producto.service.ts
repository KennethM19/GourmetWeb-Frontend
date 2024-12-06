import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface IProducto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number,
  tipo: string;
  disponible: boolean;
  cantidad_disponible: number;
  cantidad_selecionada: number;
}

export interface IImagenProducto {
  nombre: string;
  ext: string;
  ruta_parcial: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://server.rest.devmb.top/admin-res/api/v1/productos/';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.apiUrl);
  }

  getImage(productoId: number, productoTipo: string): Observable<IImagenProducto[]> {
    const apiImagen = `https://server.rest.devmb.top/admin-res/api/v1/archivo/producto/${productoId}/${productoTipo}`;
    return this.http.get<IImagenProducto[]>(apiImagen);
  }
}
