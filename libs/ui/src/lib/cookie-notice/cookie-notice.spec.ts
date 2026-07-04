import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NsCookieNoticeComponent } from './cookie-notice';

describe('NsCookieNoticeComponent', () => {
  beforeEach(async () => {
    localStorage.removeItem('ns_cookie_notice');
    await TestBed.configureTestingModule({
      imports: [NsCookieNoticeComponent, RouterTestingModule],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.removeItem('ns_cookie_notice');
  });

  it('renders without error', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows banner when ns_cookie_notice is not set', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('essential cookies');
  });

  it('hides banner when dismissed', () => {
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.dismiss();
    fixture.detectChanges();
    expect(localStorage.getItem('ns_cookie_notice')).toBe('1');
    expect(component.visible()).toBe(false);
  });

  it('does not show banner when already dismissed', () => {
    localStorage.setItem('ns_cookie_notice', '1');
    const fixture = TestBed.createComponent(NsCookieNoticeComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
  });
});
