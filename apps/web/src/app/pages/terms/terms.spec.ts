import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TermsComponent } from './terms';

describe('TermsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('renders without error', () => {
    const fixture = TestBed.createComponent(TermsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows terms of use heading', () => {
    const fixture = TestBed.createComponent(TermsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Terms of use');
  });

  it('mentions free to use', () => {
    const fixture = TestBed.createComponent(TermsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('free');
  });

  it('shows July 2026 date', () => {
    const fixture = TestBed.createComponent(TermsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Last updated: July 2026');
  });

  it('renders AI disclosure section', () => {
    const fixture = TestBed.createComponent(TermsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Artificial intelligence');
    expect(el.textContent).toContain('AI-generated results');
  });

  it('renders data and privacy section', () => {
    const fixture = TestBed.createComponent(TermsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Data and privacy');
    expect(el.textContent).toContain('Privacy Policy');
  });

  it('renders governing law section', () => {
    const fixture = TestBed.createComponent(TermsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Governing law');
    expect(el.textContent).toContain('England and Wales');
  });

  it('renders arbitration section', () => {
    const fixture = TestBed.createComponent(TermsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Dispute resolution');
    expect(el.textContent).toContain('arbitration process');
  });
});
