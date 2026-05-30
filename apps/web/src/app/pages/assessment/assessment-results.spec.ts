import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
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

  it('should show loading state on init', async () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.loading()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain(
      'Finding your best matches',
    );
  });

  it('should show result after loading completes', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);

    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    vi.advanceTimersByTime(2000);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.match).not.toBeNull();

    vi.useRealTimers();
  });

  it('should compute a career match from state answers', () => {
    withAnswers(FULL_ANSWERS);
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    const match = fixture.componentInstance.match;
    expect(match?.career.slug).toBeTruthy();
    expect(match?.matchPercent).toBeGreaterThan(0);
  });

  it('should show no-results prompt when state has no answers', async () => {
    vi.useFakeTimers();
    // Do not call withAnswers — state is empty
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();

    vi.advanceTimersByTime(2000);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.hasResults).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('No results yet');

    vi.useRealTimers();
  });

  it('should open share modal when share button is clicked', async () => {
    vi.useFakeTimers();
    withAnswers(FULL_ANSWERS);

    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.detectChanges();
    vi.advanceTimersByTime(2000);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.shareOpen()).toBe(false);
    fixture.componentInstance.openShare();
    fixture.detectChanges();
    expect(fixture.componentInstance.shareOpen()).toBe(true);

    vi.useRealTimers();
  });

  it('should close share modal on closeShare()', () => {
    const fixture = TestBed.createComponent(AssessmentResultsComponent);
    fixture.componentInstance.openShare();
    fixture.detectChanges();
    expect(fixture.componentInstance.shareOpen()).toBe(true);

    fixture.componentInstance.closeShare();
    fixture.detectChanges();
    expect(fixture.componentInstance.shareOpen()).toBe(false);
  });

  it('should copy link and show copied state', async () => {
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
});
