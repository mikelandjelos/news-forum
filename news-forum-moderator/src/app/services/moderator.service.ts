import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moderator } from '../models/moderator.model';
import { Observable } from 'rxjs';
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

  readById(id: string): Observable<Moderator> {
    return this.httpClient.get<Moderator>(
      `${environment.apiUrl}/moderators/id/${encodeURIComponent(id)}`
    );
  }

  update(id: string, updatedModerator: Partial<Omit<Moderator, 'password'>>) {
    return this.httpClient.patch<Moderator>(
      `${environment.apiUrl}/moderators/${encodeURIComponent(id)}`,
      updatedModerator
    );
  }
}
