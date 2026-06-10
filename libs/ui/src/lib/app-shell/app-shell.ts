import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NsCookieNoticeComponent } from '../cookie-notice/cookie-notice';

export interface NsAppShellLink {
  label: string;
  href?: string;
  routerLink?: string;
  external?: boolean;
}

export interface NsAuthUser {
  name?: string;
  avatar?: string;
  email: string;
}

@Component({
  selector: 'ns-app-shell',
  standalone: true,
  imports: [RouterLink, NsCookieNoticeComponent],
  template: `
    <div class="min-h-screen bg-ns-bg text-ns-text" [attr.data-theme]="theme">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-ns focus:bg-ns-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-ns-md"
      >
        Skip to main content
      </a>

      <!-- Navigation -->
      <header
        class="sticky top-0 z-50 border-b border-ns-border bg-ns-nav shadow-ns transition-all duration-base"
      >
        <div
          class="mx-auto flex w-full max-w-container items-center justify-between gap-4 px-6"
          style="height: 64px;"
        >
          <!-- Logo -->
          <a
            class="inline-flex shrink-0 items-center gap-2.5 rounded-ns text-ns-text no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
            href="/"
          >
            <span
              class="flex h-8 w-8 items-center justify-center"
              aria-hidden="true"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#006AFF" />
                <path
                  d="M8 22 C8 22 12 10 16 10 C20 10 24 22 24 22"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  fill="none"
                />
                <circle cx="16" cy="10" r="2" fill="white" />
              </svg>
            </span>
            <span class="text-base font-semibold text-ns-text">{{
              brand
            }}</span>
          </a>

          <!-- Desktop nav links -->
          <nav
            class="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary navigation"
          >
            @for (link of links; track link.label) {
              @if (link.routerLink) {
                <a
                  class="rounded-ns px-3 py-2 text-sm font-medium text-ns-muted no-underline transition-all duration-base hover:bg-ns-canvasSubtle hover:text-ns-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                  [routerLink]="link.routerLink"
                  >{{ link.label }}</a
                >
              } @else {
                <a
                  class="rounded-ns px-3 py-2 text-sm font-medium text-ns-muted no-underline transition-all duration-base hover:bg-ns-canvasSubtle hover:text-ns-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                  [href]="link.href"
                  [attr.target]="link.external ? '_blank' : null"
                  [attr.rel]="link.external ? 'noreferrer' : null"
                  >{{ link.label }}</a
                >
              }
            }
            @if (authUser) {
              <a
                class="rounded-ns px-3 py-2 text-sm font-medium text-ns-muted no-underline transition-all duration-base hover:bg-ns-canvasSubtle hover:text-ns-text"
                routerLink="/my-results"
                >My results</a
              >
            }
          </nav>

          <!-- Desktop actions -->
          <div class="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-ns border border-ns-border bg-ns-canvasSubtle text-ns-muted transition-all duration-base hover:bg-ns-card hover:text-ns-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              [attr.aria-label]="
                theme === 'dark'
                  ? 'Switch to light theme'
                  : 'Switch to dark theme'
              "
              (click)="toggleTheme()"
            >
              @if (theme === 'dark') {
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.772 17.303a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 5.106a.75.75 0 011.06 1.06L5.635 7.757a.75.75 0 01-1.06-1.061l1.59-1.59z"
                  />
                </svg>
              } @else {
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
            </button>

            @if (authUser) {
              <div class="flex items-center gap-2">
                @if (authUser.avatar) {
                  <img
                    [src]="authUser.avatar"
                    [alt]="authUser.name ?? 'User'"
                    class="h-8 w-8 rounded-full border border-ns-border"
                  />
                }
                <span
                  class="max-w-28 truncate text-sm font-medium text-ns-text"
                  >{{ authUser.name ?? authUser.email }}</span
                >
                <button
                  type="button"
                  class="inline-flex h-9 items-center justify-center rounded-ns border border-ns-border bg-ns-card px-4 text-sm font-medium text-ns-muted transition-all duration-base hover:bg-ns-canvasSubtle hover:text-ns-text"
                  (click)="signOut.emit()"
                >
                  Sign out
                </button>
              </div>
            } @else {
              <button
                type="button"
                class="inline-flex h-9 items-center justify-center rounded-ns border border-ns-border bg-ns-card px-4 text-sm font-medium text-ns-muted transition-all duration-base hover:bg-ns-canvasSubtle hover:text-ns-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                (click)="signIn.emit()"
              >
                Sign in
              </button>
              <a
                class="inline-flex h-9 items-center justify-center rounded-ns bg-ns-primary px-5 text-sm font-medium text-white no-underline shadow-ns transition-all duration-base hover:bg-ns-primaryHover hover:shadow-ns-md hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                href="#assessment"
                >Start assessment</a
              >
            }
          </div>

          <!-- Mobile menu toggle -->
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-ns border border-ns-border bg-ns-canvasSubtle text-ns-muted transition-all duration-base hover:bg-ns-card hover:text-ns-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus md:hidden"
            [attr.aria-expanded]="mobileMenuOpen"
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            (click)="mobileMenuOpen = !mobileMenuOpen"
          >
            @if (mobileMenuOpen) {
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            } @else {
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            }
          </button>
        </div>

        <!-- Mobile menu -->
        @if (mobileMenuOpen) {
          <div
            id="mobile-nav"
            class="border-t border-ns-border bg-ns-nav px-4 py-4 md:hidden"
          >
            <nav class="grid gap-0.5" aria-label="Mobile navigation">
              @for (link of links; track link.label) {
                @if (link.routerLink) {
                  <a
                    class="rounded-ns px-3 py-2.5 text-sm font-medium text-ns-muted no-underline transition-all duration-base hover:bg-ns-canvasSubtle hover:text-ns-text"
                    [routerLink]="link.routerLink"
                    (click)="mobileMenuOpen = false"
                    >{{ link.label }}</a
                  >
                } @else {
                  <a
                    class="rounded-ns px-3 py-2.5 text-sm font-medium text-ns-muted no-underline transition-all duration-base hover:bg-ns-canvasSubtle hover:text-ns-text"
                    [href]="link.href"
                    [attr.target]="link.external ? '_blank' : null"
                    [attr.rel]="link.external ? 'noreferrer' : null"
                    >{{ link.label }}</a
                  >
                }
              }
              @if (authUser) {
                <a
                  class="rounded-ns px-3 py-2.5 text-sm font-medium text-ns-muted no-underline transition-all duration-base hover:bg-ns-canvasSubtle hover:text-ns-text"
                  routerLink="/my-results"
                  (click)="mobileMenuOpen = false"
                  >My results</a
                >
              }
            </nav>
            <div class="mt-3 grid gap-2 border-t border-ns-border pt-3">
              <button
                type="button"
                class="inline-flex h-10 items-center justify-center rounded-ns border border-ns-border bg-ns-canvasSubtle px-4 text-sm font-medium text-ns-text transition-all duration-base hover:bg-ns-card"
                (click)="toggleTheme()"
              >
                {{ theme === 'dark' ? 'Light mode' : 'Dark mode' }}
              </button>
              @if (authUser) {
                <button
                  type="button"
                  class="inline-flex h-10 items-center justify-center rounded-ns border border-ns-border bg-ns-canvasSubtle px-4 text-sm font-medium text-ns-text"
                  (click)="signOut.emit()"
                >
                  Sign out
                </button>
              } @else {
                <button
                  type="button"
                  class="inline-flex h-10 items-center justify-center rounded-ns border border-ns-border bg-ns-canvasSubtle px-4 text-sm font-medium text-ns-text"
                  (click)="signIn.emit()"
                >
                  Sign in
                </button>
                <a
                  class="inline-flex h-10 items-center justify-center rounded-ns bg-ns-primary px-4 text-sm font-medium text-white no-underline shadow-ns hover:bg-ns-primaryHover"
                  href="#assessment"
                  >Start assessment</a
                >
              }
            </div>
          </div>
        }
      </header>

      <main id="main-content" tabindex="-1">
        <ng-content />
      </main>
      <ns-cookie-notice />
    </div>
  `,
})
export class NsAppShellComponent implements OnInit {
  @Input() brand = 'NextSkill';
  @Input() links: NsAppShellLink[] = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Open source', href: '#open-source' },
  ];
  @Input() authUser: NsAuthUser | null = null;
  @Output() signIn = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<void>();

  theme: 'dark' | 'light' = 'light';
  mobileMenuOpen = false;

  ngOnInit(): void {
    const savedTheme = this.readSavedTheme();
    this.setTheme(savedTheme ?? 'light');
  }

  toggleTheme(): void {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  private setTheme(theme: 'dark' | 'light'): void {
    this.theme = theme;
    try {
      globalThis.localStorage?.setItem('nextskill-theme', theme);
      globalThis.document?.documentElement.setAttribute('data-theme', theme);
    } catch {
      // Theme persistence is progressive enhancement.
    }
  }

  private readSavedTheme(): 'dark' | 'light' | null {
    try {
      const savedTheme = globalThis.localStorage?.getItem('nextskill-theme');
      return savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : null;
    } catch {
      return null;
    }
  }
}
