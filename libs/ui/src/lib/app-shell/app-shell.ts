import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NsCookieNoticeComponent } from '../cookie-notice/cookie-notice';
import { NsExternalLinkModalComponent } from '../external-link/external-link.modal';
import { NsGrowthBricksComponent } from '../growth-bricks/growth-bricks';

export interface NsAppShellLink {
  label: string;
  href?: string;
  routerLink?: string;
  fragment?: string;
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
  imports: [
    RouterLink,
    RouterLinkActive,
    NsCookieNoticeComponent,
    NsExternalLinkModalComponent,
    NsGrowthBricksComponent,
  ],
  template: `
    <div class="min-h-screen bg-ns-bg text-ns-text" [attr.data-theme]="theme">
      <a href="#main-content" class="skip-link">Skip to main content</a>

      <header class="ns-nav-shell">
        <div class="ns-nav-inner">
          <a class="ns-brand" href="/">
            <span class="ns-brand-picture">
              <img
                class="ns-brand-logo ns-brand-logo-full ns-brand-logo-full-dark"
                src="/assets/logo-full-light.png"
                [alt]="brand"
              />
              <img
                class="ns-brand-logo ns-brand-logo-full ns-brand-logo-full-light"
                src="/assets/logo-full.png"
                [alt]="brand"
              />
            </span>
            <img
              class="ns-brand-logo ns-brand-logo-mark"
              src="/assets/logo-mark.png"
              [alt]="brand + ' logo'"
            />
            <span class="ns-brand-sr">{{ brand }}</span>
          </a>

          <nav class="ns-nav-links" aria-label="Primary navigation">
            @for (link of links; track link.label) {
              @if (link.routerLink) {
                <a
                  class="ns-nav-link"
                  routerLinkActive="is-active"
                  [routerLink]="link.routerLink"
                  [fragment]="link.fragment"
                >
                  {{ link.label }}
                </a>
              } @else {
                <a
                  class="ns-nav-link"
                  [href]="link.href"
                  [attr.target]="link.external ? '_blank' : null"
                  [attr.rel]="link.external ? 'noreferrer' : null"
                >
                  {{ link.label }}
                </a>
              }
            }
          </nav>

          <div class="ns-desktop-actions">
            <button
              type="button"
              class="ns-theme-toggle"
              [attr.aria-label]="
                theme === 'dark'
                  ? 'Switch to light theme'
                  : 'Switch to dark theme'
              "
              (click)="toggleTheme()"
            >
              @if (theme === 'dark') {
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path
                    d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                  />
                </svg>
              } @else {
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.8 6.8 0 0 0 21 12.8Z"
                  />
                </svg>
              }
            </button>

            @if (authUser) {
              <div class="ns-user-menu">
                <button
                  type="button"
                  class="ns-avatar-button"
                  aria-label="Open profile menu"
                  [attr.aria-expanded]="profileMenuOpen"
                  (click)="toggleProfileMenu()"
                >
                  @if (authUser.avatar) {
                    <img
                      [src]="authUser.avatar"
                      [alt]="authUser.name ?? 'User avatar'"
                    />
                  } @else {
                    {{ userInitials(authUser) }}
                  }
                </button>
                @if (profileMenuOpen) {
                  <div class="ns-profile-dropdown">
                    <div class="ns-profile-header">
                      <p class="ns-profile-name">
                        {{ authUser.name ?? 'Skill to Life user' }}
                      </p>
                      <p class="ns-profile-email">{{ authUser.email }}</p>
                    </div>
                    <a
                      class="ns-profile-item"
                      routerLink="/profile"
                      [queryParams]="{ tab: 'profile' }"
                      (click)="closeMenus()"
                      >My profile</a
                    >
                    <a
                      class="ns-profile-item"
                      routerLink="/profile"
                      [queryParams]="{ tab: 'results' }"
                      (click)="closeMenus()"
                      >My results</a
                    >
                    <a
                      class="ns-profile-item"
                      routerLink="/profile"
                      [queryParams]="{ tab: 'saved' }"
                      (click)="closeMenus()"
                      >Saved careers</a
                    >
                    <a
                      class="ns-profile-item"
                      routerLink="/profile"
                      [queryParams]="{ tab: 'cv' }"
                      (click)="closeMenus()"
                      >CV analysis</a
                    >
                    <div class="ns-profile-divider"></div>
                    <button
                      type="button"
                      class="ns-profile-item ns-profile-signout"
                      (click)="emitSignOut()"
                    >
                      Sign out
                    </button>
                  </div>
                }
              </div>
            } @else {
              @if (showDevLogin) {
                <button
                  type="button"
                  class="ns-dev-login"
                  (click)="devLogin.emit()"
                >
                  Dev login
                </button>
              }
              <button type="button" class="ns-sign-in" (click)="signIn.emit()">
                Sign in
              </button>
              <a
                class="ns-start-assessment nav-cta-primary"
                href="#assessment"
                >Start assessment</a
              >
            }
          </div>

          <div class="ns-mobile-actions">
            <button
              type="button"
              class="ns-theme-toggle ns-theme-toggle-mobile"
              [attr.aria-label]="
                theme === 'dark'
                  ? 'Switch to light theme'
                  : 'Switch to dark theme'
              "
              (click)="toggleTheme()"
            >
              @if (theme === 'dark') {
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path
                    d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                  />
                </svg>
              } @else {
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.8 6.8 0 0 0 21 12.8Z"
                  />
                </svg>
              }
            </button>

            @if (authUser) {
              <button
                type="button"
                class="ns-avatar-button"
                aria-label="Open profile menu"
                [attr.aria-expanded]="profileMenuOpen"
                (click)="toggleProfileMenu()"
              >
                @if (authUser.avatar) {
                  <img
                    [src]="authUser.avatar"
                    [alt]="authUser.name ?? 'User avatar'"
                  />
                } @else {
                  {{ userInitials(authUser) }}
                }
              </button>
            } @else {
              <button
                type="button"
                class="ns-mobile-sign-in"
                aria-label="Sign in"
                (click)="signIn.emit()"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="8" r="4" />
                </svg>
              </button>
            }

            <button
              type="button"
              class="ns-menu-toggle"
              [attr.aria-expanded]="mobileMenuOpen"
              aria-controls="mobile-nav"
              aria-label="Toggle navigation"
              (click)="toggleMobileMenu()"
            >
              <span aria-hidden="true">{{ mobileMenuOpen ? 'x' : '☰' }}</span>
            </button>
          </div>
        </div>

        @if (profileMenuOpen && authUser) {
          <div class="ns-mobile-profile">
            <div class="ns-profile-header">
              <p class="ns-profile-name">
                {{ authUser.name ?? 'Skill to Life user' }}
              </p>
              <p class="ns-profile-email">{{ authUser.email }}</p>
            </div>
            <a
              class="ns-profile-item"
              routerLink="/profile"
              [queryParams]="{ tab: 'profile' }"
              (click)="closeMenus()"
              >My profile</a
            >
            <a
              class="ns-profile-item"
              routerLink="/profile"
              [queryParams]="{ tab: 'results' }"
              (click)="closeMenus()"
              >My results</a
            >
            <a
              class="ns-profile-item"
              routerLink="/profile"
              [queryParams]="{ tab: 'saved' }"
              (click)="closeMenus()"
              >Saved careers</a
            >
            <a
              class="ns-profile-item"
              routerLink="/profile"
              [queryParams]="{ tab: 'cv' }"
              (click)="closeMenus()"
              >CV analysis</a
            >
            <div class="ns-profile-divider"></div>
            <button
              type="button"
              class="ns-profile-item ns-profile-signout"
              (click)="emitSignOut()"
            >
              Sign out
            </button>
          </div>
        }

        @if (mobileMenuOpen) {
          <div id="mobile-nav" class="ns-mobile-menu">
            <nav class="ns-mobile-links" aria-label="Mobile navigation">
              @for (link of links; track link.label) {
                @if (link.routerLink) {
                  <a
                    class="ns-mobile-link"
                    routerLinkActive="is-active"
                    [routerLink]="link.routerLink"
                    [fragment]="link.fragment"
                    (click)="closeMenus()"
                  >
                    {{ link.label }}
                  </a>
                } @else {
                  <a
                    class="ns-mobile-link"
                    [href]="link.href"
                    [attr.target]="link.external ? '_blank' : null"
                    [attr.rel]="link.external ? 'noreferrer' : null"
                    (click)="closeMenus()"
                  >
                    {{ link.label }}
                  </a>
                }
              }
            </nav>

            @if (!authUser) {
              <div class="ns-mobile-ctas">
                @if (showDevLogin) {
                  <button
                    type="button"
                    class="ns-dev-login"
                    (click)="devLogin.emit()"
                  >
                    Dev login
                  </button>
                }
                <a
                  class="ns-start-assessment nav-cta-primary"
                  href="#assessment"
                  (click)="closeMenus()"
                  >Start assessment</a
                >
              </div>
            }
          </div>
        }
      </header>

      <ns-growth-bricks />

      <main id="main-content" class="app-content relative z-[1]" tabindex="-1">
        <ng-content />
      </main>
      <ns-cookie-notice />
      <ns-external-link-modal />
    </div>
  `,
  styles: [
    `
      .skip-link {
        position: fixed;
        left: 16px;
        top: 16px;
        z-index: 100;
        transform: translateY(-150%);
        border-radius: var(--radius-sm, var(--ns-radius-sm));
        background: var(--color-bg-card, var(--ns-color-card));
        color: var(--color-text, var(--ns-color-text));
        padding: 8px 14px;
        font-size: 14px;
        font-weight: 600;
      }

      .skip-link:focus {
        transform: translateY(0);
      }

      .ns-nav-shell {
        position: sticky;
        top: 0;
        z-index: 50;
        isolation: isolate;
        border-bottom: 1px solid var(--color-border, var(--ns-color-border));
        background: rgba(10, 10, 15, 0.92);
        backdrop-filter: blur(16px);
      }

      :host-context([data-theme='light']) .ns-nav-shell {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        background: rgba(248, 249, 250, 0.95);
      }

      .ns-nav-inner {
        max-width: 80rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 16px;
      }

      @media (min-width: 640px) {
        .ns-nav-inner {
          padding-left: 24px;
          padding-right: 24px;
        }
      }

      @media (min-width: 1024px) {
        .ns-nav-inner {
          padding-left: 32px;
          padding-right: 32px;
        }
      }

      .ns-brand {
        display: inline-flex;
        align-items: center;
        color: var(--color-text, var(--ns-color-text));
        text-decoration: none;
        flex-shrink: 0;
        min-height: 40px;
      }

      .ns-brand-picture {
        display: inline-flex;
        align-items: center;
      }

      .ns-brand-logo {
        display: block;
        object-fit: contain;
      }

      .ns-brand-logo-full {
        width: clamp(120px, 30vw, 180px);
        height: 36px;
      }

      .ns-brand-logo-full-light {
        display: none;
      }

      :host-context([data-theme='light']) .ns-brand-logo-full-dark {
        display: none;
      }

      :host-context([data-theme='light']) .ns-brand-logo-full-light {
        display: block;
      }

      .ns-brand-logo-mark {
        display: none;
        width: 38px;
        height: 38px;
      }

      .ns-brand-sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }

      .ns-nav-links {
        display: none;
        align-items: center;
        gap: 2px;
      }

      @media (min-width: 1024px) {
        .ns-nav-links {
          display: flex;
        }
      }

      .ns-nav-link,
      .ns-mobile-link {
        color: var(--color-text-secondary, var(--ns-color-muted));
        text-decoration: none;
        transition:
          color var(--ns-motion-base) ease,
          background-color var(--ns-motion-base) ease;
      }

      :host-context([data-theme='light']) .ns-nav-link,
      :host-context([data-theme='light']) .ns-mobile-link {
        color: #5f6368;
      }

      .ns-nav-link {
        border: 0;
        background: transparent;
        border-radius: var(--radius-sm, var(--ns-radius-sm));
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 400;
      }

      .ns-nav-link:hover,
      .ns-nav-link.is-active {
        color: var(--color-text, var(--ns-color-text));
      }

      .ns-nav-link:hover {
        background: var(--color-bg-secondary, var(--ns-color-canvas-subtle));
      }

      .ns-nav-link.is-active {
        font-weight: 600;
        background: transparent;
      }

      :host-context([data-theme='light']) .ns-nav-link:hover,
      :host-context([data-theme='light']) .ns-nav-link.is-active {
        color: #0a0a0f;
      }

      .ns-desktop-actions {
        display: none;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }

      @media (min-width: 768px) {
        .ns-desktop-actions {
          display: flex;
        }
      }

      .ns-theme-toggle,
      .ns-dev-login,
      .ns-sign-in,
      .ns-start-assessment,
      .ns-menu-toggle,
      .ns-mobile-sign-in {
        border-radius: var(--radius-sm, var(--ns-radius-sm));
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        min-height: 34px;
      }

      .ns-theme-toggle {
        width: 36px;
        display: grid;
        place-items: center;
        border: 1px solid var(--color-border, var(--ns-color-border));
        background: transparent;
        color: var(--color-text-secondary, var(--ns-color-muted));
        padding: 0;
      }

      .ns-theme-toggle svg {
        width: 17px;
        height: 17px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .ns-theme-toggle:hover,
      .ns-sign-in:hover,
      .ns-menu-toggle:hover,
      .ns-mobile-sign-in:hover {
        border-color: var(--color-border-strong);
        color: var(--color-text, var(--ns-color-text));
        background: var(--color-bg-secondary, var(--ns-color-canvas-subtle));
      }

      .ns-sign-in {
        border: 1px solid var(--color-border-strong);
        background: transparent;
        color: var(--color-text, var(--ns-color-text));
        padding: 7px 16px;
      }

      .ns-dev-login {
        border: 1px dashed rgba(163, 230, 53, 0.4);
        border-radius: var(--radius-sm, var(--ns-radius-sm));
        background: transparent;
        color: rgba(163, 230, 53, 0.72);
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        min-height: 30px;
        padding: 4px 10px;
      }

      .ns-dev-login:hover {
        background: rgba(163, 230, 53, 0.08);
        color: rgba(163, 230, 53, 0.92);
      }

      :host-context([data-theme='light']) .ns-dev-login {
        border-color: var(--color-text, var(--ns-color-text));
        color: var(--color-text, var(--ns-color-text));
      }

      :host-context([data-theme='light']) .ns-dev-login:hover {
        background: var(--color-bg-secondary, var(--ns-color-canvas-subtle));
        border-color: var(--color-text, var(--ns-color-text));
        color: var(--color-text, var(--ns-color-text));
      }

      .ns-sign-in:hover {
        border-color: var(--color-accent, var(--ns-color-primary));
        color: var(--color-accent, var(--ns-color-primary));
      }

      .ns-start-assessment {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-accent, var(--ns-color-primary));
        background: var(--color-accent, var(--ns-color-primary));
        color: var(--ns-color-primary-fg);
        padding: 7px 16px;
        text-decoration: none;
      }

      .ns-start-assessment:hover {
        background: var(--color-accent-hover, var(--ns-color-primary-hover));
      }

      .ns-user-menu {
        position: relative;
      }

      .ns-avatar-button {
        width: 32px;
        height: 32px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border: 0;
        border-radius: 50%;
        background: var(--color-accent, var(--ns-color-primary));
        color: #ffffff;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        padding: 0;
      }

      .ns-avatar-button img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }

      .ns-profile-dropdown {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        min-width: 200px;
        padding: 8px;
        border: 1px solid var(--color-border, var(--ns-color-border));
        border-radius: var(--radius-md, var(--ns-radius-md));
        background: var(--color-bg-card, var(--ns-color-card));
        box-shadow: var(--shadow-lg, var(--ns-shadow-lg));
      }

      .ns-profile-header {
        padding: 8px 12px 12px;
        border-bottom: 1px solid var(--color-border, var(--ns-color-border));
        margin-bottom: 4px;
      }

      .ns-profile-name,
      .ns-profile-email {
        margin: 0;
      }

      .ns-profile-name {
        color: var(--color-text, var(--ns-color-text));
        font-size: 14px;
        font-weight: 600;
      }

      .ns-profile-email {
        margin-top: 2px;
        color: var(--color-text-secondary, var(--ns-color-muted));
        font-size: 12px;
      }

      .ns-profile-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 0;
        border-radius: var(--radius-sm, var(--ns-radius-sm));
        background: transparent;
        color: var(--color-text, var(--ns-color-text));
        cursor: pointer;
        padding: 8px 12px;
        text-align: left;
        text-decoration: none;
        font: inherit;
        font-size: 14px;
      }

      .ns-profile-item:hover {
        background: var(--color-bg-secondary, var(--ns-color-canvas-subtle));
      }

      .ns-profile-divider {
        height: 1px;
        margin: 4px 0;
        background: var(--color-border, var(--ns-color-border));
      }

      .ns-profile-signout {
        color: var(--color-error, var(--ns-color-danger));
      }

      .ns-profile-signout:hover {
        background: var(--color-error-light, var(--ns-color-danger-soft));
      }

      .ns-mobile-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      @media (min-width: 768px) {
        .ns-mobile-actions {
          display: none;
        }
      }

      .ns-menu-toggle,
      .ns-mobile-sign-in {
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        border: 1px solid var(--color-border, var(--ns-color-border));
        background: transparent;
        color: var(--color-text, var(--ns-color-text));
      }

      .ns-mobile-sign-in svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .ns-mobile-profile {
        position: absolute;
        top: calc(100% + 8px);
        right: 16px;
        z-index: 70;
        width: min(260px, calc(100vw - 32px));
        max-width: 240px;
        margin: 0;
        padding: 8px;
        border: 1px solid var(--color-border, var(--ns-color-border));
        border-radius: var(--radius-md, var(--ns-radius-md));
        background: var(--color-bg-card, var(--ns-color-card));
        box-shadow: var(--shadow-lg, var(--ns-shadow-lg));
      }

      @media (min-width: 768px) {
        .ns-mobile-profile {
          display: none;
        }
      }

      .ns-mobile-menu {
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
        z-index: 60;
        border-top: 1px solid var(--color-border, var(--ns-color-border));
        border-bottom: 0;
        background: var(--color-bg-card, var(--ns-color-card));
        box-shadow: var(--shadow-lg, var(--ns-shadow-lg));
        padding: 16px;
      }

      .ns-mobile-links {
        display: grid;
        gap: 2px;
      }

      .ns-mobile-link {
        border-radius: var(--radius-sm, var(--ns-radius-sm));
        padding: 12px 16px;
        font-size: 15px;
      }

      .ns-mobile-link:hover {
        color: var(--color-text, var(--ns-color-text));
        background: var(--color-bg-secondary, var(--ns-color-canvas-subtle));
      }

      .ns-mobile-link.is-active {
        color: var(--color-text, var(--ns-color-text));
        font-weight: 600;
      }

      .ns-mobile-ctas {
        display: grid;
        gap: 8px;
        margin-top: 14px;
      }
    `,
  ],
})
export class NsAppShellComponent implements OnInit {
  @Input() brand = 'Skill to Life';
  @Input() links: NsAppShellLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Resources', routerLink: '/resources' },
  ];
  @Input() authUser: NsAuthUser | null = null;
  @Input() devMode = false;
  @Output() signIn = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<void>();
  @Output() devLogin = new EventEmitter<void>();

  theme: 'dark' | 'light' = 'dark';
  mobileMenuOpen = false;
  profileMenuOpen = false;

  get showDevLogin(): boolean {
    return this.devMode && this.isLocalhost();
  }

  ngOnInit(): void {
    const savedTheme = this.readSavedTheme();
    this.setTheme(savedTheme ?? 'dark');
  }

  toggleTheme(): void {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  closeMenus(): void {
    this.mobileMenuOpen = false;
    this.profileMenuOpen = false;
  }

  emitSignOut(): void {
    this.closeMenus();
    this.signOut.emit();
  }

  userInitials(user: NsAuthUser): string {
    const source = user.name?.trim() || user.email;
    return source
      .split(/\s+|@/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  private setTheme(theme: 'dark' | 'light'): void {
    this.theme = theme;

    try {
      globalThis.localStorage?.setItem('skill-to-life-theme', theme);
      globalThis.document?.documentElement.setAttribute('data-theme', theme);
    } catch {
      // Theme persistence is progressive enhancement.
    }
  }

  private readSavedTheme(): 'dark' | 'light' | null {
    try {
      const savedTheme = globalThis.localStorage?.getItem(
        'skill-to-life-theme',
      );

      return savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : null;
    } catch {
      return null;
    }
  }

  private isLocalhost(): boolean {
    try {
      const hostname = globalThis.window?.location.hostname;
      return (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '::1'
      );
    } catch {
      return false;
    }
  }
}
