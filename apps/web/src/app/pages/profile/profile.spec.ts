import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
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
});
