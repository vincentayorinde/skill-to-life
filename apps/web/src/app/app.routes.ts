import { Route } from '@angular/router';
import { assessmentActiveGuard } from './guards/assessment-active.guard';

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
];
