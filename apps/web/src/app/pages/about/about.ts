import { AsyncPipe } from '@angular/common';
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
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NsAppShellComponent,
    NsButtonComponent,
    NsCardComponent,
    NsPageHeaderComponent,
  ],
  template: `
    <ns-app-shell
      brand="Skill to Life"
      [links]="shellLinks"
      [authUser]="auth.currentUser$ | async"
      [devMode]="auth.isDev"
      (signIn)="auth.loginWithGoogle()"
      (devLogin)="auth.devLogin()"
      (signOut)="auth.logout()"
    >
      <div class="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <ns-page-header
            eyebrow="About"
            title="About Skill to Life."
            description="Free, open-source career discovery for people figuring out their path in tech."
          >
          </ns-page-header>

          <div class="mt-10 space-y-6">
            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                What is Skill to Life?
              </h2>
              <div class="mt-4 space-y-4 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  Skill to Life is a free, open-source career assessment platform
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
                Skill to Life is fully open source under the MIT licence. The
                scoring engine, career data, and assessment questions are all
                public and auditable. Contributions, feedback, and ideas are
                welcome.
              </p>
              <div class="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://github.com/vincentayorinde/skill-to-life"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center gap-2 rounded-ns border border-ns-border bg-ns-canvasSubtle px-4 py-2 text-sm font-semibold text-ns-text no-underline transition hover:border-ns-primary hover:text-ns-primary"
                >
                  View on GitHub →
                </a>
                <a
                  href="https://github.com/vincentayorinde/skill-to-life/blob/main/CONTRIBUTING.md"
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
                  A 30-question assessment that matches you to one of 26 tech
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
                Skill to Life was built by
                <a
                  href="https://vincenttechblog.com"
                  target="_blank"
                  rel="noreferrer"
                  class="font-semibold text-ns-primary no-underline hover:underline"
                  >Vincent Olagbemide</a
                >. If you have feedback, ideas, or want to contribute, open an
                issue or a pull request on GitHub.
              </p>
              <p class="mt-3 text-sm leading-6 text-ns-muted">
                For data requests or privacy enquiries, email
                <a
                  href="mailto:skilltolife.contact@gmail.com"
                  class="font-semibold text-ns-primary no-underline hover:underline"
                  >skilltolife.contact&#64;gmail.com</a
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
  protected readonly auth = inject(AuthService);
  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Salaries', routerLink: '/salaries' },
    { label: 'Resources', routerLink: '/resources' },
  ];

  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('About — Skill to Life');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Skill to Life helps you discover your best-fit tech career path, identify skill gaps, follow practical roadmaps, and turn learning into real career outcomes.',
    });
  }
}
