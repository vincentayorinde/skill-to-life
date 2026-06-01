import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptors,
  HttpClient,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { tokenInterceptor } from './token.interceptor';
import { AuthService } from './auth.service';

describe('tokenInterceptor', () => {
  let http: HttpTestingController;
  let client: HttpClient;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([tokenInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    client = TestBed.inject(HttpClient);
    http = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('adds Authorization header when token exists and URL contains /api', () => {
    localStorage.setItem('ns_token', 'bearer-token');

    client.get('http://localhost:3000/api/auth/me').subscribe();

    const req = http.expectOne('http://localhost:3000/api/auth/me');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer bearer-token',
    );
    req.flush({});
  });

  it('does not add Authorization header when no token', () => {
    client.get('http://localhost:3000/api/auth/me').subscribe();

    const req = http.expectOne('http://localhost:3000/api/auth/me');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('does not add header for non-api URLs', () => {
    localStorage.setItem('ns_token', 'bearer-token');

    client.get('https://external.com/data').subscribe();

    const req = http.expectOne('https://external.com/data');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });
});
