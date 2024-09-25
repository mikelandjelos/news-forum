import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Moderator } from '../models/moderator.model';

export type Seconds = number;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  private readonly AUTH_TOKEN_NAME: string = 'moderatorSessionToken';

  signIn(
    username: string,
    password: string,
    expiresIn: Seconds
  ): Observable<{ accessToken: string; expiresIn: Seconds }> {
    return this.httpClient
      .post<{ accessToken: string; expiresIn: Seconds }>(
        `${environment.apiUrl}/auth/signIn?expiresIn=${expiresIn}`,
        {
          username,
          password,
        }
      )
      .pipe(
        tap(({ accessToken, expiresIn }) => {
          this.cookieService.set(this.AUTH_TOKEN_NAME, accessToken, {
            expires: expiresIn / (24 * 60 * 60), // Seconds to days.
            path: '/',
          });
        }),
        shareReplay()
      );
  }

  getProfile(): Observable<Moderator & { iat: number; exp: number }> {
    return this.httpClient.get<Moderator & { iat: number; exp: number }>(
      `${environment.apiUrl}/auth/profile`
    );
  }

  isSignedIn(): boolean {
    return this.cookieService.check(this.AUTH_TOKEN_NAME);
  }

  getAuthToken(): string {
    return this.cookieService.get(this.AUTH_TOKEN_NAME);
  }

  signOut() {
    this.cookieService.delete(this.AUTH_TOKEN_NAME, '/');
  }
}
