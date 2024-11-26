import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.apiUrl
  constructor(private http: HttpClient) { }
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/clientes/`, userData);
  }
}
