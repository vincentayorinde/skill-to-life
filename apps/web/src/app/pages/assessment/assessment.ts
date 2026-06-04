import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NsOptionCardComponent, NsProgressComponent } from 'ui';
import { ASSESSMENT_QUESTIONS, MICROCOPY } from './questions.data';
import { AssessmentStateService } from '../../services/assessment-state.service';

const STORAGE_KEY = 'ns_assessment_progress';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [NsOptionCardComponent, NsProgressComponent],
  styles: [
    `
      .question-panel {
        transition:
          opacity 150ms ease-out,
          transform 150ms ease-out;
      }
      .question-panel.fading {
        opacity: 0;
        transform: translateX(-10px);
      }
      .resume-banner {
        animation: fadeIn 200ms ease-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
  template: `
    <div
      class="flex min-h-screen flex-col bg-ns-bg text-ns-text"
      data-theme="dark"
    >
      <!-- Header -->
      <header
        class="sticky top-0 z-10 border-b border-ns-border bg-ns-nav backdrop-blur-xl"
      >
        <div
          class="mx-auto flex max-w-2xl items-center gap-4 px-4 py-3 sm:px-6"
        >
          <button
            type="button"
            class="shrink-0 text-sm font-semibold text-ns-muted no-underline hover:text-ns-text focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
            (click)="exitAssessment()"
            aria-label="Exit assessment and go to home"
          >
            ← Exit
          </button>

          <div class="flex flex-1 flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-ns-muted">
                Step {{ currentStep() }} of {{ total }}
              </span>
              <span class="text-xs font-bold text-ns-primary">
                {{ progressRounded() }}%
              </span>
            </div>
            <ns-progress
              [value]="progressPercent()"
              [max]="100"
              label="Assessment progress"
            />
          </div>
        </div>
      </header>

      <!-- Resume banner -->
      @if (showResumeBanner()) {
        <div
          class="resume-banner border-b border-ns-border bg-ns-canvasSubtle px-4 py-2.5 sm:px-6"
          role="status"
          aria-live="polite"
        >
          <div
            class="mx-auto flex max-w-2xl items-center justify-between gap-3"
          >
            <span class="text-xs text-ns-muted"
              >↩ Picking up where you left off</span
            >
            <button
              type="button"
              class="text-xs font-semibold text-ns-primary hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              (click)="startOver()"
            >
              Start over
            </button>
          </div>
        </div>
      }

      <!-- Main -->
      <main
        class="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10 sm:px-6"
        id="assessment-main"
      >
        <div class="question-panel" [class.fading]="isFading()" #questionPanel>
          <!-- Question -->
          <h1
            class="m-0 text-2xl font-bold leading-snug text-ns-text sm:text-3xl"
            [id]="'q-' + currentIndex()"
          >
            {{ currentQuestion().text }}
          </h1>

          <!-- Options -->
          <div
            class="mt-6 flex flex-col gap-3"
            role="radiogroup"
            [attr.aria-labelledby]="'q-' + currentIndex()"
            #optionContainer
          >
            @for (
              option of currentQuestion().options;
              track option.label;
              let i = $index
            ) {
              <ns-option-card
                [title]="option.label"
                [description]="option.description"
                [icon]="option.emoji"
                [selected]="selectedOption() === option.label"
                [attr.aria-label]="option.emoji + ' ' + option.label"
                (optionSelected)="selectOption(option.label)"
              />
            }
          </div>

          <!-- Navigation -->
          <div class="mt-8 flex items-center justify-between gap-3">
            @if (!isFirst()) {
              <button
                type="button"
                class="inline-flex min-h-12 items-center gap-2 rounded-ns border border-ns-border bg-ns-card px-5 text-sm font-semibold text-ns-muted transition duration-base ease-ns hover:border-ns-primary hover:text-ns-text focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                (click)="back()"
              >
                ← Back
              </button>
            } @else {
              <span></span>
            }

            <button
              type="button"
              class="inline-flex min-h-12 items-center gap-2 rounded-ns border border-ns-primary bg-ns-primary px-6 text-sm font-semibold text-[#07111f] shadow-ns transition duration-base ease-ns hover:border-ns-primaryHover hover:bg-ns-primaryHover hover:shadow-glow focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus disabled:pointer-events-none disabled:opacity-50"
              [disabled]="!selectedOption()"
              (click)="next()"
            >
              {{ isLast() ? 'See my results' : 'Next →' }}
            </button>
          </div>
        </div>
      </main>

      <!-- Microcopy footer -->
      <footer class="py-6 text-center">
        <p class="text-sm text-ns-muted">{{ microcopy() }}</p>
      </footer>
    </div>
  `,
})
export class AssessmentComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly stateService = inject(AssessmentStateService);
  private readonly optionContainer = viewChild<ElementRef>('optionContainer');
  private savedTheme: string | null = null;
  private startedAt = new Date().toISOString();
  private resumeTimer: ReturnType<typeof setTimeout> | null = null;

  readonly questions = ASSESSMENT_QUESTIONS;
  readonly total = ASSESSMENT_QUESTIONS.length;

  readonly currentIndex = signal(0);
  readonly answers = signal<Record<number, string>>({});
  readonly selectedOption = signal<string | null>(null);
  readonly isFading = signal(false);
  readonly showResumeBanner = signal(false);
  isComplete = false;
  private isTransitioning = false;

  readonly currentQuestion = computed(
    () => this.questions[this.currentIndex()],
  );
  readonly isFirst = computed(() => this.currentIndex() === 0);
  readonly isLast = computed(() => this.currentIndex() === this.total - 1);
  // currentStep is capped at total to prevent any display overshoot.
  readonly currentStep = computed(() =>
    Math.min(this.currentIndex() + 1, this.total),
  );
  // progressPercent rounds and caps at 100 — safe against any index edge case.
  readonly progressPercent = computed(() =>
    Math.min(Math.round((this.currentStep() / this.total) * 100), 100),
  );
  readonly progressRounded = computed(() => this.progressPercent());
  readonly microcopy = computed(() => {
    const i = this.currentIndex();
    if (i < 3) return MICROCOPY['early'];
    if (i < 6) return MICROCOPY['mid'];
    if (i < 9) return MICROCOPY['late'];
    return MICROCOPY['final'];
  });

  hasAnswers(): boolean {
    return Object.keys(this.answers()).length > 0;
  }

  selectOption(label: string): void {
    this.selectedOption.set(label);
    this.saveProgress();
  }

  async next(): Promise<void> {
    // Prevent double-tap on mobile from firing twice during the 150ms transition.
    if (this.isTransitioning) return;
    if (!this.selectedOption()) return;

    const chosen = this.selectedOption();
    if (!chosen) return;

    this.answers.update((a) => ({ ...a, [this.currentIndex()]: chosen }));
    this.saveProgress();

    if (this.isLast()) {
      this.isComplete = true;
      this.clearProgress();
      this.stateService.save(this.answers());
      await this.router.navigate(['/assessment/results']);
      return;
    }

    this.isTransitioning = true;
    this.isFading.set(true);
    await delay(150);

    this.currentIndex.update((i) => i + 1);
    this.selectedOption.set(this.answers()[this.currentIndex()] ?? null);

    this.isFading.set(false);
    await delay(0);
    this.isTransitioning = false;
    this.focusFirstOption();
  }

  async back(): Promise<void> {
    if (this.isFirst() || this.isTransitioning) return;

    this.isTransitioning = true;
    this.isFading.set(true);
    await delay(150);

    this.currentIndex.update((i) => i - 1);
    this.selectedOption.set(this.answers()[this.currentIndex()] ?? null);

    this.isFading.set(false);
    await delay(0);
    this.isTransitioning = false;
    this.focusFirstOption();
  }

  startOver(): void {
    this.clearProgress();
    this.showResumeBanner.set(false);
    if (this.resumeTimer !== null) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = null;
    }
    this.currentIndex.set(0);
    this.answers.set({});
    this.selectedOption.set(null);
    this.startedAt = new Date().toISOString();
  }

  exitAssessment(): void {
    // Navigation proceeds through the CanDeactivate guard.
    // Progress is intentionally preserved so the user can resume later.
    void this.router.navigate(['/']);
  }

  @HostListener('keydown', ['$event'])
  handleArrowKeys(event: KeyboardEvent): void {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();

    const container = this.optionContainer()?.nativeElement as
      | HTMLElement
      | undefined;
    if (!container) return;

    const buttons = Array.from(
      container.querySelectorAll('button'),
    ) as HTMLElement[];
    const focused = document.activeElement as HTMLElement;
    const idx = buttons.indexOf(focused);

    const next =
      event.key === 'ArrowDown'
        ? (idx + 1) % buttons.length
        : (idx - 1 + buttons.length) % buttons.length;

    buttons[next]?.focus();
  }

  private focusFirstOption(): void {
    setTimeout(() => {
      const container = this.optionContainer()?.nativeElement as
        | HTMLElement
        | undefined;
      (container?.querySelector('button') as HTMLElement | null)?.focus();
    }, 0);
  }

  private saveProgress(): void {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentQuestionIndex: this.currentIndex(),
          answers: this.answers(),
          selectedOption: this.selectedOption(),
          startedAt: this.startedAt,
        }),
      );
    } catch {
      // sessionStorage unavailable — not critical.
    }
  }

  private clearProgress(): void {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  private restoreProgress(): void {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as {
        currentQuestionIndex?: unknown;
        answers?: unknown;
        selectedOption?: unknown;
        startedAt?: unknown;
      };

      const qIdx =
        typeof parsed.currentQuestionIndex === 'number'
          ? parsed.currentQuestionIndex
          : -1;

      if (qIdx < 0 || qIdx >= this.total) {
        this.clearProgress();
        return;
      }

      // Validate each committed answer against the actual question options.
      const rawAnswers =
        typeof parsed.answers === 'object' && parsed.answers !== null
          ? (parsed.answers as Record<string, unknown>)
          : {};

      const validAnswers: Record<number, string> = {};
      for (const [key, val] of Object.entries(rawAnswers)) {
        const idx = Number(key);
        if (Number.isNaN(idx)) continue;
        const q = this.questions[idx];
        if (
          q &&
          typeof val === 'string' &&
          q.options.some((o) => o.label === val)
        ) {
          validAnswers[idx] = val;
        }
      }

      // Nothing meaningful to restore — clear and start fresh.
      if (Object.keys(validAnswers).length === 0 && qIdx === 0) {
        this.clearProgress();
        return;
      }

      this.currentIndex.set(qIdx);
      this.answers.set(validAnswers);

      if (typeof parsed.startedAt === 'string') {
        this.startedAt = parsed.startedAt;
      }

      // Restore the pending selection if it is still a valid option.
      const savedSelected =
        typeof parsed.selectedOption === 'string'
          ? parsed.selectedOption
          : null;
      const currentQ = this.questions[qIdx];
      if (
        savedSelected &&
        currentQ.options.some((o) => o.label === savedSelected)
      ) {
        this.selectedOption.set(savedSelected);
      } else {
        this.selectedOption.set(validAnswers[qIdx] ?? null);
      }

      this.showResumeBanner.set(true);
      this.resumeTimer = setTimeout(
        () => this.showResumeBanner.set(false),
        3000,
      );
    } catch {
      // Corrupted data — clear and start fresh.
      this.clearProgress();
    }
  }

  ngOnInit(): void {
    try {
      this.savedTheme = document.documentElement.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    } catch {
      // Non-browser environment — ignore.
    }
    this.restoreProgress();
  }

  ngOnDestroy(): void {
    if (this.resumeTimer !== null) {
      clearTimeout(this.resumeTimer);
    }
    try {
      if (this.savedTheme) {
        document.documentElement.setAttribute('data-theme', this.savedTheme);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    } catch {
      // Non-browser environment — ignore.
    }
  }
}
