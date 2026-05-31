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
          <a
            class="shrink-0 text-sm font-semibold text-ns-muted no-underline hover:text-ns-text"
            href="/"
            aria-label="Exit assessment and go to home"
            >← Exit</a
          >

          <div class="flex flex-1 flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-ns-muted">
                Step {{ currentIndex() + 1 }} of {{ total }}
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

  readonly questions = ASSESSMENT_QUESTIONS;
  readonly total = ASSESSMENT_QUESTIONS.length;

  readonly currentIndex = signal(0);
  readonly answers = signal<Record<number, string>>({});
  readonly selectedOption = signal<string | null>(null);
  readonly isFading = signal(false);
  isComplete = false;

  readonly currentQuestion = computed(
    () => this.questions[this.currentIndex()],
  );
  readonly isFirst = computed(() => this.currentIndex() === 0);
  readonly isLast = computed(() => this.currentIndex() === this.total - 1);
  readonly progressPercent = computed(
    () => ((this.currentIndex() + 1) / this.total) * 100,
  );
  readonly progressRounded = computed(() => Math.round(this.progressPercent()));
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
  }

  async next(): Promise<void> {
    if (!this.selectedOption()) return;

    const chosen = this.selectedOption();
    if (!chosen) return;

    this.answers.update((a) => ({ ...a, [this.currentIndex()]: chosen }));

    if (this.isLast()) {
      this.isComplete = true;
      this.stateService.save(this.answers());
      this.router.navigate(['/assessment/results']);
      return;
    }

    this.isFading.set(true);
    await delay(150);

    this.currentIndex.update((i) => i + 1);
    this.selectedOption.set(this.answers()[this.currentIndex()] ?? null);

    this.isFading.set(false);
    await delay(0);
    this.focusFirstOption();
  }

  async back(): Promise<void> {
    if (this.isFirst()) return;

    this.isFading.set(true);
    await delay(150);

    this.currentIndex.update((i) => i - 1);
    this.selectedOption.set(this.answers()[this.currentIndex()] ?? null);

    this.isFading.set(false);
    await delay(0);
    this.focusFirstOption();
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

  ngOnInit(): void {
    try {
      this.savedTheme = document.documentElement.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    } catch {
      // Non-browser environment — ignore.
    }
  }

  ngOnDestroy(): void {
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
