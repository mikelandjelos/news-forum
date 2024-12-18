import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Moderator } from '../models/moderator.model';
import { Seconds } from '../models/global.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  public static readonly AUTH_TOKEN_NAME: string = 'moderatorSessionToken';

  signIn(
    username: string,
    password: string,
    expiresIn: Seconds
  ): Observable<{ accessToken: string; expiresIn: Seconds }> {
    return this.httpClient.post<{ accessToken: string; expiresIn: Seconds }>(
      `${environment.apiUrl}/auth/signIn?expiresIn=${expiresIn}`,
      {
        username,
        password,
      }
    );
  }

  getProfile(): Observable<Moderator & { iat: number; exp: number }> {
    return this.httpClient.get<Moderator & { iat: number; exp: number }>(
      `${environment.apiUrl}/auth/profile`
    );
  }

  getAuthToken(): string {
    return this.cookieService.get(AuthService.AUTH_TOKEN_NAME);
  }

  signOut() {
    const authToken = this.getAuthToken();
    this.cookieService.delete(AuthService.AUTH_TOKEN_NAME, '/');
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${authToken}`),
    };
    return this.httpClient.post<void>(
      `${environment.apiUrl}/auth/signOut`,
      {},
      header
    );
  }
}
