import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://server.rest.devmb.top/admin-res/api/v1/login/token/';
  private tokenKey = 'accessToken';
  private refreshToken = 'refreshToken';
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, {username, password}).pipe(
      tap(response => {
        if (response.access && response.refresh) {
          console.log(response.access, response.refresh)
          this.setTokens(response.access, response.refresh);
          this.loggedIn.next(true);
        }
      })
    )
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.tokenKey, accessToken);
    localStorage.setItem(this.refreshToken, refreshToken)
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }

  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.refreshToken);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expired = payload.exp * 1000
      return Date.now() < expired;
    } catch (e) {
      console.error('Error al iniciar sesión', e);
      return false;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshToken);
    this.loggedIn.next(false);
    console.log("Sesión cerrada")
    this.router.navigate(['/dashboard']);
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      throw new Error('No se encontró el refresh token')
    }

    const refreshEndPoint = 'https://server.rest.devmb.top/api/schema/swagger-ui/#/admin-res/admin_res_api_v1_login_token_refresh_create';
    return this.httpClient.post<any>(refreshEndPoint, {refresh: refreshToken}).pipe(
      tap(response => {
        if (response.access) {
          localStorage.setItem(this.tokenKey, response.access)
        }
      })
    );
  }

}
