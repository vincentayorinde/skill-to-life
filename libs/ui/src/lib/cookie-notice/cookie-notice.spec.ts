import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NsCookieNoticeComponent } from './cookie-notice';

describe('NsCookieNoticeComponent', () => {
  beforeEach(async () => {
    localStorage.removeItem('skilltolife_cookie_consent');
    await TestBed.configureTestingModule({
      imports: [NsCookieNoticeComponent, RouterTestingModule],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.removeItem('skilltolife_cookie_consent');
  });

  it('renders without error', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows banner when cookie consent is not set', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Cookie preferences');
    expect(el.textContent).toContain('Reject analytics');
    expect(el.textContent).toContain('Accept analytics');
  });

  it('stores accepted analytics consent', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.acceptAnalytics();
    fixture.detectChanges();
    expect(localStorage.getItem('skilltolife_cookie_consent')).toBe(
      'accepted_analytics',
    );
    expect(component.visible()).toBe(false);
  });

  it('stores rejected analytics consent', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.rejectAnalytics();
    fixture.detectChanges();
    expect(localStorage.getItem('skilltolife_cookie_consent')).toBe(
      'rejected_analytics',
    );
    expect(component.visible()).toBe(false);
  });

  it('does not show banner when consent is already set', () => {
    localStorage.setItem('skilltolife_cookie_consent', 'rejected_analytics');
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
  });
});
