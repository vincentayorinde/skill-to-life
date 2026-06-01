import {
  Component,
  ElementRef,
  OnInit,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { NsButtonComponent, NsBadgeComponent, NsToastComponent } from 'ui';
import { toPng } from 'html-to-image';
import { scoreAssessment } from 'scoring';
import type { CareerMatch, MatchTier, CareerPath } from 'types';
import { getCareerBySlug } from 'types';
import { AssessmentStateService } from '../../services/assessment-state.service';

@Component({
  selector: 'app-assessment-results',
  standalone: true,
  imports: [RouterLink, NsButtonComponent, NsBadgeComponent, NsToastComponent],
  styles: [
    `
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
      .section-enter {
        animation: fadeUp 500ms ease-out both;
      }
    `,
  ],
  template: `
    <div class="min-h-screen bg-ns-bg text-ns-text" data-theme="dark">
      <!-- ─── LOADING SKELETON ──────────────────────────────────── -->
      @if (loading()) {
        <div class="mx-auto max-w-2xl animate-pulse space-y-6 px-4 py-12">
          <p class="text-center text-sm text-ns-muted">
            Calculating your matches...
          </p>
          <div class="h-72 rounded-2xl bg-white/10"></div>
          <div class="space-y-2 pt-4">
            <div class="h-5 w-48 rounded bg-white/10"></div>
            <div class="h-28 rounded-ns bg-white/10"></div>
          </div>
          <div class="space-y-3">
            <div class="h-5 w-40 rounded bg-white/10"></div>
            <div class="h-20 rounded-ns bg-white/10"></div>
            <div class="h-20 rounded-ns bg-white/10"></div>
            <div class="h-20 rounded-ns bg-white/10"></div>
          </div>
        </div>
      }

      <!-- ─── NO ANSWERS ──────────────────────────────────────────── -->
      @if (!loading() && !hasResults) {
        <div
          class="flex min-h-screen flex-col items-center justify-center px-4 text-center"
        >
          <p class="text-4xl" aria-hidden="true">🧭</p>
          <h1 class="m-0 mt-4 text-2xl font-bold text-ns-text">
            We could not find your results.
          </h1>
          <p class="mt-3 max-w-sm text-sm leading-6 text-ns-muted">
            This can happen if you navigated here directly without completing
            the assessment.
          </p>
          <ns-button class="mt-6 inline-block" routerLink="/assessment">
            Take the assessment
          </ns-button>
        </div>
      }

      <!-- ─── ERROR ────────────────────────────────────────────────── -->
      @if (!loading() && hasResults && matches.length === 0) {
        <div
          class="flex min-h-screen flex-col items-center justify-center px-4 text-center"
        >
          <p class="text-4xl" aria-hidden="true">😬</p>
          <h1 class="m-0 mt-4 text-2xl font-bold text-ns-text">
            Something went wrong.
          </h1>
          <p class="mt-3 text-ns-muted">Try retaking the assessment.</p>
          <ns-button class="mt-6 inline-block" routerLink="/assessment">
            Retake assessment
          </ns-button>
        </div>
      }

      <!-- ─── RESULTS ───────────────────────────────────────────────── -->
      @if (!loading() && matches.length > 0) {
        <!-- ─── Hidden share card for PNG download ───────────────────
             Uses only inline styles — no Tailwind class dependencies. -->
        <div
          #shareCard
          [style.width]="cardFormat() === 'story' ? '1080px' : '1080px'"
          [style.height]="cardFormat() === 'story' ? '1920px' : '1080px'"
          style="
            position: fixed;
            top: 0;
            left: 0;
            opacity: 0;
            pointer-events: none;
            z-index: -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #070d1f 0%, #150826 50%, #0c1f3d 100%);
            font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            overflow: hidden;
            padding: 0 80px;
          "
          aria-hidden="true"
        >
          <!-- Grain overlay -->
          <div
            style="
              position: absolute;
              inset: 0;
              pointer-events: none;
              opacity: 0.04;
              background-image: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 3px,
                rgba(255,255,255,0.15) 3px,
                rgba(255,255,255,0.15) 4px
              );
            "
          ></div>

          <!-- "My NextSkill" label -->
          <p
            style="
              font-size: 20px;
              color: rgba(255,255,255,0.35);
              letter-spacing: 0.3em;
              text-transform: uppercase;
              margin: 0 0 40px 0;
              font-weight: 600;
            "
          >
            My NextSkill
          </p>

          <!-- Career emoji -->
          <div
            [style.font-size]="cardFormat() === 'story' ? '160px' : '120px'"
            style="line-height: 1; margin-bottom: 40px;"
          >
            {{ matches[0].emoji }}
          </div>

          <!-- Career title -->
          <h2
            style="
              font-size: 68px;
              font-weight: 900;
              color: white;
              margin: 0 0 32px 0;
              text-align: center;
              line-height: 1.1;
              letter-spacing: -1px;
            "
          >
            {{ matches[0].title }}
          </h2>

          <!-- Match percentage badge -->
          <div
            style="
              background: rgba(255,255,255,0.12);
              border-radius: 100px;
              padding: 14px 44px;
              margin-bottom: 20px;
              border: 1px solid rgba(255,255,255,0.18);
            "
          >
            <span style="font-size: 36px; font-weight: 900; color: white;"
              >{{ matches[0].percentage }}% match</span
            >
          </div>

          <!-- Tier label -->
          <p
            style="
              font-size: 22px;
              color: rgba(255,255,255,0.5);
              margin: 0 0 56px 0;
              letter-spacing: 0.06em;
              font-weight: 500;
            "
          >
            {{ tierLabel(matches[0].matchTier) }}
          </p>

          <!-- Divider -->
          <div
            style="
              width: 64px;
              height: 1px;
              background: rgba(255,255,255,0.2);
              margin: 0 0 56px 0;
            "
          ></div>

          <!-- Insight in italics -->
          <p
            style="
              font-size: 26px;
              color: rgba(255,255,255,0.65);
              text-align: center;
              font-style: italic;
              margin: 0 0 72px 0;
              line-height: 1.55;
              max-width: 860px;
            "
          >
            &ldquo;{{ topInsight }}&rdquo;
          </p>

          <!-- Story extra line -->
          @if (cardFormat() === 'story') {
            <p
              style="
                font-size: 26px;
                color: rgba(255,255,255,0.45);
                margin: 0 0 72px 0;
                text-align: center;
                font-weight: 500;
              "
            >
              Discover your path at nextskill.dev
            </p>
          }

          <!-- CTA -->
          <p
            style="
              font-size: 32px;
              font-weight: 700;
              color: rgba(255,255,255,0.88);
              margin: 0;
              letter-spacing: 0.02em;
            "
          >
            What's your NextSkill?
          </p>

          <!-- Watermark -->
          <p
            style="
              position: absolute;
              bottom: 56px;
              right: 72px;
              font-size: 20px;
              color: rgba(255,255,255,0.18);
              margin: 0;
              letter-spacing: 0.14em;
              font-weight: 400;
            "
          >
            nextskill.dev
          </p>
        </div>
        <!-- end hidden share card -->

        <!-- Mobile sticky share button -->
        <div
          class="fixed bottom-0 left-0 right-0 z-20 border-t border-ns-border bg-ns-bg/95 px-4 pb-4 pt-3 backdrop-blur-sm sm:hidden"
        >
          <button
            type="button"
            class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-ns border border-ns-primary bg-ns-primary px-5 text-sm font-semibold text-[#07111f] shadow-ns transition hover:bg-ns-primaryHover"
            (click)="openShare()"
          >
            ↗ Share my result
          </button>
        </div>

        <div class="mx-auto max-w-2xl px-4 pb-28 pt-10 sm:py-16 sm:pb-16">
          <!-- Summary header -->
          <p class="text-center text-xs text-ns-muted">
            You answered {{ answerCount }}
            {{ answerCount === 1 ? 'question' : 'questions' }} &nbsp;·&nbsp;
            {{ resultDate }} &nbsp;·&nbsp;
            <strong class="font-semibold text-ns-text">{{
              matches[0].title
            }}</strong>
            was your best fit
          </p>

          <!-- ─── Section 1: Hero Result ──────────────────────────── -->
          <section aria-labelledby="hero-heading" class="mt-6">
            <div
              class="result-card relative overflow-hidden rounded-2xl border border-white/10 p-8 text-white shadow-glow"
              style="background: linear-gradient(135deg, #070d1f 0%, #150826 45%, #0c1f3d 100%)"
              aria-label="Your top career match"
            >
              <div
                class="card-glow absolute -left-10 -top-10 h-48 w-48 bg-purple-600/25"
                aria-hidden="true"
              ></div>
              <div
                class="card-glow absolute -bottom-10 -right-10 h-40 w-40 bg-blue-600/20"
                aria-hidden="true"
              ></div>

              <div class="relative z-10">
                <p
                  class="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300/80"
                >
                  Your #1 match
                </p>

                <div
                  class="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8"
                >
                  <!-- SVG Progress Ring -->
                  <div class="relative h-36 w-36 flex-shrink-0">
                    <svg
                      viewBox="0 0 120 120"
                      class="-rotate-90 h-36 w-36"
                      aria-hidden="true"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="rgba(255,255,255,0.12)"
                        stroke-width="8"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        [attr.stroke]="tierStroke(matches[0].matchTier)"
                        stroke-width="8"
                        stroke-linecap="round"
                        [attr.stroke-dasharray]="
                          CIRCUMFERENCE + ' ' + CIRCUMFERENCE
                        "
                        [attr.stroke-dashoffset]="ringOffset"
                        style="transition: stroke-dashoffset 1.2s ease-out"
                      />
                    </svg>
                    <div
                      class="absolute inset-0 flex flex-col items-center justify-center text-center"
                    >
                      <span class="text-4xl leading-none" aria-hidden="true">{{
                        matches[0].emoji
                      }}</span>
                      <span
                        class="mt-1 text-xl font-black leading-none text-white"
                        >{{ matches[0].percentage }}%</span
                      >
                      <span
                        class="mt-0.5 text-[10px] uppercase tracking-widest text-white/60"
                        >match</span
                      >
                    </div>
                  </div>

                  <div class="flex-1 text-center sm:text-left">
                    <h1
                      id="hero-heading"
                      class="m-0 text-3xl font-black leading-tight text-white sm:text-4xl"
                    >
                      {{ matches[0].title }}
                    </h1>

                    <div class="mt-3">
                      <span
                        class="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1"
                        [class]="heroBadgeClass(matches[0].matchTier)"
                      >
                        {{ tierLabel(matches[0].matchTier) }}
                      </span>
                    </div>

                    <p class="m-0 mt-4 text-sm leading-6 text-blue-100/80">
                      {{ topInsight }}
                    </p>

                    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                      <ns-button
                        [routerLink]="['/careers', matches[0].careerId]"
                      >
                        Explore this path
                      </ns-button>
                      <button
                        type="button"
                        class="hidden min-h-11 items-center justify-center gap-2 rounded-ns border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10 sm:inline-flex"
                        (click)="openShare()"
                      >
                        ↗ Share my result
                      </button>
                    </div>
                  </div>
                </div>

                <p
                  class="mt-8 text-right text-xs tracking-wider text-white/25"
                  aria-hidden="true"
                >
                  nextskill.dev
                </p>
              </div>
            </div>
          </section>

          <!-- ─── Section 2: Why This Fits You ───────────────────── -->
          @if (topCareer) {
            <section
              aria-labelledby="why-heading"
              class="section-enter mt-14"
              style="animation-delay: 100ms"
            >
              <h2 id="why-heading" class="m-0 text-lg font-bold text-ns-text">
                Why this fits you
              </h2>
              <p class="mt-1 text-sm text-ns-muted">
                Based on how you answered, here is why this path suits you.
              </p>
              <div
                class="mt-5 rounded-2xl border border-ns-border bg-ns-card p-6"
              >
                <p class="m-0 text-sm leading-7 text-ns-text">
                  {{ topCareer.description }}
                </p>
                <div
                  class="mt-5 flex flex-wrap gap-2"
                  aria-label="Key skills for this path"
                >
                  @for (skill of topCareer.skills.slice(0, 3); track skill) {
                    <span
                      class="rounded-full border border-ns-border bg-ns-cardElevated px-3 py-1 text-xs font-medium text-ns-text"
                    >
                      {{ skill }}
                    </span>
                  }
                </div>
              </div>
            </section>
          }

          <!-- ─── Section 3: Top 5 Matches ────────────────────────── -->
          <section
            aria-labelledby="matches-heading"
            class="section-enter mt-14"
            style="animation-delay: 150ms"
          >
            <h2 id="matches-heading" class="m-0 text-lg font-bold text-ns-text">
              Your career matches
            </h2>
            <p class="mt-1 text-sm text-ns-muted">
              Ranked by how well they fit your answers.
            </p>
            <div class="mt-5 flex flex-col gap-4">
              @for (
                match of matches.slice(0, 5);
                track match.careerId;
                let i = $index
              ) {
                <div
                  class="rounded-2xl border p-5 transition"
                  [class]="
                    i === 0
                      ? 'border-ns-primary bg-ns-card shadow-glow'
                      : 'border-ns-border bg-ns-card'
                  "
                  data-testid="match-card"
                >
                  @if (i === 0) {
                    <p
                      class="m-0 mb-3 text-xs font-bold uppercase tracking-[0.15em] text-ns-primary"
                    >
                      #1 Best match
                    </p>
                  } @else {
                    <p
                      class="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-ns-muted"
                    >
                      {{ altCardLabel(match.matchTier) }}
                    </p>
                  }
                  <div class="flex items-start gap-4">
                    <span
                      class="mt-0.5 text-3xl leading-none"
                      aria-hidden="true"
                      >{{ match.emoji }}</span
                    >
                    <div class="min-w-0 flex-1">
                      <div class="flex flex-wrap items-center gap-2">
                        <h3 class="m-0 text-base font-bold text-ns-text">
                          {{ match.title }}
                        </h3>
                        <ns-badge [variant]="tierBadgeVariant(match.matchTier)">
                          {{ tierLabel(match.matchTier) }}
                        </ns-badge>
                      </div>
                      <p
                        class="m-0 mt-1.5 line-clamp-2 text-xs leading-5 text-ns-muted"
                      >
                        {{ careerInsight(match.careerId) }}
                      </p>
                      <div class="mt-3 flex items-center gap-3">
                        <div
                          class="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10"
                        >
                          <div
                            class="h-full rounded-full transition-all duration-700"
                            [class]="tierBarClass(match.matchTier)"
                            [style.width.%]="animated() ? match.percentage : 0"
                          ></div>
                        </div>
                        <span
                          class="w-10 text-right text-xs font-bold text-ns-text"
                          >{{ match.percentage }}%</span
                        >
                      </div>
                      <a
                        [routerLink]="['/careers', match.careerId]"
                        class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ns-primary no-underline hover:underline"
                      >
                        View path →
                      </a>
                    </div>
                  </div>
                </div>
              }
            </div>
          </section>

          <!-- ─── Section 4: Roadmap Preview ──────────────────────── -->
          @if (topCareer) {
            <section
              aria-labelledby="roadmap-heading"
              class="section-enter mt-14"
              style="animation-delay: 200ms"
            >
              <h2
                id="roadmap-heading"
                class="m-0 text-lg font-bold text-ns-text"
              >
                Where to start with {{ matches[0].title }}
              </h2>
              <ol class="mt-5 flex flex-col gap-3" role="list">
                @for (
                  step of topCareer.roadmapPreview.slice(0, 3);
                  track step;
                  let i = $index
                ) {
                  <li
                    class="flex items-start gap-4 rounded-2xl border border-ns-border bg-ns-card p-4"
                  >
                    <span
                      class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ns-primary text-sm font-black text-[#07111f]"
                    >
                      {{ i + 1 }}
                    </span>
                    <p class="m-0 pt-0.5 text-sm leading-6 text-ns-text">
                      {{ step }}
                    </p>
                  </li>
                }
              </ol>
              <div class="mt-5 text-center">
                <a
                  [routerLink]="['/careers', matches[0].careerId]"
                  class="text-sm font-semibold text-ns-primary no-underline hover:underline"
                >
                  See the full roadmap →
                </a>
              </div>
            </section>

            <!-- ─── Section 5: Free Resources ────────────────────── -->
            <section
              aria-labelledby="resources-heading"
              class="section-enter mt-14"
              style="animation-delay: 250ms"
            >
              <h2
                id="resources-heading"
                class="m-0 text-lg font-bold text-ns-text"
              >
                Free ways to get started
              </h2>
              @if (topCareer.freeResources.length === 0) {
                <p class="mt-4 text-sm text-ns-muted">
                  Resources coming soon — check back after launch.
                </p>
              } @else {
                <div class="mt-5 flex flex-col gap-3">
                  @for (
                    res of topCareer.freeResources.slice(0, 3);
                    track res.title
                  ) {
                    <div
                      class="flex items-center gap-4 rounded-2xl border border-ns-border bg-ns-card p-4"
                    >
                      <div class="min-w-0 flex-1">
                        @if (res.url) {
                          <a
                            [href]="res.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-sm font-semibold text-ns-primary no-underline hover:underline"
                          >
                            {{ res.title }}
                          </a>
                        } @else {
                          <p class="m-0 text-sm font-semibold text-ns-text">
                            {{ res.title }}
                          </p>
                        }
                        <p class="m-0 mt-0.5 text-xs text-ns-muted">
                          Free resource
                        </p>
                      </div>
                      @if (res.url) {
                        <span class="text-ns-muted" aria-hidden="true">↗</span>
                      }
                    </div>
                  }
                </div>
              }
            </section>

            <!-- ─── Section 6: Salary Snapshot ───────────────────── -->
            <section
              aria-labelledby="salary-heading"
              class="section-enter mt-14"
              style="animation-delay: 300ms"
            >
              <h2
                id="salary-heading"
                class="m-0 text-lg font-bold text-ns-text"
              >
                Earning potential
              </h2>
              <div
                class="mt-5 rounded-2xl border border-ns-border bg-ns-card p-6"
              >
                <p class="m-0 text-sm font-medium leading-6 text-ns-text">
                  {{ topCareer.salaryInsight }}
                </p>
                <p class="m-0 mt-3 text-xs leading-5 text-ns-muted">
                  Salaries vary by location, experience, and employer. These are
                  general estimates.
                </p>
              </div>
            </section>

            <!-- ─── Section 7: Entrepreneurship Angle ────────────── -->
            <section
              aria-labelledby="entrepreneur-heading"
              class="section-enter mt-14"
              style="animation-delay: 350ms"
            >
              <h2
                id="entrepreneur-heading"
                class="m-0 text-lg font-bold text-ns-text"
              >
                Going independent
              </h2>
              <p class="mt-1 text-sm text-ns-muted">
                Many {{ matches[0].title }}s freelance or build their own
                products. Here are some directions people take.
              </p>
              <div class="mt-5 flex flex-col gap-3">
                @for (
                  idea of topCareer.entrepreneurshipIdeas.slice(0, 2);
                  track idea
                ) {
                  <div
                    class="flex items-center gap-4 rounded-2xl border border-ns-border bg-ns-card p-4"
                  >
                    <span class="text-xl" aria-hidden="true">💡</span>
                    <p class="m-0 text-sm text-ns-text">{{ idea }}</p>
                  </div>
                }
              </div>
            </section>
          }

          <!-- ─── Section 8: Retake or Explore ──────────────────── -->
          <section class="section-enter mt-14" style="animation-delay: 400ms">
            <div
              class="rounded-2xl border border-ns-border bg-ns-card p-8 text-center"
            >
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Not quite right?
              </h2>
              <p class="mx-auto mt-3 max-w-sm text-sm leading-6 text-ns-muted">
                Your results are based on your answers. If something feels off,
                try adjusting your answers or explore other paths.
              </p>
              <div
                class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
              >
                <ns-button routerLink="/assessment">
                  Retake assessment
                </ns-button>
                <ns-button variant="secondary" routerLink="/careers">
                  Browse all careers
                </ns-button>
              </div>
            </div>
          </section>
        </div>

        <!-- ─── Share Modal ─────────────────────────────────────── -->
        @if (shareOpen()) {
          <div
            class="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Share your result"
          >
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

              <!-- Download card section -->
              <div class="mt-5">
                <button
                  type="button"
                  class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-ns border border-ns-primary bg-ns-primary px-5 text-sm font-semibold text-[#07111f] shadow-ns transition hover:bg-ns-primaryHover disabled:pointer-events-none disabled:opacity-60"
                  [disabled]="downloading()"
                  (click)="downloadCard()"
                  data-testid="download-card-btn"
                >
                  @if (downloading()) {
                    <span>Generating your card...</span>
                  } @else {
                    <span>⬇ Download card</span>
                  }
                </button>

                <!-- Format toggle -->
                <div class="mt-3 flex items-center justify-center gap-1">
                  <span class="text-xs text-ns-muted">Format:</span>
                  <div
                    class="ml-2 flex overflow-hidden rounded-ns border border-ns-border"
                  >
                    <button
                      type="button"
                      class="px-3 py-1 text-xs font-semibold transition"
                      [class]="
                        cardFormat() === 'square'
                          ? 'bg-ns-primary text-[#07111f]'
                          : 'bg-ns-card text-ns-muted hover:text-ns-text'
                      "
                      (click)="cardFormat.set('square')"
                    >
                      Square
                    </button>
                    <button
                      type="button"
                      class="px-3 py-1 text-xs font-semibold transition"
                      [class]="
                        cardFormat() === 'story'
                          ? 'bg-ns-primary text-[#07111f]'
                          : 'bg-ns-card text-ns-muted hover:text-ns-text'
                      "
                      (click)="cardFormat.set('story')"
                    >
                      Story
                    </button>
                  </div>
                </div>
              </div>

              <!-- Divider -->
              <div class="mt-5 flex items-center gap-3">
                <div class="h-px flex-1 bg-ns-border"></div>
                <span class="text-xs text-ns-muted">or share directly</span>
                <div class="h-px flex-1 bg-ns-border"></div>
              </div>

              <div class="mt-4 flex flex-col gap-2">
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
      <!-- end results -->

      <!-- ─── Toast notification ────────────────────────────────── -->
      <ns-toast [message]="toastMessage()" [visible]="toastVisible()" />
    </div>
  `,
})
export class AssessmentResultsComponent implements OnInit {
  private readonly stateService = inject(AssessmentStateService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  readonly shareCardEl = viewChild<ElementRef>('shareCard');

  readonly loading = signal(true);
  readonly animated = signal(false);
  readonly shareOpen = signal(false);
  readonly copied = signal(false);
  readonly downloading = signal(false);
  readonly cardFormat = signal<'square' | 'story'>('square');
  readonly toastMessage = signal('');
  readonly toastVisible = signal(false);

  hasResults = false;
  matches: CareerMatch[] = [];
  topCareer: CareerPath | null = null;
  answerCount = 0;
  canNativeShare = false;

  readonly CIRCUMFERENCE = 2 * Math.PI * 54;

  resultDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  get ringOffset(): number {
    if (!this.animated()) return this.CIRCUMFERENCE;
    return this.CIRCUMFERENCE * (1 - (this.matches[0]?.percentage ?? 0) / 100);
  }

  get topInsight(): string {
    return this.topCareer?.whoItFits ?? '';
  }

  careerInsight(careerId: string): string {
    return getCareerBySlug(careerId)?.whoItFits ?? '';
  }

  tierStroke(tier: MatchTier): string {
    if (tier === 'strong') return '#4ade80';
    if (tier === 'good') return '#60a5fa';
    return '#fbbf24';
  }

  tierBarClass(tier: MatchTier): string {
    if (tier === 'strong') return 'bg-green-400';
    if (tier === 'good') return 'bg-blue-400';
    return 'bg-amber-400';
  }

  tierBadgeVariant(tier: MatchTier): 'success' | 'primary' | 'warning' {
    if (tier === 'strong') return 'success';
    if (tier === 'good') return 'primary';
    return 'warning';
  }

  tierLabel(tier: MatchTier): string {
    if (tier === 'strong') return 'Strong match';
    if (tier === 'good') return 'Good match';
    return 'Possible match';
  }

  heroBadgeClass(tier: MatchTier): string {
    if (tier === 'strong')
      return 'bg-green-400/20 text-green-300 ring-green-400/30';
    if (tier === 'good') return 'bg-blue-400/20 text-blue-300 ring-blue-400/30';
    return 'bg-amber-400/20 text-amber-300 ring-amber-400/30';
  }

  altCardLabel(tier: MatchTier): string {
    return tier === 'possible' ? 'Worth exploring' : 'Also a strong fit';
  }

  ngOnInit(): void {
    this.hasResults = this.stateService.hasResults();
    this.answerCount = Object.keys(this.stateService.answers()).length;

    if (this.hasResults) {
      this.matches = scoreAssessment(this.stateService.answers());
      if (this.matches.length > 0) {
        this.topCareer = getCareerBySlug(this.matches[0].careerId) ?? null;
        this.setMetaTags();
      }
    }

    try {
      this.canNativeShare =
        typeof navigator !== 'undefined' && 'share' in navigator;
    } catch {
      this.canNativeShare = false;
    }

    setTimeout(() => {
      this.loading.set(false);
      setTimeout(() => this.animated.set(true), 50);
    }, 800);
  }

  async downloadCard(): Promise<void> {
    const el = this.shareCardEl()?.nativeElement as HTMLElement | undefined;
    if (!el || !this.matches.length) return;

    const isStory = this.cardFormat() === 'story';
    const width = 1080;
    const height = isStory ? 1920 : 1080;

    this.downloading.set(true);
    try {
      // Allow the browser to finish painting before capture.
      // The 300ms window also covers any pending font loading.
      await new Promise<void>((resolve) => setTimeout(resolve, 300));

      const dataUrl = await toPng(el, {
        cacheBust: true,
        pixelRatio: 2,
        width,
        height,
        style: {
          // Override the hidden styles so html-to-image captures at full opacity.
          opacity: '1',
          transform: 'none',
        },
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `my-nextskill-${this.matches[0].careerId}.png`;
      link.click();
      this.showToast('Card downloaded — ready to share!');
    } catch {
      // html-to-image unavailable in this environment — silently fail.
    } finally {
      this.downloading.set(false);
    }
  }

  openShare(): void {
    this.shareOpen.set(true);
  }

  closeShare(): void {
    this.shareOpen.set(false);
  }

  shareToX(): void {
    if (!this.matches.length) return;
    const top = this.matches[0];
    const text = encodeURIComponent(
      `Just found my NextSkill 🎯\n${top.emoji} ${top.title} — ${top.percentage}% match\n"${this.topInsight}"\nWhat's yours? 👇\nnextskill.dev #NextSkill #TechCareers`,
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}`,
      '_blank',
      'noreferrer',
    );
    this.closeShare();
  }

  shareToLinkedIn(): void {
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
      this.showToast('Link copied — share it anywhere!');
    } catch {
      // Clipboard API unavailable — silently fail.
    }
  }

  async nativeShare(): Promise<void> {
    if (!this.matches.length || !this.canNativeShare) return;
    const top = this.matches[0];
    try {
      await navigator.share({
        title: `My NextSkill — ${top.title}`,
        text: `${top.emoji} ${top.title} — ${top.percentage}% match. What's yours?`,
        url: 'https://nextskill.dev/assessment',
      });
      this.closeShare();
    } catch {
      // Share dismissed or not supported.
    }
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 3000);
  }

  private setMetaTags(): void {
    if (!this.matches.length) return;
    const top = this.matches[0];
    const insight = this.topInsight;
    const ogImage = '/og-default.svg';

    this.title.setTitle(`Your NextSkill — ${top.title} | NextSkill`);

    const ogTitle = `I found my NextSkill — ${top.title}`;
    const ogDesc = `${insight} — What's yours?`;
    const ogUrl = 'https://nextskill.dev/assessment/results';

    this.meta.updateTag({ property: 'og:title', content: ogTitle });
    this.meta.updateTag({ property: 'og:description', content: ogDesc });
    this.meta.updateTag({ property: 'og:url', content: ogUrl });
    this.meta.updateTag({ property: 'og:site_name', content: 'NextSkill' });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: ogTitle });
    this.meta.updateTag({ name: 'twitter:description', content: ogDesc });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });
  }
}
