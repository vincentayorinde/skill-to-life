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

  it('defaults to dark theme when no saved preference', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.theme).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
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
