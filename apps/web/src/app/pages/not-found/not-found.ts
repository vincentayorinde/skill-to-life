import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NsButtonComponent } from 'ui';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, NsButtonComponent],
  template: `
    <div
      class="flex min-h-screen flex-col items-center justify-center bg-ns-bg px-4 text-center"
      data-theme="dark"
    >
      <p class="text-6xl" aria-hidden="true">🧭</p>
      <h1 class="mt-6 text-3xl font-bold text-ns-text sm:text-4xl">
        Page not found.
      </h1>
      <p class="mt-4 max-w-md text-sm leading-6 text-ns-muted">
        The page you are looking for does not exist or has been moved. Try going
        back to the home page or taking the assessment.
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <ns-button routerLink="/">Go back home</ns-button>
        <ns-button variant="secondary" routerLink="/assessment"
          >Take the assessment</ns-button
        >
      </div>
      <a
        routerLink="/careers"
        class="mt-8 text-sm font-semibold text-ns-primary no-underline hover:underline"
        >Or browse all career paths →</a
      >
    </div>
  `,
})
export class NotFoundComponent implements OnInit {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Page not found — Skill to Life');
    this.metaService.updateTag({ name: 'robots', content: 'noindex' });
  }
}
