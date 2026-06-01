import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AssessmentResultsComponent } from './assessment-results';
import { AssessmentStateService } from '../../services/assessment-state.service';

function withAnswers(answers: Record<number, string>) {
  const svc = TestBed.inject(AssessmentStateService);
  svc.save(answers);
}

const FULL_ANSWERS: Record<number, string> = {
  0: 'Building apps',
  1: 'Jumping in and trying it',
  2: 'I enjoy it or want to learn',
  3: 'Fast career growth',
  4: 'I break them down step by step',
  5: 'A mix of both',
  6: 'Fairly comfortable',
  7: 'A working app or feature',
  8: 'Some professional experience',
  9: 'Get a job in tech',
};

describe('AssessmentResultsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentResultsComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  // ─── Loading state ──────────────────────────────────────────────

  it('should show loading state on init before 800ms', async () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.loading()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain(
      'Calculating your matches',
    );
  });

  it('should transition out of loading state after 800ms', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);

    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.loading()).toBe(false);

    vi.useRealTimers();
  });

  // ─── Hero result ────────────────────────────────────────────────

  it('should compute matches from state answers after init', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.matches.length).toBeGreaterThan(0);
  });

  it('should display the top match title and percentage in the hero', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);

    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    const top = fixture.componentInstance.matches[0];
    expect(text).toContain(top.title);
    expect(text).toContain(`${top.percentage}%`);

    vi.useRealTimers();
  });

  it('should have a non-empty topInsight when answers are present', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.topInsight.length).toBeGreaterThan(0);
  });

  it('should populate topCareer from the top match career ID', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    const { topCareer, matches } = fixture.componentInstance;
    expect(topCareer).not.toBeNull();
    expect(topCareer?.id).toBe(matches[0].careerId);
  });

  // ─── Match cards (Section 3) ─────────────────────────────────

  it('should render exactly 5 match cards in section 3', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);

    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    const cards = fixture.nativeElement.querySelectorAll(
      '[data-testid="match-card"]',
    );
    expect(cards.length).toBe(5);

    vi.useRealTimers();
  });

  it('should mark the first match card as the top match', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);

    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    const firstCard = fixture.nativeElement.querySelector(
      '[data-testid="match-card"]',
    );
    expect(firstCard.textContent).toContain('#1 Best match');

    vi.useRealTimers();
  });

  // ─── Empty state ─────────────────────────────────────────────

  it('should show no-results state when no answers are present', async () => {
    vi.useFakeTimers();
    // Do not call withAnswers — state stays empty.
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.hasResults).toBe(false);
    expect(fixture.nativeElement.textContent).toContain(
      'We could not find your results',
    );

    vi.useRealTimers();
  });

  // ─── Error state ─────────────────────────────────────────────

  it('should show error state when scoring returns an empty array', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);

    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    // Override matches to simulate a scoring failure.
    fixture.componentInstance.matches = [];

    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Something went wrong');

    vi.useRealTimers();
  });

  // ─── Meta tags ───────────────────────────────────────────────

  it('should set the page title to include the top match career name', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    const titleService = TestBed.inject(Title);
    const top = fixture.componentInstance.matches[0];
    expect(titleService.getTitle()).toContain(top.title);
  });

  // ─── Share modal ─────────────────────────────────────────────

  it('should open the share modal when openShare() is called', () => {
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.shareOpen()).toBe(false);
    fixture.componentInstance.openShare();
    fixture.detectChanges();
    expect(fixture.componentInstance.shareOpen()).toBe(true);
  });

  it('should close the share modal when closeShare() is called', () => {
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.componentInstance.openShare();
    fixture.detectChanges();
    expect(fixture.componentInstance.shareOpen()).toBe(true);

    fixture.componentInstance.closeShare();
    fixture.detectChanges();
    expect(fixture.componentInstance.shareOpen()).toBe(false);
  });

  it('should copy the assessment URL and show copied state', async () => {
    const writeMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeMock },
      configurable: true,
    });

    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    await fixture.componentInstance.copyLink();
    fixture.detectChanges();

    expect(writeMock).toHaveBeenCalledWith('https://nextskill.dev/assessment');
    expect(fixture.componentInstance.copied()).toBe(true);
  });

  // ─── Tier helpers ─────────────────────────────────────────────

  it('tierLabel returns correct labels for each tier', () => {
    const c = TestBed.createComponent(
      AssessmentResultsComponent,
    ).componentInstance;
    expect(c.tierLabel('strong')).toBe('Strong match');
    expect(c.tierLabel('good')).toBe('Good match');
    expect(c.tierLabel('possible')).toBe('Possible match');
  });

  it('altCardLabel returns "Worth exploring" only for possible tier', () => {
    const c = TestBed.createComponent(
      AssessmentResultsComponent,
    ).componentInstance;
    expect(c.altCardLabel('possible')).toBe('Worth exploring');
    expect(c.altCardLabel('strong')).toBe('Also a strong fit');
    expect(c.altCardLabel('good')).toBe('Also a strong fit');
  });

  it('tierStroke returns distinct colours for each tier', () => {
    const c = TestBed.createComponent(
      AssessmentResultsComponent,
    ).componentInstance;
    const strokes = new Set([
      c.tierStroke('strong'),
      c.tierStroke('good'),
      c.tierStroke('possible'),
    ]);
    expect(strokes.size).toBe(3);
  });

  // ─── Ring offset ─────────────────────────────────────────────

  it('ringOffset equals CIRCUMFERENCE before animation triggers', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    const c = fixture.componentInstance;
    expect(c.ringOffset).toBeCloseTo(c.CIRCUMFERENCE, 1);
  });

  it('ringOffset is less than CIRCUMFERENCE after animation triggers', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    const c = fixture.componentInstance;
    c.animated.set(true);
    expect(c.ringOffset).toBeLessThan(c.CIRCUMFERENCE);
  });
});
