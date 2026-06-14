import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import {
  NsAppShellComponent,
  NsAppShellLink,
  NsBadgeComponent,
  NsButtonComponent,
  NsCardComponent,
  NsPageHeaderComponent,
  NsScrollIndicatorComponent,
} from 'ui';
import { CAREER_PATHS, CAREER_SALARY_DATA, formatSalaryRange } from 'types';
import { AuthService } from '../../core/auth/auth.service';

interface SalaryCard {
  careerId: string;
  title: string;
  emoji: string;
  juniorRange: string;
  seniorRange: string;
  hasFreelance: boolean;
  juniorMax: number;
  seniorMax: number;
}

function buildSalaryCards(): SalaryCard[] {
  return CAREER_PATHS.map((career) => {
    const data = CAREER_SALARY_DATA.find((s) => s.careerId === career.id);
    if (!data) {
      return {
        careerId: career.id,
        title: career.title,
        emoji: career.emoji,
        juniorRange: career.salaryInsight.split('·')[0]?.trim() ?? '—',
        seniorRange: '—',
        hasFreelance: false,
        juniorMax: 0,
        seniorMax: 0,
      };
    }
    const junior = data.ranges.find((r) => r.level === 'junior');
    const senior = data.ranges.find((r) => r.level === 'senior');
    return {
      careerId: career.id,
      title: career.title,
      emoji: career.emoji,
      juniorRange: junior
        ? formatSalaryRange(junior.min, junior.max, junior.currency)
        : '—',
      seniorRange: senior
        ? formatSalaryRange(senior.min, senior.max, senior.currency)
        : '—',
      hasFreelance: !!data.freelanceRate,
      juniorMax: junior?.max ?? 0,
      seniorMax: senior?.max ?? 0,
    };
  });
}

const ALL_CARDS = buildSalaryCards();

type SortKey = 'senior' | 'junior' | 'name';

@Component({
  selector: 'app-salaries',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NsAppShellComponent,
    NsBadgeComponent,
    NsButtonComponent,
    NsCardComponent,
    NsPageHeaderComponent,
    NsScrollIndicatorComponent,
  ],
  template: `
    <ns-app-shell
      brand="NextSkill"
      [links]="shellLinks"
      [authUser]="auth.currentUser$ | async"
      [devMode]="auth.isDev"
      (signIn)="auth.loginWithGoogle()"
      (devLogin)="auth.devLogin()"
      (signOut)="auth.logout()"
    >
      <div class="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <ns-page-header
            eyebrow="Salary guide"
            title="Tech career salaries."
            description="Honest salary ranges across 26 tech paths. UK market estimates unless stated. Figures are approximate — always verify with current job listings."
          >
            <ns-button routerLink="/careers" variant="secondary"
              >← Browse career paths</ns-button
            >
          </ns-page-header>

          <!-- Sort -->
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <span class="text-sm font-semibold text-ns-text">Sort by:</span>
            <div class="flex gap-2">
              @for (s of sortOptions; track s.key) {
                <button
                  type="button"
                  class="rounded-full border px-3 py-1 text-sm font-semibold transition"
                  [class]="
                    activeSort() === s.key
                      ? 'border-ns-primary bg-ns-primary text-[#07111f]'
                      : 'border-ns-border text-ns-muted hover:border-ns-primary hover:text-ns-text'
                  "
                  (click)="activeSort.set(s.key)"
                >
                  {{ s.label }}
                </button>
              }
            </div>
          </div>

          <p class="mt-4 text-sm text-ns-muted">
            {{ sorted().length }} careers
          </p>

          <div
            class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            @for (card of sorted(); track card.careerId) {
              <ns-card [interactive]="true">
                <div class="flex items-start justify-between gap-2">
                  <span class="text-3xl leading-none" aria-hidden="true">{{
                    card.emoji
                  }}</span>
                  @if (card.hasFreelance) {
                    <ns-badge variant="success">Freelance</ns-badge>
                  }
                </div>
                <h3 class="mb-3 mt-3 text-sm font-bold text-ns-text">
                  {{ card.title }}
                </h3>
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span
                      class="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-400"
                      >Junior</span
                    >
                    <span class="text-xs font-semibold text-ns-text">{{
                      card.juniorRange
                    }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span
                      class="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400"
                      >Senior</span
                    >
                    <span class="text-xs font-semibold text-ns-text">{{
                      card.seniorRange
                    }}</span>
                  </div>
                </div>
                <a
                  [routerLink]="['/careers', card.careerId]"
                  class="mt-4 inline-flex text-sm font-semibold text-ns-primary no-underline transition hover:underline"
                  >View full details →</a
                >
              </ns-card>
            }
          </div>

          <!-- Disclaimer -->
          <div
            class="mt-12 rounded-ns border border-ns-border bg-ns-canvasSubtle p-5"
          >
            <p class="m-0 text-xs leading-6 text-ns-muted">
              <span class="font-semibold text-ns-text">Disclaimer:</span>
              Salary data is approximate and based on UK market rates as of
              2025. Actual salaries vary significantly by location, employer,
              experience, and skills. US salaries are typically 30–100% higher
              depending on role and employer. Always research current rates on
              <a
                href="https://www.glassdoor.co.uk"
                target="_blank"
                rel="noreferrer"
                class="text-ns-primary no-underline hover:underline"
                >Glassdoor</a
              >,
              <a
                href="https://www.levels.fyi"
                target="_blank"
                rel="noreferrer"
                class="text-ns-primary no-underline hover:underline"
                >Levels.fyi</a
              >, and
              <a
                href="https://www.linkedin.com/salary/"
                target="_blank"
                rel="noreferrer"
                class="text-ns-primary no-underline hover:underline"
                >LinkedIn Salary</a
              >.
            </p>
          </div>
        </div>
      </div>
    </ns-app-shell>
    <ns-scroll-indicator />
  `,
})
export class SalariesComponent implements OnInit {
  protected readonly auth = inject(AuthService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Tech career salaries — NextSkill');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Honest UK salary ranges for 26 tech career paths — junior, mid, senior, and lead levels. Includes freelance day rates and factors that affect pay.',
    });
  }
  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Resources', routerLink: '/resources' },
  ];

  readonly sortOptions: { key: SortKey; label: string }[] = [
    { key: 'senior', label: 'Highest paid' },
    { key: 'junior', label: 'Best entry level' },
    { key: 'name', label: 'A–Z' },
  ];

  readonly activeSort = signal<SortKey>('senior');

  readonly sorted = computed(() => {
    const key = this.activeSort();
    return [...ALL_CARDS].sort((a, b) => {
      if (key === 'senior') return b.seniorMax - a.seniorMax;
      if (key === 'junior') return b.juniorMax - a.juniorMax;
      return a.title.localeCompare(b.title);
    });
  });
}
