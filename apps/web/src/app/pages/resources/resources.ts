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
  NsTabsComponent,
  NsTabItem,
  NsExternalLinkService,
} from 'ui';
import { CAREER_PATHS, CAREER_ROADMAPS, FREE_CAREER_RESOURCES } from 'types';
import { AuthService } from '../../core/auth/auth.service';

interface FlatResource {
  title: string;
  url: string;
  platform: string;
  cost: 'free' | 'paid' | 'freemium' | 'book' | 'course' | 'video' | 'practice';
  careerId: string;
  careerTitle: string;
  careerEmoji: string;
  type: string;
}

function buildResourceList(): FlatResource[] {
  const list: FlatResource[] = [];

  // From FREE_CAREER_RESOURCES (CareerResource catalogue)
  for (const r of FREE_CAREER_RESOURCES) {
    const career = CAREER_PATHS.find((c) => c.id === r.careerId);
    if (!career) continue;
    list.push({
      title: r.title,
      url: r.url,
      platform: r.platform,
      cost: r.cost,
      careerId: r.careerId,
      careerTitle: career.title,
      careerEmoji: career.emoji,
      type: r.type,
    });
  }

  // From CAREER_ROADMAPS step resources (RoadmapResource)
  for (const roadmap of CAREER_ROADMAPS) {
    const career = CAREER_PATHS.find((c) => c.id === roadmap.careerId);
    if (!career) continue;
    for (const step of roadmap.steps) {
      for (const res of step.resources) {
        // Skip duplicates (same URL already in the list)
        if (list.some((x) => x.url === res.url)) continue;
        list.push({
          title: res.title,
          url: res.url,
          platform: res.platform,
          cost: res.type === 'paid' ? 'paid' : 'free',
          careerId: roadmap.careerId,
          careerTitle: career.title,
          careerEmoji: career.emoji,
          type: res.type,
        });
      }
    }
  }

  // From freeResources and paidResources on each career (ResourceLink)
  for (const career of CAREER_PATHS) {
    for (const r of career.freeResources) {
      if (!r.url) continue;
      if (list.some((x) => x.url === r.url)) continue;
      list.push({
        title: r.title,
        url: r.url,
        platform: new URL(r.url).hostname.replace('www.', ''),
        cost: 'free',
        careerId: career.id,
        careerTitle: career.title,
        careerEmoji: career.emoji,
        type: 'course',
      });
    }
    for (const r of career.paidResources) {
      if (!r.url) continue;
      if (list.some((x) => x.url === r.url)) continue;
      list.push({
        title: r.title,
        url: r.url,
        platform: new URL(r.url).hostname.replace('www.', ''),
        cost: 'paid',
        careerId: career.id,
        careerTitle: career.title,
        careerEmoji: career.emoji,
        type: 'course',
      });
    }
  }

  return list;
}

const ALL_RESOURCES = buildResourceList();

interface TabFilter {
  id: string;
  label: string;
}

const TABS: TabFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'free', label: 'Free' },
  { id: 'paid', label: 'Paid' },
  { id: 'course', label: 'Courses' },
  { id: 'book', label: 'Books' },
  { id: 'practice', label: 'Practice' },
  { id: 'video', label: 'Videos' },
];

