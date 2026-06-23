import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from 'types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/profile`;

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.base);
  }

  updateProfile(data: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(this.base, data);
  }

  toggleVisibility(isPublic: boolean): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.base}/visibility`, { isPublic });
  }

  checkUsername(username: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(
      `${this.base}/username/check/${encodeURIComponent(username)}`,
    );
  }

  getPublicProfile(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.base}/${encodeURIComponent(username)}`);
  }
}
