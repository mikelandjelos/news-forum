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

  create(moderator: Moderator): Observable<Moderator> {
    return this.httpClient.post<Moderator>(
      `${environment.apiUrl}/moderators`,
      moderator
    );
  }
}
