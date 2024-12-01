import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://server.rest.devmb.top/api/schema/redoc/#tag/admin-res/operation/admin_res_api_v1_login_token_create';
  private tokenKey =  'authToken';

  constructor(private httpClient: HttpClient, private router:Router) { }

  login(username:string, password:string): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, {username, password}).pipe(
      tap(response => {
        if (response.token) {
          console.log(response.token)
        }
      })
    )
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]))
    const expired = payload.exp * 1000

    return Date.now() < expired;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
