import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { CAREER_PATHS, CAREER_ROADMAPS, FREE_CAREER_RESOURCES } from 'types';
import type { RoadmapResource, CareerResource } from 'types';

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
    NsAppShellComponent,
    NsBadgeComponent,
    NsButtonComponent,
    NsCardComponent,
    NsPageHeaderComponent,
    NsTabsComponent,
  ],
  template: `
    <ns-app-shell brand="NextSkill" [links]="shellLinks">
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
              (activeIdChange)="activeTab.set($event)"
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
              (change)="activeCareer.set($any($event.target).value)"
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
            @for (resource of filtered(); track resource.url) {
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

                <a
                  [href]="resource.url"
                  target="_blank"
                  rel="noreferrer"
                  class="mt-4 inline-flex text-sm font-semibold text-ns-primary no-underline transition hover:underline"
                  >Start learning →</a
                >
              </ns-card>
            }
          </div>
        </div>
      </div>
    </ns-app-shell>
  `,
})
export class ResourcesComponent {
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

  readonly tabItems: NsTabItem[] = TABS.map((t) => ({
    id: t.id,
    label: t.label,
  }));
  readonly activeTab = signal<string>('all');
  readonly activeCareer = signal<string>('all');

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
