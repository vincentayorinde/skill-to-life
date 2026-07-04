import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

const STORAGE_KEY = 'ns_cookie_notice';

@Component({
  selector: 'ns-cookie-notice',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (visible()) {
      <div
        role="region"
        aria-label="Cookie notice"
        class="fixed bottom-0 left-0 right-0 z-50 border-t border-ns-border bg-ns-nav px-4 py-3 backdrop-blur-xl sm:px-6"
      >
        <div
          class="mx-auto flex max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="m-0 text-xs leading-5 text-ns-muted">
            Skill to Life uses essential cookies only — no tracking, no
            advertising.
            <a
              routerLink="/privacy"
              class="font-semibold text-ns-primary no-underline hover:underline"
              >Privacy policy</a
            >
          </p>
          <button
            type="button"
            class="shrink-0 rounded-ns border border-ns-border bg-ns-card px-4 py-1.5 text-xs font-semibold text-ns-text transition hover:border-ns-primary hover:text-ns-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
            (click)="dismiss()"
          >
            Got it
          </button>
        </div>
      </div>
    }
  `,
})
export class NsCookieNoticeComponent implements OnInit {
  readonly visible = signal(false);

  ngOnInit(): void {
    try {
      const dismissed = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (!dismissed) {
        this.visible.set(true);
      }
    } catch {
      // localStorage unavailable — do not show
    }
  }

  dismiss(): void {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    this.visible.set(false);
  }
}
