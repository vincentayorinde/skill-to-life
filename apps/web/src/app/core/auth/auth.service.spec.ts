import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('handleCallback stores token and fetches user', () => {
    const mockUser = { id: '1', email: 'a@b.com', name: 'Alice' };

    service.handleCallback('test-jwt').subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    http.expectOne('http://localhost:3000/api/auth/me').flush(mockUser);
    expect(localStorage.getItem('skill_to_life_token')).toBe('test-jwt');
  });

  it('logout clears token and resets user', () => {
    localStorage.setItem('skill_to_life_token', 'some-token');

    service.logout();

    http.expectOne('http://localhost:3000/api/auth/logout').flush({});
    expect(localStorage.getItem('skill_to_life_token')).toBeNull();
  });

  it('getToken returns null when not set', () => {
    expect(service.getToken()).toBeNull();
  });

  it('getToken returns stored token', () => {
    localStorage.setItem('skill_to_life_token', 'my-token');
    expect(service.getToken()).toBe('my-token');
  });
});
