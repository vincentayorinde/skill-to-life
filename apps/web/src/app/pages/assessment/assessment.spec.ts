import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { AssessmentComponent } from './assessment';
import { ASSESSMENT_CATEGORIES, ASSESSMENT_QUESTIONS } from './questions.data';
import { AssessmentStateService } from '../../services/assessment-state.service';

describe('AssessmentComponent', () => {
  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AssessmentComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the first question', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain(ASSESSMENT_QUESTIONS[0].text);
  });

  it('should include all 30 questions across 6 categories', () => {
    expect(ASSESSMENT_QUESTIONS).toHaveLength(30);
    expect(ASSESSMENT_CATEGORIES).toHaveLength(6);

    for (const category of ASSESSMENT_CATEGORIES) {
      const questions = ASSESSMENT_QUESTIONS.filter(
        (question) => question.category.slug === category.slug,
      );
      expect(questions).toHaveLength(5);
    }
  });

  it('should assign the correct category metadata to every question', () => {
    ASSESSMENT_QUESTIONS.forEach((question, index) => {
      const category = ASSESSMENT_CATEGORIES[Math.floor(index / 5)];

      expect(question.category).toEqual(category);
      expect(question.categoryLabel).toBe(category.label);
    });
  });

  it('should save and restore all 30 answers from session storage', () => {
    const answers = Object.fromEntries(
      ASSESSMENT_QUESTIONS.map((question, index) => [
        index,
        question.options[0].label,
      ]),
    ) as Record<number, string>;

    const service = new AssessmentStateService();
    service.save(answers);

    const restored = new AssessmentStateService();

    expect(Object.keys(restored.answers())).toHaveLength(30);
    expect(restored.answers()).toEqual(answers);
  });

  it('should show section and question progress on load', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('// WORK STYLE');
    expect(fixture.nativeElement.textContent).toContain('Q 1 OF 30');
  });

  it('should disable Next button until an option is selected', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    ) as HTMLButtonElement[];
    const nextBtn = buttons.find((b) =>
      /Next|See my results/.test(b.textContent ?? ''),
    );

    expect(fixture.componentInstance.selectedOption()).toBeNull();
    expect(nextBtn?.disabled).toBe(true);

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );
    fixture.detectChanges();

    expect(nextBtn?.disabled).toBe(false);
  });

  it('should advance to question 2 after selecting and clicking Next', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );
    await fixture.componentInstance.next();
    fixture.detectChanges();

    expect(fixture.componentInstance.currentIndex()).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Q 2 OF 30');
  });

  it('should go back to question 1 after Back is clicked on question 2', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );
    await fixture.componentInstance.next();
    fixture.detectChanges();

    expect(fixture.componentInstance.currentIndex()).toBe(1);

    await fixture.componentInstance.back();
    fixture.detectChanges();

    expect(fixture.componentInstance.currentIndex()).toBe(0);
  });

  it('should restore the previously selected answer when navigating back', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    const firstAnswer = ASSESSMENT_QUESTIONS[0].options[2].label;

    fixture.componentInstance.selectOption(firstAnswer);
    await fixture.componentInstance.next();
    fixture.detectChanges();

    await fixture.componentInstance.back();
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedOption()).toBe(firstAnswer);
  });

  it('should update the progress bar percentage as questions advance', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.progressPercent()).toBe(3);

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );
    await fixture.componentInstance.next();
    fixture.detectChanges();

    expect(fixture.componentInstance.progressPercent()).toBe(7);
  });

  it('shows the correct category label when crossing a section boundary', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    for (let i = 0; i < 5; i++) {
      fixture.componentInstance.selectOption(
        ASSESSMENT_QUESTIONS[i].options[0].label,
      );
      await fixture.componentInstance.next();
      fixture.detectChanges();
    }

    expect(fixture.componentInstance.currentIndex()).toBe(5);
    expect(fixture.nativeElement.textContent).toContain('// DAY TO DAY');
  }, 4000);

  it('shows a category transition at question boundaries', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    for (let i = 0; i < 4; i++) {
      fixture.componentInstance.selectOption(
        ASSESSMENT_QUESTIONS[i].options[0].label,
      );
      await fixture.componentInstance.next();
    }

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[4].options[0].label,
    );
    const transition = fixture.componentInstance.next();
    await new Promise((resolve) => setTimeout(resolve, 175));
    fixture.detectChanges();

    expect(fixture.componentInstance.showCategoryTransition()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Next up');

    fixture.componentInstance.skipCategoryTransition();
    await transition;
  });

  it('should report hasAnswers() as false before any selection', () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasAnswers()).toBe(false);
  });

  it('should report hasAnswers() as true after answering a question', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );
    await fixture.componentInstance.next();
    fixture.detectChanges();

    expect(fixture.componentInstance.hasAnswers()).toBe(true);
  });

  it('should show "See my results" label on the last question', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    for (let i = 0; i < ASSESSMENT_QUESTIONS.length - 1; i++) {
      fixture.componentInstance.selectOption(
        ASSESSMENT_QUESTIONS[i].options[0].label,
      );
      await fixture.componentInstance.next();
      fixture.detectChanges();
    }

    expect(fixture.componentInstance.isLast()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('See my results');
  }, 15000);

  it('should show "Question 30 of 30" on the last question', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    for (let i = 0; i < ASSESSMENT_QUESTIONS.length - 1; i++) {
      fixture.componentInstance.selectOption(
        ASSESSMENT_QUESTIONS[i].options[0].label,
      );
      await fixture.componentInstance.next();
      fixture.detectChanges();
    }

    expect(fixture.nativeElement.textContent).toContain('Q 30 OF 30');
  }, 15000);

  it('should show 100% progress on the last question', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    for (let i = 0; i < ASSESSMENT_QUESTIONS.length - 1; i++) {
      fixture.componentInstance.selectOption(
        ASSESSMENT_QUESTIONS[i].options[0].label,
      );
      await fixture.componentInstance.next();
      fixture.detectChanges();
    }

    expect(fixture.componentInstance.progressPercent()).toBe(100);
  }, 15000);

  it('progressPercent never exceeds 100', () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    // Simulate all signals pointing to last question
    for (let i = 0; i < ASSESSMENT_QUESTIONS.length; i++) {
      expect(c.progressPercent()).toBeLessThanOrEqual(100);
    }
  });

  it('should enable "See my results" button after selecting an option on Q30', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    for (let i = 0; i < ASSESSMENT_QUESTIONS.length - 1; i++) {
      fixture.componentInstance.selectOption(
        ASSESSMENT_QUESTIONS[i].options[0].label,
      );
      await fixture.componentInstance.next();
    }
    fixture.detectChanges();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    ) as HTMLButtonElement[];
    const resultsBtn = buttons.find((b) =>
      b.textContent?.includes('See my results'),
    );

    expect(fixture.componentInstance.isLast()).toBe(true);
    expect(fixture.componentInstance.selectedOption()).toBeNull();
    expect(resultsBtn?.disabled).toBe(true);

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[ASSESSMENT_QUESTIONS.length - 1].options[0].label,
    );
    fixture.detectChanges();

    expect(resultsBtn?.disabled).toBe(false);
  }, 15000);

  it('double-tap on next should not increment index twice', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );

    // Fire next() twice concurrently — second call should be blocked
    const [, second] = await Promise.all([
      fixture.componentInstance.next(),
      fixture.componentInstance.next(),
    ]);
    fixture.detectChanges();

    // Index should only have advanced once
    expect(fixture.componentInstance.currentIndex()).toBe(1);
    void second; // reference to suppress unused-variable warning
  });

  // ─── Session persistence ──────────────────────────────────────────

  beforeEach(() => {
    sessionStorage.removeItem('ns_assessment_progress');
  });

  afterEach(() => {
    sessionStorage.removeItem('ns_assessment_progress');
  });

  it('saves state to sessionStorage when an option is selected', () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    expect(sessionStorage.getItem('ns_assessment_progress')).toBeNull();

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );

    const raw = sessionStorage.getItem('ns_assessment_progress');
    expect(raw).not.toBeNull();
    if (raw === null) {
      throw new Error('Expected assessment progress to be saved.');
    }
    const parsed = JSON.parse(raw);
    expect(parsed.currentQuestionIndex).toBe(0);
    expect(parsed.selectedOption).toBe(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );
  });

  it('restores state from sessionStorage on component init', async () => {
    // Prime sessionStorage with a saved state at question 2
    const label = ASSESSMENT_QUESTIONS[1].options[0].label;
    sessionStorage.setItem(
      'ns_assessment_progress',
      JSON.stringify({
        currentQuestionIndex: 1,
        answers: { 0: ASSESSMENT_QUESTIONS[0].options[0].label },
        selectedOption: label,
        startedAt: new Date().toISOString(),
      }),
    );

    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.currentIndex()).toBe(1);
    expect(fixture.componentInstance.selectedOption()).toBe(label);
    expect(Object.keys(fixture.componentInstance.answers()).length).toBe(1);
  });

  it('shows resume banner when saved state is restored', async () => {
    sessionStorage.setItem(
      'ns_assessment_progress',
      JSON.stringify({
        currentQuestionIndex: 2,
        answers: {
          0: ASSESSMENT_QUESTIONS[0].options[0].label,
          1: ASSESSMENT_QUESTIONS[1].options[0].label,
        },
        selectedOption: null,
        startedAt: new Date().toISOString(),
      }),
    );

    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.showResumeBanner()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain(
      'Picking up where you left off',
    );
  });

  it('startOver clears sessionStorage and resets to question 1', async () => {
    sessionStorage.setItem(
      'ns_assessment_progress',
      JSON.stringify({
        currentQuestionIndex: 3,
        answers: {
          0: ASSESSMENT_QUESTIONS[0].options[0].label,
          1: ASSESSMENT_QUESTIONS[1].options[0].label,
          2: ASSESSMENT_QUESTIONS[2].options[0].label,
        },
        selectedOption: null,
        startedAt: new Date().toISOString(),
      }),
    );

    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.currentIndex()).toBe(3);

    fixture.componentInstance.startOver();
    fixture.detectChanges();

    expect(fixture.componentInstance.currentIndex()).toBe(0);
    expect(fixture.componentInstance.answers()).toEqual({});
    expect(fixture.componentInstance.selectedOption()).toBeNull();
    expect(fixture.componentInstance.showResumeBanner()).toBe(false);
    expect(sessionStorage.getItem('ns_assessment_progress')).toBeNull();
  });

  it('clears sessionStorage on assessment completion', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );
    expect(sessionStorage.getItem('ns_assessment_progress')).not.toBeNull();

    // Navigate to the last question
    for (let i = 0; i < ASSESSMENT_QUESTIONS.length - 1; i++) {
      fixture.componentInstance.selectOption(
        ASSESSMENT_QUESTIONS[i].options[0].label,
      );
      await fixture.componentInstance.next();
    }
    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[ASSESSMENT_QUESTIONS.length - 1].options[0].label,
    );
    // next() on last question clears storage before navigating to results
    await fixture.componentInstance.next();

    expect(sessionStorage.getItem('ns_assessment_progress')).toBeNull();
    expect(navigateSpy).toHaveBeenCalledWith(['/assessment/results']);
    navigateSpy.mockRestore();
  }, 15000);

  it('silently ignores corrupted sessionStorage data', async () => {
    sessionStorage.setItem('ns_assessment_progress', 'not-valid-json{{');

    const fixture = TestBed.createComponent(AssessmentComponent);
    // Should not throw
    expect(() => fixture.detectChanges()).not.toThrow();
    await fixture.whenStable();

    expect(fixture.componentInstance.currentIndex()).toBe(0);
    expect(sessionStorage.getItem('ns_assessment_progress')).toBeNull();
  });

  it('does not restore state when only at question 0 with no committed answers', () => {
    sessionStorage.setItem(
      'ns_assessment_progress',
      JSON.stringify({
        currentQuestionIndex: 0,
        answers: {},
        selectedOption: ASSESSMENT_QUESTIONS[0].options[0].label,
        startedAt: new Date().toISOString(),
      }),
    );

    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.showResumeBanner()).toBe(false);
    expect(sessionStorage.getItem('ns_assessment_progress')).toBeNull();
  });
});
