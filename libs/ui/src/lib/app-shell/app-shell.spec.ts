import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NsAppShellComponent } from './app-shell';

describe('NsAppShellComponent', () => {
  let fixture: ComponentFixture<NsAppShellComponent>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [NsAppShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NsAppShellComponent);
  });

  it('renders brand, navigation, and actions', () => {
    fixture.componentRef.setInput('brand', 'NextSkill');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('NextSkill');
    expect(fixture.nativeElement.textContent).toContain('Platform');
    expect(fixture.nativeElement.textContent).toContain('Sign in');
    expect(fixture.nativeElement.textContent).toContain('Start free');
  });

  it('toggles and persists theme', () => {
    fixture.detectChanges();

    const toggle = fixture.debugElement.query(
      By.css('button[aria-label="Switch to light theme"]'),
    );
    toggle.triggerEventHandler('click');
    fixture.detectChanges();

    expect(fixture.componentInstance.theme).toBe('light');
    expect(localStorage.getItem('nextskill-theme')).toBe('light');
  });
});
