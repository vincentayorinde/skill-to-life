import { Route } from '@angular/router';
import { assessmentActiveGuard } from './guards/assessment-active.guard';
import { authGuard } from './core/auth/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'careers',
    loadComponent: () =>
      import('./pages/careers/careers').then((m) => m.CareersComponent),
  },
  {
    path: 'careers/:slug',
    loadComponent: () =>
      import('./pages/career-detail/career-detail').then(
        (m) => m.CareerDetailComponent,
      ),
  },
  {
    path: 'assessment',
    loadComponent: () =>
      import('./pages/assessment/assessment').then(
        (m) => m.AssessmentComponent,
      ),
    canDeactivate: [assessmentActiveGuard],
  },
  {
    path: 'assessment/results',
    loadComponent: () =>
      import('./pages/assessment/assessment-results').then(
        (m) => m.AssessmentResultsComponent,
      ),
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./pages/auth-callback/auth-callback').then(
        (m) => m.AuthCallbackComponent,
      ),
  },
  {
    path: 'my-results',
    loadComponent: () =>
      import('./pages/my-results/my-results').then((m) => m.MyResultsComponent),
    canActivate: [authGuard],
  },
];
