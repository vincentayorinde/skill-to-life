import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsAssessmentIllustrationComponent } from './assessment-illustration';

describe('NsAssessmentIllustrationComponent', () => {
  let fixture: ComponentFixture<NsAssessmentIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsAssessmentIllustrationComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NsAssessmentIllustrationComponent);
  });

  it('renders without errors', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders an SVG element', () => {
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('has aria-hidden on decorative SVG', () => {
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg[aria-hidden="true"]');
    expect(svg).toBeTruthy();
  });

  it('uses blue background for step 1', () => {
    fixture.componentRef.setInput('step', 1);
    fixture.detectChanges();
    expect(fixture.componentInstance.bg).toBe('#E8F0FE');
  });

  it('uses green background for step 2', () => {
    fixture.componentRef.setInput('step', 2);
    fixture.detectChanges();
    expect(fixture.componentInstance.bg).toBe('#E6F4EA');
  });

  it('uses yellow background for step 3', () => {
    fixture.componentRef.setInput('step', 3);
    fixture.detectChanges();
    expect(fixture.componentInstance.bg).toBe('#FEF7E0');
  });
});
