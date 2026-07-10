import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NsAppShellComponent } from './app-shell';

describe('NsAppShellComponent', () => {
  let fixture: ComponentFixture<NsAppShellComponent>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [NsAppShellComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NsAppShellComponent);
  });

  it('renders brand, navigation, and actions', () => {
    fixture.componentRef.setInput('brand', 'Skill to Life');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Skill to Life');
    expect(fixture.nativeElement.textContent).toContain('How it works');
    expect(fixture.nativeElement.textContent).toContain('Career paths');
    expect(fixture.nativeElement.textContent).toContain('Start assessment');
  });

  it('renders growth bricks behind app content', () => {
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('ns-growth-bricks'),
    ).not.toBeNull();

    const content = fixture.nativeElement.querySelector('.app-content');
    expect(content.classList).toContain('relative');
    expect(content.classList).toContain('z-[1]');
  });

  it('defaults to dark theme when no saved preference', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.theme).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('keeps the primary nav CTA text dark in dark mode', () => {
    fixture.detectChanges();

    const cta = fixture.nativeElement.querySelector('.nav-cta-primary');
    expect(getComputedStyle(cta).color).toBe('var(--ns-color-primary-fg)');
  });

  it('toggles and persists theme', () => {
    fixture.detectChanges();

    const toggle = fixture.debugElement.query(
      By.css('button[aria-label="Switch to light theme"]'),
    );
    toggle.triggerEventHandler('click');
    fixture.detectChanges();

    expect(fixture.componentInstance.theme).toBe('light');
    expect(localStorage.getItem('skill-to-life-theme')).toBe('light');
  });

  it('restores saved dark theme from localStorage', async () => {
    localStorage.setItem('skill-to-life-theme', 'dark');
    fixture.detectChanges();
    expect(fixture.componentInstance.theme).toBe('dark');
  });

  it('restores saved light theme from localStorage', () => {
    localStorage.setItem('skill-to-life-theme', 'light');
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.theme).toBe('light');
  });

  it('keeps the primary nav CTA text white in light mode', () => {
    localStorage.setItem('skill-to-life-theme', 'light');
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    const cta = fixture.nativeElement.querySelector('.nav-cta-primary');
    expect(getComputedStyle(cta).color).toBe('var(--ns-color-primary-fg)');
  });

  it('defines dark dev login text and outline in light mode', () => {
    fixture.componentRef.setInput('devMode', true);
    localStorage.setItem('skill-to-life-theme', 'light');
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    const devLogin = fixture.nativeElement.querySelector('.ns-dev-login');
    expect(devLogin).not.toBeNull();

    const styles = (
      NsAppShellComponent as unknown as { ɵcmp: { styles: string[] } }
    ).ɵcmp.styles.join('\n');
    expect(styles).toContain("[data-theme='light']");
    expect(styles).toContain('.ns-dev-login');
    expect(styles).toContain('border-color: var(--color-text');
    expect(styles).toContain('color: var(--color-text');
  });

  it('toggles back from light to dark', () => {
    localStorage.setItem('skill-to-life-theme', 'light');
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    const toggle = fixture.debugElement.query(
      By.css('button[aria-label="Switch to dark theme"]'),
    );
    toggle.triggerEventHandler('click');
    fixture.detectChanges();

    expect(fixture.componentInstance.theme).toBe('dark');
    expect(localStorage.getItem('skill-to-life-theme')).toBe('dark');
  });
});
