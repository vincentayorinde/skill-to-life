import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import {
  NsAppShellComponent,
  NsAppShellLink,
  NsButtonComponent,
  NsCardComponent,
  NsPageHeaderComponent,
} from 'ui';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    NsAppShellComponent,
    NsButtonComponent,
    NsCardComponent,
    NsPageHeaderComponent,
  ],
  template: `
    <ns-app-shell brand="NextSkill" [links]="shellLinks">
      <div class="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <ns-page-header
            eyebrow="About"
            title="About NextSkill."
            description="Free, open-source career discovery for people figuring out their path in tech."
          >
          </ns-page-header>

          <div class="mt-10 space-y-6">
            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                What is NextSkill?
              </h2>
              <div class="mt-4 space-y-4 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  NextSkill is a free, open-source career assessment platform
                  for anyone trying to figure out their path in tech.
                </p>
                <p class="m-0">
                  We built it because too many people are told to "just learn to
                  code" without any guidance on which path actually fits how
                  they think and work. Frontend, backend, data science,
                  cybersecurity, cloud, AI — each path suits a different kind of
                  person.
                </p>
                <p class="m-0">
                  The assessment takes about 3 minutes. The results are honest.
                  The resources are free.
                </p>
                <p class="m-0">
                  No paywalls. No upsells. No confusing roadmaps. Just a clearer
                  first step.
                </p>
              </div>
              <div class="mt-6">
                <ns-button routerLink="/assessment"
                  >Take the assessment</ns-button
                >
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Open source</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                NextSkill is fully open source under the MIT licence. The
                scoring engine, career data, and assessment questions are all
                public and auditable. Contributions, feedback, and ideas are
                welcome.
              </p>
              <div class="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://github.com/vincentayorinde/nextskill"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center gap-2 rounded-ns border border-ns-border bg-ns-canvasSubtle px-4 py-2 text-sm font-semibold text-ns-text no-underline transition hover:border-ns-primary hover:text-ns-primary"
                >
                  View on GitHub →
                </a>
                <a
                  href="https://github.com/vincentayorinde/nextskill/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center gap-2 rounded-ns border border-ns-border bg-ns-canvasSubtle px-4 py-2 text-sm font-semibold text-ns-text no-underline transition hover:border-ns-primary hover:text-ns-primary"
                >
                  Contributing guide →
                </a>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">What you get</h2>
              <ul class="mt-4 space-y-3 text-sm leading-6 text-ns-muted">
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  A 10-question assessment that matches you to one of 26 tech
                  career paths
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  Honest salary ranges for every career — UK focused, with
                  global context
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  Full structured learning roadmaps with real resource links
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  Independent paths — freelance, consulting, and product ideas
                  for each career
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  Shareable result cards so you can show others what you are
                  working towards
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  Google sign-in to save and revisit your results over time
                </li>
              </ul>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Built by</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                NextSkill was built by
                <a
                  href="https://github.com/vincentayorinde"
                  target="_blank"
                  rel="noreferrer"
                  class="font-semibold text-ns-primary no-underline hover:underline"
                  >Vincent Ayorinde</a
                >. If you have feedback, ideas, or want to contribute, open an
                issue or a pull request on GitHub.
              </p>
              <p class="mt-3 text-sm leading-6 text-ns-muted">
                For data requests or privacy enquiries, email
                <a
                  href="mailto:mrvincentayorinde@gmail.com"
                  class="font-semibold text-ns-primary no-underline hover:underline"
                  >mrvincentayorinde&#64;gmail.com</a
                >.
              </p>
            </ns-card>
          </div>
        </div>
      </div>
    </ns-app-shell>
  `,
})
export class AboutComponent implements OnInit {
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

  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('About — NextSkill');
    this.metaService.updateTag({
      name: 'description',
      content:
        'NextSkill is a free, open-source career assessment platform for anyone figuring out their path in tech. No paywalls, no upsells — just honest guidance.',
    });
  }
}
