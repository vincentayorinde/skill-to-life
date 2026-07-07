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

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly router = inject(Router);
  private initialized = false;
  private analyticsAllowed = false;
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

    if (this.hasAnalyticsConsent()) {
      this.initAfterConsent();
    }
  }

  initAfterConsent(): void {
    if (this.initialized || !environment.googleAnalyticsId) return;
    if (!this.hasBrowserApis() || !this.hasAnalyticsConsent()) return;

    this.analyticsAllowed = true;
    this.initialized = true;
    this.loadGoogleTagScript(environment.googleAnalyticsId);

    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
    });
    window.gtag?.('js', new Date());
    window.gtag?.('config', environment.googleAnalyticsId, {
      send_page_view: false,
    });

    this.trackPageView(this.currentPath(), document.title);
    this.trackNavigationEnd();
    this.trackSafeDocumentClicks();
  }

  setAnalyticsConsent(accepted: boolean): void {
    if (!environment.googleAnalyticsId || !this.hasBrowserApis()) return;

    try {
      globalThis.localStorage?.setItem(
        'skilltolife_cookie_consent',
        accepted ? 'accepted_analytics' : 'rejected_analytics',
      );
    } catch {
      // Consent persistence is best-effort; tracking still follows this choice.
    }

    this.analyticsAllowed = accepted;
    window.gtag?.('consent', 'update', {
      analytics_storage: accepted ? 'granted' : 'denied',
    });

    if (accepted) {
      this.initAfterConsent();
    }
  }

  hasAnalyticsConsent(): boolean {
    try {
      return (
        globalThis.localStorage?.getItem('skilltolife_cookie_consent') ===
        'accepted_analytics'
      );
    } catch {
      return false;
    }
  }

  trackPageView(path: string, title?: string): void {
    if (!this.canTrack()) return;

    window.gtag?.('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }

  trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
    if (!this.canTrack()) return;

    window.gtag?.('event', eventName, {
      page_path: this.currentPath(),
      ...params,
    });
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
        this.trackPageView(event.urlAfterRedirects, document.title),
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
      this.analyticsAllowed &&
      this.initialized &&
      this.hasBrowserApis() &&
      this.hasAnalyticsConsent() &&
      typeof window.gtag === 'function'
    );
  }

  private hasBrowserApis(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  private currentPath(): string {
    if (!this.hasBrowserApis()) return '/';
    return `${window.location.pathname}${window.location.search}`;
  }
}
