import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { AssessmentComponent } from './assessment';
import { ASSESSMENT_QUESTIONS } from './questions.data';

describe('AssessmentComponent', () => {
  beforeEach(async () => {
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

  it('should show Step 1 of 10 on load', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Step 1 of 10');
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
    expect(fixture.nativeElement.textContent).toContain('Step 2 of 10');
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

    expect(fixture.componentInstance.progressPercent()).toBe(10);

    fixture.componentInstance.selectOption(
      ASSESSMENT_QUESTIONS[0].options[0].label,
    );
    await fixture.componentInstance.next();
    fixture.detectChanges();

    expect(fixture.componentInstance.progressPercent()).toBe(20);
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

  it('should show "Step 10 of 10" on the last question', async () => {
    const fixture = TestBed.createComponent(AssessmentComponent);
    fixture.detectChanges();

    for (let i = 0; i < ASSESSMENT_QUESTIONS.length - 1; i++) {
      fixture.componentInstance.selectOption(
        ASSESSMENT_QUESTIONS[i].options[0].label,
      );
      await fixture.componentInstance.next();
      fixture.detectChanges();
    }

    expect(fixture.nativeElement.textContent).toContain('Step 10 of 10');
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
    expect(fixture.nativeElement.textContent).toContain('100%');
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

  it('should enable "See my results" button after selecting an option on Q10', async () => {
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
    const parsed = JSON.parse(raw!);
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
