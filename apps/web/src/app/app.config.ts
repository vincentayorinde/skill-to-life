import {
  ApplicationConfig,
  APP_INITIALIZER,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from '@angular/common/http';
import { appRoutes } from './app.routes';
import { tokenInterceptor } from './core/auth/token.interceptor';
import { AuthService } from './core/auth/auth.service';
import { AnalyticsService } from './core/analytics/analytics.service';

function initAuth(): () => void {
  const auth = inject(AuthService);
  return () => auth.initFromStorage();
}

function initAnalytics(): () => void {
  const analytics = inject(AnalyticsService);
  return () => analytics.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initAnalytics,
      multi: true,
    },
  ],
};
