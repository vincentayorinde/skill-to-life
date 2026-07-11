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
    expect(text).toContain('AI CV ANALYSIS and CAREER TOOL');
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

  it('renders equal-width hero action buttons', () => {
    const startLink = Array.from<HTMLAnchorElement>(
      fixture.nativeElement.querySelectorAll('a'),
    ).find(
      (link) =>
        link.textContent?.includes('Start assessment') &&
        link.className.includes('sm:w-64'),
    );
    const googleButton = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('button'),
    ).find((button) => button.textContent?.includes('Sign in with Google'));

    expect(startLink?.className).toContain('w-full');
    expect(startLink?.className).toContain('sm:w-64');
    expect(googleButton?.className).toContain('w-full');
    expect(googleButton?.className).toContain('sm:w-64');
  });

  it('centers hero content on mobile and left-aligns on desktop', () => {
    const headline = fixture.nativeElement.querySelector('h1');
    const heroCopy = headline.closest('div');
    const eyebrow = heroCopy.querySelector('.ns-pulse-dot')?.parentElement;
    const paragraph = heroCopy.querySelector('p');
    const actions = Array.from<HTMLElement>(
      heroCopy.querySelectorAll('div'),
    ).find((element) => element.className.includes('lg:justify-start'));

    expect(heroCopy.className).toContain('text-center');
    expect(heroCopy.className).toContain('lg:text-left');
    expect(eyebrow?.className).toContain('mx-auto');
    expect(eyebrow?.className).toContain('lg:mx-0');
    expect(paragraph?.className).toContain('mx-auto');
    expect(paragraph?.className).toContain('lg:mx-0');
    expect(actions?.className).toContain('items-center');
    expect(actions?.className).toContain('justify-center');
    expect(actions?.className).toContain('lg:justify-start');
  });

  it('renders centered equal-width footer action buttons', () => {
    const startLink = Array.from<HTMLAnchorElement>(
      fixture.nativeElement.querySelectorAll('a'),
    ).find((link) => link.textContent?.includes('Start anonymously'));
    const googleButton = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('button'),
    ).find((button) => button.textContent?.includes('Continue with Google'));
    const actions = startLink?.parentElement;

    expect(actions?.className).toContain('items-center');
    expect(startLink?.className).toContain('w-full');
    expect(startLink?.className).toContain('sm:w-64');
    expect(googleButton?.className).toContain('w-full');
    expect(googleButton?.className).toContain('sm:w-64');
  });

  it('renders deployment footer note', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Deployed using nexloy.dev');

    const link = fixture.nativeElement.querySelector(
      'a[href="https://nexloy.dev"]',
    );
    expect(link).not.toBeNull();
  });

  it('renders CV Analysis nav item', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('CV Analysis ✨');
  });

  it('renders hero CV analysis link', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Or analyse your CV with AI');
  });

  it('renders landing AI CV analysis section', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('// AI CV ANALYSIS');
    expect(text).toContain('Already have experience? Let AI analyse your CV.');
    expect(text).toContain('Profile strength');
  });
});
