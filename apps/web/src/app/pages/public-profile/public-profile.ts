import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserProfile } from 'types';
import { AuthService } from '../../core/auth/auth.service';
import { ProfileService } from '../../core/profile/profile.service';
import { NsAppShellComponent, NsAppShellLink } from 'ui';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [AsyncPipe, RouterLink, NsAppShellComponent],
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
      <div class="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        @if (loading()) {
          <div class="flex items-center justify-center py-20">
            <div
              class="h-8 w-8 animate-spin rounded-full border-2 border-ns-primary border-t-transparent"
            ></div>
          </div>
        } @else if (notFound()) {
          <div class="py-20 text-center">
            <p class="text-base font-medium text-ns-text">
              This profile is private.
            </p>
            <a
              routerLink="/"
              class="mt-3 inline-block text-sm text-ns-primary no-underline hover:underline"
              >Go home →</a
            >
          </div>
        } @else if (profile()) {
          <!-- Header -->
          <div class="mb-8 flex items-center gap-5">
            @if (profile()!.user?.avatar) {
              <img
                [src]="profile()!.user!.avatar"
                [alt]="profile()!.user!.name ?? 'User'"
                class="h-16 w-16 rounded-full border-2 border-ns-border"
              />
            } @else {
              <div
                class="flex h-16 w-16 items-center justify-center rounded-full bg-ns-primarySoft text-2xl font-bold text-ns-primary"
              >
                {{ (profile()!.user?.name ?? '?').charAt(0).toUpperCase() }}
              </div>
            }
            <div>
              <h1 class="text-xl font-bold text-ns-text">
                {{ profile()!.user?.name }}
              </h1>
              @if (profile()!.currentRole) {
                <p class="text-sm text-ns-muted">
                  {{ profile()!.currentRole }}
                </p>
              }
              @if (profile()!.location) {
                <p class="text-xs text-ns-muted">
                  📍 {{ profile()!.location }}
                </p>
              }
            </div>
          </div>

          @if (profile()!.bio) {
            <p class="mb-8 text-sm leading-relaxed text-ns-text">
              {{ profile()!.bio }}
            </p>
          }

          <!-- Links -->
          @if (
            profile()!.website || profile()!.linkedinUrl || profile()!.githubUrl
          ) {
            <div class="mb-8 flex flex-wrap gap-3">
              @if (profile()!.website) {
                <a
                  [href]="profile()!.website"
                  target="_blank"
                  rel="noreferrer"
                  class="text-sm text-ns-primary no-underline hover:underline"
                  >🌐 Website</a
                >
              }
              @if (profile()!.linkedinUrl) {
                <a
                  [href]="profile()!.linkedinUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="text-sm text-ns-primary no-underline hover:underline"
                  >in LinkedIn</a
                >
              }
              @if (profile()!.githubUrl) {
                <a
                  [href]="profile()!.githubUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="text-sm text-ns-primary no-underline hover:underline"
                  >⌥ GitHub</a
                >
              }
            </div>
          }

          <!-- Stats -->
          <div class="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            @if (profile()!.savedCareers.length > 0) {
              <div
                class="rounded-ns-card border border-ns-border bg-ns-card p-4 text-center"
              >
                <p class="text-2xl font-bold text-ns-primary">
                  {{ profile()!.savedCareers.length }}
                </p>
                <p class="text-xs text-ns-muted">Career paths saved</p>
              </div>
            }
          </div>

          <!-- Saved careers -->
          @if (profile()!.savedCareers.length > 0) {
            <div class="mb-8">
              <h2 class="mb-4 text-base font-semibold text-ns-text">
                Interested in
              </h2>
              <div class="flex flex-wrap gap-2">
                @for (career of profile()!.savedCareers; track career.id) {
                  <a
                    [routerLink]="['/careers', career.careerSlug]"
                    class="inline-flex items-center gap-1.5 rounded-full border border-ns-border bg-ns-card px-3 py-1.5 text-sm text-ns-text no-underline hover:border-ns-primary hover:text-ns-primary transition-colors"
                  >
                    {{ career.careerEmoji }} {{ career.careerTitle }}
                  </a>
                }
              </div>
            </div>
          }

          <!-- CTA -->
          <div
            class="rounded-ns-lg border border-ns-border bg-ns-card p-6 text-center"
          >
            <p class="mb-2 text-base font-semibold text-ns-text">
              Want to see your career matches?
            </p>
            <p class="mb-4 text-sm text-ns-muted">
              Take the free Skill to Life assessment →
            </p>
            <a
              routerLink="/assessment"
              class="inline-flex items-center justify-center rounded-ns bg-ns-primary px-5 py-2.5 text-sm font-medium text-ns-primaryFg no-underline hover:bg-ns-primaryHover"
              >Take the free assessment</a
            >
          </div>
        }
      </div>
    </ns-app-shell>
  `,
})
export class PublicProfileComponent implements OnInit {
  readonly auth = inject(AuthService);
  private readonly profileService = inject(ProfileService);
  private readonly route = inject(ActivatedRoute);

  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Salaries', routerLink: '/salaries' },
    { label: 'Resources', routerLink: '/resources' },
  ];

  readonly loading = signal(true);
  readonly notFound = signal(false);
  readonly profile = signal<
    | (UserProfile & {
        user?: { name?: string; avatar?: string; email: string };
      })
    | null
  >(null);

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.profileService.getPublicProfile(username).subscribe({
      next: (p) => {
        this.profile.set(p as never);
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
  }
}
