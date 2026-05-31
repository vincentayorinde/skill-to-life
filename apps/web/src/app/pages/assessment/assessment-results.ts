import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { NsButtonComponent } from 'ui';
import { matchCareer, MatchResult } from 'scoring';
import { AssessmentStateService } from '../../services/assessment-state.service';

@Component({
  selector: 'app-assessment-results',
  standalone: true,
  imports: [RouterLink, NsButtonComponent],
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
      .result-card {
        animation: fadeUp 400ms ease-out both;
      }
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(16px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .card-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
        pointer-events: none;
      }
    `,
  ],
  template: `
    <div class="min-h-screen bg-ns-bg text-ns-text" data-theme="dark">
      <!-- Loading state -->
      @if (loading()) {
        <div
          class="flex min-h-screen flex-col items-center justify-center px-4 text-center"
        >
          <div
            class="spinner"
            role="status"
            aria-label="Finding your matches"
          ></div>
          <h1 class="m-0 mt-8 text-2xl font-bold text-ns-text sm:text-3xl">
            Finding your best matches...
          </h1>
          <p class="mx-auto mt-3 max-w-sm text-base leading-7 text-ns-muted">
            Based on your answers, we are working out your top tech career fit.
          </p>
        </div>
      }

      <!-- No state — user arrived without taking assessment -->
      @if (!loading() && !hasResults) {
        <div
          class="flex min-h-screen flex-col items-center justify-center px-4 text-center"
        >
          <p class="text-4xl" aria-hidden="true">🧭</p>
          <h1 class="m-0 mt-4 text-2xl font-bold text-ns-text">
            No results yet.
          </h1>
          <p class="mt-3 text-ns-muted">
            Take the assessment to see your matched career.
          </p>
          <ns-button class="mt-6 inline-block" routerLink="/assessment">
            Start assessment
          </ns-button>
        </div>
      }

      <!-- Results screen -->
      @if (!loading() && hasResults && match) {
        <div class="mx-auto max-w-xl px-4 py-12 sm:py-16">
          <!-- Eyebrow -->
          <p
            class="text-center text-xs font-bold uppercase tracking-[0.2em] text-ns-primary"
          >
            Your NextSkill
          </p>

          <!-- Spotify Wrapped-style result card -->
          <div
            class="result-card relative mt-6 overflow-hidden rounded-2xl border border-white/10 p-8 text-white shadow-glow"
            style="background: linear-gradient(135deg, #070d1f 0%, #150826 45%, #0c1f3d 100%)"
            aria-label="Your result card"
          >
            <!-- Ambient glow blobs -->
            <div
              class="card-glow absolute -left-10 -top-10 h-48 w-48 bg-purple-600/25"
              aria-hidden="true"
            ></div>
            <div
              class="card-glow absolute -bottom-10 -right-10 h-40 w-40 bg-blue-600/20"
              aria-hidden="true"
            ></div>

            <div class="relative z-10">
              <!-- Card label -->
              <p
                class="m-0 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300/80"
              >
                My NextSkill
              </p>

              <!-- Career emoji -->
              <p class="m-0 mt-5 text-6xl leading-none" aria-hidden="true">
                {{ match.career.emoji }}
              </p>

              <!-- Career title -->
              <h1
                class="m-0 mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
              >
                {{ match.career.title }}
              </h1>

              <!-- Match badge -->
              <div
                class="mt-5 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-black text-slate-950"
              >
                {{ match.matchPercent }}% match
              </div>

              <!-- Insight -->
              <p class="m-0 mt-5 text-sm leading-6 text-blue-100/80">
                {{ match.insight }}
              </p>

              <!-- Watermark -->
              <p
                class="m-0 mt-8 text-right text-xs tracking-wider text-white/25"
                aria-hidden="true"
              >
                nextskill.dev
              </p>
            </div>
          </div>

          <!-- CTAs -->
          <div class="mt-8 flex flex-col gap-3">
            <button
              type="button"
              class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-ns border border-ns-primary bg-ns-primary px-5 text-sm font-semibold text-[#07111f] shadow-ns transition duration-base ease-ns hover:border-ns-primaryHover hover:bg-ns-primaryHover hover:shadow-glow focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              (click)="openShare()"
            >
              ↗ Share my result
            </button>

            <ns-button
              class="block"
              variant="secondary"
              [routerLink]="['/careers', match.career.slug]"
            >
              Explore this path
            </ns-button>

            <ns-button class="block" variant="ghost" routerLink="/assessment">
              Retake assessment
            </ns-button>
          </div>

          <div class="mt-5 text-center">
            <a
              class="text-sm text-ns-muted no-underline hover:text-ns-text"
              routerLink="/careers"
              >See all career paths →</a
            >
          </div>
        </div>

        <!-- Share modal -->
        @if (shareOpen()) {
          <div
            class="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Share your result"
          >
            <!-- Backdrop — button so it's keyboard-accessible -->
            <button
              type="button"
              class="absolute inset-0 bg-black/60 backdrop-blur-sm"
              aria-label="Close share dialog"
              (click)="closeShare()"
            ></button>

            <div
              class="relative z-10 w-full max-w-sm rounded-t-2xl border border-ns-border bg-ns-card p-6 sm:rounded-2xl"
            >
              <h2 class="m-0 text-lg font-bold text-ns-text">
                Share your result
              </h2>
              <p class="mt-1 text-sm text-ns-muted">
                Tell others what's your NextSkill.
              </p>

              <div class="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  class="flex min-h-11 w-full items-center gap-3 rounded-ns border border-ns-border bg-ns-card px-4 text-sm font-semibold text-ns-text transition hover:border-ns-primary hover:bg-ns-cardElevated"
                  (click)="shareToX()"
                >
                  <span aria-hidden="true" class="font-black">𝕏</span> Share on
                  X / Twitter
                </button>

                <button
                  type="button"
                  class="flex min-h-11 w-full items-center gap-3 rounded-ns border border-ns-border bg-ns-card px-4 text-sm font-semibold text-ns-text transition hover:border-ns-primary hover:bg-ns-cardElevated"
                  (click)="shareToLinkedIn()"
                >
                  <span aria-hidden="true" class="font-bold text-blue-500"
                    >in</span
                  >
                  Share on LinkedIn
                </button>

                <button
                  type="button"
                  class="flex min-h-11 w-full items-center gap-3 rounded-ns border border-ns-border bg-ns-card px-4 text-sm font-semibold text-ns-text transition hover:border-ns-primary hover:bg-ns-cardElevated"
                  (click)="copyLink()"
                >
                  <span aria-hidden="true">🔗</span>
                  {{ copied() ? '✓ Copied!' : 'Copy link' }}
                </button>

                @if (canNativeShare) {
                  <button
                    type="button"
                    class="flex min-h-11 w-full items-center gap-3 rounded-ns border border-ns-border bg-ns-card px-4 text-sm font-semibold text-ns-text transition hover:border-ns-primary hover:bg-ns-cardElevated"
                    (click)="nativeShare()"
                  >
                    <span aria-hidden="true">↗</span> Share via device
                  </button>
                }
              </div>

              <button
                type="button"
                class="mt-4 w-full rounded-ns py-2 text-sm font-semibold text-ns-muted hover:text-ns-text"
                (click)="closeShare()"
              >
                Cancel
              </button>
            </div>
          </div>
        }
      }
    </div>
  `,
})
export class AssessmentResultsComponent implements OnInit {
  private readonly stateService = inject(AssessmentStateService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  readonly loading = signal(true);
  readonly shareOpen = signal(false);
  readonly copied = signal(false);

  hasResults = false;
  match: MatchResult | null = null;
  canNativeShare = false;

  ngOnInit(): void {
    this.hasResults = this.stateService.hasResults();

    if (this.hasResults) {
      this.match = matchCareer(this.stateService.answers());
      this.setMetaTags();
    }

    try {
      this.canNativeShare =
        typeof navigator !== 'undefined' && 'share' in navigator;
    } catch {
      this.canNativeShare = false;
    }

    setTimeout(() => this.loading.set(false), 1800);
  }

  openShare(): void {
    this.shareOpen.set(true);
  }

  closeShare(): void {
    this.shareOpen.set(false);
  }

  shareToX(): void {
    if (!this.match) return;
    const { career, matchPercent, insight } = this.match;
    const text = encodeURIComponent(
      `I just found my NextSkill 🎯\n${career.emoji} ${career.title} — ${matchPercent}% match\n"${insight}"\n\nWhat's yours? 👇\nnextskill.dev #NextSkill #TechCareers`,
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}`,
      '_blank',
      'noreferrer',
    );
    this.closeShare();
  }

  shareToLinkedIn(): void {
    if (!this.match) return;
    const url = encodeURIComponent('https://nextskill.dev');
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
      'noreferrer',
    );
    this.closeShare();
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText('https://nextskill.dev/assessment');
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    } catch {
      // Clipboard API unavailable — silently fail.
    }
  }

  async nativeShare(): Promise<void> {
    if (!this.match || !this.canNativeShare) return;
    const { career, matchPercent } = this.match;
    try {
      await navigator.share({
        title: `My NextSkill — ${career.title}`,
        text: `${career.emoji} ${career.title} — ${matchPercent}% match. What's yours?`,
        url: 'https://nextskill.dev/assessment',
      });
      this.closeShare();
    } catch {
      // Share dismissed or not supported.
    }
  }

  private setMetaTags(): void {
    if (!this.match) return;
    const { career, insight } = this.match;

    this.title.setTitle(`I found my NextSkill — ${career.title} | NextSkill`);

    const ogTitle = `I found my NextSkill — ${career.title}`;
    const ogDesc = `${insight} — What's yours?`;
    const ogUrl = 'https://nextskill.dev/assessment/results';

    this.meta.updateTag({ property: 'og:title', content: ogTitle });
    this.meta.updateTag({ property: 'og:description', content: ogDesc });
    this.meta.updateTag({ property: 'og:url', content: ogUrl });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'NextSkill',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: ogTitle });
    this.meta.updateTag({ name: 'twitter:description', content: ogDesc });
  }
}
