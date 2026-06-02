import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NsButtonComponent } from 'ui';
import type { SavedResult } from 'types';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-results',
  standalone: true,
  imports: [RouterLink, NsButtonComponent],
  template: `
    <div class="min-h-screen bg-ns-bg text-ns-text" data-theme="dark">
      <div class="mx-auto max-w-2xl px-4 py-12">
        <h1 class="m-0 text-2xl font-bold text-ns-text">My results</h1>
        <p class="mt-2 text-sm text-ns-muted">
          Your saved assessment results, newest first.
        </p>

        @if (loading()) {
          <div class="mt-8 space-y-4 animate-pulse">
            @for (i of [1, 2, 3]; track i) {
              <div class="h-24 rounded-2xl bg-white/10"></div>
            }
          </div>
        } @else if (results().length === 0) {
          <div class="mt-16 flex flex-col items-center text-center">
            <p class="text-4xl" aria-hidden="true">🗂️</p>
            <h2 class="m-0 mt-4 text-xl font-bold text-ns-text">
              No saved results yet.
            </h2>
            <p class="mt-2 max-w-xs text-sm leading-6 text-ns-muted">
              Complete the assessment and sign in to save your results here.
            </p>
            <ns-button class="mt-6 inline-block" routerLink="/assessment">
              Take the assessment
            </ns-button>
          </div>
        } @else {
          <div class="mt-8 flex flex-col gap-4">
            @for (result of results(); track result.id) {
              <div
                class="rounded-2xl border border-ns-border bg-ns-card p-5 transition hover:border-ns-primary"
              >
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3 min-w-0">
                    <span class="text-2xl" aria-hidden="true">
                      {{ emoji(result) }}
                    </span>
                    <div class="min-w-0">
                      <h2 class="m-0 truncate text-base font-bold text-ns-text">
                        {{ label(result) }}
                      </h2>
                      <p class="m-0 text-xs text-ns-muted">
                        {{ result.topPercentage }}% match &nbsp;·&nbsp;
                        {{ formatDate(result.createdAt) }}
                      </p>
                    </div>
                  </div>
                  <a
                    [routerLink]="['/assessment/results']"
                    [queryParams]="{ id: result.id }"
                    class="shrink-0 text-xs font-semibold text-ns-primary no-underline hover:underline"
                  >
                    View result →
                  </a>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class MyResultsComponent implements OnInit {
  private readonly http = inject(HttpClient);

  readonly loading = signal(true);
  readonly results = signal<SavedResult[]>([]);

  ngOnInit(): void {
    this.http
      .get<SavedResult[]>(`${environment.apiUrl}/api/results`)
      .subscribe({
        next: (data) => {
          this.results.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  label(result: SavedResult): string {
    return result.allMatches?.[0]?.title ?? result.topCareer;
  }

  emoji(result: SavedResult): string {
    return result.allMatches?.[0]?.emoji ?? '🎯';
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}
