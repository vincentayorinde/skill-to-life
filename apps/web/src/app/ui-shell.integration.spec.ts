import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  NsAppShellComponent,
  NsCookieNoticeComponent,
  NsGrowthBricksComponent,
} from 'ui';

describe('UI shell integration', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders 20 growth brick elements', async () => {
    await TestBed.configureTestingModule({
      imports: [NsGrowthBricksComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(NsGrowthBricksComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.brick').length).toBe(20);
  });

  it('renders growth bricks in a fixed pointer-inert container', async () => {
    await TestBed.configureTestingModule({
      imports: [NsGrowthBricksComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(NsGrowthBricksComponent);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.bricks-container');
    const styles = getComputedStyle(container);

    expect(styles.position).toBe('fixed');
    expect(styles.pointerEvents).toBe('none');
  });

  it('keeps nav primary button text white in dark mode', async () => {
    const fixture = await createShellFixture();

    const cta = fixture.nativeElement.querySelector('.nav-cta-primary');
    expect(getComputedStyle(cta).color).toBe('rgb(255, 255, 255)');
  });

  it('keeps nav primary button text white in light mode', async () => {
    localStorage.setItem('skill-to-life-theme', 'light');
    const fixture = await createShellFixture();

    const cta = fixture.nativeElement.querySelector('.nav-cta-primary');
    expect(getComputedStyle(cta).color).toBe('rgb(255, 255, 255)');
  });

  it('shows the friendly cookie banner copy', async () => {
    const fixture = await createCookieFixture();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Help us improve your experience');
    expect(text).toContain(
      'We use analytics to understand how people use Skill to Life',
    );
    expect(text).toContain('We do not use analytics to identify you');
    expect(text).toContain('Accept cookies');
    expect(text).toContain('Reject cookies');
    expect(text).not.toContain('Manage preferences');
    expect(text).toContain('Privacy policy');
  });

  it('opens cookie preferences with simple details', async () => {
    const fixture = await createCookieFixture();

    fixture.componentInstance.managePreferences();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Cookie preferences');
    expect(text).toContain('Essential storage');
    expect(text).toContain('Required');
    expect(text).toContain('Analytics');
    expect(text).toContain('Provider: Google Analytics 4');
    expect(text).toContain('Read the full privacy policy');
    expect(text).toContain('Accept cookies');
    expect(text).toContain('Reject cookies');
  });

  it('keeps cookie consent storage values unchanged', async () => {
    const fixture = await createCookieFixture();

    fixture.componentInstance.acceptAnalytics();
    expect(localStorage.getItem('skilltolife_cookie_consent')).toBe(
      'accepted_analytics',
    );

    fixture.componentInstance.rejectAnalytics();
    expect(localStorage.getItem('skilltolife_cookie_consent')).toBe(
      'rejected_analytics',
    );
  });
});

async function createShellFixture(): Promise<ComponentFixture<NsAppShellComponent>> {
  await TestBed.configureTestingModule({
    imports: [NsAppShellComponent, RouterModule.forRoot([])],
  }).compileComponents();

  const fixture = TestBed.createComponent(NsAppShellComponent);
  fixture.detectChanges();

  return fixture;
}

async function createCookieFixture(): Promise<
  ComponentFixture<NsCookieNoticeComponent>
> {
  await TestBed.configureTestingModule({
    imports: [NsCookieNoticeComponent, RouterModule.forRoot([])],
  }).compileComponents();

  const fixture = TestBed.createComponent(NsCookieNoticeComponent);
  fixture.detectChanges();

  return fixture;
}
