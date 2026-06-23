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
    path: 'salaries',
    loadComponent: () =>
      import('./pages/salaries/salaries').then((m) => m.SalariesComponent),
  },
  {
    path: 'entrepreneurship',
    loadComponent: () =>
      import('./pages/entrepreneurship/entrepreneurship').then(
        (m) => m.EntrepreneurshipComponent,
      ),
  },
  {
    path: 'resources',
    loadComponent: () =>
      import('./pages/resources/resources').then((m) => m.ResourcesComponent),
  },
  {
    path: 'my-results',
    loadComponent: () =>
      import('./pages/my-results/my-results').then((m) => m.MyResultsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about').then((m) => m.AboutComponent),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/privacy/privacy').then((m) => m.PrivacyComponent),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/terms/terms').then((m) => m.TermsComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile').then((m) => m.ProfilePageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'u/:username',
    loadComponent: () =>
      import('./pages/public-profile/public-profile').then(
        (m) => m.PublicProfileComponent,
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
