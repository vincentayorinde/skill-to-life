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
        @if (preferencesOpen()) {
          <div class="mx-auto grid max-w-4xl gap-4">
            <div>
              <p class="m-0 text-base font-semibold text-ns-text">
                Cookie preferences
              </p>
              <p class="m-0 mt-2 text-sm leading-6 text-ns-muted">
                Skill to Life uses essential storage to keep the site working.
                We use Google Analytics to understand visits, feature usage,
                and assessment flow so we can improve the experience. If you
                reject optional cookies, analytics stays cookieless where
                supported.
              </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <section
                class="rounded-ns border border-ns-border bg-ns-card p-4"
                aria-labelledby="essential-storage-title"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h2
                      id="essential-storage-title"
                      class="m-0 text-sm font-semibold text-ns-text"
                    >
                      Essential storage
                    </h2>
                    <p class="m-0 mt-2 text-xs leading-5 text-ns-muted">
                      Keeps the site secure and functional.
                    </p>
                  </div>
                  <span
                    class="rounded-full border border-ns-border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-ns-muted"
                    >Required</span
                  >
                </div>
              </section>

              <section
                class="rounded-ns border border-ns-border bg-ns-card p-4"
                aria-labelledby="analytics-storage-title"
              >
                <label class="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    class="mt-1 h-4 w-4 accent-ns-primary"
                    [checked]="analyticsEnabled()"
                    (change)="setAnalyticsPreference($event)"
                  />
                  <span>
                    <span
                      id="analytics-storage-title"
                      class="block text-sm font-semibold text-ns-text"
                      >Analytics</span
                    >
                    <span class="mt-2 block text-xs leading-5 text-ns-muted">
                      Optional. Enables analytics cookies for Google Analytics.
                      Rejecting keeps analytics cookieless where supported.
                    </span>
                    <span class="mt-2 block text-xs text-ns-muted">
                      Provider: Google Analytics 4
                    </span>
                  </span>
                </label>
              </section>
            </div>

            <a
              routerLink="/privacy-policy"
              class="inline-flex text-xs font-semibold text-ns-primary no-underline hover:underline"
              >Read the full privacy policy</a
            >

            <div
              class="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end"
            >
              <button
                type="button"
                class="rounded-ns border border-ns-border bg-ns-card px-4 py-2 text-xs font-semibold text-ns-text transition hover:border-ns-primary hover:text-ns-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                (click)="rejectAnalytics()"
              >
                Reject cookies
              </button>
              <button
                type="button"
                class="rounded-ns border border-ns-border bg-transparent px-4 py-2 text-xs font-semibold text-ns-muted transition hover:border-ns-primary hover:text-ns-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                (click)="savePreferences()"
              >
                Save preferences
              </button>
              <button
                type="button"
                class="rounded-ns border border-ns-primary bg-ns-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-ns-primaryHover focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                (click)="acceptAnalytics()"
              >
                Accept cookies
              </button>
            </div>
          </div>
        } @else {
          <div
            class="mx-auto flex max-w-7xl flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div class="max-w-3xl">
              <p class="m-0 text-sm font-semibold text-ns-text">
                Help us improve your experience
              </p>
              <p class="m-0 mt-1 text-xs leading-5 text-ns-muted">
                We use analytics to understand how people use Skill to Life and
                improve the product. We do not use analytics to identify you.
                You can accept or reject optional cookies — the site works
                either way.
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
                Reject cookies
              </button>
              <button
                type="button"
                class="rounded-ns border border-ns-primary bg-ns-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-ns-primaryHover focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                (click)="acceptAnalytics()"
              >
                Accept cookies
              </button>
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class NsCookieNoticeComponent implements OnInit {
  readonly visible = signal(false);
  readonly preferencesOpen = signal(false);
  readonly analyticsEnabled = signal(false);

  ngOnInit(): void {
    this.listenForPreferenceRequests();

    try {
      const consent = globalThis.localStorage?.getItem(STORAGE_KEY);
      this.analyticsEnabled.set(consent === ACCEPTED);
      if (consent !== ACCEPTED && consent !== REJECTED) {
        this.visible.set(true);
      }
    } catch {
      this.visible.set(true);
    }
  }

  acceptAnalytics(): void {
    this.analyticsEnabled.set(true);
    this.saveConsent(ACCEPTED);
  }

  rejectAnalytics(): void {
    this.analyticsEnabled.set(false);
    this.saveConsent(REJECTED);
  }

  managePreferences(): void {
    this.visible.set(true);
    this.preferencesOpen.set(true);
  }

  savePreferences(): void {
    this.saveConsent(this.analyticsEnabled() ? ACCEPTED : REJECTED);
  }

  setAnalyticsPreference(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.analyticsEnabled.set(target.checked);
    }
  }

  private saveConsent(value: typeof ACCEPTED | typeof REJECTED): void {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, value);
    } catch {
      // Continue with the in-memory choice for this page view.
    }

    this.visible.set(false);
    this.preferencesOpen.set(false);
    this.dispatchConsentChanged();
  }

  private listenForPreferenceRequests(): void {
    try {
      globalThis.window?.addEventListener(OPEN_PREFERENCES_EVENT, () => {
        this.managePreferences();
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
