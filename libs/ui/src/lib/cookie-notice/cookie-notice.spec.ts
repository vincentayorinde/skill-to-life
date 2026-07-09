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
    expect(el.textContent).toContain('Help us improve your experience');
    expect(el.textContent).toContain(
      'We use analytics to understand how people use Skill to Life',
    );
    expect(el.textContent).toContain(
      'We do not use analytics to identify you',
    );
    expect(el.textContent).toContain('Reject cookies');
    expect(el.textContent).not.toContain('Manage preferences');
    expect(el.textContent).toContain('Accept cookies');
    expect(el.textContent).toContain('Privacy policy');
  });

  it('opens a simple preferences panel', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();

    fixture.componentInstance.managePreferences();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Cookie preferences');
    expect(el.textContent).toContain('Essential storage');
    expect(el.textContent).toContain('Required');
    expect(el.textContent).toContain('Keeps the site secure and functional.');
    expect(el.textContent).toContain('Analytics');
    expect(el.textContent).toContain('Optional');
    expect(el.textContent).toContain('Reject cookies');
    expect(el.textContent).toContain('Accept cookies');
    expect(el.textContent).toContain('Provider: Google Analytics 4');
    expect(el.textContent).toContain('Read the full privacy policy');
    expect(el.textContent).toContain('Save preferences');
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

  it('saves preferences as rejected when analytics is off', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();

    fixture.componentInstance.managePreferences();
    fixture.componentInstance.savePreferences();
    fixture.detectChanges();

    expect(localStorage.getItem('skilltolife_cookie_consent')).toBe(
      'rejected_analytics',
    );
  });

  it('saves preferences as accepted when analytics is on', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();

    fixture.componentInstance.managePreferences();
    fixture.componentInstance.analyticsEnabled.set(true);
    fixture.componentInstance.savePreferences();
    fixture.detectChanges();

    expect(localStorage.getItem('skilltolife_cookie_consent')).toBe(
      'accepted_analytics',
    );
  });

  it('does not show banner when consent is already set', () => {
    localStorage.setItem('skilltolife_cookie_consent', 'rejected_analytics');
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('opens preferences from the footer preference event', () => {
    localStorage.setItem('skilltolife_cookie_consent', 'rejected_analytics');
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();

    window.dispatchEvent(new CustomEvent('skilltolife-open-cookie-preferences'));
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(true);
    expect(fixture.componentInstance.preferencesOpen()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Cookie preferences');
  });
});
