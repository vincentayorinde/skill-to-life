import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
} from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  CvAnalysisResult,
  SavedResource,
  UserProfile,
} from 'types';
import { AuthService } from '../../core/auth/auth.service';
import { CvAnalysisService } from '../../core/cv/cv-analysis.service';
import { ProfileService } from '../../core/profile/profile.service';
import { SavedService } from '../../core/saved/saved.service';
import { NsAppShellComponent, NsAppShellLink, NsExternalLinkService } from 'ui';

type TabId = 'profile' | 'overview' | 'saved' | 'resources' | 'results' | 'cv';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, DatePipe, FormsModule, RouterLink, NsAppShellComponent],
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
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        @if (loading()) {
          <div class="flex items-center justify-center py-20">
            <div class="h-8 w-8 animate-spin rounded-full border-2 border-ns-primary border-t-transparent"></div>
          </div>
        } @else if (profile()) {
          <div class="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">

            <!-- Sidebar -->
            <aside class="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <!-- Avatar + identity -->
              <div class="rounded-ns-lg border border-ns-border bg-ns-card p-5">
                <div class="mb-4 flex flex-col items-center text-center">
                  @if (currentUser()?.avatar) {
                    <img
                      [src]="currentUser()!.avatar"
                      [alt]="currentUser()!.name ?? 'User'"
                      class="mb-3 h-16 w-16 rounded-full border-2 border-ns-border"
                    />
                  } @else {
                    <div class="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-ns-primarySoft text-2xl font-bold text-ns-primary">
                      {{ (currentUser()?.name ?? currentUser()?.email ?? '?').charAt(0).toUpperCase() }}
                    </div>
                  }
                  <p class="text-base font-semibold text-ns-text">{{ currentUser()?.name }}</p>
                  <p class="text-sm text-ns-muted">{{ currentUser()?.email }}</p>
                </div>

                <div class="mt-4 rounded-ns bg-ns-canvasSubtle p-3">
                  <p class="text-xs font-medium text-ns-muted">Profile status</p>
                  <div class="mt-2 flex items-center justify-between gap-3">
                    <span class="text-sm text-ns-text">
                      {{ profile()!.isPublic ? 'Public' : 'Private' }}
                    </span>
                    <button
                      type="button"
                      class="text-xs font-medium text-ns-primary hover:underline"
                      (click)="activeTab.set('profile')"
                    >
                      Edit →
                    </button>
                  </div>
                </div>
              </div>

              <!-- Section menu -->
              <nav
                class="overflow-x-auto rounded-ns-lg border border-ns-border bg-ns-card p-2 shadow-ns lg:overflow-visible"
                aria-label="Profile sections"
              >
                <div class="flex min-w-max gap-1 lg:min-w-0 lg:flex-col">
                  @for (tab of tabs; track tab.id) {
                    <button
                      type="button"
                      class="whitespace-nowrap rounded-ns px-3 py-2 text-left text-sm font-medium transition-colors lg:w-full"
                      [class.bg-ns-canvasSubtle]="activeTab() === tab.id"
                      [class.text-ns-text]="activeTab() === tab.id"
                      [class.text-ns-muted]="activeTab() !== tab.id"
                      [class.hover:bg-ns-canvasSubtle]="activeTab() !== tab.id"
                      [class.hover:text-ns-text]="activeTab() !== tab.id"
                      (click)="activeTab.set(tab.id)"
                    >
                      {{ tab.label }}
                    </button>
                  }
                </div>
              </nav>
            </aside>

            <!-- Main content -->
            <div class="min-w-0">
              <!-- Tab: Profile -->
              @if (activeTab() === 'profile') {
                <div class="rounded-ns-lg border border-ns-border bg-ns-card p-4 shadow-ns sm:p-6">
                  <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h1 class="m-0 text-xl font-bold text-ns-text">Profile</h1>
                      <p class="mt-1 text-sm text-ns-muted">Update your public details and sharing settings.</p>
                    </div>
                    <button
                      type="button"
                      class="rounded-ns bg-ns-primary px-4 py-2 text-sm font-medium text-white hover:bg-ns-primaryHover disabled:opacity-50"
                      [disabled]="saving()"
                      (click)="saveProfile()"
                    >
                      {{ saving() ? 'Saving...' : 'Save profile' }}
                    </button>
                  </div>

                  <div class="grid gap-4 md:grid-cols-2">
                    <div>
                      <label for="profile-username" class="mb-1 block text-xs font-medium text-ns-muted">Username</label>
                      <input
                        id="profile-username"
                        type="text"
                        class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                        placeholder="your-username"
                        [(ngModel)]="editForm.username"
                      />
                    </div>
                    <div>
                      <label for="profile-current-role" class="mb-1 block text-xs font-medium text-ns-muted">Current role</label>
                      <input
                        id="profile-current-role"
                        type="text"
                        class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                        placeholder="Junior Developer"
                        [(ngModel)]="editForm.currentRole"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label for="profile-bio" class="mb-1 block text-xs font-medium text-ns-muted">Bio</label>
                      <textarea
                        id="profile-bio"
                        class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                        rows="4"
                        placeholder="Tell your story..."
                        [(ngModel)]="editForm.bio"
                      ></textarea>
                    </div>
                    <div>
                      <label for="profile-location" class="mb-1 block text-xs font-medium text-ns-muted">Location</label>
                      <input
                        id="profile-location"
                        type="text"
                        class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                        placeholder="London, UK"
                        [(ngModel)]="editForm.location"
                      />
                    </div>
                    <div>
                      <label for="profile-experience-level" class="mb-1 block text-xs font-medium text-ns-muted">Experience level</label>
                      <select
                        id="profile-experience-level"
                        class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                        [(ngModel)]="editForm.experienceLevel"
                      >
                        <option value="">Select level</option>
                        <option value="beginner">Complete beginner</option>
                        <option value="some-knowledge">Some knowledge</option>
                        <option value="some-experience">Some professional experience</option>
                        <option value="experienced">Experienced</option>
                      </select>
                    </div>
                    <div>
                      <label for="profile-website" class="mb-1 block text-xs font-medium text-ns-muted">Website</label>
                      <input
                        id="profile-website"
                        type="url"
                        class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                        placeholder="https://yoursite.com"
                        [(ngModel)]="editForm.website"
                      />
                    </div>
                    <div>
                      <label for="profile-linkedin" class="mb-1 block text-xs font-medium text-ns-muted">LinkedIn URL</label>
                      <input
                        id="profile-linkedin"
                        type="url"
                        class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                        placeholder="https://linkedin.com/in/..."
                        [(ngModel)]="editForm.linkedinUrl"
                      />
                    </div>
                    <div>
                      <label for="profile-github" class="mb-1 block text-xs font-medium text-ns-muted">GitHub URL</label>
                      <input
                        id="profile-github"
                        type="url"
                        class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                        placeholder="https://github.com/..."
                        [(ngModel)]="editForm.githubUrl"
                      />
                    </div>
                  </div>

                  <div class="mt-6 rounded-ns border border-ns-border bg-ns-canvasSubtle p-4">
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p class="m-0 text-sm font-medium text-ns-text">Public profile</p>
                        <p class="mt-1 text-xs text-ns-muted">Control whether your profile can be shared publicly.</p>
                      </div>
                      <button
                        type="button"
                        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                        [class.bg-ns-primary]="profile()!.isPublic"
                        [class.bg-ns-border]="!profile()!.isPublic"
                        (click)="toggleVisibility()"
                      >
                        <span
                          class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                          [class.translate-x-6]="profile()!.isPublic"
                          [class.translate-x-1]="!profile()!.isPublic"
                        ></span>
                      </button>
                    </div>
                    @if (profile()!.isPublic && profile()!.username) {
                      <div class="mt-4 rounded-ns bg-ns-card p-3">
                        <p class="mb-1 text-xs text-ns-muted">Your public URL:</p>
                        <div class="flex min-w-0 items-center gap-2">
                          <code class="min-w-0 flex-1 truncate text-xs text-ns-primary">skilltolife.com/u/{{ profile()!.username }}</code>
                          <button
                            type="button"
                            class="shrink-0 text-xs text-ns-muted hover:text-ns-text"
                            (click)="copyPublicUrl()"
                          >{{ copied() ? '✓' : 'Copy' }}</button>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Tab: Overview -->
              @if (activeTab() === 'overview') {
                <div class="space-y-6">
                  <!-- Stats -->
                  <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div class="rounded-ns-card border border-ns-border bg-ns-card p-4 text-center">
                      <p class="text-2xl font-bold text-ns-primary">{{ profile()!.savedCareers.length }}</p>
                      <p class="text-xs text-ns-muted">Saved careers</p>
                    </div>
                    <div class="rounded-ns-card border border-ns-border bg-ns-card p-4 text-center">
                      <p class="text-2xl font-bold text-ns-primary">{{ savedResourcesCount() }}</p>
                      <p class="text-xs text-ns-muted">Saved resources</p>
                    </div>
                    <div class="rounded-ns-card border border-ns-border bg-ns-card p-4 text-center">
                      <p class="text-2xl font-bold text-ns-primary">{{ results().length }}</p>
                      <p class="text-xs text-ns-muted">Assessments taken</p>
                    </div>
                    <div class="rounded-ns-card border border-ns-border bg-ns-card p-4 text-center">
                      <p class="text-2xl font-bold text-ns-primary">{{ analyses().length }}</p>
                      <p class="text-xs text-ns-muted">CV analyses</p>
                    </div>
                  </div>

                  <!-- Quick links -->
                  <div class="grid gap-3 sm:grid-cols-2">
                    <button type="button" class="rounded-ns-card border border-ns-border bg-ns-card p-4 text-left hover:border-ns-primary transition-colors" (click)="activeTab.set('cv')">
                      <p class="text-sm font-semibold text-ns-text">Analyse your CV →</p>
                      <p class="mt-0.5 text-xs text-ns-muted">Upload or paste your CV for AI career matching</p>
                    </button>
                    <button type="button" class="rounded-ns-card border border-ns-border bg-ns-card p-4 text-left hover:border-ns-primary transition-colors" (click)="activeTab.set('saved')">
                      <p class="text-sm font-semibold text-ns-text">Saved careers →</p>
                      <p class="mt-0.5 text-xs text-ns-muted">{{ profile()!.savedCareers.length }} career paths bookmarked</p>
                    </button>
                  </div>
                </div>
              }

              <!-- Tab: Saved Careers -->
              @if (activeTab() === 'saved') {
                <div>
                  @if (profile()!.savedCareers.length === 0) {
                    <div class="rounded-ns-lg border border-dashed border-ns-border py-16 text-center">
                      <p class="mb-2 text-base font-medium text-ns-text">No saved careers yet.</p>
                      <a routerLink="/careers" class="text-sm text-ns-primary no-underline hover:underline">Browse career paths →</a>
                    </div>
                  } @else {
                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      @for (career of profile()!.savedCareers; track career.id) {
                        <div class="rounded-ns-card border border-ns-border bg-ns-card p-4">
                          <div class="mb-2 flex items-start justify-between gap-2">
                            <div class="flex items-center gap-2">
                              <span class="text-xl">{{ career.careerEmoji }}</span>
                              <p class="text-sm font-semibold text-ns-text">{{ career.careerTitle }}</p>
                            </div>
                            <button
                              type="button"
                              class="text-ns-muted hover:text-ns-danger"
                              (click)="unsaveCareer(career.careerId)"
                              aria-label="Remove"
                            >✕</button>
                          </div>
                          @if (career.notes) {
                            <p class="mb-2 text-xs text-ns-muted">{{ career.notes }}</p>
                          }
                          <div class="flex items-center justify-between">
                            <span class="text-xs text-ns-muted">{{ career.savedAt | date:'mediumDate' }}</span>
                            <a [routerLink]="['/careers', career.careerSlug]" class="text-xs font-medium text-ns-primary no-underline hover:underline">View path →</a>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
              }

              <!-- Tab: Saved Resources -->
              @if (activeTab() === 'resources') {
                <div>
                  @if (savedResourcesCount() === 0) {
                    <div class="rounded-ns-lg border border-dashed border-ns-border py-16 text-center">
                      <p class="mb-2 text-base font-medium text-ns-text">No saved resources yet.</p>
                      <a routerLink="/resources" class="text-sm text-ns-primary no-underline hover:underline">Browse resources →</a>
                    </div>
                  } @else {
                    <div class="space-y-6">
                      @for (group of savedResourceGroups(); track group.label) {
                        <div>
                          <h3 class="mb-3 text-sm font-semibold text-ns-muted uppercase tracking-wider">{{ group.label }}</h3>
                          <div class="space-y-2">
                            @for (r of group.items; track r.id) {
                              <div class="flex items-center justify-between gap-4 rounded-ns border border-ns-border bg-ns-card px-4 py-3">
                                <div class="min-w-0 flex-1">
                                  <p class="truncate text-sm font-medium text-ns-text">{{ r.resourceTitle }}</p>
                                  <p class="text-xs text-ns-muted">{{ r.platform }}</p>
                                </div>
                                <div class="flex shrink-0 items-center gap-2">
                                  <span class="rounded-full border border-ns-border px-2 py-0.5 text-xs text-ns-muted">{{ r.type }}</span>
                                  <button type="button" (click)="openSavedResource(r)" class="text-xs font-medium text-ns-primary no-underline hover:underline">Open →</button>
                                  <button type="button" class="text-ns-muted hover:text-ns-danger text-xs" (click)="unsaveResource(r.resourceUrl)">✕</button>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
              }

              <!-- Tab: Results -->
              @if (activeTab() === 'results') {
                <div>
                  @if (results().length === 0) {
                    <div class="rounded-ns-lg border border-dashed border-ns-border py-16 text-center">
                      <p class="mb-2 text-base font-medium text-ns-text">No assessment results yet.</p>
                      <a routerLink="/assessment" class="text-sm text-ns-primary no-underline hover:underline">Take the assessment →</a>
                    </div>
                  } @else {
                    <div class="space-y-3">
                      @for (result of results(); track result.id) {
                        <div class="flex items-center justify-between gap-4 rounded-ns-card border border-ns-border bg-ns-card px-5 py-4">
                          <div>
                            <p class="text-sm font-semibold text-ns-text">{{ result.topCareer }}</p>
                            <p class="text-xs text-ns-muted">{{ result.topPercentage }}% match · {{ result.createdAt | date:'mediumDate' }}</p>
                          </div>
                          <a [routerLink]="['/assessment/results']" [queryParams]="{ id: result.id }" class="text-xs font-medium text-ns-primary no-underline hover:underline shrink-0">View result →</a>
                        </div>
                      }
                    </div>
                  }
                </div>
              }

              <!-- Tab: CV Analysis -->
              @if (activeTab() === 'cv') {
                <div>
                  @if (analyses().length === 0) {
                    <!-- Upload prompt -->
                    <div class="mb-6">
                      <h2 class="mb-1 text-xl font-bold text-ns-text">Analyse your CV</h2>
                      <p class="text-sm text-ns-muted">Upload your CV or paste your profile and our AI will match you to the best tech careers and tell you how to improve your profile.</p>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-3">
                      <!-- PDF upload -->
                      <div class="rounded-ns-lg border border-ns-border bg-ns-card p-5">
                        <svg class="mb-3 h-8 w-8 text-ns-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                        <h3 class="mb-1 text-sm font-semibold text-ns-text">Upload your CV</h3>
                        <p class="mb-3 text-xs text-ns-muted">PDF up to 5MB</p>
                        <label class="cursor-pointer">
                          <input type="file" accept="application/pdf" class="sr-only" (change)="onFileSelect($event)" />
                          <span class="inline-flex h-8 items-center rounded-ns border border-ns-border bg-ns-canvasSubtle px-3 text-xs font-medium text-ns-text hover:bg-ns-card">
                            {{ selectedFile() ? selectedFile()!.name : 'Choose file' }}
                          </span>
                        </label>
                      </div>

                      <!-- Text paste -->
                      <div class="rounded-ns-lg border border-ns-border bg-ns-card p-5">
                        <svg class="mb-3 h-8 w-8 text-ns-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        <h3 class="mb-1 text-sm font-semibold text-ns-text">Paste your CV or bio</h3>
                        <p class="mb-3 text-xs text-ns-muted">Any format — LinkedIn about, CV text, or a short bio</p>
                        <textarea
                          class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-2 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                          rows="4"
                          maxlength="10000"
                          placeholder="Paste your CV text here..."
                          [(ngModel)]="cvText"
                        ></textarea>
                        <p class="mt-1 text-right text-xs text-ns-muted">{{ cvText.length }}/10000</p>
                      </div>

                      <!-- LinkedIn URL -->
                      <div class="rounded-ns-lg border border-ns-border bg-ns-card p-5">
                        <svg class="mb-3 h-8 w-8 text-ns-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                        <h3 class="mb-1 text-sm font-semibold text-ns-text">Paste your LinkedIn URL</h3>
                        <p class="mb-3 text-xs text-ns-muted">We will extract your public profile</p>
                        <input
                          type="url"
                          class="w-full rounded-ns border border-ns-border bg-ns-bg px-3 py-1.5 text-sm text-ns-text focus:border-ns-primary focus:outline-none"
                          placeholder="https://linkedin.com/in/..."
                          [(ngModel)]="linkedinUrl"
                        />
                      </div>
                    </div>

                    <div class="mt-5">
                      <button
                        type="button"
                        class="rounded-ns bg-ns-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-ns-primaryHover disabled:opacity-50"
                        [disabled]="analysing() || !hasInput()"
                        (click)="runAnalysis()"
                      >
                        @if (analysing()) {
                          <span class="flex items-center gap-2">
                            <span class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                            Analysing your profile...
                          </span>
                        } @else {
                          Analyse my profile
                        }
                      </button>
                      @if (analysing()) {
                        <p class="mt-2 text-xs text-ns-muted">This takes about 15–30 seconds</p>
                      }
                      @if (analysisError()) {
                        <p class="mt-2 text-xs text-ns-danger">{{ analysisError() }}</p>
                      }
                    </div>

                  } @else {
                    <!-- Analysis results -->
                    <div class="space-y-8">
                      @for (analysis of analyses(); track analysis.id; let first = $first) {
                        <div [class.opacity-60]="!first" class="rounded-ns-lg border border-ns-border bg-ns-card p-6">
                          <div class="mb-6 flex items-center justify-between gap-4">
                            <div>
                              <p class="text-xs text-ns-muted">{{ analysis.createdAt | date:'medium' }} · {{ analysis.aiModel }}</p>
                            </div>
                            @if (first) {
                              <button type="button" class="text-xs font-medium text-ns-primary hover:underline" (click)="resetAndRunNew()">
                                Analyse new CV
                              </button>
                            }
                          </div>

                          <!-- Score ring -->
                          <div class="mb-8 flex flex-col items-center">
                            <div class="relative mb-3">
                              <svg width="120" height="120" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--ns-color-canvas-subtle)" stroke-width="10" />
                                <circle
                                  cx="60" cy="60" r="50"
                                  fill="none"
                                  [attr.stroke]="scoreColour(analysis.profileScore)"
                                  stroke-width="10"
                                  stroke-linecap="round"
                                  [attr.stroke-dasharray]="314"
                                  [attr.stroke-dashoffset]="314 - (314 * analysis.profileScore / 100)"
                                  transform="rotate(-90 60 60)"
                                />
                              </svg>
                              <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <span class="text-3xl font-bold text-ns-text">{{ analysis.profileScore }}</span>
                                <span class="text-xs text-ns-muted">/ 100</span>
                              </div>
                            </div>
                            <p class="text-base font-semibold text-ns-text">{{ scoreLabel(analysis.profileScore) }}</p>
                            <p class="mt-1 max-w-md text-center text-sm text-ns-muted">{{ parseFullAnalysis(analysis).summary }}</p>
                          </div>

                          <!-- Top Matches -->
                          <div class="mb-6">
                            <h3 class="mb-3 text-base font-semibold text-ns-text">Your best career matches</h3>
                            <div class="space-y-3">
                              @for (match of asMatches(analysis.topMatches); track match.careerId) {
                                <div class="rounded-ns border border-ns-border bg-ns-bg p-3">
                                  <div class="mb-1 flex items-center justify-between gap-2">
                                    <p class="text-sm font-semibold text-ns-text">{{ match.careerTitle }}</p>
                                    <div class="flex items-center gap-2">
                                      <span class="rounded-full px-2 py-0.5 text-xs font-medium"
                                        [class.bg-ns-successSoft]="match.tier === 'strong'"
                                        [class.text-ns-success]="match.tier === 'strong'"
                                        [class.bg-ns-warningSoft]="match.tier === 'good'"
                                        [class.text-ns-warning]="match.tier === 'good'"
                                        [class.bg-ns-canvasSubtle]="match.tier === 'possible'"
                                        [class.text-ns-muted]="match.tier === 'possible'"
                                      >{{ match.tier }}</span>
                                      <span class="text-sm font-bold text-ns-primary">{{ match.matchPercentage }}%</span>
                                    </div>
                                  </div>
                                  <div class="mb-1 h-1.5 w-full rounded-full bg-ns-canvasSubtle">
                                    <div class="h-1.5 rounded-full bg-ns-primary transition-all" [style.width.%]="match.matchPercentage"></div>
                                  </div>
                                  <p class="text-xs text-ns-muted">{{ match.matchReason }}</p>
                                  <a [routerLink]="['/careers', match.careerId]" class="mt-1 inline-block text-xs font-medium text-ns-primary no-underline hover:underline">View career path →</a>
                                </div>
                              }
                            </div>
                          </div>

                          <!-- Strengths -->
                          <div class="mb-6">
                            <h3 class="mb-3 text-base font-semibold text-ns-text">What your profile does well</h3>
                            <div class="space-y-2">
                              @for (s of asStrengths(analysis.strengths); track s.title) {
                                <div class="rounded-ns border-l-4 border-ns-success bg-ns-successSoft px-4 py-3">
                                  <p class="text-sm font-semibold text-ns-text">{{ s.title }}</p>
                                  <p class="text-xs text-ns-muted">{{ s.description }}</p>
                                </div>
                              }
                            </div>
                          </div>

                          <!-- Gaps -->
                          <div class="mb-6">
                            <h3 class="mb-3 text-base font-semibold text-ns-text">What is holding you back</h3>
                            <div class="space-y-2">
                              @for (g of asGaps(analysis.gaps); track g.title) {
                                <div class="rounded-ns border-l-4 border-ns-warning bg-ns-warningSoft px-4 py-3">
                                  <p class="text-sm font-semibold text-ns-text">{{ g.title }}</p>
                                  <p class="mb-1 text-xs text-ns-muted">{{ g.description }}</p>
                                  <div class="flex flex-wrap gap-1">
                                    @for (c of g.impactedCareers; track c) {
                                      <span class="rounded-full bg-ns-card px-2 py-0.5 text-xs text-ns-muted border border-ns-border">{{ c }}</span>
                                    }
                                  </div>
                                </div>
                              }
                            </div>
                          </div>

                          <!-- Improvements -->
                          <div class="mb-6">
                            <h3 class="mb-3 text-base font-semibold text-ns-text">How to strengthen your profile</h3>
                            <div class="space-y-2">
                              @for (imp of asImprovements(analysis.improvements); track imp.action) {
                                <div class="rounded-ns border border-ns-border bg-ns-bg px-4 py-3">
                                  <div class="mb-1 flex items-center gap-2">
                                    <span class="rounded-full px-2 py-0.5 text-xs font-semibold uppercase"
                                      [class.bg-ns-dangerSoft]="imp.priority === 'high'"
                                      [class.text-ns-danger]="imp.priority === 'high'"
                                      [class.bg-ns-warningSoft]="imp.priority === 'medium'"
                                      [class.text-ns-warning]="imp.priority === 'medium'"
                                      [class.bg-ns-canvasSubtle]="imp.priority === 'low'"
                                      [class.text-ns-muted]="imp.priority === 'low'"
                                    >{{ imp.priority }}</span>
                                    <p class="text-sm font-semibold text-ns-text">{{ imp.action }}</p>
                                  </div>
                                  <p class="mb-1 text-xs text-ns-muted">{{ imp.detail }}</p>
                                  <p class="text-xs text-ns-success">Could improve match by ~{{ imp.impactScore }}%</p>
                                </div>
                              }
                            </div>
                          </div>

                          <!-- Recommended next careers -->
                          <div>
                            <h3 class="mb-3 text-base font-semibold text-ns-text">Careers you could pursue now</h3>
                            <div class="grid gap-3 sm:grid-cols-2">
                              @for (rec of asRecommended(analysis.recommendedCareers); track rec.careerId) {
                                <div class="rounded-ns border border-ns-border bg-ns-bg p-4">
                                  <p class="mb-1 text-sm font-semibold text-ns-text">{{ rec.careerTitle }}</p>
                                  <p class="mb-1 text-xs text-ns-muted">{{ rec.whyNow }}</p>
                                  <div class="mb-2 flex items-center gap-3 text-xs text-ns-muted">
                                    <span>⏱ {{ rec.timeToReady }}</span>
                                    <span>Gap: {{ rec.keyGap }}</span>
                                  </div>
                                  <a [routerLink]="['/careers', rec.careerId]" class="text-xs font-medium text-ns-primary no-underline hover:underline">View roadmap →</a>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      }

                      <div class="flex gap-3">
                        <button type="button" class="rounded-ns border border-ns-border bg-ns-card px-4 py-2 text-sm font-medium text-ns-text hover:bg-ns-canvasSubtle" (click)="resetAndRunNew()">
                          Analyse new CV
                        </button>
                        <button type="button" class="rounded-ns bg-ns-primary px-4 py-2 text-sm font-medium text-white hover:bg-ns-primaryHover" (click)="runAnalysis()">
                          Re-analyse
                        </button>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }
      </div>
    </ns-app-shell>
  `,
})
export class ProfilePageComponent implements OnInit {
  readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly profileService = inject(ProfileService);

  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Salaries', routerLink: '/salaries' },
    { label: 'Resources', routerLink: '/resources' },
  ];
  private readonly savedService = inject(SavedService);
  private readonly cvService = inject(CvAnalysisService);
  private readonly externalLink = inject(NsExternalLinkService);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly analysing = signal(false);
  readonly copied = signal(false);

  readonly profile = signal<UserProfile | null>(null);
  readonly results = signal<{ id: string; topCareer: string; topPercentage: number; createdAt: string }[]>([]);
  readonly analyses = signal<CvAnalysisResult[]>([]);
  readonly savedResources = signal<Record<string, SavedResource[]>>({});
  readonly analysisError = signal<string | null>(null);
  readonly selectedFile = signal<File | null>(null);

  readonly activeTab = signal<TabId>('overview');
  readonly currentUser = computed(() => this.auth['_currentUser$'].value);

  cvText = '';
  linkedinUrl = '';

  editForm = {
    username: '',
    bio: '',
    location: '',
    website: '',
    linkedinUrl: '',
    githubUrl: '',
    currentRole: '',
    experienceLevel: '',
  };

  readonly tabs = [
    { id: 'profile' as TabId, label: 'Profile' },
    { id: 'overview' as TabId, label: 'Overview' },
    { id: 'saved' as TabId, label: 'Saved careers' },
    { id: 'resources' as TabId, label: 'Saved resources' },
    { id: 'results' as TabId, label: 'My results' },
    { id: 'cv' as TabId, label: 'CV analysis' },
  ];

  readonly savedResourcesCount = computed(() =>
    Object.values(this.savedResources()).reduce((acc, g) => acc + g.length, 0),
  );

  readonly savedResourceGroups = computed(() =>
    Object.entries(this.savedResources()).map(([label, items]) => ({ label, items })),
  );

  readonly hasInput = computed(
    () => !!this.selectedFile() || this.cvText.trim().length >= 100 || this.linkedinUrl.trim().length > 0,
  );

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['tab']) this.activeTab.set(params['tab'] as TabId);
    });

    this.loadAll();
  }

  private loadAll(): void {
    this.profileService.getProfile().subscribe({
      next: (p) => {
        this.profile.set(p);
        this.editForm = {
          username: p.username ?? '',
          bio: p.bio ?? '',
          location: p.location ?? '',
          website: p.website ?? '',
          linkedinUrl: p.linkedinUrl ?? '',
          githubUrl: p.githubUrl ?? '',
          currentRole: p.currentRole ?? '',
          experienceLevel: p.experienceLevel ?? '',
        };
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });

    this.savedService.getSavedResources().subscribe((r) => this.savedResources.set(r));
    this.cvService.getAnalyses().subscribe((a) => this.analyses.set(a));
    this.http
      .get<{ id: string; topCareer: string; topPercentage: number; createdAt: string }[]>(
        `${environment.apiUrl}/api/results`,
      )
      .subscribe({ next: (r) => this.results.set(r), error: () => {} });
  }

  saveProfile(): void {
    this.saving.set(true);
    this.profileService.updateProfile(this.editForm).subscribe({
      next: (p) => { this.profile.set(p); this.saving.set(false); },
      error: () => this.saving.set(false),
    });
  }

  toggleVisibility(): void {
    const current = this.profile();
    if (!current) return;
    this.profileService.toggleVisibility(!current.isPublic).subscribe((p) => this.profile.set(p));
  }

  copyPublicUrl(): void {
    const username = this.profile()?.username;
    if (!username) return;
    navigator.clipboard?.writeText(`https://skilltolife.com/u/${username}`);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  unsaveCareer(careerId: string): void {
    this.savedService.unsaveCareer(careerId).subscribe(() => {
      const p = this.profile();
      if (!p) return;
      this.profile.set({ ...p, savedCareers: p.savedCareers.filter((c) => c.careerId !== careerId) });
    });
  }

  unsaveResource(resourceUrl: string): void {
    this.savedService.unsaveResource(resourceUrl).subscribe(() => {
      const updated: Record<string, SavedResource[]> = {};
      for (const [key, items] of Object.entries(this.savedResources())) {
        const filtered = items.filter((r) => r.resourceUrl !== resourceUrl);
        if (filtered.length) updated[key] = filtered;
      }
      this.savedResources.set(updated);
    });
  }

  openSavedResource(resource: SavedResource): void {
    this.externalLink.openExternalLink({
      url: resource.resourceUrl,
      title: resource.resourceTitle,
      platform: resource.platform || this.externalLink.extractDomain(resource.resourceUrl),
      careerTitle: resource.careerTitle,
      cost: resource.type,
      context: 'resources',
    });
  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.selectedFile.set(file);
  }

  runAnalysis(): void {
    this.analysing.set(true);
    this.analysisError.set(null);

    const file = this.selectedFile();
    let obs;

    if (file) {
      obs = this.cvService.uploadCV(file);
    } else if (this.cvText.trim().length >= 100) {
      obs = this.cvService.analyseText(this.cvText);
    } else if (this.linkedinUrl.trim()) {
      obs = this.cvService.analyseLinkedIn(this.linkedinUrl);
    } else {
      this.analysisError.set('Please provide a CV to analyse.');
      this.analysing.set(false);
      return;
    }

    obs.subscribe({
      next: (result) => {
        this.analyses.set([result, ...this.analyses()]);
        this.analysing.set(false);
      },
      error: (err) => {
        this.analysisError.set(err?.error?.message ?? 'Analysis failed. Please try again.');
        this.analysing.set(false);
      },
    });
  }

  resetAndRunNew(): void {
    this.cvText = '';
    this.linkedinUrl = '';
    this.selectedFile.set(null);
    // Keep analyses visible but let user input new CV
  }

  scoreColour(score: number): string {
    if (score <= 50) return '#EA4335';
    if (score <= 65) return '#F9AB00';
    if (score <= 80) return '#006AFF';
    return '#1E8E3E';
  }

  scoreLabel(score: number): string {
    if (score <= 30) return 'Needs significant work';
    if (score <= 50) return 'Getting started';
    if (score <= 65) return 'Developing well';
    if (score <= 80) return 'Strong profile';
    if (score <= 90) return 'Very strong';
    return 'Exceptional';
  }

  parseFullAnalysis(analysis: CvAnalysisResult): { summary: string } {
    try {
      return JSON.parse(analysis.fullAnalysis ?? '{}');
    } catch {
      return { summary: '' };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asMatches(v: any) { return v as { careerId: string; careerTitle: string; matchPercentage: number; matchReason: string; tier: 'strong' | 'good' | 'possible' }[]; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asStrengths(v: any) { return v as { title: string; description: string }[]; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asGaps(v: any) { return v as { title: string; description: string; impactedCareers: string[] }[]; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asImprovements(v: any) { return v as { priority: string; action: string; detail: string; impactScore: number }[]; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asRecommended(v: any) { return v as { careerId: string; careerTitle: string; whyNow: string; timeToReady: string; keyGap: string }[]; }
}
