import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { AssessmentResultsComponent } from './assessment-results';
import { AssessmentStateService } from '../../services/assessment-state.service';
import { toPng } from 'html-to-image';

vi.mock('html-to-image', () => ({
  toPng: vi.fn().mockResolvedValue('data:image/png;base64,ZmFrZXBuZw=='),
}));

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
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [AssessmentResultsComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  // ─── Loading state ─────────────────────────────────────────────

  it('should show skeleton loading state on init', async () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.loading()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain(
      'Calculating your matches',
    );
  });

  it('should transition out of loading after 800ms', async () => {
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

  it('should compute matches from state answers', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.matches.length).toBeGreaterThan(0);
  });

  it('should display top match title and percentage after loading', async () => {
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

  it('should populate topCareer matching the top match career ID', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    const { topCareer, matches } = fixture.componentInstance;
    expect(topCareer).not.toBeNull();
    expect(topCareer?.id).toBe(matches[0].careerId);
  });

  it('should have a non-empty topInsight', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.topInsight.length).toBeGreaterThan(0);
  });

  // ─── Match cards ────────────────────────────────────────────────

  it('should render 5 match cards in section 3', async () => {
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

  it('should mark the first match card as #1 best match', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    const first = fixture.nativeElement.querySelector(
      '[data-testid="match-card"]',
    );
    expect(first.textContent).toContain('#1 Best match');
    vi.useRealTimers();
  });

  // ─── Empty / error states ────────────────────────────────────────

  it('should show no-results state when no answers are present', async () => {
    vi.useFakeTimers();
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

  it('should show error state when matches is overridden to empty', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    fixture.componentInstance.matches = [];
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Something went wrong');
    vi.useRealTimers();
  });

  // ─── Download card ──────────────────────────────────────────────

  it('should call toPng when downloadCard() is invoked', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();
    vi.useRealTimers();

    // Provide a minimal anchor stub so the click doesn't throw.
    const linkStub = { href: '', download: '', click: vi.fn() };
    vi.spyOn(document, 'createElement').mockReturnValueOnce(
      linkStub as unknown as HTMLElement,
    );

    await fixture.componentInstance.downloadCard();

    expect(toPng).toHaveBeenCalled();
  });

  it('should use the correct filename format for the downloaded card', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();
    vi.useRealTimers();

    const linkStub = { href: '', download: '', click: vi.fn() };
    vi.spyOn(document, 'createElement').mockReturnValueOnce(
      linkStub as unknown as HTMLElement,
    );

    await fixture.componentInstance.downloadCard();

    const careerId = fixture.componentInstance.matches[0].careerId;
    expect(linkStub.download).toBe(`my-nextskill-${careerId}.png`);
  });

  it('should show success toast after download completes', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();
    vi.useRealTimers();

    const linkStub = { href: '', download: '', click: vi.fn() };
    vi.spyOn(document, 'createElement').mockReturnValueOnce(
      linkStub as unknown as HTMLElement,
    );

    await fixture.componentInstance.downloadCard();
    fixture.detectChanges();

    expect(fixture.componentInstance.toastVisible()).toBe(true);
    expect(fixture.componentInstance.toastMessage()).toContain('downloaded');
  });

  // ─── Format toggle ──────────────────────────────────────────────

  it('should default to square format', () => {
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    expect(fixture.componentInstance.cardFormat()).toBe('square');
  });

  it('should switch to story format when cardFormat signal is set', () => {
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.componentInstance.cardFormat.set('story');
    expect(fixture.componentInstance.cardFormat()).toBe('story');
  });

  it('should show format toggle in share modal', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.openShare();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Download card');
    expect(text).toContain('Square');
    expect(text).toContain('Story');
    vi.useRealTimers();
  });

  // ─── Meta tags ──────────────────────────────────────────────────

  it('should set page title with top match career name', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    const titleService = TestBed.inject(Title);
    const top = fixture.componentInstance.matches[0];
    expect(titleService.getTitle()).toContain(top.title);
  });

  it('should set og:image meta tag', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    const metaService = TestBed.inject(Meta);
    const tag = metaService.getTag('property="og:image"');
    expect(tag?.content).toBe('/og-default.svg');
  });

  it('should set twitter:card to summary_large_image', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    const metaService = TestBed.inject(Meta);
    const tag = metaService.getTag('name="twitter:card"');
    expect(tag?.content).toBe('summary_large_image');
  });

  // ─── Copy link ──────────────────────────────────────────────────

  it('should copy assessment URL and show toast', async () => {
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
    expect(fixture.componentInstance.toastVisible()).toBe(true);
    expect(fixture.componentInstance.toastMessage()).toContain('copied');
  });

  // ─── Share modal ────────────────────────────────────────────────

  it('should open share modal', () => {
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    fixture.componentInstance.openShare();
    fixture.detectChanges();
    expect(fixture.componentInstance.shareOpen()).toBe(true);
  });

  it('should close share modal', () => {
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.componentInstance.openShare();
    fixture.detectChanges();
    fixture.componentInstance.closeShare();
    fixture.detectChanges();
    expect(fixture.componentInstance.shareOpen()).toBe(false);
  });

  it('should show all share options in share modal', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.openShare();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Download card');
    expect(text).toContain('X / Twitter');
    expect(text).toContain('LinkedIn');
    expect(text).toContain('Copy link');
    vi.useRealTimers();
  });

  // ─── Tier helpers ────────────────────────────────────────────────

  it('tierLabel returns correct labels', () => {
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

  // ─── Ring offset ────────────────────────────────────────────────

  it('ringOffset equals CIRCUMFERENCE before animation', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    expect(c.ringOffset).toBeCloseTo(c.CIRCUMFERENCE, 1);
  });

  it('ringOffset decreases after animation triggers', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    c.animated.set(true);
    expect(c.ringOffset).toBeLessThan(c.CIRCUMFERENCE);
  });
});
