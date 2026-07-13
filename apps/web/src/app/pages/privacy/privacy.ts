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
  selector: 'app-privacy',
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
        <div class="mx-auto" style="max-width: 720px;">
          <ns-page-header
            eyebrow="Legal"
            title="Privacy Policy"
            description="Updated: July 2026"
          >
          </ns-page-header>

          <div class="mt-10 space-y-6">
            <ns-card>
              <div class="space-y-4 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  We take your privacy seriously. This Privacy Policy explains
                  how Encrisoft Technologies Ltd ('we', 'us', or 'our')
                  collects, uses, shares, and protects your personal data when
                  you use Skill to Life, including our website and services. We
                  are the data controller for your personal data.
                </p>
                <p class="m-0">
                  For information that may significantly affect your rights, we
                  have highlighted it in bold to draw your attention.
                </p>
                <p class="m-0">
                  If you have any questions about this Privacy Policy, please
                  contact us using the details at the end of this page.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Table of contents
              </h2>
              <ol
                class="mt-5 grid gap-3 p-0 text-sm leading-6 text-ns-muted sm:grid-cols-2"
              >
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">01</span>
                  <a
                    href="/privacy#personal-data"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >What is Personal Data</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">02</span>
                  <a
                    href="/privacy#when-we-collect"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >When We Collect Your Data</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">03</span>
                  <a
                    href="/privacy#what-we-collect"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >What Data We Collect</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">04</span>
                  <a
                    href="/privacy#how-we-use"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >How We Use Your Data</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">05</span>
                  <a
                    href="/privacy#ai-processing"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >AI Processing of Your Data</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">06</span>
                  <a
                    href="/privacy#children"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >Children's Data</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">07</span>
                  <a
                    href="/privacy#legal-basis"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >Legal Basis for Processing</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">08</span>
                  <a
                    href="/privacy#sharing"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >How We Share Your Data</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">09</span>
                  <a
                    href="/privacy#protect"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >How We Protect Your Data</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">10</span>
                  <a
                    href="/privacy#retention"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >Data Storage and Retention</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">11</span>
                  <a
                    href="/privacy#rights"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >Your Rights</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">12</span>
                  <a
                    href="/privacy#changes"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >Changes to This Policy</a
                  >
                </li>
                <li class="flex gap-3">
                  <span class="font-mono text-ns-primary">13</span>
                  <a
                    href="/privacy#contact"
                    class="text-ns-muted no-underline hover:text-ns-primary"
                    >Contact Us</a
                  >
                </li>
              </ol>
            </ns-card>

            <ns-card id="personal-data" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >01</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    What is Personal Data
                  </h2>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    Personal data is information that can identify you directly
                    or indirectly. It does not include data that has been fully
                    anonymised so it can no longer be linked to you.
                  </p>
                </div>
              </div>
            </ns-card>

            <ns-card id="when-we-collect" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >02</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    When We Collect Your Data
                  </h2>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    We collect and process personal data when you:
                  </p>
                  <ul class="mt-3 space-y-2 pl-5 text-sm leading-7 text-ns-muted">
                    <li>Visit our website and take the career assessment</li>
                    <li>Sign in with Google to save your results</li>
                    <li>Upload a CV or paste profile text for AI analysis</li>
                    <li>Save careers or resources to your profile</li>
                    <li>Contact us for support</li>
                    <li>Choose to make your profile public</li>
                  </ul>
                </div>
              </div>
            </ns-card>

            <ns-card id="what-we-collect" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >03</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    What Data We Collect
                  </h2>
                  <div class="mt-4 space-y-4 text-sm leading-7 text-ns-muted">
                    <div>
                      <p class="m-0 font-semibold text-ns-text">
                        Data you provide directly:
                      </p>
                      <ul class="mt-3 space-y-2 pl-5">
                        <li>
                          Account information (name, email, and profile picture
                          from Google when you sign in)
                        </li>
                        <li>
                          Profile details you choose to add (bio, location,
                          website, LinkedIn, GitHub, current role, experience
                          level)
                        </li>
                        <li>Assessment answers</li>
                        <li>
                          CV content, pasted text, or LinkedIn URL when you use
                          AI analysis
                        </li>
                        <li>Careers and resources you save</li>
                      </ul>
                    </div>
                    <div>
                      <p class="m-0 font-semibold text-ns-text">
                        Data collected automatically:
                      </p>
                      <ul class="mt-3 space-y-2 pl-5">
                        <li>Essential cookies for security and login sessions</li>
                        <li>
                          Basic technical information needed to run the service
                        </li>
                      </ul>
                    </div>
                    <p class="m-0">
                      <strong class="text-ns-text"
                        >We do not use advertising cookies. We do not track you
                        across other websites. We do not sell your data.</strong
                      >
                    </p>
                  </div>
                </div>
              </div>
            </ns-card>

            <ns-card id="how-we-use" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >04</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    How We Use Your Data
                  </h2>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    We use your personal data to:
                  </p>
                  <ul class="mt-3 space-y-2 pl-5 text-sm leading-7 text-ns-muted">
                    <li>Provide your career assessment results and matches</li>
                    <li>Save your results to your account</li>
                    <li>Run AI analysis of your CV when you request it</li>
                    <li>Let you save careers and resources</li>
                    <li>
                      Display your public profile if you choose to make it
                      public
                    </li>
                    <li>Keep the service secure and working</li>
                    <li>Respond to your support requests</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    <strong class="text-ns-text"
                      >We never use your assessment answers or CV content for
                      advertising, and we never sell them.</strong
                    >
                  </p>
                </div>
              </div>
            </ns-card>

            <ns-card id="ai-processing" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >05</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    AI Processing of Your Data
                  </h2>
                  <div class="mt-4 space-y-4 text-sm leading-7 text-ns-muted">
                    <p class="m-0">
                      When you use our AI-powered CV analysis, your CV content
                      is sent to a third-party AI provider for processing.
                      Depending on our current configuration, this may be:
                    </p>
                    <ul class="space-y-2 pl-5">
                      <li>Anthropic (Claude)</li>
                      <li>OpenAI (GPT-4)</li>
                      <li>Google (Gemini)</li>
                    </ul>
                    <p class="m-0">
                      <strong class="text-ns-text"
                        >Your CV content is sent only to generate your
                        requested analysis. Under our current agreements, it is
                        not used to train these providers' AI models.</strong
                      >
                    </p>
                    <p class="m-0">
                      The core assessment and career library do not require AI
                      processing. AI analysis only runs when you explicitly
                      choose to use it.
                    </p>
                    <p class="m-0">
                      These providers process data under their own privacy
                      policies:
                    </p>
                    <ul class="space-y-2 pl-5">
                      <li>Anthropic: anthropic.com/privacy</li>
                      <li>OpenAI: openai.com/privacy</li>
                      <li>Google: policies.google.com</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ns-card>

            <ns-card id="children" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >06</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Children's Data
                  </h2>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    Skill to Life is intended for users aged 16 and over. We do
                    not knowingly collect data from children under 16. If you
                    believe a child has provided us with personal data, please
                    contact us and we will delete it.
                  </p>
                </div>
              </div>
            </ns-card>

            <ns-card id="legal-basis" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >07</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Legal Basis for Processing
                  </h2>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    We process your personal data under the following legal
                    bases:
                  </p>
                  <ul class="mt-3 space-y-2 pl-5 text-sm leading-7 text-ns-muted">
                    <li>
                      Consent: when you choose to sign in, upload a CV, or make
                      your profile public
                    </li>
                    <li>
                      Legitimate interests: to run, secure, and improve the
                      service
                    </li>
                    <li>
                      Performance of service: to deliver the assessment and
                      results you requested
                    </li>
                    <li>
                      Legal compliance: where we must meet a legal obligation
                    </li>
                  </ul>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    You can withdraw consent at any time by deleting your
                    account or contacting us.
                  </p>
                </div>
              </div>
            </ns-card>

            <ns-card id="sharing" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >08</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    How We Share Your Data
                  </h2>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    <strong class="text-ns-text"
                      >We do not sell your personal data.</strong
                    >
                  </p>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    We share data only in these limited cases:
                  </p>
                  <ul class="mt-3 space-y-2 pl-5 text-sm leading-7 text-ns-muted">
                    <li>
                      With AI providers, solely to process your requested CV
                      analysis (Section 5)
                    </li>
                    <li>
                      With Google, for authentication when you choose to sign in
                    </li>
                    <li>
                      If required by law or to protect rights, safety, or
                      prevent fraud
                    </li>
                    <li>
                      If our business is acquired, in which case data may
                      transfer to the new owner under the same protections
                    </li>
                  </ul>
                </div>
              </div>
            </ns-card>

            <ns-card id="protect" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >09</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    How We Protect Your Data
                  </h2>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    We use appropriate technical and organisational measures to
                    protect your data, including secure authentication and
                    encrypted connections. No system is completely secure, so if
                    you believe your data has been compromised, please contact
                    us immediately.
                  </p>
                </div>
              </div>
            </ns-card>

            <ns-card id="retention" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >10</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Data Storage and Retention
                  </h2>
                  <div class="mt-4 space-y-4 text-sm leading-7 text-ns-muted">
                    <p class="m-0">
                      Your data is stored securely. If data is transferred
                      outside the UK or EEA, we rely on approved safeguards such
                      as standard contractual clauses.
                    </p>
                    <p class="m-0">
                      We keep your data only as long as needed to provide the
                      service and meet legal requirements.
                      <strong class="text-ns-text"
                        >You can delete your account and all associated data at
                        any time by contacting us. Anonymous assessments taken
                        without an account are not linked to you and are not
                        personally retained.</strong
                      >
                    </p>
                  </div>
                </div>
              </div>
            </ns-card>

            <ns-card id="rights" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >11</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Your Rights
                  </h2>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    Under UK GDPR you have the right to:
                  </p>
                  <ul class="mt-3 space-y-2 pl-5 text-sm leading-7 text-ns-muted">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Delete your data</li>
                    <li>Object to or restrict processing</li>
                    <li>Withdraw consent</li>
                    <li>
                      Receive a copy of your data in a portable format
                    </li>
                    <li>Lodge a complaint</li>
                  </ul>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    To exercise any of these rights, contact us using the
                    details below.
                  </p>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    <strong class="text-ns-text"
                      >You may also lodge a complaint with the UK Information
                      Commissioner's Office (ICO) at ico.org.uk if you believe
                      we have handled your data unlawfully. We ask that you
                      contact us first so we can try to resolve your
                      concern.</strong
                    >
                  </p>
                </div>
              </div>
            </ns-card>

            <ns-card id="changes" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >12</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Changes to This Policy
                  </h2>
                  <p class="mt-4 text-sm leading-7 text-ns-muted">
                    We may update this Privacy Policy to reflect new features,
                    practices, or legal requirements. The updated policy will be
                    posted on this page with a new date. For significant
                    changes, we will make reasonable efforts to notify signed-in
                    users.
                  </p>
                </div>
              </div>
            </ns-card>

            <ns-card id="contact" data-privacy-section>
              <div class="flex items-start gap-4">
                <span class="font-mono text-sm font-semibold text-ns-primary"
                  >13</span
                >
                <div>
                  <h2 class="m-0 text-xl font-bold text-ns-text">
                    Contact Us
                  </h2>
                  <div class="mt-4 space-y-4 text-sm leading-7 text-ns-muted">
                    <p class="m-0">
                      If you have any questions about this Privacy Policy or how
                      we handle your data, contact us:
                    </p>
                    <p class="m-0">
                      <span class="font-semibold text-ns-text"
                        >Data Controller:</span
                      >
                      Encrisoft Technologies Ltd (registered in the United
                      Kingdom)
                    </p>
                    <p class="m-0">
                      <span class="font-semibold text-ns-text">Email:</span>
                      <a
                        href="mailto:skilltolife.contact@gmail.com"
                        class="font-semibold text-ns-primary no-underline hover:underline"
                        >skilltolife.contact&#64;gmail.com</a
                      >
                    </p>
                    <p class="m-0">We aim to respond within 30 days.</p>
                  </div>
                </div>
              </div>
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
export class PrivacyComponent implements OnInit {
  protected readonly auth = inject(AuthService);
  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Salaries', routerLink: '/salaries' },
    { label: 'Resources', routerLink: '/resources' },
    {
      label: 'CV Analysis ✨',
      routerLink: '/profile',
      queryParams: { tab: 'cv' },
      requiresAuth: true,
    },
  ];

  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Privacy Policy — Skill to Life');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Skill to Life privacy policy covering career assessments, Google sign-in, AI CV analysis, data rights, and Encrisoft Technologies Ltd as data controller.',
    });
  }
}
