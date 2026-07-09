import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home';
import { AuthService } from '../../core/auth/auth.service';
import { of } from 'rxjs';

const mockAuth = {
  currentUser$: of(null),
  isDev: false,
  loginWithGoogle: () => undefined,
  devLogin: () => undefined,
  logout: () => undefined,
};

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterModule.forRoot([])],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: mockAuth },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  it('renders the eyebrow tag with AI CV analysis label', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('AI CV ANALYSIS + CAREER TOOL');
  });

  it('renders terminal card with assessment.ts label', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('assessment.ts');
  });

  it('renders terminal card with cv-analysis.json label', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('cv-analysis.json');
  });

  it('renders stats bar with career count', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('26');
    expect(text).toContain('career paths');
  });

  it('renders mono section labels', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('// HOW IT WORKS');
    expect(text).toContain('// CAREER PATHS');
  });

  it('does not render the removed grid background class', () => {
    const removedClassSelector = ['.', 'grid', '-', 'bg'].join('');
    expect(fixture.nativeElement.querySelector(removedClassSelector)).toBeNull();
  });

  it('renders pulsing dot element', () => {
    const dot = fixture.nativeElement.querySelector('.ns-pulse-dot');
    expect(dot).not.toBeNull();
  });

  it('renders how-it-works step cards with mono step numbers', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('01 /');
    expect(text).toContain('02 /');
    expect(text).toContain('03 /');
  });
});
