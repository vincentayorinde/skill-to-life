import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal, inject } from '@angular/core';
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

          <div class="mt-2 overflow-x-auto pb-1">
            <ns-tabs
              [tabs]="tabItems"
              [activeId]="activeTab()"
              (activeIdChange)="activeTab.set($event)"
            />
          </div>

          <p class="mt-5 text-sm text-ns-muted">
            {{ filtered().length }} path{{ filtered().length === 1 ? '' : 's' }}
          </p>

          <div
            class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            @for (career of filtered(); track career.slug) {
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
    { label: 'Resources', routerLink: '/resources' },
  ];

  readonly tabItems: NsTabItem[] = TABS.map((t) => ({
    id: t.id,
    label: t.label,
  }));
  readonly activeTab = signal<string>('all');

  readonly filtered = (): CareerPath[] => {
    const id = this.activeTab();
    const tab = TABS.find((t) => t.id === id);
    return tab?.category
      ? CAREER_PATHS.filter((c) => c.category === tab.category)
      : CAREER_PATHS;
  };

  difficultyVariant(level: string): 'success' | 'warning' | 'accent' {
    if (level === 'beginner') return 'success';
    if (level === 'intermediate') return 'warning';
    return 'accent';
  }
}
