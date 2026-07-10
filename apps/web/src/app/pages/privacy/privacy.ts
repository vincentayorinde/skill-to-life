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
        <div class="mx-auto max-w-3xl">
          <ns-page-header
            eyebrow="Legal"
            title="Privacy policy."
            description="Last updated: 2026. This policy explains what data Skill to Life collects, how it is used, and your rights."
          >
          </ns-page-header>

          <div class="mt-10 space-y-6">
            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Who we are</h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  Skill to Life is an open-source career discovery website that
                  helps people explore tech career paths, assessment results,
                  salaries, resources, and CV analysis. For privacy questions,
                  contact
                  <a
                    href="mailto:skilltolife.contact@gmail.com"
                    class="font-semibold text-ns-primary no-underline hover:underline"
                    >skilltolife.contact&#64;gmail.com</a
                  >.
                </p>
                <p class="m-0">
                  This Privacy Policy is intended to explain how we process
                  personal data in accordance with applicable data protection
                  laws, including the UK GDPR, the EU GDPR where applicable, and
                  applicable African data protection laws such as the Nigeria
                  Data Protection Act 2023, South Africa’s Protection of
                  Personal Information Act, Kenya’s Data Protection Act 2019,
                  Ghana’s Data Protection Act 2012, and similar laws in
                  countries where our users are located.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                What data we collect
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  <span class="font-semibold text-ns-text"
                    >Anonymous assessment use.</span
                  >
                  If you take the assessment without signing in, your answers
                  and results are kept in your browser session unless you choose
                  to save them.
                </p>
                <p class="m-0">
                  <span class="font-semibold text-ns-text"
                    >Google sign-in.</span
                  >
                  If you choose to sign in with Google to save your results, we
                  store your Google account email address and display name. We
                  do not store your Google password.
                </p>
                <p class="m-0">
                  <span class="font-semibold text-ns-text"
                    >Saved assessment results.</span
                  >
                  When you save a result, we store your assessment answers and
                  career match scores alongside your account. This is so you can
                  view your results again later.
                </p>
                <p class="m-0">
                  <span class="font-semibold text-ns-text">CV analysis.</span>
                  If you use CV analysis, your submitted CV, pasted text, or
                  LinkedIn profile text may be processed by the API and AI
                  provider configured for that feature so the service can return
                  career guidance.
                </p>
                <p class="m-0">
                  <span class="font-semibold text-ns-text"
                    >Essential local storage.</span
                  >
                  We use a local session token (
                  <code
                    class="rounded bg-white/10 px-1 py-0.5 font-mono text-xs"
                    >skill_to_life_token</code
                  >) to keep you signed in. We also store your theme preference
                  and cookie preference locally.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                How data is used
              </h2>
              <ul class="mt-4 space-y-3 text-sm leading-6 text-ns-muted">
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  To show you your saved assessment results when you sign in
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  To identify your account across sessions
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  To analyse your CV or profile text when you choose to submit
                  it
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-ns-primary" aria-hidden="true">✓</span>
                  To understand website usage where analytics consent has been
                  given
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-400" aria-hidden="true">✗</span>
                  We do not sell your data to any third party
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-400" aria-hidden="true">✗</span>
                  We do not use your data for advertising
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-400" aria-hidden="true">✗</span>
                  We do not send marketing emails
                </li>
              </ul>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Legal basis</h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  We process account, authentication, saved result, and security
                  data because it is necessary to provide the service you ask us
                  to provide. We process support and privacy requests because it
                  is necessary to respond to you and comply with applicable law.
                </p>
                <p class="m-0">
                  Our legal basis for optional analytics cookies is your
                  consent. Where we use aggregated analytics insights to improve
                  the service, our interest is improving and operating Skill to
                  Life. If you reject optional cookies, analytics cookies will
                  not be used.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Analytics and website usage data
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  We use Google Analytics 4 to understand how people use Skill
                  to Life, including page views, feature usage, approximate
                  location, device/browser information, and assessment flow
                  events. This helps us improve the website and understand
                  product traction.
                </p>
                <p class="m-0">
                  We do not use analytics to identify you, and we do not
                  intentionally send names, email addresses, phone numbers, CV
                  content, uploaded files, assessment free-text answers, or
                  other directly identifying content to Google Analytics.
                </p>
                <p class="m-0">
                  Google Analytics is provided by Google. Google Analytics 4
                  does not log or store IP addresses from users in the UK, EU,
                  or Switzerland. Google may process analytics data according to
                  its own privacy terms and settings.
                </p>
                <p class="m-0">
                  Where possible, we use Google Analytics in a privacy-conscious
                  mode. If you reject optional cookies, Google Analytics should
                  not read or write analytics cookies, but may receive
                  cookieless measurement signals. If you accept optional
                  cookies, Google Analytics may use analytics cookies to improve
                  measurement.
                </p>
                <p class="m-0">
                  You can accept or reject optional cookies. Rejecting optional
                  cookies does not stop you from using Skill to Life. You can
                  withdraw your consent at any time by opening Cookie
                  Preferences and choosing Reject cookies.
                </p>
                <p class="m-0">
                  Analytics events use safe metadata such as page paths, feature
                  names, question indexes, category slugs, platforms, and
                  completion percentages. We do not send names, emails, phone
                  numbers, CV content, uploaded files, or assessment free-text
                  answers to Google Analytics.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Cookies and similar technologies
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  We use essential cookies or local storage where needed for the
                  website to function securely. These are necessary for the
                  service.
                </p>
                <p class="m-0">
                  We use optional analytics cookies only if you accept cookies.
                  These help Google Analytics improve measurement of visits,
                  page views, assessment flow usage, and feature engagement.
                </p>
                <p class="m-0">
                  If you reject optional cookies, analytics should remain
                  cookieless where supported and analytics cookies should not be
                  read or written. Essential storage may still be used for
                  security, authentication, saved assessment state, and
                  remembering your cookie preference.
                </p>
              </div>
              <div class="mt-5 overflow-x-auto">
                <table class="w-full min-w-[560px] text-left text-sm">
                  <thead class="text-ns-text">
                    <tr>
                      <th class="border-b border-ns-border py-2 pr-4">
                        Cookie/category
                      </th>
                      <th class="border-b border-ns-border py-2 pr-4">
                        Provider
                      </th>
                      <th class="border-b border-ns-border py-2 pr-4">
                        Purpose
                      </th>
                      <th class="border-b border-ns-border py-2 pr-4">
                        Required
                      </th>
                      <th class="border-b border-ns-border py-2">Consent</th>
                    </tr>
                  </thead>
                  <tbody class="text-ns-muted">
                    <tr>
                      <td class="border-b border-ns-border py-3 pr-4">
                        Essential
                      </td>
                      <td class="border-b border-ns-border py-3 pr-4">
                        Skill to Life
                      </td>
                      <td class="border-b border-ns-border py-3 pr-4">
                        Security, authentication, service functionality
                      </td>
                      <td class="border-b border-ns-border py-3 pr-4">Yes</td>
                      <td class="border-b border-ns-border py-3">
                        Not required where strictly necessary
                      </td>
                    </tr>
                    <tr>
                      <td class="py-3 pr-4">Analytics</td>
                      <td class="py-3 pr-4">Google Analytics 4</td>
                      <td class="py-3 pr-4">
                        Website usage analytics, page views, feature engagement,
                        product traction
                      </td>
                      <td class="py-3 pr-4">No</td>
                      <td class="py-3">Required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                Storage, sharing, and international transfers
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  Account and result data is stored in a PostgreSQL database.
                  Skill to Life may share data with service providers only where
                  needed to operate the website, authentication, hosting,
                  analytics, CV analysis, and support workflows.
                </p>
                <p class="m-0">
                  Because Skill to Life and its service providers may operate
                  across different countries, your personal data may be
                  processed or stored outside your country of residence. Where
                  this happens, we take steps designed to protect your data in
                  line with applicable law, such as using appropriate
                  contractual protections, limiting the data we share, and
                  working with reputable service providers.
                </p>
                <p class="m-0">
                  Skill to Life is open source. The full data schema and server
                  code is publicly auditable at
                  <a
                    href="https://github.com/vincentayorinde/skill-to-life"
                    target="_blank"
                    rel="noreferrer"
                    class="font-semibold text-ns-primary no-underline hover:underline"
                    >github.com/vincentayorinde/skill-to-life</a
                  >.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Your rights</h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  Depending on where you live, you may have rights to access,
                  correct, delete, restrict, or object to certain uses of your
                  personal data. You may also have the right to data portability
                  and the right to withdraw consent where processing is based on
                  consent.
                </p>
                <p class="m-0">
                  Users in African countries may also have privacy rights under
                  their local data protection laws. Depending on your country,
                  these rights may include the right to be informed about how
                  your data is used, the right to access your personal data, the
                  right to correct inaccurate data, the right to request
                  deletion, the right to object to certain processing, the right
                  to withdraw consent, and the right to complain to your local
                  data protection authority.
                </p>
                <p class="m-0">
                  You can use the assessment without creating an account at any
                  time. If you have created an account and wish to have your
                  data deleted, email us and we will delete your account and all
                  associated results within 30 days where required by applicable
                  law.
                </p>
                <p class="m-0">
                  To request data deletion or ask any privacy question, contact:
                  <a
                    href="mailto:skilltolife.contact@gmail.com"
                    class="font-semibold text-ns-primary no-underline hover:underline"
                    >skilltolife.contact&#64;gmail.com</a
                  >
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Complaints</h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  If you are in the UK, you may complain to the Information
                  Commissioner’s Office if you are unhappy with how your privacy
                  request is handled.
                </p>
                <p class="m-0">
                  If you are located in an African country, you may also have
                  the right to complain to your local data protection authority.
                  Examples include the Nigeria Data Protection Commission, the
                  Information Regulator in South Africa, the Office of the Data
                  Protection Commissioner in Kenya, and the Data Protection
                  Commission in Ghana.
                </p>
              </div>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Changes</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                If this policy changes, we will update the date at the top of
                this page. We will not use your data in ways not described here
                without obtaining consent first.
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
export class PrivacyComponent implements OnInit {
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
    this.titleService.setTitle('Privacy policy — Skill to Life');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Skill to Life privacy policy covering data use, analytics consent, cookies, and privacy rights under applicable UK, EU, and African data protection laws.',
    });
  }
}
