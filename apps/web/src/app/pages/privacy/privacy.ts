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
      brand="NextSkill"
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
            description="Last updated: 2025. This policy explains what data NextSkill collects, how it is used, and your rights."
          >
          </ns-page-header>

          <div class="mt-10 space-y-6">
            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">
                What data we collect
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  <span class="font-semibold text-ns-text"
                    >Anonymous assessment use.</span
                  >
                  If you take the assessment without signing in, no personal
                  data is stored. Your answers and results exist only in your
                  browser session.
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
                  <span class="font-semibold text-ns-text"
                    >Essential cookies.</span
                  >
                  We use a session token cookie (
                  <code
                    class="rounded bg-white/10 px-1 py-0.5 font-mono text-xs"
                    >ns_token</code
                  >) to keep you signed in. We also store your theme preference
                  locally. No advertising or tracking cookies are used.
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
                  <span class="text-red-400" aria-hidden="true">✗</span>
                  We do not sell your data to any third party
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-400" aria-hidden="true">✗</span>
                  We do not use your data for advertising
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-400" aria-hidden="true">✗</span>
                  We do not share your data with any analytics platform
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-400" aria-hidden="true">✗</span>
                  We do not send marketing emails
                </li>
              </ul>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Data storage</h2>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                Account and result data is stored in a PostgreSQL database. The
                database is hosted on infrastructure controlled by the project
                maintainer. Data is not replicated to third-party services.
              </p>
              <p class="mt-3 text-sm leading-7 text-ns-muted">
                NextSkill is open source. The full data schema and server code
                is publicly auditable at
                <a
                  href="https://github.com/vincentayorinde/nextskill"
                  target="_blank"
                  rel="noreferrer"
                  class="font-semibold text-ns-primary no-underline hover:underline"
                  >github.com/vincentayorinde/nextskill</a
                >.
              </p>
            </ns-card>

            <ns-card>
              <h2 class="m-0 text-xl font-bold text-ns-text">Your rights</h2>
              <div class="mt-4 space-y-3 text-sm leading-7 text-ns-muted">
                <p class="m-0">
                  You can use the assessment without creating an account at any
                  time. If you have created an account and wish to have your
                  data deleted, email us and we will delete your account and all
                  associated results within 30 days.
                </p>
                <p class="m-0">
                  To request data deletion or ask any privacy question, contact:
                  <a
                    href="mailto:mrvincentayorinde@gmail.com"
                    class="font-semibold text-ns-primary no-underline hover:underline"
                    >mrvincentayorinde&#64;gmail.com</a
                  >
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
    this.titleService.setTitle('Privacy policy — NextSkill');
    this.metaService.updateTag({
      name: 'description',
      content:
        'NextSkill privacy policy. We collect only what is needed, never sell data, and have no advertising or tracking.',
    });
  }
}