@Component({
  selector: 'app-resources',
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
            eyebrow="Learning resources"
            title="Find the right resource."
            description="Free and paid resources across every tech career path. Filter by cost, type, or career."
          >
            <ns-button routerLink="/careers" variant="secondary"
              >← Browse career paths</ns-button
            >
          </ns-page-header>

          <!-- Tab filter -->
          <div class="mt-4 overflow-x-auto pb-1">
            <ns-tabs
              [tabs]="tabItems"
              [activeId]="activeTab()"
              (activeIdChange)="setActiveTab($event)"
            />
          </div>

          <!-- Career filter -->
          <div class="mt-4 flex flex-wrap items-center gap-3">
            <label
              for="career-filter"
              class="text-sm font-semibold text-ns-text"
              >Career:</label
            >
            <select
              id="career-filter"
              class="rounded-ns border border-ns-border bg-ns-card px-3 py-1.5 text-sm text-ns-text focus:outline-none focus:ring-1 focus:ring-ns-primary"
              [value]="activeCareer()"
              (change)="setActiveCareer($any($event.target).value)"
            >
              <option value="all">All careers</option>
              @for (career of careerOptions; track career.id) {
                <option [value]="career.id">
                  {{ career.emoji }} {{ career.title }}
                </option>
              }
            </select>
          </div>

          <p class="mt-5 text-sm text-ns-muted">
            Showing {{ pageStart() }}-{{ pageEnd() }} of
            {{ filtered().length }}
            {{ filtered().length === 1 ? 'resource' : 'resources' }}
          </p>

          @if (filtered().length === 0) {
            <div class="py-20 text-center">
              <p class="text-ns-muted">No resources match this filter.</p>
            </div>
          }

          <div
            class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            @for (resource of paginatedResources(); track resource.url) {
              <ns-card [interactive]="true">
                <div class="flex items-start justify-between gap-2">
                  <span
                    class="rounded-full border border-ns-border px-2 py-0.5 text-xs font-semibold text-ns-muted"
                  >
                    {{ resource.careerEmoji }} {{ resource.careerTitle }}
                  </span>
                  <ns-badge [variant]="costVariant(resource.cost)">{{
                    costLabel(resource.cost)
                  }}</ns-badge>
                </div>

                <h3 class="mb-1 mt-3 text-sm font-bold leading-5 text-ns-text">
                  {{ resource.title }}
                </h3>
                <p class="m-0 text-xs text-ns-muted">{{ resource.platform }}</p>

                <div class="mt-3 flex items-center gap-2">
                  <span
                    class="rounded-full border border-ns-border px-2 py-0.5 text-xs font-semibold text-ns-muted"
                    >{{ typeLabel(resource.type) }}</span
                  >
                </div>

                <button
                  type="button"
                  (click)="openResource(resource)"
                  class="mt-4 inline-flex text-sm font-semibold text-ns-primary no-underline transition hover:underline"
                >
                  Start learning →
                </button>
              </ns-card>
            }
          </div>

          @if (totalPages() > 1) {
            <nav
              class="mt-8 flex flex-col items-center justify-between gap-3 border-t border-ns-border pt-5 sm:flex-row"
              aria-label="Resource pagination"
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
        </div>
      </div>
    </ns-app-shell>
    <ns-scroll-indicator />
  `,
})
export class ResourcesComponent implements OnInit {
  protected readonly auth = inject(AuthService);
  private readonly externalLink = inject(NsExternalLinkService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Learning resources — NextSkill');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Curated free and paid learning resources across 26 tech career paths. Filter by career, type, or cost.',
    });
  }
  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Resources', routerLink: '/resources' },
  ];

  readonly tabItems: NsTabItem[] = TABS.map((t) => ({
    id: t.id,
    label: t.label,
  }));
  readonly pageSize = 12;
  readonly activeTab = signal<string>('all');
  readonly activeCareer = signal<string>('all');
  readonly currentPage = signal<number>(1);

  readonly careerOptions = CAREER_PATHS.map((c) => ({
    id: c.id,
    title: c.title,
    emoji: c.emoji,
  }));

  readonly filtered = computed(() => {
    const tab = this.activeTab();
    const career = this.activeCareer();

    return ALL_RESOURCES.filter((r) => {
      const matchesCareer = career === 'all' || r.careerId === career;
      const matchesTab =
        tab === 'all' ||
        (tab === 'free' && (r.cost === 'free' || r.cost === 'freemium')) ||
        (tab === 'paid' && r.cost === 'paid') ||
        r.type === tab;
      return matchesCareer && matchesTab;
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize)),
  );

  readonly currentPageSafe = computed(() =>
    Math.min(this.currentPage(), this.totalPages()),
  );

  readonly paginatedResources = computed(() => {
    const start = (this.currentPageSafe() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  readonly pageStart = computed(() =>
    this.filtered().length === 0
      ? 0
      : (this.currentPageSafe() - 1) * this.pageSize + 1,
  );

  readonly pageEnd = computed(() =>
    Math.min(this.currentPageSafe() * this.pageSize, this.filtered().length),
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

  setActiveCareer(careerId: string): void {
    this.activeCareer.set(careerId);
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

  openResource(resource: FlatResource): void {
    this.externalLink.openExternalLink({
      url: resource.url,
      title: resource.title,
      platform: resource.platform,
      careerTitle: resource.careerTitle,
      cost: resource.cost,
      context: 'resources',
    });
  }

  costVariant(cost: string): 'success' | 'warning' | 'accent' | 'neutral' {
    if (cost === 'free') return 'success';
    if (cost === 'freemium') return 'warning';
    if (cost === 'paid') return 'accent';
    return 'neutral';
  }

  costLabel(cost: string): string {
    if (cost === 'free') return 'Free';
    if (cost === 'freemium') return 'Freemium';
    if (cost === 'paid') return 'Paid';
    return cost;
  }

  typeLabel(type: string): string {
    const labels: Record<string, string> = {
      course: 'Course',
      video: 'Video',
      book: 'Book',
      practice: 'Practice',
      community: 'Community',
      tool: 'Tool',
      free: 'Resource',
      paid: 'Resource',
    };
    return labels[type] ?? type;
  }
}
