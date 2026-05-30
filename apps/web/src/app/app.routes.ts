import { Route } from '@angular/router';

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
];
