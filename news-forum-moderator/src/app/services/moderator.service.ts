import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moderator } from '../models/moderator.model';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ModeratorService {
  constructor(private httpClient: HttpClient) {}

  signUp(moderator: Moderator): Observable<Moderator> {
    return this.httpClient.post<Moderator>(
      `${environment.apiUrl}/moderators`,
      moderator
    );
  }

  signIn(
    username: string,
    password: string
  ): Observable<
    Moderator & {
      iat: number;
      exp: number;
    }
  > {
    return this.httpClient
      .post<{ access_token: string }>(`${environment.apiUrl}/auth/signIn`, {
        username,
        password,
      })
      .pipe(
        tap(({ access_token }) => {
          this.setTokenInCookie(access_token, 10);
        }),
        switchMap((response: { access_token: string }) =>
          this.profile().pipe(
            tap(({ exp, iat, ...moderator }) => {
              sessionStorage.setItem('moderator', JSON.stringify(moderator));
              this.setTokenInCookie(response.access_token, exp - iat);
            })
          )
        )
      );
  }

  profile(): Observable<
    Moderator & {
      iat: number;
      exp: number;
    }
  > {
    const token = this.getTokenFromCookie();
    console.log(`TOKEN: ${token}`);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<
      Moderator & {
        iat: number;
        exp: number;
      }
    >(`${environment.apiUrl}/auth/profile`, { headers });
  }

  // Utility methods to handle token saving using cookies.

  private setTokenInCookie(token: string, expireInSeconds: number): void {
    const date = new Date();
    date.setTime(date.getTime() + expireInSeconds * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `access_token=${token}; ${expires}; path=/; Secure; SameSite=Strict`;
  }

  private getTokenFromCookie(): string | null {
    const name = 'access_token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  // Clear token from cookie when signing out.
  signOut(): void {
    document.cookie =
      'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
