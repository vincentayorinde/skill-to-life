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

  init(): void {
    if (this.initialized || !environment.googleAnalyticsId) return;
    if (!this.hasBrowserApis()) return;

    this.initialized = true;
    this.loadGoogleTagScript(environment.googleAnalyticsId);
    window.dataLayer = window.dataLayer ?? [];
    window.gtag =
      window.gtag ??
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };

    window.gtag('js', new Date());
    window.gtag('config', environment.googleAnalyticsId, {
      send_page_view: false,
    });

    this.trackPageView(this.currentPath(), document.title);
    this.trackNavigationEnd();
    this.trackSafeDocumentClicks();
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

  private hasBrowserApis(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  private currentPath(): string {
    if (!this.hasBrowserApis()) return '/';
    return `${window.location.pathname}${window.location.search}`;
  }
}
