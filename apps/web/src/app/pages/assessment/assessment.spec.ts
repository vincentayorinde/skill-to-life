import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
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
});
