import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Meta, Title } from '@angular/platform-browser';
import { AssessmentResultsComponent } from './assessment-results';
import { AssessmentStateService } from '../../services/assessment-state.service';
import { generateResultCard } from '../../assessment/results/card-generator';

function withAnswers(answers: Record<number, string>) {
  const svc = TestBed.inject(AssessmentStateService);
  svc.save(answers);
}

function createCanvasDownloadMock() {
  const fillText = vi.fn();
  const context = {
    addColorStop: vi.fn(),
    arcTo: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    fill: vi.fn(),
    fillRect: vi.fn(),
    fillText,
    lineTo: vi.fn(),
    measureText: vi.fn((text: string) => ({ width: text.length * 10 })),
    moveTo: vi.fn(),
    roundRect: vi.fn(),
    stroke: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
  const canvas = {
    width: 0,
    height: 0,
    getContext: vi.fn(() => context),
    toBlob: vi.fn((callback: BlobCallback) => {
      callback(new Blob(['fake'], { type: 'image/png' }));
    }),
  } as unknown as HTMLCanvasElement;
  const link = { href: '', download: '', click: vi.fn() };
  const originalCreateElement = document.createElement.bind(document);
  const createElementSpy = vi
    .spyOn(document, 'createElement')
    .mockImplementation((tagName: string) => {
      if (tagName === 'canvas') return canvas;
      if (tagName === 'a') return link as unknown as HTMLElement;
      return originalCreateElement(tagName);
    });

  Object.defineProperty(URL, 'createObjectURL', {
    value: vi.fn(() => 'blob:skill-to-life-card'),
    configurable: true,
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    value: vi.fn(),
    configurable: true,
  });

  return { canvas, createElementSpy, fillText, link };
}

const FULL_ANSWERS: Record<number, string> = {
  0: 'Jump straight in and learn by doing',
  1: 'Something different every single day',
  2: 'I enjoy it or actively want to learn',
  3: 'Something visual I can see and use',
  4: 'Fine for a few hours then I need people',
  5: 'Will do it but it is not my favourite',
  6: 'The bug — it feels more immediately satisfying',
  7: 'Getting started on something straight away',
  8: 'Looking at how it looks and feels to use',
  9: 'Fine — it is just part of the job',
  10: 'Reproduce the issue locally before touching anything',
  11: 'Break it into smaller pieces and start there',
  12: 'Fix it yourself first then tell someone',
  13: 'Draw a diagram or visual to illustrate it',
  14: 'Find the bottleneck and fix that first',
  15: 'I genuinely appreciate it — it helps me improve',
  16: 'Feel frustrated but handle it',
  17: 'I can do them but I immediately look to automate',
  18: 'Make a call and own it',
  19: 'I ship something people actually use',
  20: 'Fix it for them and explain what you did',
  21: 'Raise it once clearly then commit to the decision',
  22: 'Share prototypes early and get feedback often',
  23: 'Make something easier or better for everyday people',
  24: 'The one who bridges tech and non-technical people',
  25: 'Still learning broadly — I want breadth not depth',
  26: 'I built systems used by millions of people',
  27: 'Important but not the main driver',
  28: 'Excites me — that is genuinely the goal',
  29: 'I genuinely enjoy my work most days',
};

const CATEGORY_BREAKDOWN = {
  workStyle: 80,
  dayToDay: 60,
  problemSolving: 50,
  temperament: 40,
  softSkills: 70,
  careerGoals: 90,
};

describe('AssessmentResultsComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    vi.clearAllMocks();
    sessionStorage.clear();
    // Restore any spies (e.g. document.createElement) so they don't bleed between tests.
    vi.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [AssessmentResultsComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Flush the POST /api/results fired by saveResult() so tests don't hang.
    httpMock.match(() => true).forEach((r) => r.flush({ id: 'r1' }));
    httpMock.verify();
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

  it('should show category breakdown for the top match', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Signal breakdown');
    expect(text).toContain('Work Style');
    expect(text).toContain('Career Goals');
    vi.useRealTimers();
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

  it('should generate a square canvas card when downloadCard() is invoked', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    // Advance past the 800ms loading delay.
    await vi.runAllTimersAsync();
    fixture.detectChanges();
    await fixture.whenStable();

    const { canvas, fillText } = createCanvasDownloadMock();

    // Advance exactly 400ms past the 300ms render delay, without triggering longer timers.
    const downloadPromise = fixture.componentInstance.downloadCard();
    await vi.advanceTimersByTimeAsync(400);
    await downloadPromise;

    expect(canvas.width).toBe(1080);
    expect(canvas.height).toBe(1080);
    expect(fillText).toHaveBeenCalledWith(
      `${fixture.componentInstance.matches[0].percentage}% match`,
      540,
      expect.any(Number),
    );
    vi.useRealTimers();
  });

  it('should use the correct filename format for the downloaded card', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    await vi.runAllTimersAsync();
    fixture.detectChanges();
    await fixture.whenStable();

    const { link } = createCanvasDownloadMock();

    const downloadPromise = fixture.componentInstance.downloadCard();
    await vi.runAllTimersAsync();
    await downloadPromise;

    const careerId = fixture.componentInstance.matches[0].careerId;
    expect(link.download).toBe(`my-skill-to-life-${careerId}.png`);
    vi.useRealTimers();
  });

  it('should show success toast after download completes', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    await vi.runAllTimersAsync(); // loading delay
    fixture.detectChanges();
    await fixture.whenStable();

    createCanvasDownloadMock();

    const downloadPromise = fixture.componentInstance.downloadCard();
    // Advance exactly 400ms — fires the 300ms render delay without touching the 3s toast timer.
    await vi.advanceTimersByTimeAsync(400);
    await downloadPromise;
    fixture.detectChanges();

    expect(fixture.componentInstance.toastVisible()).toBe(true);
    expect(fixture.componentInstance.toastMessage()).toContain('downloaded');
    vi.useRealTimers();
  });

  it('should generate a story canvas when story format is selected', async () => {
    const { canvas } = createCanvasDownloadMock();

    await generateResultCard(
      {
        title: 'Security Engineer',
        emoji: '🔒',
        percentage: 67,
        matchTier: 'Good match',
        insight: 'Experienced developers who want to specialise in security.',
      },
      'story',
    );

    expect(canvas.width).toBe(1080);
    expect(canvas.height).toBe(1920);
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
    expect(tag?.content).toBe('/assets/social-preview.png');
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

    expect(writeMock).toHaveBeenCalledWith('https://skilltolife.com/assessment');
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

  it('should show all share platform options in share modal', async () => {
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
    expect(text).toContain('WhatsApp');
    expect(text).toContain('X / Twitter');
    expect(text).toContain('LinkedIn');
    expect(text).toContain('Messages');
    expect(text).toContain('Copy link');
    vi.useRealTimers();
  });

  it('shareToWhatsApp opens whatsapp URL with encoded result text', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    fixture.componentInstance['loading'].set(false);
    fixture.componentInstance['matches'] = [
      {
        careerId: 'frontend-developer',
        title: 'Frontend Developer',
        emoji: '🖥️',
        score: 90,
        percentage: 90,
        matchTier: 'strong',
        categoryBreakdown: CATEGORY_BREAKDOWN,
      },
    ];
    fixture.detectChanges();

    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    fixture.componentInstance.shareToWhatsApp();
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank',
      'noreferrer',
    );
    expect(decodeURIComponent(openSpy.mock.calls[0][0] as string)).toContain(
      'Skill to Life',
    );
    openSpy.mockRestore();
  });

  it('shareToX opens twitter intent URL', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    fixture.componentInstance['loading'].set(false);
    fixture.componentInstance['matches'] = [
      {
        careerId: 'frontend-developer',
        title: 'Frontend Developer',
        emoji: '🖥️',
        score: 90,
        percentage: 90,
        matchTier: 'strong',
        categoryBreakdown: CATEGORY_BREAKDOWN,
      },
    ];
    fixture.detectChanges();

    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    fixture.componentInstance.shareToX();
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com/intent/tweet'),
      '_blank',
      'noreferrer',
    );
    openSpy.mockRestore();
  });

  it('copyLink copies skilltolife.com URL to clipboard', async () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    fixture.componentInstance['loading'].set(false);
    fixture.detectChanges();

    const writeSpy = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined);
    await fixture.componentInstance.copyLink();
    expect(writeSpy).toHaveBeenCalledWith('https://skilltolife.com/assessment');
    writeSpy.mockRestore();
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
