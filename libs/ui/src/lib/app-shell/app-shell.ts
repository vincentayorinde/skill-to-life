import { Component, Input, OnInit } from '@angular/core';

export interface NsAppShellLink {
  label: string;
  href: string;
  external?: boolean;
}

@Component({
  selector: 'ns-app-shell',
  standalone: true,
  template: `
    <div class="min-h-screen bg-ns-bg text-ns-text" [attr.data-theme]="theme">
      <header
        class="sticky top-0 z-50 border-b border-ns-border bg-ns-nav backdrop-blur-xl transition duration-base ease-ns"
      >
        <div
          class="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"
        >
          <a
            class="inline-flex shrink-0 items-center gap-3 rounded-md text-ns-text no-underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
            href="/"
          >
            <span
              class="grid h-9 w-9 place-items-center rounded-md border border-ns-border bg-ns-cardElevated text-sm font-bold text-ns-text shadow-glow"
              aria-hidden="true"
            >
              NS
            </span>
            <span class="text-base font-bold">{{ brand }}</span>
          </a>

          <nav
            class="hidden items-center gap-1 lg:flex"
            aria-label="Primary navigation"
          >
            @for (link of links; track link.href) {
              <a
                class="rounded-md px-3 py-2 text-sm font-semibold text-ns-muted no-underline transition duration-base ease-ns hover:bg-ns-card hover:text-ns-text focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                [href]="link.href"
                [attr.target]="link.external ? '_blank' : null"
                [attr.rel]="link.external ? 'noreferrer' : null"
              >
                {{ link.label }}
              </a>
            }
          </nav>

          <div class="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              class="inline-flex min-h-10 items-center justify-center rounded-md border border-ns-border bg-ns-card px-3 text-sm font-semibold text-ns-muted transition duration-base ease-ns hover:border-ns-primary hover:text-ns-text focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              [attr.aria-label]="
                theme === 'dark'
                  ? 'Switch to light theme'
                  : 'Switch to dark theme'
              "
              (click)="toggleTheme()"
            >
              <span aria-hidden="true">{{
                theme === 'dark' ? 'Light' : 'Dark'
              }}</span>
            </button>
            <a
              class="rounded-md px-3 py-2 text-sm font-semibold text-ns-muted no-underline transition duration-base ease-ns hover:bg-ns-card hover:text-ns-text focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              href="#signin"
            >
              Sign in
            </a>
            <a
              class="rounded-md border border-ns-border bg-ns-card px-3 py-2 text-sm font-semibold text-ns-text no-underline shadow-ns transition duration-base ease-ns hover:border-ns-primary hover:shadow-glow focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              href="#assessment"
            >
              Start assessment
            </a>
          </div>

          <button
            type="button"
            class="grid h-10 w-10 place-items-center rounded-md border border-ns-border bg-ns-card text-ns-text transition duration-base ease-ns hover:border-ns-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus md:hidden"
            [attr.aria-expanded]="mobileMenuOpen"
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            (click)="mobileMenuOpen = !mobileMenuOpen"
          >
            <span aria-hidden="true">{{ mobileMenuOpen ? 'X' : '=' }}</span>
          </button>
        </div>

        @if (mobileMenuOpen) {
          <div
            id="mobile-nav"
            class="border-t border-ns-border bg-ns-nav px-4 py-4 backdrop-blur-xl md:hidden"
          >
            <nav class="grid gap-1" aria-label="Mobile navigation">
              @for (link of links; track link.href) {
                <a
                  class="rounded-md px-3 py-2 text-sm font-semibold text-ns-muted no-underline transition duration-base ease-ns hover:bg-ns-card hover:text-ns-text focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                  [href]="link.href"
                  [attr.target]="link.external ? '_blank' : null"
                  [attr.rel]="link.external ? 'noreferrer' : null"
                >
                  {{ link.label }}
                </a>
              }
            </nav>

            <div class="mt-4 grid gap-2">
              <button
                type="button"
                class="inline-flex min-h-10 items-center justify-center rounded-md border border-ns-border bg-ns-card px-3 text-sm font-semibold text-ns-text transition duration-base ease-ns hover:border-ns-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                [attr.aria-label]="
                  theme === 'dark'
                    ? 'Switch to light theme'
                    : 'Switch to dark theme'
                "
                (click)="toggleTheme()"
              >
                {{ theme === 'dark' ? 'Light mode' : 'Dark mode' }}
              </button>
              <a
                class="inline-flex min-h-10 items-center justify-center rounded-md border border-ns-border px-3 text-sm font-semibold text-ns-muted no-underline"
                href="#signin"
              >
                Sign in
              </a>
              <a
                class="inline-flex min-h-10 items-center justify-center rounded-md border border-ns-primary bg-ns-primary px-3 text-sm font-semibold text-white no-underline"
                href="#assessment"
              >
                Start assessment
              </a>
            </div>
          </div>
        }
      </header>

      <main>
        <ng-content />
      </main>
    </div>
  `,
})
export class NsAppShellComponent implements OnInit {
  @Input() brand = 'NextSkill';
  @Input() links: NsAppShellLink[] = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Career paths', href: '#career-paths' },
    { label: 'Open source', href: '#open-source' },
  ];

  theme: 'dark' | 'light' = 'dark';
  mobileMenuOpen = false;

  ngOnInit(): void {
    const savedTheme = this.readSavedTheme();
    this.setTheme(savedTheme ?? 'dark');
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
