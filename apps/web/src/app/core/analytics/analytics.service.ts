import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_STORAGE_KEY = 'skilltolife_cookie_consent';
const ACCEPTED_ANALYTICS = 'accepted_analytics';
const REJECTED_ANALYTICS = 'rejected_analytics';
const SAFE_EVENT_PARAM_KEYS = new Set([
  'page_path',
  'route_name',
  'button_location',
  'question_index',
  'question_type',
  'selected_category',
  'path_slug',
  'completion_percentage',
  'platform',
]);

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly router = inject(Router);
  private initialized = false;
  private navigationTracked = false;
  private documentClicksTracked = false;

  init(): void {
    if (!environment.googleAnalyticsId) return;
    if (!this.hasBrowserApis()) return;

    window.dataLayer = window.dataLayer ?? [];
    window.gtag =
      window.gtag ??
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };

    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    window.addEventListener('skilltolife-cookie-consent-changed', () => {
      this.setAnalyticsConsent(this.hasAnalyticsConsent());
    });

    this.initializeGoogleAnalytics(this.hasAnalyticsConsent());
  }

  initAfterConsent(): void {
    this.setAnalyticsConsent(true);
  }

  setAnalyticsConsent(accepted: boolean): void {
    if (!environment.googleAnalyticsId || !this.hasBrowserApis()) return;

    try {
      globalThis.localStorage?.setItem(
        CONSENT_STORAGE_KEY,
        accepted ? ACCEPTED_ANALYTICS : REJECTED_ANALYTICS,
      );
    } catch {
      // Consent persistence is best-effort; tracking still follows this choice.
    }

    this.initializeGoogleAnalytics(accepted);

    window.gtag?.('consent', 'update', {
      analytics_storage: accepted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    if (accepted) {
      this.trackPageView(this.currentPath());
    } else {
      this.deleteAnalyticsCookies();
      this.trackPageView(this.currentPath());
    }
  }

  hasAnalyticsConsent(): boolean {
    try {
      return (
        globalThis.localStorage?.getItem(CONSENT_STORAGE_KEY) ===
        ACCEPTED_ANALYTICS
      );
    } catch {
      return false;
    }
  }

  trackPageView(path: string): void {
    if (!this.canTrack()) return;

    window.gtag?.('event', 'page_view', {
      page_path: path,
    });
  }

  trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
    if (!this.canTrack()) return;

    window.gtag?.('event', eventName, this.safeParams({
      page_path: this.currentPath(),
      ...params,
    }));
  }

  private initializeGoogleAnalytics(analyticsCookiesAccepted: boolean): void {
    if (this.initialized || !environment.googleAnalyticsId) {
      return;
    }
    if (!this.hasBrowserApis()) return;

    this.initialized = true;
    this.loadGoogleTagScript(environment.googleAnalyticsId);

    window.gtag?.('consent', 'update', {
      analytics_storage: analyticsCookiesAccepted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag?.('js', new Date());
    window.gtag?.('config', environment.googleAnalyticsId, {
      send_page_view: false,
    });

    this.trackPageView(this.currentPath());
    this.trackNavigationEnd();
    this.trackSafeDocumentClicks();
  }

  private trackNavigationEnd(): void {
    if (this.navigationTracked) return;
    this.navigationTracked = true;

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event) =>
        this.trackPageView(event.urlAfterRedirects),
      );
  }

  private trackSafeDocumentClicks(): void {
    if (this.documentClicksTracked) return;
    this.documentClicksTracked = true;

    document.addEventListener(
      'click',
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const startAssessment = target.closest(
          'a.ns-start-assessment, a[href="/assessment"], a[href="#assessment"], a[href="#assessment-preview"]',
        );

        if (startAssessment) {
          this.trackEvent('start_assessment_clicked');
        }
      },
      true,
    );
  }

  private loadGoogleTagScript(id: string): void {
    const src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      id,
    )}`;
    if (document.querySelector(`script[src="${src}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  private canTrack(): boolean {
    return (
      this.initialized &&
      this.hasBrowserApis() &&
      typeof window.gtag === 'function'
    );
  }

  private safeParams(
    params: Record<string, unknown>,
  ): Record<string, string | number | boolean> {
    const safe: Record<string, string | number | boolean> = {};

    for (const [key, value] of Object.entries(params)) {
      if (!SAFE_EVENT_PARAM_KEYS.has(key)) continue;
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        safe[key] = value;
      }
    }

    return safe;
  }

  private deleteAnalyticsCookies(): void {
    if (!this.hasBrowserApis()) return;

    const cookieNames = new Set(['_ga', '_gid', '_gat']);
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0]?.trim();
      if (name?.startsWith('_ga_')) cookieNames.add(name);
    }

    const hostParts = window.location.hostname.split('.');
    const domains = new Set(['', window.location.hostname]);
    if (hostParts.length > 1) {
      domains.add(`.${hostParts.slice(-2).join('.')}`);
    }

    for (const name of cookieNames) {
      for (const domain of domains) {
        const domainPart = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;
      }
    }
  }

  private hasBrowserApis(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  private currentPath(): string {
    if (!this.hasBrowserApis()) return '/';
    return `${window.location.pathname}${window.location.search}`;
  }
}
