import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SavedCareer, SavedResource } from 'types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SavedService {
  private readonly http = inject(HttpClient);
  private readonly careersBase = `${environment.apiUrl}/api/saved-careers`;
  private readonly resourcesBase = `${environment.apiUrl}/api/saved-resources`;

  private readonly _savedCareerIds$ = new BehaviorSubject<Set<string>>(
    new Set(),
  );
  readonly savedCareerIds$ = this._savedCareerIds$.asObservable();

  getSavedCareers(): Observable<SavedCareer[]> {
    return this.http.get<SavedCareer[]>(this.careersBase).pipe(
      tap((careers) => {
        this._savedCareerIds$.next(new Set(careers.map((c) => c.careerId)));
      }),
    );
  }

  saveCareer(
    career: Omit<SavedCareer, 'id' | 'savedAt'>,
  ): Observable<SavedCareer> {
    return this.http.post<SavedCareer>(this.careersBase, career).pipe(
      tap((saved) => {
        const ids = new Set(this._savedCareerIds$.value);
        ids.add(saved.careerId);
        this._savedCareerIds$.next(ids);
      }),
    );
  }

  unsaveCareer(careerId: string): Observable<void> {
    return this.http.delete<void>(`${this.careersBase}/${careerId}`).pipe(
      tap(() => {
        const ids = new Set(this._savedCareerIds$.value);
        ids.delete(careerId);
        this._savedCareerIds$.next(ids);
      }),
    );
  }

  isCareerSaved(careerId: string): boolean {
    return this._savedCareerIds$.value.has(careerId);
  }

  getSavedResources(): Observable<Record<string, SavedResource[]>> {
    return this.http.get<Record<string, SavedResource[]>>(this.resourcesBase);
  }

  saveResource(
    resource: Omit<SavedResource, 'id' | 'savedAt'>,
  ): Observable<SavedResource> {
    return this.http.post<SavedResource>(this.resourcesBase, resource);
  }

  unsaveResource(resourceUrl: string): Observable<void> {
    return this.http.delete<void>(this.resourcesBase, {
      body: { resourceUrl },
    });
  }
}
