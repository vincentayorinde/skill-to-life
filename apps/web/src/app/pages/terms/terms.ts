import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import {
  NsAppShellComponent,
  NsAppShellLink,
  NsCardComponent,
  NsPageHeaderComponent,
} from 'ui';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NsAppShellComponent,
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
            eyebrow="Legal"
            title="Terms of use."
            description="Last updated: July 2026. By using Skill to Life you agree to these terms."
          >
          </ns-page-header>

          <div class="mt-10 space-y-6">
            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Free to use</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                Skill to Life is free to use. There are no paywalls, premium
                tiers, or paid features. The assessment, career data, salary
                information, and learning resources are all free and will remain
                so.
              </p>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Open source</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                Skill to Life is published under the
                <a
                  href="https://github.com/vincentayorinde/skill-to-life/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  class="font-semibold text-ns-primary no-underline hover:underline"
                  >MIT licence</a
                >. You are free to use, copy, modify, and distribute the source
                code subject to the terms of that licence.
              </p>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Your account</h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  You can use the assessment and browse career paths without
                  creating an account.
                </p>
                <p class="m-0">
                  If you choose to sign in with Google to save your results,
                  you are responsible for keeping your account secure. Do not
                  share your login with others.
                </p>
                <p class="m-0">
                  We reserve the right to suspend or delete accounts that
                  violate these terms or that have been inactive for an extended
                  period.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Artificial intelligence
              </h2>
              <div class="mt-4 space-y-4 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  Skill to Life uses artificial intelligence to power several
                  features. By using these features you acknowledge the
                  following.
                </p>

                <div>
                  <p class="m-0 font-semibold text-ns-text">What AI powers:</p>
                  <div class="mt-3 space-y-3">
                    <p class="m-0">
                      <span class="font-semibold text-ns-text"
                        >Career assessment matching.</span
                      >
                      Your answers are processed by a weighted scoring
                      algorithm to match you to career paths. This is automated.
                      No human reviews your individual answers.
                    </p>
                    <p class="m-0">
                      <span class="font-semibold text-ns-text"
                        >CV and profile analysis.</span
                      >
                      When you submit a CV, pasted text, or LinkedIn URL for
                      analysis, that content is sent to a third-party AI
                      provider. We currently use Claude by Anthropic, GPT-4 by
                      OpenAI, and Gemini by Google, depending on platform
                      configuration.
                    </p>
                    <p class="m-0">
                      <span class="font-semibold text-ns-text"
                        >AI-generated results.</span
                      >
                      Career matches, scores, roadmap suggestions, improvement
                      recommendations, and salary insights are generated by AI.
                      They are informational only. They are not professional
                      career counselling, financial advice, or a guarantee of
                      employment.
                    </p>
                    <p class="m-0">
                      <span class="font-semibold text-ns-text"
                        >AI can be wrong.</span
                      >
                      AI-generated content may contain errors or outdated
                      information. Career paths and salary data change. Please
                      verify anything important with qualified professionals or
                      up-to-date sources before making significant decisions.
                    </p>
                  </div>
                </div>

                <div>
                  <p class="m-0 font-semibold text-ns-text">
                    Your data and AI providers
                  </p>
                  <p class="m-0 mt-3">
                    When you use CV analysis, your input is sent to the relevant
                    AI provider for processing. This is governed by their
                    privacy policies:
                  </p>
                  <ul class="mt-3 space-y-2 pl-4">
                    <li>Anthropic: anthropic.com/privacy</li>
                    <li>OpenAI: openai.com/privacy</li>
                    <li>Google: policies.google.com</li>
                  </ul>
                </div>

                <p class="m-0">
                  We do not sell your data to AI providers. Your data is sent
                  solely to generate your requested analysis and is not used to
                  train third-party models under our current agreements.
                </p>

                <div>
                  <p class="m-0 font-semibold text-ns-text">Opting out</p>
                  <p class="m-0 mt-3">
                    CV analysis is optional. You can use the assessment, career
                    library, salary data, and all other core features without
                    submitting any content to AI. AI features only activate when
                    you explicitly choose to use them.
                  </p>
                </div>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                No guarantees on career outcomes
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  Skill to Life provides career information and a
                  personality-style assessment to help you discover paths that
                  may suit you. It is a starting point for exploration, not a
                  guarantee of employment or salary.
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
                <p class="m-0">When using Skill to Life, you agree not to:</p>
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
                Skill to Life is provided "as is" without warranty of any kind.
                We make no guarantees about uptime, accuracy of information, or
                fitness for a particular purpose. Use of this service is at your
                own risk.
              </p>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Data and privacy
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  Your privacy is explained in full in our Privacy Policy at
                  skilltolife.com/privacy.
                </p>
                <div>
                  <p class="m-0 font-semibold text-ns-text">Key points:</p>
                  <ul class="mt-3 space-y-2 pl-4">
                    <li>
                      We collect only what is needed to provide the service.
                    </li>
                    <li>We do not sell your data.</li>
                    <li>We do not use your data for advertising.</li>
                    <li>
                      You can use the assessment anonymously without creating an
                      account.
                    </li>
                    <li>
                      You can request deletion of your account and data at any
                      time by emailing skilltolife.contact&#64;gmail.com.
                    </li>
                  </ul>
                </div>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Changes to these terms
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  We may update these terms from time to time. When we do, we
                  will update the date at the top of this page.
                </p>
                <p class="m-0">
                  If changes are significant, we will make reasonable efforts to
                  notify signed-in users. Continued use of Skill to Life after
                  changes are posted means you accept the updated terms.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Governing law
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  These terms are governed by the laws of England and Wales
                  unless local consumer protection laws in your country provide
                  protections that cannot be waived — in which case those
                  protections apply.
                </p>
                <p class="m-0">
                  Users in Nigeria, South Africa, Kenya, Ghana, and other
                  African countries may have additional rights under their local
                  data protection and consumer protection laws.
                </p>
                <p class="m-0">
                  Users in the European Union may also have rights under EU
                  consumer protection law.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Dispute resolution
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  If you have a concern about Skill to Life, please contact us
                  first at skilltolife.contact&#64;gmail.com. Most issues can be
                  resolved quickly and informally.
                </p>
                <p class="m-0">
                  If we cannot resolve a dispute informally within 30 days, both
                  parties agree to attempt resolution through a recognised
                  mediation or arbitration process before pursuing court
                  proceedings, except for:
                </p>
                <ul class="mt-2 space-y-2 pl-4">
                  <li>Claims relating to intellectual property rights</li>
                  <li>
                    Claims where either party seeks urgent injunctive relief
                  </li>
                  <li>
                    Claims eligible for small claims court in your jurisdiction
                  </li>
                </ul>
                <div>
                  <p class="m-0 font-semibold text-ns-text">
                    No class actions
                  </p>
                  <p class="m-0 mt-3">
                    You agree to resolve any disputes with Skill to Life on an
                    individual basis only. You waive any right to bring or join
                    a class action or collective claim against us.
                  </p>
                </div>
                <p class="m-0">
                  Nothing in this section limits your rights under applicable
                  consumer protection laws in your country. Users in the UK may
                  complain to relevant authorities including Trading Standards
                  or the ICO where applicable. Users in the EU may use the EU
                  Online Dispute Resolution platform at
                  ec.europa.eu/consumers/odr.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Contact</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                If you have any questions about these terms, contact:
                <a
                  href="mailto:skilltolife.contact@gmail.com"
                  class="font-semibold text-ns-primary no-underline hover:underline"
                  >skilltolife.contact&#64;gmail.com</a
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
    this.titleService.setTitle('Terms of use — Skill to Life');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Skill to Life terms of use. Free to use, open source under MIT, no guarantees on career outcomes.',
    });
  }
}
