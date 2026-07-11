import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthCallbackComponent } from './auth-callback';
import { AuthService } from '../../core/auth/auth.service';

describe('AuthCallbackComponent', () => {
  let router: Router;
  let mockAuth: Partial<AuthService>;

  beforeEach(() => {
    mockAuth = {
      handleCallback: vi
        .fn()
        .mockReturnValue(of({ id: '1', email: 'a@b.com' })),
    };

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuth },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: { get: () => 'test-token' } },
          },
        },
      ],
    });

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    sessionStorage.clear();
    localStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('calls handleCallback with token from URL', async () => {
    const fixture = TestBed.createComponent(AuthCallbackComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockAuth.handleCallback).toHaveBeenCalledWith('test-token');
  });

  it('redirects home after callback when there is no pending claim', async () => {
    const fixture = TestBed.createComponent(AuthCallbackComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('redirects to stored CV analysis return URL after callback', async () => {
    localStorage.setItem('skilltolife_result_return', '/profile?tab=cv');

    const fixture = TestBed.createComponent(AuthCallbackComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/profile?tab=cv');
    expect(localStorage.getItem('skilltolife_result_return')).toBeNull();
  });
});
