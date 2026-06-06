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
  NsRegionFilterComponent,
  NsScrollIndicatorComponent,
} from 'ui';
import {
  CAREER_PATHS,
  CAREER_SALARY_DATA,
  CAREER_SALARY_REGIONS,
  SalaryRegion,
  RegionalSalary,
  formatSalaryRange,
} from 'types';

interface SalaryCard {
  careerId: string;
  title: string;
  emoji: string;
  juniorRange: string;
  seniorRange: string;
  hasFreelance: boolean;
  juniorMax: number;
  seniorMax: number;
  currencySymbol: string;
}

function formatRegionalRange(min: number, max: number, symbol: string): string {
  const fmt = (n: number): string => {
    if (n >= 1_000_000) return `${symbol}${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${symbol}${Math.round(n / 1_000)}k`;
    return `${symbol}${n}`;
  };
  return `${fmt(min)} – ${fmt(max)}`;
}

function buildSalaryCardsForRegion(region: SalaryRegion): SalaryCard[] {
  return CAREER_PATHS.map((career) => {
    const regional = CAREER_SALARY_REGIONS[career.id];
    if (regional) {
      const rd: RegionalSalary | undefined = regional.find((r) => r.region === region);
      if (rd) {
        const junior = rd.ranges.find((r) => r.level === 'junior');
        const senior = rd.ranges.find((r) => r.level === 'senior');
        return {
          careerId: career.id,
          title: career.title,
          emoji: career.emoji,
          juniorRange: junior
            ? formatRegionalRange(junior.min, junior.max, rd.currencySymbol)
            : '—',
          seniorRange: senior
            ? formatRegionalRange(senior.min, senior.max, rd.currencySymbol)
            : '—',
          hasFreelance: !!rd.freelanceRate,
          juniorMax: junior?.max ?? 0,
          seniorMax: senior?.max ?? 0,
          currencySymbol: rd.currencySymbol,
        };
      }
    }

    // Fall back to legacy UK salary data
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
        currencySymbol: '£',
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
      currencySymbol: '£',
    };
  });
}

type SortKey = 'senior' | 'junior' | 'name';

const STORAGE_KEY = 'ns_salary_region';

function readSavedRegion(): SalaryRegion {
  try {
    const v = globalThis.localStorage?.getItem(STORAGE_KEY);
    const valid: SalaryRegion[] = ['uk', 'us', 'nigeria', 'europe', 'global'];
    return valid.includes(v as SalaryRegion) ? (v as SalaryRegion) : 'uk';
  } catch {
    return 'uk';
  }
}

@Component({
  selector: 'app-salaries',
  standalone: true,
  imports: [
    RouterLink,
    NsAppShellComponent,
    NsBadgeComponent,
    NsButtonComponent,
    NsCardComponent,
    NsPageHeaderComponent,
    NsRegionFilterComponent,
    NsScrollIndicatorComponent,
  ],
  template: `
    <ns-app-shell brand="NextSkill" [links]="shellLinks">
      <div class="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <ns-page-header
            eyebrow="Salary guide"
            title="Tech career salaries."
            [description]="pageDescription()"
          >
            <ns-button routerLink="/careers" variant="secondary"
              >← Browse career paths</ns-button
            >
          </ns-page-header>

          <!-- Region filter -->
          <div class="mt-6">
            <ns-region-filter
              [active]="activeRegion()"
              (regionChange)="setRegion($event)"
            />
          </div>

          <!-- Sort -->
          <div class="mt-5 flex flex-wrap items-center gap-3">
            <span class="text-sm font-semibold text-ns-text">Sort by:</span>
            <div class="flex gap-2">
              @for (s of sortOptions; track s.key) {
                <button
                  type="button"
                  class="rounded-ns border px-3 py-1.5 text-sm font-semibold transition duration-fast ease-ns"
                  [class]="
                    activeSort() === s.key
                      ? 'border-ns-primary bg-ns-primary text-white'
                      : 'border-ns-border text-ns-muted hover:border-ns-borderStrong hover:text-ns-text'
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
                      class="rounded-ns bg-ns-primarySoft px-2 py-0.5 text-[10px] font-semibold text-ns-primary"
                      >Junior</span
                    >
                    <span class="text-xs font-semibold text-ns-text">{{
                      card.juniorRange
                    }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span
                      class="rounded-ns bg-ns-successSoft px-2 py-0.5 text-[10px] font-semibold text-ns-success"
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
            class="mt-12 rounded-ns-md border border-ns-border bg-ns-canvasSubtle p-5"
          >
            <p class="m-0 text-xs leading-6 text-ns-muted">
              <span class="font-semibold text-ns-text">Disclaimer:</span>
              Salary data is approximate and representative of market conditions
              as of 2025. Actual salaries vary significantly by employer,
              experience, and skills. Always verify with current job listings on
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
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Tech career salaries — NextSkill');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Salary ranges for 26 tech career paths across UK, US, Nigeria, Europe, and globally. Junior, mid, senior, and lead levels with freelance rates.',
    });
  }

  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Salaries', routerLink: '/salaries' },
    { label: 'Go independent', routerLink: '/entrepreneurship' },
    { label: 'Resources', routerLink: '/resources' },
    {
      label: 'Open source',
      href: 'https://github.com/vincentayorinde/nextskill',
      external: true,
    },
  ];

  readonly sortOptions: { key: SortKey; label: string }[] = [
    { key: 'senior', label: 'Highest paid' },
    { key: 'junior', label: 'Best entry level' },
    { key: 'name', label: 'A–Z' },
  ];

  readonly activeSort = signal<SortKey>('senior');
  readonly activeRegion = signal<SalaryRegion>(readSavedRegion());

  readonly pageDescription = computed(() => {
    const labels: Record<SalaryRegion, string> = {
      uk: 'UK market',
      us: 'US market',
      nigeria: 'Nigerian market',
      europe: 'European market',
      global: 'global market',
    };
    return `Salary ranges for 26 tech career paths — ${labels[this.activeRegion()]}. Junior through lead levels with freelance rates where available.`;
  });

  setRegion(region: SalaryRegion): void {
    this.activeRegion.set(region);
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, region);
    } catch {
      // localStorage unavailable
    }
  }

  readonly sorted = computed(() => {
    const key = this.activeSort();
    const cards = buildSalaryCardsForRegion(this.activeRegion());
    return [...cards].sort((a, b) => {
      if (key === 'senior') return b.seniorMax - a.seniorMax;
      if (key === 'junior') return b.juniorMax - a.juniorMax;
      return a.title.localeCompare(b.title);
    });
  });
}
