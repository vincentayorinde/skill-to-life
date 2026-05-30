import { Component, OnInit, signal } from '@angular/core';
import { NsButtonComponent } from 'ui';

@Component({
  selector: 'app-assessment-results',
  standalone: true,
  imports: [NsButtonComponent],
  styles: [
    `
      .spinner {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 4px solid var(--ns-color-border);
        border-top-color: var(--ns-color-primary);
        animation: spin 800ms linear infinite;
        margin: 0 auto;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .result-panel {
        transition: opacity 300ms ease-out;
      }
      .result-panel.hidden {
        opacity: 0;
      }
    `,
  ],
  template: `
    <div
      class="flex min-h-screen flex-col items-center justify-center bg-ns-bg px-4 text-ns-text"
      data-theme="dark"
    >
      @if (loading()) {
        <div class="result-panel text-center">
          <div
            class="spinner"
            role="status"
            aria-label="Finding your matches"
          ></div>
          <h1 class="m-0 mt-8 text-3xl font-bold text-ns-text sm:text-4xl">
            Finding your best matches...
          </h1>
          <p class="mx-auto mt-4 max-w-md text-base leading-7 text-ns-muted">
            Based on your answers, we are working out your top tech career fits.
          </p>
        </div>
      } @else {
        <div class="result-panel w-full max-w-md text-center">
          <p class="text-4xl" aria-hidden="true">✨</p>
          <h1 class="m-0 mt-5 text-3xl font-bold text-ns-text sm:text-4xl">
            Your results are ready.
          </h1>
          <p class="mx-auto mt-4 max-w-sm text-base leading-7 text-ns-muted">
            Sign in to save your results, or continue to see your matches.
          </p>

          <div class="mt-9 flex flex-col gap-3">
            <ns-button routerLink="/careers" size="lg"
              >See my matches</ns-button
            >
            <ns-button variant="google" size="lg"
              >Continue with Google</ns-button
            >
            <ns-button variant="ghost" size="lg">Try anonymously</ns-button>
          </div>

          <p class="mt-8 text-xs text-ns-muted">
            Nothing is saved unless you choose to sign in.
          </p>
        </div>
      }
    </div>
  `,
})
export class AssessmentResultsComponent implements OnInit {
  readonly loading = signal(true);

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 2000);
  }
}
