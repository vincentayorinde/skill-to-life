import { AsyncPipe } from '@angular/common';
import { Component, OnInit, computed, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import {
  NsAppShellComponent,
  NsAppShellLink,
  NsBadgeComponent,
  NsButtonComponent,
  NsCardComponent,
  NsPageHeaderComponent,
  NsTabsComponent,
  NsTabItem,
} from 'ui';
import type { CareerCategory, CareerPath } from 'types';
import { CAREER_PATHS } from 'types';
import { AuthService } from '../../core/auth/auth.service';

interface TabFilter {
  id: string;
  label: string;
  category?: CareerCategory;
}

const TABS: TabFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'development', label: 'Development', category: 'development' },
  { id: 'security', label: 'Security', category: 'security' },
  { id: 'data-ai', label: 'Data & AI', category: 'data-ai' },
  {
    id: 'design-product',
    label: 'Design & Product',
    category: 'design-product',
  },
  { id: 'writing-qa', label: 'Writing & QA', category: 'writing-qa' },
  {
    id: 'specialist-advanced',
    label: 'Specialist & Advanced',
    category: 'specialist-advanced',
  },
];

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NsAppShellComponent,
    NsBadgeComponent,
    NsButtonComponent,
    NsCardComponent,
    NsPageHeaderComponent,
    NsTabsComponent,
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
            eyebrow="Career paths"
            title="Find the path that fits you."
            description="Not sure where to start? Browse every tech career path — explained simply, with honest roadmaps, resources, and salary insights."
          >
            <ns-button routerLink="/" variant="secondary"
              >← Back to home</ns-button
            >
          </ns-page-header>

          <div
            class="mt-2 flex flex-col gap-3 rounded-ns border border-ns-border bg-ns-card p-2 lg:flex-row lg:items-center lg:justify-between"
          >
            <div class="min-w-0 overflow-x-auto pb-1 lg:pb-0">
              <ns-tabs
                [tabs]="tabItems"
                [activeId]="activeTab()"
                (activeIdChange)="setActiveTab($event)"
              />
            </div>
            <label class="min-w-0 text-sm lg:w-80">
              <span class="sr-only">Search paths</span>
              <input
                type="search"
                class="w-full rounded-ns-sm border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text outline-none transition placeholder:text-ns-muted focus:border-ns-primary"
                placeholder="Search by title, skill, or category"
                [value]="searchQuery()"
                (input)="setSearchQuery($any($event.target).value)"
              />
            </label>
          </div>

          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="m-0 text-sm text-ns-muted">
              Showing {{ pageStart() }}-{{ pageEnd() }} of
              {{ filtered().length }} path{{ filtered().length === 1 ? '' : 's' }}
            </p>
            <label class="flex items-center gap-2 text-sm text-ns-muted">
              <span>Show</span>
              <select
                class="rounded-ns-sm border border-ns-border bg-ns-card px-2.5 py-1.5 text-sm text-ns-text outline-none transition focus:border-ns-primary"
                [value]="pageSize()"
                (change)="setPageSize($any($event.target).value)"
              >
                @for (size of pageSizeOptions; track size) {
                  <option [value]="size">{{ size }}</option>
                }
              </select>
            </label>
          </div>

          <div
            class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            @for (career of paginatedCareers(); track career.slug) {
              <ns-card [interactive]="true">
                <div class="flex items-start justify-between gap-3">
                  <span class="text-3xl leading-none" aria-hidden="true">{{
                    career.emoji
                  }}</span>
                  <div class="flex flex-wrap gap-1.5">
                    <ns-badge
                      [variant]="difficultyVariant(career.difficultyLevel)"
                    >
                      {{ career.difficultyLevel }}
                    </ns-badge>
                    @if (career.beginnerFriendly) {
                      <ns-badge variant="success">Beginner ok</ns-badge>
                    }
                  </div>
                </div>

                <h2 class="mb-2 mt-4 text-base font-bold text-ns-text">
                  {{ career.title }}
                </h2>
                <p class="m-0 text-sm leading-6 text-ns-muted">
                  {{ career.summary }}
                </p>

                <div class="mt-3 flex flex-wrap gap-1.5">
                  @for (tag of career.tags.slice(0, 3); track tag) {
                    <span
                      class="rounded-full border border-ns-border px-2 py-0.5 text-xs font-semibold text-ns-muted"
                      >{{ tag }}</span
                    >
                  }
                </div>

                <a
                  class="mt-5 inline-flex text-sm font-semibold text-ns-primary no-underline transition hover:underline"
                  [routerLink]="['/careers', career.slug]"
                  >View path →</a
                >
              </ns-card>
            }
          </div>

          @if (totalPages() > 1) {
            <nav
              class="mt-8 flex flex-col items-center justify-between gap-3 border-t border-ns-border pt-5 sm:flex-row"
              aria-label="Career pagination"
            >
              <p class="m-0 text-sm text-ns-muted">
                Page {{ currentPageSafe() }} of {{ totalPages() }}
              </p>
              <div class="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  class="rounded-ns-sm border border-ns-border bg-ns-card px-3 py-2 text-sm font-semibold text-ns-text transition hover:border-ns-primary hover:text-ns-primary disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-ns-border disabled:hover:text-ns-text"
                  [disabled]="currentPageSafe() === 1"
                  (click)="previousPage()"
                >
                  Previous
                </button>
                @for (page of visiblePages(); track page) {
                  <button
                    type="button"
                    class="min-w-10 rounded-ns-sm border px-3 py-2 text-sm font-semibold transition"
                    [class.border-ns-primary]="page === currentPageSafe()"
                    [class.bg-ns-primary]="page === currentPageSafe()"
                    [class.text-white]="page === currentPageSafe()"
                    [class.border-ns-border]="page !== currentPageSafe()"
                    [class.bg-ns-card]="page !== currentPageSafe()"
                    [class.text-ns-text]="page !== currentPageSafe()"
                    (click)="goToPage(page)"
                    [attr.aria-current]="page === currentPageSafe() ? 'page' : null"
                  >
                    {{ page }}
                  </button>
                }
                <button
                  type="button"
                  class="rounded-ns-sm border border-ns-border bg-ns-card px-3 py-2 text-sm font-semibold text-ns-text transition hover:border-ns-primary hover:text-ns-primary disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-ns-border disabled:hover:text-ns-text"
                  [disabled]="currentPageSafe() === totalPages()"
                  (click)="nextPage()"
                >
                  Next
                </button>
              </div>
            </nav>
          }

          @if (filtered().length === 0) {
            <div class="py-20 text-center">
              <p class="text-ns-muted">No paths in this category yet.</p>
            </div>
          }
        </div>
      </div>
    </ns-app-shell>
  `,
})
export class CareersComponent implements OnInit {
  protected readonly auth = inject(AuthService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Tech career paths — NextSkill');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore 26 tech career paths — frontend, backend, data, AI, security, design, and more. Find the path that fits how you think and work.',
    });
  }
  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Salaries', routerLink: '/salaries' },
    { label: 'Resources', routerLink: '/resources' },
  ];

  readonly tabItems: NsTabItem[] = TABS.map((t) => ({
    id: t.id,
    label: t.label,
  }));
  readonly pageSizeOptions = [10, 20, 30, 50];
  readonly pageSize = signal<number>(10);
  readonly activeTab = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly currentPage = signal<number>(1);

  readonly filtered = computed((): CareerPath[] => {
    const id = this.activeTab();
    const tab = TABS.find((t) => t.id === id);
    const query = this.searchQuery().trim().toLowerCase();
    const byCategory = tab?.category
      ? CAREER_PATHS.filter((c) => c.category === tab.category)
      : CAREER_PATHS;

    if (!query) return byCategory;

    return byCategory.filter((career) =>
      [
        career.title,
        career.summary,
        career.category,
        career.difficultyLevel,
        ...career.tags,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize())),
  );

  readonly currentPageSafe = computed(() =>
    Math.min(this.currentPage(), this.totalPages()),
  );

  readonly paginatedCareers = computed(() => {
    const start = (this.currentPageSafe() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

  readonly pageStart = computed(() =>
    this.filtered().length === 0
      ? 0
      : (this.currentPageSafe() - 1) * this.pageSize() + 1,
  );

  readonly pageEnd = computed(() =>
    Math.min(this.currentPageSafe() * this.pageSize(), this.filtered().length),
  );

  readonly visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPageSafe();
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    const start = Math.max(1, Math.min(current - half, total - maxVisible + 1));
    const end = Math.min(total, start + maxVisible - 1);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  });

  setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
    this.currentPage.set(1);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }

  setPageSize(size: string | number): void {
    const parsed = Number(size);
    this.pageSize.set(this.pageSizeOptions.includes(parsed) ? parsed : 10);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    this.currentPage.set(Math.min(Math.max(page, 1), this.totalPages()));
  }

  previousPage(): void {
    this.goToPage(this.currentPageSafe() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPageSafe() + 1);
  }

  difficultyVariant(level: string): 'success' | 'warning' | 'accent' {
    if (level === 'beginner') return 'success';
    if (level === 'intermediate') return 'warning';
    return 'accent';
  }
}
