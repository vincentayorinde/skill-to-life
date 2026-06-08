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
import { Title, Meta } from '@angular/platform-browser';
import { NsOptionCardComponent, NsProgressComponent } from 'ui';
import {
  ASSESSMENT_CATEGORIES,
  ASSESSMENT_QUESTIONS,
  CATEGORY_MICROCOPY,
} from './questions.data';
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
    <div class="flex min-h-screen flex-col bg-ns-bg text-ns-text">
      <!-- Header -->
      <header class="sticky top-0 z-10 border-b border-ns-border bg-ns-nav shadow-ns">
        <div class="mx-auto flex max-w-2xl items-center gap-4 px-4 py-3 sm:px-6">
          <button
            type="button"
            class="shrink-0 text-sm font-medium text-ns-muted hover:text-ns-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
            (click)="exitAssessment()"
            aria-label="Exit assessment and go to home"
          >← Exit</button>

          <div class="flex flex-1 flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-ns-primarySoft px-2.5 py-0.5 text-xs font-medium text-ns-primary">
                {{ currentCategory().emoji }} {{ currentCategory().label }}
                · Section {{ currentCategory().id }} of {{ categories.length }}
              </span>
              <span class="text-xs text-ns-muted">{{ currentStep() }} / {{ total }}</span>
            </div>
            <ns-progress [value]="progressPercent()" [max]="100" label="Assessment progress" />
          </div>
        </div>
      </header>

      <!-- Resume banner -->
      @if (showResumeBanner()) {
        <div
          class="resume-banner border-b border-ns-border bg-ns-primarySoft px-4 py-2.5 sm:px-6"
          role="status"
          aria-live="polite"
        >
          <div class="mx-auto flex max-w-2xl items-center justify-between gap-3">
            <span class="text-xs font-medium text-ns-primary">↩ Picking up where you left off</span>
            <button
              type="button"
              class="text-xs font-semibold text-ns-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
              (click)="startOver()"
            >Start over</button>
          </div>
        </div>
      }

      <!-- Main -->
      <main
        class="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10 sm:px-6"
        id="assessment-main"
      >
        @if (showCategoryTransition()) {
          <!-- Category transition card -->
          <button
            type="button"
            class="mx-auto flex w-full max-w-lg flex-col items-center rounded-ns-lg border border-ns-border bg-ns-card p-10 text-center shadow-ns-md transition-all hover:shadow-ns-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
            (click)="skipCategoryTransition()"
            aria-live="polite"
          >
            <span class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-ns-primarySoft text-5xl" aria-hidden="true">
              {{ currentCategory().emoji }}
            </span>
            <span class="mb-1 text-xs font-semibold uppercase tracking-widest text-ns-primary">Next section</span>
            <span class="text-2xl font-bold text-ns-text">{{ currentCategory().label }}</span>
            <span class="mt-2 text-sm leading-relaxed text-ns-muted">{{ currentCategory().description }}</span>
            <span class="mt-6 text-xs text-ns-muted">Tap to continue</span>
          </button>
        } @else {
          <!-- Question card -->
          <div
            class="question-panel rounded-ns-lg border border-ns-border bg-ns-card p-6 shadow-ns-md sm:p-8"
            [class.fading]="isFading()"
            #questionPanel
          >
            <!-- Question -->
            <h1
              class="m-0 mb-6 text-xl font-semibold leading-snug text-ns-text sm:text-2xl"
              [id]="'q-' + currentIndex()"
            >{{ currentQuestion().text }}</h1>

            <!-- Options -->
            <div
              class="flex flex-col gap-2.5"
              role="radiogroup"
              [attr.aria-labelledby]="'q-' + currentIndex()"
              #optionContainer
            >
              @for (option of currentQuestion().options; track option.label) {
                <ns-option-card
                  [title]="option.label"
                  [description]="option.description"
                  [icon]="option.emoji"
                  [selected]="selectedOption() === option.label"
                  [attr.aria-label]="option.emoji + ' ' + option.label"
                  class="block"
                  (optionSelected)="selectOption(option.label)"
                />
              }
            </div>

            <!-- Navigation -->
            <div class="mt-6 flex items-center justify-between gap-3 border-t border-ns-borderMuted pt-6">
              @if (!isFirst()) {
                <button
                  type="button"
                  class="inline-flex h-10 items-center gap-2 rounded-ns border border-ns-border bg-ns-card px-5 text-sm font-medium text-ns-muted transition-all duration-base hover:border-ns-primary hover:text-ns-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
                  (click)="back()"
                >← Back</button>
              } @else {
                <span></span>
              }
              <button
                type="button"
                class="inline-flex h-10 items-center gap-2 rounded-ns bg-ns-primary px-6 text-sm font-medium text-white shadow-ns transition-all duration-base hover:bg-ns-primaryHover hover:shadow-ns-md hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus disabled:pointer-events-none disabled:opacity-50"
                [disabled]="!selectedOption()"
                (click)="next()"
              >{{ isLast() ? 'See my results' : 'Next →' }}</button>
            </div>
          </div>
        }
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
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly optionContainer = viewChild<ElementRef>('optionContainer');
  private startedAt = new Date().toISOString();
  private resumeTimer: ReturnType<typeof setTimeout> | null = null;

  readonly categories = ASSESSMENT_CATEGORIES;
  readonly questions = ASSESSMENT_QUESTIONS;
  readonly total = ASSESSMENT_QUESTIONS.length;

  readonly currentIndex = signal(0);
  readonly answers = signal<Record<number, string>>({});
  readonly selectedOption = signal<string | null>(null);
  readonly isFading = signal(false);
  readonly showResumeBanner = signal(false);
  readonly showCategoryTransition = signal(false);
  isComplete = false;
  private isTransitioning = false;

  readonly currentQuestion = computed(
    () => this.questions[this.currentIndex()],
  );
  readonly currentCategoryIndex = computed(
    () => this.currentQuestion().categoryIndex,
  );
  readonly currentCategory = computed(
    () => this.categories[this.currentCategoryIndex()],
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
  readonly microcopy = computed(
    () => CATEGORY_MICROCOPY[this.currentCategory().slug],
  );

  hasAnswers(): boolean {
    return Object.keys(this.answers()).length > 0;
  }

  categorySegmentClass(index: number): string {
    if (index < this.currentCategoryIndex()) return 'bg-ns-primary';
    if (index === this.currentCategoryIndex()) return 'bg-ns-primary opacity-60';
    return 'bg-ns-borderMuted';
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

    const previousCategoryIndex = this.currentCategoryIndex();
    this.currentIndex.update((i) => i + 1);
    this.selectedOption.set(this.answers()[this.currentIndex()] ?? null);

    this.isFading.set(false);
    if (this.currentCategoryIndex() !== previousCategoryIndex) {
      await this.showTransitionCard();
    }
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

  skipCategoryTransition(): void {
    this.showCategoryTransition.set(false);
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

  private async showTransitionCard(): Promise<void> {
    this.showCategoryTransition.set(true);
    const startedAt = Date.now();

    while (this.showCategoryTransition() && Date.now() - startedAt < 1500) {
      await delay(50);
    }

    this.showCategoryTransition.set(false);
  }

  ngOnInit(): void {
    this.titleService.setTitle('Take the assessment — NextSkill');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Answer 30 scenario questions and discover which of 26 tech career paths fits how you think and work. Takes about 3 minutes.',
    });
    this.restoreProgress();
  }

  ngOnDestroy(): void {
    if (this.resumeTimer !== null) {
      clearTimeout(this.resumeTimer);
    }
  }
}
