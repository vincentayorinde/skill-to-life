import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PrivacyComponent } from './privacy';

describe('PrivacyComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('renders without error', () => {
    const fixture = TestBed.createComponent(PrivacyComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows privacy policy heading', () => {
    const fixture = TestBed.createComponent(PrivacyComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Privacy policy');
  });

  it('states data is not sold', () => {
    const fixture = TestBed.createComponent(PrivacyComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('not sell');
  });

  it('references Encrisoft as the data controller', () => {
    const fixture = TestBed.createComponent(PrivacyComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement.textContent as string).replace(
      /\s+/g,
      ' ',
    );

    expect(text).toContain('Data Controller:');
    expect(text).toContain('Encrisoft Technologies Ltd');
    expect(text).toContain('Data Protection Act 2018');
  });

  it('references the ICO complaints route', () => {
    const fixture = TestBed.createComponent(PrivacyComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement.textContent as string).replace(
      /\s+/g,
      ' ',
    );

    expect(text).toContain("Information Commissioner's Office (ICO)");
    expect(text).toContain('ico.org.uk');
  });

  it('does not duplicate the advertising statement', () => {
    const fixture = TestBed.createComponent(PrivacyComponent);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    const matches = text.match(/We do not use your data for advertising/g);
    expect(matches).toHaveLength(1);
  });
});
