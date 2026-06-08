import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import {
  NsAppShellComponent,
  NsAppShellLink,
  NsCardComponent,
  NsPageHeaderComponent,
} from 'ui';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [
    RouterLink,
    NsAppShellComponent,
    NsCardComponent,
    NsPageHeaderComponent,
  ],
  template: `
    <ns-app-shell brand="NextSkill" [links]="shellLinks">
      <div class="bg-ns-bg px-6 py-16 sm:py-20 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <ns-page-header
            eyebrow="Legal"
            title="Terms of use."
            description="Last updated: 2025. By using NextSkill you agree to these terms."
          >
          </ns-page-header>

          <div class="mt-10 space-y-6">
            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Free to use</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                NextSkill is free to use. There are no paywalls, premium tiers,
                or paid features. The assessment, career data, salary
                information, and learning resources are all free and will remain
                so.
              </p>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Open source</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                NextSkill is published under the
                <a
                  href="https://github.com/vincentayorinde/nextskill/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  class="font-semibold text-ns-primary no-underline hover:underline"
                  >MIT licence</a
                >. You are free to use, copy, modify, and distribute the source
                code subject to the terms of that licence.
              </p>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                No guarantees on career outcomes
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  NextSkill provides career information and a personality-style
                  assessment to help you discover paths that may suit you. It is
                  a starting point for exploration, not a guarantee of
                  employment or salary.
                </p>
                <p class="m-0">
                  Salary data is approximate and based on publicly available
                  market data. Actual salaries vary by employer, location,
                  experience, and many other factors.
                </p>
                <p class="m-0">
                  You are responsible for your own career decisions. We strongly
                  encourage you to research any career path independently before
                  making significant commitments.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Acceptable use</h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">When using NextSkill, you agree not to:</p>
                <ul class="mt-2 space-y-2 pl-4">
                  <li>
                    Attempt to reverse-engineer or scrape the service in ways
                    that degrade performance for other users
                  </li>
                  <li>
                    Use the service to spam, harvest emails, or conduct any
                    fraudulent activity
                  </li>
                  <li>Submit false information when creating an account</li>
                </ul>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Limitation of liability
              </h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                NextSkill is provided "as is" without warranty of any kind. We
                make no guarantees about uptime, accuracy of information, or
                fitness for a particular purpose. Use of this service is at your
                own risk.
              </p>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Contact</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                If you have any questions about these terms, contact:
                <a
                  href="mailto:mrvincentayorinde@gmail.com"
                  class="font-semibold text-ns-primary no-underline hover:underline"
                  >mrvincentayorinde&#64;gmail.com</a
                >
              </p>
            </ns-card>
          </div>

          <div class="mt-8 text-center">
            <a
              routerLink="/"
              class="text-sm font-semibold text-ns-primary no-underline hover:underline"
              >← Back to home</a
            >
          </div>
        </div>
      </div>
    </ns-app-shell>
  `,
})
export class TermsComponent implements OnInit {
  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'About', routerLink: '/about' },
    {
      label: 'Open source',
      href: 'https://github.com/vincentayorinde/nextskill',
      external: true,
    },
  ];

  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Terms of use — NextSkill');
    this.metaService.updateTag({
      name: 'description',
      content:
        'NextSkill terms of use. Free to use, open source under MIT, no guarantees on career outcomes.',
    });
  }
}
