import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import {
  NsButtonComponent,
  NsBadgeComponent,
  NsExternalLinkModalComponent,
  NsExternalLinkService,
  NsScrollIndicatorComponent,
  NsToastComponent,
} from 'ui';
import { generateResultCard } from '../../assessment/results/card-generator';
import { scoreAssessment } from 'scoring';
import type {
  CareerMatch,
  MatchTier,
  CareerPath,
  CareerRoadmap,
  CareerSalaryData,
  CareerEntrepreneurshipData,
} from 'types';
import {
  getCareerBySlug,
  getRoadmapByCareerId,
  getSalaryDataByCareerId,
  getEntrepreneurshipDataByCareerId,
  getEasiestPath,
  formatSalaryRange,
} from 'types';
import { AssessmentStateService } from '../../services/assessment-state.service';
import { AuthService } from '../../core/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-assessment-results',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NsButtonComponent,
    NsBadgeComponent,
    NsExternalLinkModalComponent,
    NsScrollIndicatorComponent,
    NsToastComponent,
  ],
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
      .result-logo-light {
        display: none;
      }
      :host-context([data-theme='light']) .result-logo-dark {
        display: none;
      }
      :host-context([data-theme='light']) .result-logo-light {
        display: block;
      }
    `,
  ],
  template: `
    <div class="min-h-screen bg-ns-bg text-ns-text">
      <!-- ─── Minimal nav ──────────────────────────────────────── -->
      <nav
        class="sticky top-0 z-20 flex items-center justify-between border-b border-ns-border bg-ns-bg/95 px-4 py-3 backdrop-blur-sm"
      >
        <a
          routerLink="/"
          class="flex items-center gap-1.5 text-sm font-semibold text-ns-muted no-underline transition hover:text-ns-text"
          aria-label="Back to home"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Home
        </a>
        <a routerLink="/" aria-label="Skill to Life" class="no-underline">
          <img
            src="/assets/logo-full-light.png"
            alt="Skill to Life"
            class="result-logo-dark h-7 w-auto"
          />
          <img
            src="/assets/logo-full.png"
            alt="Skill to Life"
            class="result-logo-light h-7 w-auto"
          />
        </a>
        @if (auth.currentUser$ | async) {
          <a
            routerLink="/profile"
            class="flex items-center gap-1.5 text-sm font-semibold text-ns-muted no-underline transition hover:text-ns-text"
          >
            My profile
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </a>
        } @else {
          <div class="w-16"></div>
        }
      </nav>

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
        <!-- Mobile sticky share button -->
        <div
          class="fixed bottom-0 left-0 right-0 z-20 border-t border-ns-border bg-ns-bg/95 px-4 pb-4 pt-3 backdrop-blur-sm sm:hidden"
        >
          <button
            type="button"
            class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-ns border border-ns-primary bg-ns-primary px-5 text-sm font-semibold text-ns-primaryFg shadow-ns transition hover:bg-ns-primaryHover"
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
                  skilltolife.com
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
                <div
                  class="mt-6 border-t border-ns-border pt-5"
                  aria-label="Category match breakdown"
                >
                  <p
                    class="m-0 text-xs font-bold uppercase tracking-[0.14em] text-ns-muted"
                  >
                    Signal breakdown
                  </p>
                  <div class="mt-4 grid gap-3">
                    @for (item of topCategoryBreakdown(); track item.key) {
                      <div class="grid gap-1.5">
                        <div class="flex items-center justify-between gap-3">
                          <span class="text-xs font-semibold text-ns-text">
                            {{ item.label }}
                          </span>
                          <span class="text-xs font-bold text-ns-muted">
                            {{ item.value }}%
                          </span>
                        </div>
                        <div
                          class="h-2 overflow-hidden rounded-full bg-white/10"
                        >
                          <div
                            class="h-full rounded-full bg-ns-primary transition-all duration-700"
                            [style.width.%]="animated() ? item.value : 0"
                          ></div>
                        </div>
                      </div>
                    }
                  </div>
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
              @if (topRoadmap) {
                <ol class="mt-5 flex flex-col gap-3" role="list">
                  @for (step of topRoadmap.steps.slice(0, 3); track step.step) {
                    <li
                      class="flex items-start gap-4 rounded-2xl border border-ns-border bg-ns-card p-4"
                    >
                      <span
                        class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ns-primary text-sm font-black text-ns-primaryFg"
                      >
                        {{ step.step }}
                      </span>
                      <div class="min-w-0 flex-1 pt-0.5">
                        <p class="m-0 text-sm font-semibold text-ns-text">
                          {{ step.title }}
                        </p>
                        <p class="m-0 mt-1 text-xs text-ns-muted">
                          {{ step.estimatedTime }}
                        </p>
                        @if (step.resources[0]) {
                          <button
                            type="button"
                            (click)="openRoadmapResource(step.resources[0])"
                            class="mt-2 inline-flex text-xs font-semibold text-ns-primary no-underline hover:underline"
                          >
                            {{ step.resources[0].title }} →
                          </button>
                        }
                      </div>
                    </li>
                  }
                </ol>
              } @else {
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
                        class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ns-primary text-sm font-black text-ns-primaryFg"
                      >
                        {{ i + 1 }}
                      </span>
                      <p class="m-0 pt-0.5 text-sm leading-6 text-ns-text">
                        {{ step }}
                      </p>
                    </li>
                  }
                </ol>
              }
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
                          <button
                            type="button"
                            (click)="openCareerResource(res)"
                            class="text-sm font-semibold text-ns-primary no-underline hover:underline"
                          >
                            {{ res.title }}
                          </button>
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
              @if (topSalaryData) {
                <div
                  class="mt-5 rounded-2xl border border-ns-border bg-ns-card p-6"
                >
                  <p class="m-0 text-sm leading-6 text-ns-muted">
                    {{ topSalaryData.summary }}
                  </p>
                  <div class="mt-4 space-y-3">
                    @for (
                      range of topSalaryData.ranges.slice(0, 2);
                      track range.level
                    ) {
                      <div>
                        <div class="mb-1 flex items-center justify-between">
                          <span
                            class="rounded-full px-2 py-0.5 text-xs font-semibold capitalize"
                            [class]="levelBadgeClass(range.level)"
                            >{{ range.level }}</span
                          >
                          <span class="text-xs font-semibold text-ns-text">{{
                            salaryRangeLabel(
                              range.min,
                              range.max,
                              range.currency
                            )
                          }}</span>
                        </div>
                        <div
                          class="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                        >
                          <div
                            class="h-full rounded-full"
                            [class]="levelBarClass(range.level)"
                            [style.width.%]="salaryBarWidth(range.max)"
                          ></div>
                        </div>
                      </div>
                    }
                  </div>
                  @if (topSalaryData.freelanceRate) {
                    <p class="mt-3 text-xs text-ns-muted">
                      Freelance day rate:
                      <span class="font-semibold text-ns-text"
                        >{{
                          salaryRangeLabel(
                            topSalaryData.freelanceRate.daily.min,
                            topSalaryData.freelanceRate.daily.max,
                            topSalaryData.freelanceRate.daily.currency
                          )
                        }}/day</span
                      >
                    </p>
                  }
                  <a
                    [routerLink]="['/careers', matches[0].careerId]"
                    class="mt-3 inline-flex text-xs font-semibold text-ns-primary no-underline hover:underline"
                  >
                    Full salary breakdown →
                  </a>
                </div>
              } @else {
                <div
                  class="mt-5 rounded-2xl border border-ns-border bg-ns-card p-6"
                >
                  <p class="m-0 text-sm font-medium leading-6 text-ns-text">
                    {{ topCareer.salaryInsight }}
                  </p>
                  <p class="m-0 mt-3 text-xs leading-5 text-ns-muted">
                    Salaries vary by location, experience, and employer.
                  </p>
                </div>
              }
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
              @if (topEntrepreneurshipData && easiestEntrepreneurshipPath) {
                <p class="mt-1 text-sm text-ns-muted">
                  {{ topEntrepreneurshipData.summary }}
                </p>
                <div
                  class="mt-5 rounded-2xl border border-ns-border bg-ns-card p-5"
                >
                  <div class="flex flex-wrap items-start gap-2">
                    <p class="m-0 flex-1 text-sm font-bold text-ns-text">
                      {{ easiestEntrepreneurshipPath.title }}
                    </p>
                    <span
                      class="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-400"
                      >Low barrier</span
                    >
                  </div>
                  <p class="mt-1 text-xs text-ns-muted">
                    ⏱
                    {{ easiestEntrepreneurshipPath.timeToFirstIncome }} to first
                    income ·
                    {{ easiestEntrepreneurshipPath.potentialIncome }}
                  </p>
                  <p class="mt-2 text-sm leading-6 text-ns-muted">
                    {{ easiestEntrepreneurshipPath.description }}
                  </p>
                </div>
                <a
                  [routerLink]="['/careers', matches[0].careerId]"
                  class="mt-4 inline-flex text-xs font-semibold text-ns-primary no-underline hover:underline"
                >
                  See all independent paths →
                </a>
              } @else {
                <p class="mt-1 text-sm text-ns-muted">
                  Many {{ matches[0].title }}s freelance or build their own
                  products.
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
              }
            </section>
          }

          <!-- ─── Section: Save / Sign-in ──────────────────────── -->
          @if (auth.currentUser$ | async; as user) {
            <section class="section-enter mt-14" style="animation-delay: 380ms">
              <div
                class="flex items-center gap-3 rounded-2xl border border-ns-border bg-ns-card px-5 py-4"
              >
                @if (user.avatar) {
                  <img
                    [src]="user.avatar"
                    [alt]="user.name ?? 'User avatar'"
                    class="h-8 w-8 rounded-full"
                  />
                }
                <div class="flex-1 min-w-0">
                  <p class="m-0 text-sm font-semibold text-ns-text truncate">
                    Signed in as {{ user.name ?? user.email }}
                  </p>
                  @if (resultSaved()) {
                    <p class="m-0 text-xs text-ns-success">
                      ✓ Result saved to your account
                    </p>
                  }
                </div>
                <a
                  routerLink="/my-results"
                  class="text-xs font-semibold text-ns-primary no-underline hover:underline"
                >
                  My results →
                </a>
              </div>
            </section>
          } @else {
            <section class="section-enter mt-14" style="animation-delay: 380ms">
              <div
                class="rounded-2xl border border-ns-border bg-ns-card p-6 text-center"
              >
                <h2 class="m-0 text-lg font-bold text-ns-text">
                  Save your result
                </h2>
                <p
                  class="mx-auto mt-2 max-w-sm text-sm leading-6 text-ns-muted"
                >
                  Sign in with Google to save this result to your account and
                  access it any time.
                </p>
                <button
                  type="button"
                  class="mt-4 inline-flex min-h-11 items-center gap-2 rounded-ns border border-ns-border bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                  (click)="loginWithGoogle()"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
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
                Tell others which tech path fits you.
              </p>

              <!-- Download card section -->
              <div class="mt-5">
                <button
                  type="button"
                  class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-ns border border-ns-primary bg-ns-primary px-5 text-sm font-semibold text-ns-primaryFg shadow-ns transition hover:bg-ns-primaryHover disabled:pointer-events-none disabled:opacity-60"
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
                          ? 'bg-ns-primary text-ns-primaryFg'
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
                          ? 'bg-ns-primary text-ns-primaryFg'
                          : 'bg-ns-card text-ns-muted hover:text-ns-text'
                      "
                      (click)="cardFormat.set('story')"
                    >
                      Story
                    </button>
                  </div>
                </div>

                <!-- Stats toggle -->
                <div class="mt-3 flex items-center justify-between gap-2 px-1">
                  <span class="text-xs text-ns-muted"
                    >Include signal breakdown</span
                  >
                  <button
                    type="button"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none"
                    [class]="showStats() ? 'bg-ns-primary' : 'bg-white/20'"
                    (click)="showStats.set(!showStats())"
                    role="switch"
                    [attr.aria-checked]="showStats()"
                    aria-label="Include signal breakdown"
                  >
                    <span
                      class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
                      [class]="showStats() ? 'translate-x-5' : 'translate-x-0'"
                    ></span>
                  </button>
                </div>
              </div>

              <!-- Divider -->
              <div class="mt-5 flex items-center gap-3">
                <div class="h-px flex-1 bg-ns-border"></div>
                <span class="text-xs text-ns-muted">or share directly</span>
                <div class="h-px flex-1 bg-ns-border"></div>
              </div>

              <!-- Social share grid — 3 columns -->
              <div
                class="mt-4 grid grid-cols-3 gap-2 transition-opacity"
                [class.opacity-50]="sharing()"
                [class.pointer-events-none]="sharing()"
              >
                <!-- WhatsApp -->
                <button
                  type="button"
                  class="flex min-h-12 flex-col items-center justify-center gap-1.5 rounded-ns border border-ns-border bg-ns-card px-2 py-3 text-xs font-semibold text-ns-text transition hover:border-[#25D366]/60 hover:bg-ns-cardElevated active:scale-95"
                  (click)="shareToWhatsApp()"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#25D366"
                    aria-hidden="true"
                  >
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                    />
                  </svg>
                  <span>WhatsApp</span>
                </button>

                <!-- X / Twitter -->
                <button
                  type="button"
                  class="flex min-h-12 flex-col items-center justify-center gap-1.5 rounded-ns border border-ns-border bg-ns-card px-2 py-3 text-xs font-semibold text-ns-text transition hover:border-ns-primary hover:bg-ns-cardElevated active:scale-95"
                  (click)="shareToX()"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
                    />
                  </svg>
                  <span>X / Twitter</span>
                </button>

                <!-- LinkedIn -->
                <button
                  type="button"
                  class="flex min-h-12 flex-col items-center justify-center gap-1.5 rounded-ns border border-ns-border bg-ns-card px-2 py-3 text-xs font-semibold text-ns-text transition hover:border-[#0A66C2]/60 hover:bg-ns-cardElevated active:scale-95"
                  (click)="shareToLinkedIn()"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#0A66C2"
                    aria-hidden="true"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  <span>LinkedIn</span>
                </button>

                <!-- Messages / SMS -->
                <button
                  type="button"
                  class="flex min-h-12 flex-col items-center justify-center gap-1.5 rounded-ns border border-ns-border bg-ns-card px-2 py-3 text-xs font-semibold text-ns-text transition hover:border-[#34AADC]/60 hover:bg-ns-cardElevated active:scale-95"
                  (click)="shareToSMS()"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Z"
                      fill="#34AADC"
                    />
                    <path
                      d="M8 10h8M8 14h5"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span>Messages</span>
                </button>

                <!-- Copy link -->
                <button
                  type="button"
                  class="flex min-h-12 flex-col items-center justify-center gap-1.5 rounded-ns border border-ns-border bg-ns-card px-2 py-3 text-xs font-semibold text-ns-text transition hover:border-ns-primary hover:bg-ns-cardElevated active:scale-95"
                  (click)="copyLink()"
                >
                  @if (copied()) {
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="#4ade80"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span class="text-green-400">Copied!</span>
                  } @else {
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>Copy link</span>
                  }
                </button>

                <!-- Native share / More options -->
                @if (canNativeShare) {
                  <button
                    type="button"
                    class="flex min-h-12 flex-col items-center justify-center gap-1.5 rounded-ns border border-ns-border bg-ns-card px-2 py-3 text-xs font-semibold text-ns-text transition hover:border-ns-primary hover:bg-ns-cardElevated active:scale-95"
                    (click)="nativeShare()"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="18"
                        cy="5"
                        r="3"
                        stroke="currentColor"
                        stroke-width="1.75"
                      />
                      <circle
                        cx="6"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        stroke-width="1.75"
                      />
                      <circle
                        cx="18"
                        cy="19"
                        r="3"
                        stroke="currentColor"
                        stroke-width="1.75"
                      />
                      <path
                        d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span>More</span>
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
      <ns-scroll-indicator />
      <ns-external-link-modal />
    </div>
  `,
})
export class AssessmentResultsComponent implements OnInit {
  private readonly stateService = inject(AssessmentStateService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  protected readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly externalLink = inject(NsExternalLinkService);

  readonly loading = signal(true);
  readonly animated = signal(false);
  readonly shareOpen = signal(false);
  readonly copied = signal(false);
  readonly downloading = signal(false);
  readonly sharing = signal(false);
  readonly cardFormat = signal<'square' | 'story'>('square');
  readonly showStats = signal(true);
  readonly toastMessage = signal('');
  readonly toastVisible = signal(false);
  readonly resultSaved = signal(false);

  hasResults = false;
  matches: CareerMatch[] = [];
  topCareer: CareerPath | null = null;
  topRoadmap: CareerRoadmap | null = null;
  topSalaryData: CareerSalaryData | null = null;
  topEntrepreneurshipData: CareerEntrepreneurshipData | null = null;
  answerCount = 0;
  canNativeShare = false;
  canNativeShareFiles = false;

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

  topCategoryBreakdown() {
    const breakdown = this.matches[0]?.categoryBreakdown;
    if (!breakdown) return [];

    return [
      { key: 'workStyle', label: 'Work Style', value: breakdown.workStyle },
      { key: 'dayToDay', label: 'Day to Day', value: breakdown.dayToDay },
      {
        key: 'problemSolving',
        label: 'Problem Solving',
        value: breakdown.problemSolving,
      },
      {
        key: 'temperament',
        label: 'Temperament',
        value: breakdown.temperament,
      },
      { key: 'softSkills', label: 'Soft Skills', value: breakdown.softSkills },
      {
        key: 'careerGoals',
        label: 'Career Goals',
        value: breakdown.careerGoals,
      },
    ];
  }

  salaryRangeLabel(min: number, max: number, currency: string): string {
    return formatSalaryRange(min, max, currency);
  }

  salaryBarWidth(max: number): number {
    return Math.min(Math.round((max / 180000) * 100), 100);
  }

  levelBadgeClass(level: string): string {
    const map: Record<string, string> = {
      junior: 'bg-blue-500/20 text-blue-400',
      mid: 'bg-purple-500/20 text-purple-400',
      senior: 'bg-emerald-500/20 text-emerald-400',
      lead: 'bg-amber-500/20 text-amber-400',
    };
    return map[level] ?? 'bg-white/10 text-ns-muted';
  }

  levelBarClass(level: string): string {
    const map: Record<string, string> = {
      junior: 'bg-blue-500',
      mid: 'bg-purple-500',
      senior: 'bg-emerald-500',
      lead: 'bg-amber-500',
    };
    return map[level] ?? 'bg-ns-primary';
  }

  get easiestEntrepreneurshipPath() {
    if (!this.topEntrepreneurshipData) return null;
    return getEasiestPath(this.topEntrepreneurshipData.careerId) ?? null;
  }

  openRoadmapResource(resource: {
    title: string;
    url: string;
    platform?: string;
    type?: string;
  }): void {
    this.externalLink.openExternalLink({
      url: resource.url,
      title: resource.title,
      platform:
        resource.platform ?? this.externalLink.extractDomain(resource.url),
      careerTitle: this.topCareer?.title,
      cost: resource.type === 'paid' ? 'paid' : 'free',
      context: 'results',
    });
  }

  openCareerResource(resource: { title: string; url?: string }): void {
    if (!resource.url) return;
    this.externalLink.openExternalLink({
      url: resource.url,
      title: resource.title,
      platform: this.externalLink.extractDomain(resource.url),
      careerTitle: this.topCareer?.title,
      cost: 'free',
      context: 'results',
    });
  }

  ngOnInit(): void {
    this.hasResults = this.stateService.hasResults();
    this.answerCount = Object.keys(this.stateService.answers()).length;

    if (this.hasResults) {
      this.matches = scoreAssessment(this.stateService.answers());
      if (this.matches.length > 0) {
        this.topCareer = getCareerBySlug(this.matches[0].careerId) ?? null;
        this.topRoadmap =
          getRoadmapByCareerId(this.matches[0].careerId) ?? null;
        this.topSalaryData =
          getSalaryDataByCareerId(this.matches[0].careerId) ?? null;
        this.topEntrepreneurshipData =
          getEntrepreneurshipDataByCareerId(this.matches[0].careerId) ?? null;
        this.setMetaTags();
        this.saveResult();
      }
    }

    try {
      this.canNativeShare =
        typeof navigator !== 'undefined' && 'share' in navigator;
      if (this.canNativeShare && 'canShare' in navigator) {
        const testBlob = new Blob([''], { type: 'image/png' });
        const testFile = new File([testBlob], 'test.png', {
          type: 'image/png',
        });
        this.canNativeShareFiles = navigator.canShare({ files: [testFile] });
      }
    } catch {
      this.canNativeShare = false;
    }

    setTimeout(() => {
      this.loading.set(false);
      setTimeout(() => this.animated.set(true), 50);
    }, 800);
  }

  private saveResult(): void {
    if (!this.matches.length) return;
    const top = this.matches[0];

    // Skip if this exact result was already saved earlier in this session
    const cacheKey = `ns_saved_${top.careerId}_${Math.round(top.percentage)}`;
    if (sessionStorage.getItem(cacheKey)) {
      this.resultSaved.set(true);
      return;
    }

    const payload = {
      answers: this.stateService.answers(),
      topCareer: top.careerId,
      topPercentage: top.percentage,
      allMatches: this.matches,
    };

    this.http
      .post<{
        id: string;
        anonymousToken?: string;
      }>(`${environment.apiUrl}/api/results`, payload)
      .subscribe({
        next: (res) => {
          this.resultSaved.set(true);
          sessionStorage.setItem(cacheKey, res.id ?? '1');
          if (res.anonymousToken) {
            sessionStorage.setItem(
              'ns_pending_claim',
              JSON.stringify({
                resultId: res.id,
                anonymousToken: res.anonymousToken,
              }),
            );
          }
        },
        error: () => {
          /* silently ignore — offline or no DB */
        },
      });
  }

  loginWithGoogle(): void {
    this.auth.loginWithGoogle();
  }

  private buildCardData() {
    const top = this.matches[0];
    return {
      title: top.title,
      emoji: top.emoji,
      percentage: top.percentage,
      matchTier: this.tierLabel(top.matchTier),
      insight: this.topInsight,
      stats: this.showStats()
        ? this.topCategoryBreakdown()
            .slice(0, 4)
            .map((item) => ({ label: item.label, value: item.value }))
        : undefined,
    };
  }

  private async generateCard(): Promise<File | null> {
    if (!this.matches.length) return null;
    try {
      const blob = await generateResultCard(
        this.buildCardData(),
        this.cardFormat(),
      );
      return new File(
        [blob],
        `my-skill-to-life-${this.matches[0].careerId}.png`,
        {
          type: 'image/png',
        },
      );
    } catch {
      return null;
    }
  }

  private triggerDownload(file: File): void {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async downloadCard(): Promise<void> {
    if (!this.matches.length || this.downloading()) return;
    this.downloading.set(true);
    try {
      const file = await this.generateCard();
      if (file) {
        this.triggerDownload(file);
        this.showToast('Card downloaded — ready to share!');
      }
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

  async shareToWhatsApp(): Promise<void> {
    if (!this.matches.length || this.sharing()) return;
    this.sharing.set(true);
    const top = this.matches[0];
    try {
      const file = await this.generateCard();
      if (file && this.canNativeShareFiles) {
        await navigator.share({
          files: [file],
          title: `My Skill to Life result — ${top.title}`,
          url: 'https://skilltolife.com/assessment',
        });
        this.closeShare();
        return;
      }
      if (file) this.triggerDownload(file);
      const text = encodeURIComponent(
        `I just found my best-fit tech path with Skill to Life! 🎯\n${top.emoji} ${top.title} — ${top.percentage}% match\nFind yours 👇\nskilltolife.com`,
      );
      window.open(`https://wa.me/?text=${text}`, '_blank', 'noreferrer');
      if (file)
        this.showToast('Card saved — attach it to your WhatsApp message!');
      this.closeShare();
    } catch {
      /* native share dismissed */
    } finally {
      this.sharing.set(false);
    }
  }

  async shareToX(): Promise<void> {
    if (!this.matches.length || this.sharing()) return;
    this.sharing.set(true);
    const top = this.matches[0];
    try {
      const file = await this.generateCard();
      if (file) this.triggerDownload(file);
      const text = encodeURIComponent(
        `Just found my best-fit tech path 🎯\n${top.emoji} ${top.title} — ${top.percentage}% match\n"${this.topInsight}"\nFind yours 👇\nskilltolife.com #SkillToLife #TechCareers`,
      );
      window.open(
        `https://twitter.com/intent/tweet?text=${text}`,
        '_blank',
        'noreferrer',
      );
      if (file) this.showToast('Card downloaded — attach it to your tweet!');
      this.closeShare();
    } finally {
      this.sharing.set(false);
    }
  }

  async shareToLinkedIn(): Promise<void> {
    if (this.sharing()) return;
    this.sharing.set(true);
    try {
      const file = await this.generateCard();
      if (file) this.triggerDownload(file);
      const url = encodeURIComponent('https://skilltolife.com');
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        '_blank',
        'noreferrer',
      );
      if (file)
        this.showToast('Card downloaded — attach it to your LinkedIn post!');
      this.closeShare();
    } finally {
      this.sharing.set(false);
    }
  }

  async shareToSMS(): Promise<void> {
    if (!this.matches.length || this.sharing()) return;
    this.sharing.set(true);
    const top = this.matches[0];
    try {
      const file = await this.generateCard();
      if (file && this.canNativeShareFiles) {
        await navigator.share({
          files: [file],
          title: `My Skill to Life result — ${top.title}`,
          url: 'https://skilltolife.com/assessment',
        });
        this.closeShare();
        return;
      }
      if (file) this.triggerDownload(file);
      const body = encodeURIComponent(
        `Check this out — I just found my best-fit tech path with Skill to Life.\n${top.emoji} ${top.title} — ${top.percentage}% match\nTry it yourself: skilltolife.com`,
      );
      window.location.href = `sms:?body=${body}`;
      this.closeShare();
    } catch {
      /* native share dismissed */
    } finally {
      this.sharing.set(false);
    }
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText('https://skilltolife.com/assessment');
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
      this.showToast('Link copied — share it anywhere!');
    } catch {
      // Clipboard API unavailable — silently fail.
    }
  }

  async nativeShare(): Promise<void> {
    if (!this.matches.length || !this.canNativeShare || this.sharing()) return;
    this.sharing.set(true);
    const top = this.matches[0];
    try {
      const file = await this.generateCard();
      const shareData: ShareData = {
        title: `My career path result — ${top.title}`,
        text: `${top.emoji} ${top.title} — ${top.percentage}% match. Find your best-fit path.`,
        url: 'https://skilltolife.com/assessment',
      };
      if (file && this.canNativeShareFiles) {
        await navigator.share({ ...shareData, files: [file] });
      } else {
        await navigator.share(shareData);
      }
      this.closeShare();
    } catch {
      /* Share dismissed or not supported */
    } finally {
      this.sharing.set(false);
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
    const ogImage = '/assets/social-preview.png';

    this.title.setTitle(
      `Your Skill to Life result — ${top.title} | Skill to Life`,
    );

    const ogTitle = `I found my best-fit tech path — ${top.title}`;
    const ogDesc = `${insight} — Find your best-fit path with Skill to Life.`;
    const ogUrl = 'https://skilltolife.com/assessment/results';

    this.meta.updateTag({ property: 'og:title', content: ogTitle });
    this.meta.updateTag({ property: 'og:description', content: ogDesc });
    this.meta.updateTag({ property: 'og:url', content: ogUrl });
    this.meta.updateTag({ property: 'og:site_name', content: 'Skill to Life' });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'og:image:width', content: '1280' });
    this.meta.updateTag({ property: 'og:image:height', content: '640' });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: ogTitle });
    this.meta.updateTag({ name: 'twitter:description', content: ogDesc });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });
  }
}
