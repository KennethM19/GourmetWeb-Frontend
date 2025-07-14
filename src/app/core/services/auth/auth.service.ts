import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiURL}/api/users/login/`;
  private refreshUrl = `${environment.apiURL}/users/token/refresh/`;
  private tokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        if (response.access && response.refresh) {
          this.setTokens(response.access, response.refresh);
          this.loggedIn.next(true);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() < payload.exp * 1000;
    } catch (e) {
      console.error('Token inválido:', e);
      return false;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem('userData');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  refreshAccessToken(): Observable<any> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      this.logout();
      throw new Error('No se encontró el refresh token');
    }

    return this.httpClient.post<any>(this.refreshUrl, { refresh }).pipe(
      tap((response) => {
        if (response.access_token) {
          localStorage.setItem(this.tokenKey, response.access);
        }
      })
    );
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.tokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private getToken(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem(this.tokenKey)
      : null;
  }

  private getRefreshToken(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem(this.refreshTokenKey)
      : null;
  }
}
