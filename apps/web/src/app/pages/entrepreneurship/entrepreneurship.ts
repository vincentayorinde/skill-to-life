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
} from 'ui';
import {
  CAREER_PATHS,
  CAREER_ENTREPRENEURSHIP_DATA,
  getEasiestPath,
} from 'types';
import { AuthService } from '../../core/auth/auth.service';

interface EntrepCard {
  careerId: string;
  title: string;
  emoji: string;
  pathCount: number;
  easiestTitle: string;
  easiestTime: string;
  easiestDifficulty: string;
  hasLowBarrier: boolean;
  hasPassive: boolean;
  hasFreelance: boolean;
  hasConsulting: boolean;
}

function buildEntrepCards(): EntrepCard[] {
  return CAREER_PATHS.map((career) => {
    const data = CAREER_ENTREPRENEURSHIP_DATA.find(
      (e) => e.careerId === career.id,
    );
    const easiest = getEasiestPath(career.id);
    const paths = data?.paths ?? [];
    const titles = paths.map((p) => p.title.toLowerCase());

    return {
      careerId: career.id,
      title: career.title,
      emoji: career.emoji,
      pathCount: paths.length,
      easiestTitle: easiest?.title ?? '—',
      easiestTime: easiest?.timeToFirstIncome ?? '—',
      easiestDifficulty: easiest?.difficulty ?? 'medium',
      hasLowBarrier: paths.some((p) => p.difficulty === 'low'),
      hasPassive: titles.some(
        (t) =>
          t.includes('template') ||
          t.includes('course') ||
          t.includes('passive'),
      ),
      hasFreelance: titles.some(
        (t) => t.includes('freelance') || t.includes('contract'),
      ),
      hasConsulting: titles.some(
        (t) => t.includes('consult') || t.includes('audit'),
      ),
    };
  });
}

const ALL_CARDS = buildEntrepCards();

interface TabFilter {
  id: string;
  label: string;
}

const TABS: TabFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'low-barrier', label: 'Low barrier' },
  { id: 'passive', label: 'Passive income' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'consulting', label: 'Consulting' },
];

@Component({
  selector: 'app-entrepreneurship',
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
            eyebrow="Go independent"
            title="Build your own with tech."
            description="How people freelance, consult, and build products with each tech skill. Practical paths with honest timelines."
          >
            <ns-button routerLink="/careers" variant="secondary"
              >← Browse career paths</ns-button
            >
          </ns-page-header>

          <!-- Filter -->
          <div class="mt-4 overflow-x-auto pb-1">
            <ns-tabs
              [tabs]="tabItems"
              [activeId]="activeTab()"
              (activeIdChange)="activeTab.set($event)"
            />
          </div>

          <p class="mt-5 text-sm text-ns-muted">
            {{ filtered().length }} careers
          </p>

          <div
            class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            @for (card of filtered(); track card.careerId) {
              <ns-card [interactive]="true">
                <div class="flex items-start justify-between gap-2">
                  <span class="text-3xl leading-none" aria-hidden="true">{{
                    card.emoji
                  }}</span>
                  <div class="flex flex-wrap gap-1">
                    @if (card.hasLowBarrier) {
                      <ns-badge variant="success">Low barrier</ns-badge>
                    }
                    @if (card.hasPassive) {
                      <ns-badge variant="warning">Passive</ns-badge>
                    }
                  </div>
                </div>
                <h3 class="mb-1 mt-3 text-sm font-bold text-ns-text">
                  {{ card.title }}
                </h3>
                <p class="m-0 text-xs text-ns-muted">
                  {{ card.pathCount }}
                  {{ card.pathCount === 1 ? 'path' : 'paths' }}
                </p>

                @if (card.easiestTitle !== '—') {
                  <div
                    class="mt-3 rounded-ns border border-ns-border bg-ns-canvasSubtle p-2.5"
                  >
                    <p class="m-0 text-xs font-semibold text-ns-text">
                      {{ card.easiestTitle }}
                    </p>
                    <p class="m-0 mt-0.5 text-[10px] text-ns-muted">
                      ⏱ {{ card.easiestTime }} to first income
                    </p>
                  </div>
                }

                <a
                  [routerLink]="['/careers', card.careerId]"
                  class="mt-4 inline-flex text-sm font-semibold text-ns-primary no-underline transition hover:underline"
                  >Explore paths →</a
                >
              </ns-card>
            }
          </div>
        </div>
      </div>
    </ns-app-shell>
    <ns-scroll-indicator />
  `,
})
export class EntrepreneurshipComponent implements OnInit {
  protected readonly auth = inject(AuthService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Go independent with tech — NextSkill');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Freelance, consulting, and product paths for every tech career. Honest difficulty ratings, real income ranges, and practical getting-started steps.',
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
  readonly activeTab = signal<string>('all');

  readonly filtered = computed(() => {
    const tab = this.activeTab();
    if (tab === 'all') return ALL_CARDS;
    if (tab === 'low-barrier') return ALL_CARDS.filter((c) => c.hasLowBarrier);
    if (tab === 'passive') return ALL_CARDS.filter((c) => c.hasPassive);
    if (tab === 'freelance') return ALL_CARDS.filter((c) => c.hasFreelance);
    if (tab === 'consulting') return ALL_CARDS.filter((c) => c.hasConsulting);
    return ALL_CARDS;
  });
}
