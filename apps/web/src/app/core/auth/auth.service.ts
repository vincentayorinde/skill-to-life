import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'types';
import { environment } from '../../../environments/environment';
import { AnalyticsService } from '../analytics/analytics.service';

const TOKEN_KEY = 'skill_to_life_token';
const RETURN_URL_KEY = 'skilltolife_result_return';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly analytics = inject(AnalyticsService);
  private readonly _currentUser$ = new BehaviorSubject<User | null>(null);

  readonly currentUser$ = this._currentUser$.asObservable();
  readonly isAuthenticated$ = this.currentUser$.pipe(map((u) => u !== null));
  readonly isDev = environment.devMode;

  loginWithGoogle(returnUrl?: string): void {
    if (returnUrl) {
      this.storeReturnUrl(returnUrl);
    }
    this.analytics.trackEvent('sign_in_clicked');
    this.analytics.trackEvent('google_signin_clicked');
    window.location.href = `${environment.apiUrl}/api/auth/google`;
  }

  devLogin(): void {
    window.location.href = `${environment.apiUrl}/api/auth/dev-login`;
  }

  handleCallback(token: string): Observable<User> {
    this.storeToken(token);
    return this.fetchCurrentUser();
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/api/auth/logout`, {}).subscribe();
    localStorage.removeItem(TOKEN_KEY);
    this._currentUser$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/auth/me`).pipe(
      tap((user) => this._currentUser$.next(user)),
      catchError(() => {
        this.clearToken();
        return of(null as unknown as User);
      }),
    );
  }

  initFromStorage(): void {
    const token = this.getToken();
    if (!token) return;
    this.fetchCurrentUser().subscribe();
  }

  private storeToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private storeReturnUrl(returnUrl: string): void {
    try {
      localStorage.setItem(RETURN_URL_KEY, returnUrl);
    } catch {
      // Return URL persistence is a convenience; sign-in can continue without it.
    }
  }

  private clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._currentUser$.next(null);
  }
}
