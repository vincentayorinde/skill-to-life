import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { CvAnalysisResult } from 'types';
import { AuthService } from '../../core/auth/auth.service';
import { CvAnalysisService } from '../../core/cv/cv-analysis.service';
import { ProfileService } from '../../core/profile/profile.service';
import { SavedService } from '../../core/saved/saved.service';
import { ProfilePageComponent } from './profile';

const currentUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  avatar: null,
};

const mockAuth = {
  currentUser$: of(currentUser),
  _currentUser$: new BehaviorSubject(currentUser),
  isDev: false,
  loginWithGoogle: () => undefined,
  devLogin: () => undefined,
  logout: () => undefined,
};

const mockProfile = {
  id: 'profile-1',
  userId: 'user-1',
  username: 'test-user',
  bio: '',
  location: '',
  website: '',
  linkedinUrl: '',
  githubUrl: '',
  currentRole: '',
  experienceLevel: '',
  isPublic: false,
  savedCareers: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockAnalysis: CvAnalysisResult = {
  id: 'analysis-1',
  profileScore: 80,
  profileScoreLabel: 'Strong',
  topMatches: [],
  strengths: [],
  gaps: [],
  improvements: [],
  recommendedCareers: [],
  summary: 'Great profile',
  aiModel: 'test-model',
  inputType: 'text',
  createdAt: '2001-01-02T15:04:05.000Z',
};

describe('ProfilePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePageComponent, RouterModule.forRoot([])],
      providers: [
        { provide: AuthService, useValue: mockAuth },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ tab: 'cv' }) },
        },
        {
          provide: ProfileService,
          useValue: {
            getProfile: () => of(mockProfile),
            updateProfile: () => of(mockProfile),
            toggleVisibility: () => of(mockProfile),
          },
        },
        {
          provide: SavedService,
          useValue: {
            getSavedResources: () => of({}),
            unsaveCareer: () => of(undefined),
            unsaveResource: () => of(undefined),
          },
        },
        {
          provide: CvAnalysisService,
          useValue: {
            getAnalyses: () => of([]),
            uploadCV: () => of(null),
            analyseText: () => of(null),
            analyseLinkedIn: () => of(null),
          },
        },
        {
          provide: HttpClient,
          useValue: { get: () => of([]) },
        },
      ],
    }).compileComponents();
  });

  it('shows AI notice on CV analysis page', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('AI powered');
    expect(text).toContain('Your CV content is sent to our AI provider');
  });

  it('links AI notice to terms', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const link: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[href="/terms"]');
    expect(link).not.toBeNull();
    expect(link?.textContent).toContain('our terms');
  });

  it('uses a single-column profile layout on mobile', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const layout: HTMLElement | null =
      fixture.nativeElement.querySelector('.profile-layout');
    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;

    expect(layout).not.toBeNull();
    expect(styles).toContain('grid-template-columns: 1fr');
    expect(styles).toContain('grid-template-columns: 280px minmax(0, 1fr)');
  });

  it('stacks CV cards vertically on mobile and grids on wider screens', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const cards: HTMLElement | null =
      fixture.nativeElement.querySelector('.cv-input-cards');
    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;

    expect(cards).not.toBeNull();
    expect(styles).toContain('flex-direction: column');
    expect(styles).toContain('@media (min-width: 900px)');
    expect(styles).toContain('repeat(2, minmax(0, 1fr))');
    expect(styles).toContain('grid-template-areas');
    expect(styles).toContain('upload linkedin');
    expect(styles).toContain('paste paste');
  });

  it('makes desktop profile tabs horizontally scrollable', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const tabs: HTMLElement | null =
      fixture.nativeElement.querySelector('.profile-tabs');
    const tab: HTMLElement | null =
      fixture.nativeElement.querySelector('.profile-tab');
    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;

    expect(tabs).not.toBeNull();
    expect(tab).not.toBeNull();
    expect(styles).toContain('overflow-x: auto');
    expect(styles).toContain('white-space: nowrap');
  });

  it('shows a compact mobile profile header with avatar, name, email and status', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector(
      '.profile-header-mobile',
    );
    const name: HTMLElement | null = fixture.nativeElement.querySelector(
      '.profile-header-mobile-name',
    );
    const email: HTMLElement | null = fixture.nativeElement.querySelector(
      '.profile-header-mobile-email',
    );
    const pill: HTMLElement | null = fixture.nativeElement.querySelector(
      '.profile-status-pill',
    );
    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;

    expect(header).not.toBeNull();
    expect(header?.classList).toContain('lg:hidden');
    expect(name?.textContent).toContain('Test User');
    expect(email?.textContent).toContain('test@example.com');
    expect(pill?.textContent).toContain('Private');
    expect(styles).toContain('display: flex');
    expect(styles).toContain('.profile-header-mobile');
    expect(styles).toContain('border-radius: var(--radius-md');
  });

  it('renders a sticky, horizontally scrollable mobile tab bar', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const tabsBar: HTMLElement | null = fixture.nativeElement.querySelector(
      '.profile-tabs-mobile',
    );
    const tabButtons: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.profile-tab-mobile');
    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;

    expect(tabsBar).not.toBeNull();
    expect(tabsBar?.classList).toContain('lg:hidden');
    expect(tabButtons.length).toBe(6);
    expect(styles).toContain('.profile-tabs-mobile');
    expect(styles).toContain('overflow-x: auto');
    expect(styles).toContain('position: sticky');
    expect(styles).toContain('top: 65px');
  });

  it('switches the active tab when a mobile tab is clicked', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const tabButtons: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.profile-tab-mobile'),
    );
    const savedTab = tabButtons.find((btn) =>
      btn.textContent?.includes('Saved careers'),
    );

    expect(savedTab).toBeDefined();
    savedTab!.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeTab()).toBe('saved');
    expect(savedTab?.classList).toContain('is-active');
    expect(savedTab?.classList).toContain('active');
  });

  it('styles mobile active tabs without clipping their text', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;
    expect(styles).toContain('.profile-tab-mobile.active');
    expect(styles).toContain('--color-accent-light');
    expect(styles).toContain('border-color');
    expect(styles).toContain('padding: 8px 16px');
    expect(styles).toContain('white-space: nowrap');
    expect(styles).toContain('flex-shrink: 0');
  });

  it('keeps mobile tabs horizontally scrollable with edge scroll padding', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;
    expect(styles).toContain('overflow-x: auto');
    expect(styles).toContain('scroll-padding-left: 16px');
    expect(styles).toContain('scroll-padding-right: 16px');
    expect(styles).toContain('scroll-snap-type: x proximity');
  });

  it('shows the analysis date without exposing the AI model', () => {
    TestBed.overrideProvider(CvAnalysisService, {
      useValue: {
        getAnalyses: () => of([mockAnalysis]),
        uploadCV: () => of(null),
        analyseText: () => of(null),
        analyseLinkedIn: () => of(null),
      },
    });

    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).not.toContain(mockAnalysis.aiModel);
    expect(text).toContain(new Date(mockAnalysis.createdAt).getFullYear());
  });

  it('lays out overview stats as a 2x2 grid on mobile and 4-up on larger screens', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();
    fixture.componentInstance.activeTab.set('overview');
    fixture.detectChanges();

    const stats: HTMLElement | null =
      fixture.nativeElement.querySelector('.overview-stats');
    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;

    expect(stats).not.toBeNull();
    expect(styles).toContain('.overview-stats');
    expect(styles).toContain('grid-template-columns: repeat(4, 1fr)');
    expect(styles).toContain('@media (max-width: 640px)');
    expect(styles).toContain('grid-template-columns: repeat(2, 1fr)');
  });

  it('wraps the AI notice text fully without cutting it off', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const notice: HTMLElement | null =
      fixture.nativeElement.querySelector('.ai-notice');
    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;

    const noticeRule = styles.match(/\.ai-notice\b[^{]*\{[^}]*\}/)?.[0] ?? '';

    expect(notice).not.toBeNull();
    expect(noticeRule).not.toBe('');
    expect(noticeRule).not.toContain('white-space: nowrap');
    expect(noticeRule).toContain('white-space: normal');
    expect(noticeRule).toContain('width: 100%');
  });

  it('makes the analyse button full width on mobile', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    const button: HTMLElement | null =
      fixture.nativeElement.querySelector('.analyse-btn');
    const styles = (fixture.componentRef.componentType as any).ɵcmp.styles.join(
      '\n',
    ) as string;

    expect(button).not.toBeNull();
    expect(styles).toContain('@media (max-width: 1023px)');
    expect(styles).toContain('.analyse-btn');
    expect(styles).toContain('width: 100%');
  });

  it('shows the upload form again when "Analyse new CV" is clicked from the results view', () => {
    TestBed.overrideProvider(CvAnalysisService, {
      useValue: {
        getAnalyses: () => of([mockAnalysis]),
        uploadCV: () => of(null),
        analyseText: () => of(null),
        analyseLinkedIn: () => of(null),
      },
    });

    const fixture = TestBed.createComponent(ProfilePageComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.cv-input-cards'),
    ).toBeNull();

    const newCvButton = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    ).find(
      (btn) => (btn as HTMLButtonElement).textContent?.trim() === 'Analyse new CV',
    ) as HTMLButtonElement | undefined;

    expect(newCvButton).toBeDefined();
    newCvButton!.click();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.cv-input-cards'),
    ).not.toBeNull();
  });
});
