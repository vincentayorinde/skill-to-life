import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import type {
  CareerPath,
  CareerRoadmap,
  CareerSalaryData,
  CareerEntrepreneurshipData,
  RegionalSalary,
  SalaryRegion,
} from 'types';
import {
  getCareerBySlug,
  getRoadmapByCareerId,
  getSalaryDataByCareerId,
  getEntrepreneurshipDataByCareerId,
  formatSalaryRange,
  CAREER_SALARY_REGIONS,
} from 'types';

const REGION_STORAGE_KEY = 'ns_salary_region';
const VALID_REGIONS: SalaryRegion[] = ['uk', 'us', 'nigeria', 'europe', 'global'];

function readSavedRegion(): SalaryRegion {
  try {
    const v = globalThis.localStorage?.getItem(REGION_STORAGE_KEY);
    return VALID_REGIONS.includes(v as SalaryRegion) ? (v as SalaryRegion) : 'uk';
  } catch {
    return 'uk';
  }
}

@Component({
  selector: 'app-career-detail',
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
        <div class="mx-auto max-w-5xl">
          @if (!career) {
            <div class="py-24 text-center">
              <p class="text-5xl" aria-hidden="true">🔍</p>
              <h1 class="mt-4 text-3xl font-bold text-ns-text">
                Career not found.
              </h1>
              <p class="mt-3 text-ns-muted">
                That path doesn't exist yet — check back soon.
              </p>
              <a
                class="mt-6 inline-flex text-sm font-semibold text-ns-primary no-underline hover:underline"
                routerLink="/careers"
                >← Back to all career paths</a
              >
            </div>
          }

          @if (career) {
            <!-- Breadcrumb -->
            <nav
              class="mb-6 flex items-center gap-2 text-sm text-ns-muted"
              aria-label="Breadcrumb"
            >
              <a class="no-underline hover:text-ns-text" routerLink="/">Home</a>
              <span aria-hidden="true">/</span>
              <a class="no-underline hover:text-ns-text" routerLink="/careers"
                >Career paths</a
              >
              <span aria-hidden="true">/</span>
              <span class="font-semibold text-ns-text">{{ career.title }}</span>
            </nav>

            <!-- Page header -->
            <ns-page-header
              [title]="career.title"
              [description]="career.summary"
            >
              <ns-badge [variant]="difficultyVariant(career.difficultyLevel)">
                {{ career.difficultyLevel }}
              </ns-badge>
              @if (career.remoteFriendly) {
                <ns-badge variant="primary">Remote friendly</ns-badge>
              }
              @if (career.beginnerFriendly) {
                <ns-badge variant="success">Beginner friendly</ns-badge>
              }
            </ns-page-header>

            <div class="mt-8 grid gap-6 lg:grid-cols-3">
              <!-- Main content -->
              <div class="space-y-6 lg:col-span-2">
                <!-- About -->
                <ns-card>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    About this path
                  </h2>
                  <p class="mt-3 text-sm leading-7 text-ns-muted">
                    {{ career.description }}
                  </p>
                  <div class="mt-5">
                    <p class="text-sm font-semibold text-ns-text">
                      Who it fits
                    </p>
                    <p class="mt-2 text-sm leading-6 text-ns-muted">
                      {{ career.whoItFits }}
                    </p>
                  </div>
                  <p
                    class="mt-4 rounded-ns border border-ns-border bg-ns-canvasSubtle p-3 text-sm italic leading-6 text-ns-muted"
                  >
                    {{ career.learningStyleFit }}
                  </p>
                </ns-card>

                <!-- Skills & tools -->
                <ns-card>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Skills you will build
                  </h2>
                  <div class="mt-4 flex flex-wrap gap-2">
                    @for (skill of career.skills; track skill) {
                      <span
                        class="rounded-full border border-ns-border bg-ns-primarySoft px-3 py-1 text-xs font-semibold text-ns-primary"
                        >{{ skill }}</span
                      >
                    }
                  </div>
                  <h3 class="mb-3 mt-5 text-base font-semibold text-ns-text">
                    Tools you will use
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    @for (tool of career.tools; track tool) {
                      <span
                        class="rounded-full border border-ns-border px-3 py-1 text-xs font-semibold text-ns-muted"
                        >{{ tool }}</span
                      >
                    }
                  </div>
                </ns-card>

                <!-- Starter projects -->
                <ns-card>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Starter projects
                  </h2>
                  <p class="mb-4 mt-2 text-sm text-ns-muted">
                    Good projects to practise and add to a portfolio.
                  </p>
                  <ul class="space-y-2 pl-5 text-sm leading-6 text-ns-muted">
                    @for (project of career.starterProjects; track project) {
                      <li>{{ project }}</li>
                    }
                  </ul>
                </ns-card>

                <!-- Full Roadmap -->
                @if (roadmap) {
                  <ns-card>
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h2 class="m-0 text-xl font-bold text-ns-text">
                          Your learning roadmap
                        </h2>
                        <p class="mt-1 text-sm text-ns-muted">
                          Estimated time:
                          <span class="font-semibold text-ns-text">{{
                            roadmap.totalEstimatedTime
                          }}</span>
                        </p>
                      </div>
                    </div>

                    <div class="mt-6 space-y-4">
                      @for (step of roadmap.steps; track step.step) {
                        <div
                          class="rounded-ns border border-ns-border p-4 transition hover:border-ns-primary/40"
                        >
                          <!-- Step header -->
                          <div class="flex items-start gap-3">
                            <span
                              class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-black text-[#07111f]"
                              [class]="stepBadgeClass(step.type)"
                            >
                              {{ step.step }}
                            </span>
                            <div class="min-w-0 flex-1">
                              <div class="flex flex-wrap items-center gap-2">
                                <h3 class="m-0 text-sm font-bold text-ns-text">
                                  {{ step.title }}
                                </h3>
                                <span
                                  class="rounded-full border px-2 py-0.5 text-xs font-semibold"
                                  [class]="stepPillClass(step.type)"
                                >
                                  {{ step.estimatedTime }}
                                </span>
                              </div>
                              <p class="mt-2 text-sm leading-6 text-ns-muted">
                                {{ step.description }}
                              </p>

                              <!-- Step resources -->
                              @if (step.resources.length > 0) {
                                <div class="mt-3 flex flex-wrap gap-2">
                                  @for (
                                    res of step.resources;
                                    track res.title
                                  ) {
                                    <a
                                      [href]="res.url"
                                      target="_blank"
                                      rel="noreferrer"
                                      class="inline-flex items-center gap-1.5 rounded-full border border-ns-border bg-ns-canvasSubtle px-3 py-1 text-xs font-semibold text-ns-primary no-underline transition hover:bg-ns-primarySoft"
                                    >
                                      {{ res.title }}
                                      <span
                                        class="rounded-full px-1.5 py-0.5 text-[10px]"
                                        [class]="
                                          res.type === 'paid'
                                            ? 'bg-amber-500/20 text-amber-400'
                                            : 'bg-emerald-500/20 text-emerald-400'
                                        "
                                      >
                                        {{
                                          res.type === 'paid' ? 'Paid' : 'Free'
                                        }}
                                      </span>
                                    </a>
                                  }
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </ns-card>
                } @else {
                  <!-- Fallback roadmap preview -->
                  <ns-card>
                    <h2 class="m-0 text-xl font-bold text-ns-text">
                      Roadmap preview
                    </h2>
                    <p class="mb-5 mt-2 text-sm text-ns-muted">
                      A simple step-by-step path to getting started.
                    </p>
                    <ol class="space-y-3 pl-5 text-sm leading-6 text-ns-muted">
                      @for (
                        step of career.roadmapPreview;
                        track step;
                        let i = $index
                      ) {
                        <li>
                          <span class="font-semibold text-ns-text"
                            >Step {{ i + 1 }}.</span
                          >
                          {{ step }}
                        </li>
                      }
                    </ol>
                  </ns-card>
                }

                <!-- Entrepreneurship — rich version -->
                @if (entrepreneurshipData) {
                  <ns-card>
                    <h2 class="m-0 text-xl font-bold text-ns-text">
                      Going independent
                    </h2>
                    <p class="mt-2 text-sm leading-6 text-ns-muted">
                      {{ entrepreneurshipData.summary }}
                    </p>

                    <div class="mt-5 space-y-4">
                      @for (
                        path of entrepreneurshipData.paths;
                        track path.title
                      ) {
                        <div
                          class="rounded-ns border border-ns-border bg-ns-canvasSubtle p-4"
                        >
                          <!-- Path header -->
                          <div class="flex flex-wrap items-start gap-2">
                            <h3
                              class="m-0 flex-1 text-sm font-bold text-ns-text"
                            >
                              {{ path.title }}
                            </h3>
                            <span
                              class="rounded-full px-2 py-0.5 text-xs font-semibold"
                              [class]="difficultyBadgeClass(path.difficulty)"
                              >{{ difficultyLabel(path.difficulty) }}</span
                            >
                          </div>
                          <div class="mt-1.5 flex flex-wrap gap-2">
                            <span
                              class="rounded-full border border-ns-border px-2 py-0.5 text-xs text-ns-muted"
                              >⏱ {{ path.timeToFirstIncome }} to first
                              income</span
                            >
                            <span
                              class="rounded-full border border-ns-border px-2 py-0.5 text-xs font-semibold text-ns-text"
                              >{{ path.potentialIncome }}</span
                            >
                          </div>
                          <p class="mt-2 text-sm leading-6 text-ns-muted">
                            {{ path.description }}
                          </p>
                          @if (path.examples.length > 0) {
                            <p
                              class="mb-1 mt-3 text-xs font-semibold text-ns-text"
                            >
                              Examples
                            </p>
                            <ul
                              class="space-y-0.5 pl-4 text-xs leading-5 text-ns-muted"
                            >
                              @for (ex of path.examples; track ex) {
                                <li>{{ ex }}</li>
                              }
                            </ul>
                          }
                          @if (path.gettingStarted.length > 0) {
                            <p
                              class="mb-1 mt-3 text-xs font-semibold text-ns-text"
                            >
                              Getting started
                            </p>
                            <ol
                              class="space-y-0.5 pl-4 text-xs leading-5 text-ns-muted"
                            >
                              @for (
                                step of path.gettingStarted;
                                track step;
                                let i = $index
                              ) {
                                <li>{{ i + 1 }}. {{ step }}</li>
                              }
                            </ol>
                          }
                        </div>
                      }
                    </div>

                    <!-- Communities & tools -->
                    @if (
                      entrepreneurshipData.communities.length > 0 ||
                      entrepreneurshipData.tools.length > 0
                    ) {
                      <div class="mt-5">
                        <p class="text-xs font-semibold text-ns-text">
                          Communities &amp; tools
                        </p>
                        <div class="mt-2 flex flex-wrap gap-1.5">
                          @for (
                            c of entrepreneurshipData.communities;
                            track c
                          ) {
                            <span
                              class="rounded-full border border-ns-border px-2 py-0.5 text-xs text-ns-muted"
                              >{{ c }}</span
                            >
                          }
                          @for (t of entrepreneurshipData.tools; track t) {
                            <span
                              class="rounded-full border border-ns-border bg-ns-primarySoft px-2 py-0.5 text-xs text-ns-primary"
                              >{{ t }}</span
                            >
                          }
                        </div>
                      </div>
                    }
                  </ns-card>
                } @else {
                  <!-- Fallback -->
                  <ns-card>
                    <h2 class="m-0 text-xl font-bold text-ns-text">
                      Entrepreneurship ideas
                    </h2>
                    <p class="mb-4 mt-2 text-sm text-ns-muted">
                      Ways to freelance, consult, or build a product with this
                      skill.
                    </p>
                    <ul class="space-y-2 pl-5 text-sm leading-6 text-ns-muted">
                      @for (idea of career.entrepreneurshipIdeas; track idea) {
                        <li>{{ idea }}</li>
                      }
                    </ul>
                  </ns-card>
                }
              </div>

              <!-- Sidebar -->
              <div class="space-y-6">
                <!-- Salary — rich version -->
                @if (salaryData) {
                  <ns-card>
                    <h2 class="m-0 text-xl font-bold text-ns-text">
                      Earning potential
                    </h2>

                    <!-- Region filter -->
                    <div class="mt-3">
                      <ns-region-filter
                        [active]="activeRegion()"
                        (regionChange)="setRegion($event)"
                      />
                    </div>

                    @if (regionalSalary) {
                      <p class="mt-3 text-sm leading-6 text-ns-muted">
                        {{ regionalSalary.regionalNote }}
                      </p>

                      <!-- Salary bands from regional data -->
                      <div class="mt-4 space-y-3">
                        @for (range of regionalSalary.ranges; track range.level) {
                          <div>
                            <div class="mb-1 flex items-center justify-between">
                              <span
                                class="rounded-ns px-2 py-0.5 text-xs font-semibold capitalize"
                                [class]="levelBadgeClass(range.level)"
                                >{{ range.level }}</span
                              >
                              <span class="text-xs font-semibold text-ns-text">{{
                                salaryRangeLabel(
                                  range.min,
                                  range.max,
                                  regionalSalary.currencySymbol
                                )
                              }}</span>
                            </div>
                            <div
                              class="h-1.5 w-full overflow-hidden rounded-ns bg-ns-border"
                            >
                              <div
                                class="h-full rounded-ns transition-all"
                                [class]="levelBarClass(range.level)"
                                [style.width.%]="regionalSalaryBarWidth(range.max)"
                              ></div>
                            </div>
                          </div>
                        }
                      </div>

                      <!-- Freelance rates -->
                      @if (regionalSalary.freelanceRate) {
                        <div class="mt-4">
                          <p class="mb-2 text-xs font-semibold text-ns-text">
                            Freelance rates
                          </p>
                          <div class="grid grid-cols-2 gap-2">
                            <div
                              class="rounded-ns-md border border-ns-border bg-ns-canvasSubtle p-2 text-center"
                            >
                              <p class="m-0 text-[10px] text-ns-muted">Day rate</p>
                              <p class="m-0 text-xs font-bold text-ns-text">
                                {{
                                  salaryRangeLabel(
                                    regionalSalary.freelanceRate.daily.min,
                                    regionalSalary.freelanceRate.daily.max,
                                    regionalSalary.currencySymbol
                                  )
                                }}
                              </p>
                            </div>
                            <div
                              class="rounded-ns-md border border-ns-border bg-ns-canvasSubtle p-2 text-center"
                            >
                              <p class="m-0 text-[10px] text-ns-muted">Hourly rate</p>
                              <p class="m-0 text-xs font-bold text-ns-text">
                                {{
                                  salaryRangeLabel(
                                    regionalSalary.freelanceRate.hourly.min,
                                    regionalSalary.freelanceRate.hourly.max,
                                    regionalSalary.currencySymbol
                                  )
                                }}
                              </p>
                            </div>
                          </div>
                        </div>
                      }
                    } @else {
                      <!-- Fallback to UK data -->
                      <p class="mt-3 text-sm leading-6 text-ns-muted">
                        {{ salaryData.summary }}
                      </p>
                      <div class="mt-4 space-y-3">
                        @for (range of salaryData.ranges; track range.level) {
                          <div>
                            <div class="mb-1 flex items-center justify-between">
                              <span
                                class="rounded-ns px-2 py-0.5 text-xs font-semibold capitalize"
                                [class]="levelBadgeClass(range.level)"
                                >{{ range.level }}</span
                              >
                              <span class="text-xs font-semibold text-ns-text">{{
                                salaryRangeLabel(range.min, range.max, range.currency)
                              }}</span>
                            </div>
                            <div
                              class="h-1.5 w-full overflow-hidden rounded-ns bg-ns-border"
                            >
                              <div
                                class="h-full rounded-ns transition-all"
                                [class]="levelBarClass(range.level)"
                                [style.width.%]="salaryBarWidth(range.max)"
                              ></div>
                            </div>
                          </div>
                        }
                      </div>
                    }

                    <!-- Factors -->
                    <div class="mt-4">
                      <p class="mb-2 text-xs font-semibold text-ns-text">
                        What affects salary
                      </p>
                      <ul class="space-y-1.5 pl-4 text-xs leading-5 text-ns-muted">
                        @for (factor of salaryData.factors; track factor) {
                          <li>{{ factor }}</li>
                        }
                      </ul>
                    </div>

                    <!-- Sources -->
                    <p class="mt-3 text-[10px] text-ns-muted">
                      Based on: {{ salaryData.sources.join(' · ') }}. All figures approximate.
                    </p>
                  </ns-card>
                } @else {
                  <!-- Fallback -->
                  <ns-card>
                    <h2 class="m-0 text-xl font-bold text-ns-text">
                      Salary insight
                    </h2>
                    <p class="mb-4 mt-2 text-xs text-ns-muted">
                      Estimated annual ranges. Varies widely by location and
                      experience.
                    </p>
                    <p class="text-sm leading-6 text-ns-muted">
                      {{ career.salaryInsight }}
                    </p>
                  </ns-card>
                }

                <!-- Free resources -->
                <ns-card>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Free resources to get started
                  </h2>
                  <p class="mb-4 mt-2 text-sm text-ns-muted">
                    Recommended starting points — no payment required.
                  </p>
                  @if (career.freeResources.length === 0) {
                    <p class="text-sm text-ns-muted">Coming soon.</p>
                  }
                  <ul class="space-y-3">
                    @for (
                      resource of career.freeResources;
                      track resource.title
                    ) {
                      <li
                        class="rounded-ns border border-ns-border bg-ns-canvasSubtle p-3"
                      >
                        @if (resource.url) {
                          <a
                            class="text-sm font-semibold text-ns-primary no-underline hover:underline"
                            [href]="resource.url"
                            target="_blank"
                            rel="noreferrer"
                            >{{ resource.title }} →</a
                          >
                        } @else {
                          <p class="m-0 text-sm font-semibold text-ns-text">
                            {{ resource.title }}
                          </p>
                        }
                      </li>
                    }
                  </ul>
                </ns-card>

                <!-- Paid resources -->
                <ns-card>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Paid courses worth considering
                  </h2>
                  <p class="mb-4 mt-2 text-sm text-ns-muted">
                    These are not required — free resources above can get you
                    far.
                  </p>
                  @if (career.paidResources.length === 0) {
                    <p class="text-sm text-ns-muted">Coming soon.</p>
                  }
                  <ul class="space-y-3">
                    @for (
                      resource of career.paidResources;
                      track resource.title
                    ) {
                      <li
                        class="rounded-ns border border-ns-border bg-ns-canvasSubtle p-3"
                      >
                        @if (resource.url) {
                          <a
                            class="text-sm font-semibold text-ns-primary no-underline hover:underline"
                            [href]="resource.url"
                            target="_blank"
                            rel="noreferrer"
                            >{{ resource.title }} →</a
                          >
                        } @else {
                          <p class="m-0 text-sm font-semibold text-ns-text">
                            {{ resource.title }}
                          </p>
                        }
                      </li>
                    }
                  </ul>
                </ns-card>

                <!-- All resources link -->
                <ns-card>
                  <p class="m-0 text-sm font-semibold text-ns-primary">
                    Browse all resources
                  </p>
                  <h3 class="m-0 mt-2 text-lg font-bold text-ns-text">
                    Resource directory.
                  </h3>
                  <p class="mt-2 text-sm leading-6 text-ns-muted">
                    Free and paid resources across every tech career path —
                    searchable and filterable.
                  </p>
                  <ns-button class="mt-4 block" routerLink="/resources">
                    Browse resources →
                  </ns-button>
                </ns-card>

                <!-- Assessment CTA -->
                <ns-card>
                  <p class="m-0 text-sm font-semibold text-ns-primary">
                    Not sure this fits?
                  </p>
                  <h3 class="m-0 mt-2 text-lg font-bold text-ns-text">
                    Take the assessment.
                  </h3>
                  <p class="mt-2 text-sm leading-6 text-ns-muted">
                    Answer a few short questions and get your top matches — with
                    reasons why they fit you.
                  </p>
                  <ns-button
                    class="mt-4 block"
                    routerLink="/"
                    href="#assessment"
                  >
                    Start assessment
                  </ns-button>
                </ns-card>
              </div>
            </div>

            <div class="mt-10">
              <a
                class="text-sm font-semibold text-ns-primary no-underline hover:underline"
                routerLink="/careers"
                >← Back to all paths</a
              >
            </div>
          }
        </div>
      </div>
    </ns-app-shell>
    <ns-scroll-indicator />
  `,
})
export class CareerDetailComponent implements OnInit {
  career: CareerPath | undefined;
  roadmap: CareerRoadmap | undefined;
  salaryData: CareerSalaryData | undefined;
  entrepreneurshipData: CareerEntrepreneurshipData | undefined;

  readonly activeRegion = signal<SalaryRegion>(readSavedRegion());

  get regionalSalary(): RegionalSalary | undefined {
    if (!this.career) return undefined;
    const regions = CAREER_SALARY_REGIONS[this.career.id];
    return regions?.find((r) => r.region === this.activeRegion());
  }

  setRegion(region: SalaryRegion): void {
    this.activeRegion.set(region);
    try {
      globalThis.localStorage?.setItem(REGION_STORAGE_KEY, region);
    } catch {
      // localStorage unavailable
    }
  }

  regionalSalaryBarWidth(max: number): number {
    const scaledMaxes: Record<SalaryRegion, number> = {
      uk: 180000,
      us: 300000,
      nigeria: 50000000,
      europe: 220000,
      global: 280000,
    };
    const scale = scaledMaxes[this.activeRegion()] ?? 180000;
    return Math.min(Math.round((max / scale) * 100), 100);
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

  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.career = getCareerBySlug(slug);
    if (this.career) {
      this.titleService.setTitle(`${this.career.title} — NextSkill`);
      this.metaService.updateTag({
        name: 'description',
        content: this.career.summary,
      });
    }
    if (this.career) {
      this.roadmap = getRoadmapByCareerId(this.career.id);
      this.salaryData = getSalaryDataByCareerId(this.career.id);
      this.entrepreneurshipData = getEntrepreneurshipDataByCareerId(
        this.career.id,
      );
    }
  }

  salaryRangeLabel(min: number, max: number, currencyOrSymbol: string): string {
    const CODES = ['GBP', 'USD', 'EUR', 'NGN'];
    if (CODES.includes(currencyOrSymbol)) {
      return formatSalaryRange(min, max, currencyOrSymbol);
    }
    // currencyOrSymbol is already a symbol (£, $, €, ₦)
    const symbol = currencyOrSymbol;
    const fmt = (n: number): string => {
      if (n >= 1_000_000) return `${symbol}${(n / 1_000_000).toFixed(1)}M`;
      if (n >= 1_000) return `${symbol}${Math.round(n / 1_000)}k`;
      return `${symbol}${n}`;
    };
    return `${fmt(min)}–${fmt(max)}`;
  }

  salaryBarWidth(max: number): number {
    const SCALE_MAX = 180000;
    return Math.min(Math.round((max / SCALE_MAX) * 100), 100);
  }

  levelBadgeClass(level: string): string {
    const map: Record<string, string> = {
      junior: 'bg-ns-primarySoft text-ns-primary',
      mid: 'bg-ns-purpleSoft text-ns-purple',
      senior: 'bg-ns-successSoft text-ns-success',
      lead: 'bg-ns-warningSoft text-ns-warning',
    };
    return map[level] ?? 'bg-ns-canvasSubtle text-ns-muted';
  }

  levelBarClass(level: string): string {
    const map: Record<string, string> = {
      junior: 'bg-ns-primary',
      mid: 'bg-ns-purple',
      senior: 'bg-ns-success',
      lead: 'bg-ns-warning',
    };
    return map[level] ?? 'bg-ns-primary';
  }

  difficultyBadgeClass(difficulty: string): string {
    const map: Record<string, string> = {
      low: 'bg-emerald-500/20 text-emerald-400',
      medium: 'bg-amber-500/20 text-amber-400',
      high: 'bg-red-500/20 text-red-400',
    };
    return map[difficulty] ?? 'bg-white/10 text-ns-muted';
  }

  difficultyLabel(difficulty: string): string {
    const map: Record<string, string> = {
      low: 'Low barrier',
      medium: 'Medium effort',
      high: 'High effort',
    };
    return map[difficulty] ?? difficulty;
  }

  difficultyVariant(level: string): 'success' | 'warning' | 'accent' {
    if (level === 'beginner') return 'success';
    if (level === 'intermediate') return 'warning';
    return 'accent';
  }

  stepBadgeClass(type: string): string {
    const map: Record<string, string> = {
      foundation: 'bg-blue-400',
      core: 'bg-purple-400',
      practice: 'bg-emerald-400',
      advanced: 'bg-orange-400',
      'job-ready': 'bg-teal-400',
    };
    return map[type] ?? 'bg-ns-primary';
  }

  stepPillClass(type: string): string {
    const map: Record<string, string> = {
      foundation: 'border-blue-500/40 text-blue-400',
      core: 'border-purple-500/40 text-purple-400',
      practice: 'border-emerald-500/40 text-emerald-400',
      advanced: 'border-orange-500/40 text-orange-400',
      'job-ready': 'border-teal-500/40 text-teal-400',
    };
    return map[type] ?? 'border-ns-border text-ns-muted';
  }
}
