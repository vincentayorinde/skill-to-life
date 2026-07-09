import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AnalyticsService } from './analytics.service';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

describe('AnalyticsService', () => {
  const originalGoogleAnalyticsId = environment.googleAnalyticsId;

  beforeEach(() => {
    environment.googleAnalyticsId = 'G-3VZY6Q5ZH4';
    localStorage.clear();
    document.cookie = '_ga=existing; path=/';
    document.cookie = '_gid=existing; path=/';
    document.cookie = '_gat=existing; path=/';
    delete window.dataLayer;
    delete window.gtag;

    document
      .querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')
      .forEach((script) => script.remove());

    TestBed.configureTestingModule({
      providers: [AnalyticsService, provideRouter([])],
    });
  });

  afterEach(() => {
    environment.googleAnalyticsId = originalGoogleAnalyticsId;
    localStorage.clear();
    delete window.dataLayer;
    delete window.gtag;

    document
      .querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')
      .forEach((script) => script.remove());
  });

  it('loads GA with analytics storage denied when no cookie choice exists', () => {
    const service = TestBed.inject(AnalyticsService);

    service.init();

    expect(
      document.querySelector(
        'script[src="https://www.googletagmanager.com/gtag/js?id=G-3VZY6Q5ZH4"]',
      ),
    ).not.toBeNull();
    expect(window.dataLayer).toContainEqual([
      'consent',
      'default',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    expect(window.dataLayer).toContainEqual([
      'event',
      'page_view',
      { page_path: '/' },
    ]);
  });

  it('grants analytics storage after accepting optional cookies', () => {
    const service = TestBed.inject(AnalyticsService);

    service.init();
    service.setAnalyticsConsent(true);

    expect(localStorage.getItem('skilltolife_cookie_consent')).toBe(
      'accepted_analytics',
    );
    expect(window.dataLayer).toContainEqual([
      'consent',
      'update',
      {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
  });

  it('denies analytics storage and clears GA cookies after rejecting optional cookies', () => {
    const service = TestBed.inject(AnalyticsService);

    service.init();
    service.setAnalyticsConsent(false);

    expect(localStorage.getItem('skilltolife_cookie_consent')).toBe(
      'rejected_analytics',
    );
    expect(window.dataLayer).toContainEqual([
      'consent',
      'update',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    expect(document.cookie).not.toContain('_ga=');
    expect(document.cookie).not.toContain('_gid=');
    expect(document.cookie).not.toContain('_gat=');
  });

  it('only sends allowlisted event params', () => {
    const service = TestBed.inject(AnalyticsService);

    service.init();
    service.trackEvent('example_event', {
      button_location: 'hero',
      email: 'person@example.com',
      cv_content: 'private cv text',
      completion_percentage: 50,
    });

    expect(window.dataLayer).toContainEqual([
      'event',
      'example_event',
      {
        page_path: '/',
        button_location: 'hero',
        completion_percentage: 50,
      },
    ]);
  });
});
