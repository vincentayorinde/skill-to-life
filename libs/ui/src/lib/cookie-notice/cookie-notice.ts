import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

const STORAGE_KEY = 'skilltolife_cookie_consent';
const ACCEPTED = 'accepted_analytics';
const REJECTED = 'rejected_analytics';
const CONSENT_CHANGED_EVENT = 'skilltolife-cookie-consent-changed';
const OPEN_PREFERENCES_EVENT = 'skilltolife-open-cookie-preferences';

@Component({
  selector: 'ns-cookie-notice',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (visible()) {
      <div
        role="region"
        aria-label="Cookie preferences"
        class="fixed bottom-0 left-0 right-0 z-50 border-t border-ns-border bg-ns-nav px-4 py-3 backdrop-blur-xl sm:px-6"
      >
        <div
          class="mx-auto flex max-w-7xl flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="max-w-3xl">
            <p class="m-0 text-sm font-semibold text-ns-text">
              Cookie preferences
            </p>
            <p class="m-0 mt-1 text-xs leading-5 text-ns-muted">
              Skill to Life uses essential storage for security and optional
              Google Analytics cookies only if you consent. Rejecting analytics
              is as easy as accepting, and the site still works.
            </p>
            <a
              routerLink="/privacy-policy"
              class="mt-1 inline-flex text-xs font-semibold text-ns-primary no-underline hover:underline"
              >Privacy policy</a
            >
          </div>
          <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              type="button"
              class="rounded-ns border border-ns-border bg-ns-card px-4 py-2 text-xs font-semibold text-ns-text transition hover:border-ns-primary hover:text-ns-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              (click)="rejectAnalytics()"
            >
              Reject analytics
            </button>
            <button
              type="button"
              class="rounded-ns border border-ns-border bg-transparent px-4 py-2 text-xs font-semibold text-ns-muted transition hover:border-ns-primary hover:text-ns-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              (click)="managePreferences()"
            >
              Manage preferences
            </button>
            <button
              type="button"
              class="rounded-ns border border-ns-primary bg-ns-primary px-4 py-2 text-xs font-semibold text-black transition hover:bg-ns-primaryHover focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              (click)="acceptAnalytics()"
            >
              Accept analytics
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class NsCookieNoticeComponent implements OnInit {
  readonly visible = signal(false);

  ngOnInit(): void {
    this.listenForPreferenceRequests();

    try {
      const consent = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (consent !== ACCEPTED && consent !== REJECTED) {
        this.visible.set(true);
      }
    } catch {
      this.visible.set(true);
    }
  }

  acceptAnalytics(): void {
    this.saveConsent(ACCEPTED);
  }

  rejectAnalytics(): void {
    this.saveConsent(REJECTED);
  }

  managePreferences(): void {
    this.visible.set(true);
  }

  private saveConsent(value: typeof ACCEPTED | typeof REJECTED): void {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, value);
    } catch {
      // Continue with the in-memory choice for this page view.
    }

    this.visible.set(false);
    this.dispatchConsentChanged();
  }

  private listenForPreferenceRequests(): void {
    try {
      globalThis.window?.addEventListener(OPEN_PREFERENCES_EVENT, () => {
        this.visible.set(true);
      });
    } catch {
      // Browser event APIs may be unavailable in tests.
    }
  }

  private dispatchConsentChanged(): void {
    try {
      globalThis.window?.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT));
    } catch {
      // Browser event APIs may be unavailable in tests.
    }
  }
}
