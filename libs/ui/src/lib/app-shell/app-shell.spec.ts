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
    fixture.componentRef.setInput('brand', 'NextSkill');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('NextSkill');
    expect(fixture.nativeElement.textContent).toContain('How it works');
    expect(fixture.nativeElement.textContent).toContain('Career paths');
    expect(fixture.nativeElement.textContent).toContain('Start assessment');
  });

  it('toggles and persists theme', () => {
    fixture.detectChanges();

    // Default theme is 'light', so the toggle offers to switch to dark
    const toggle = fixture.debugElement.query(
      By.css('button[aria-label="Switch to dark theme"]'),
    );
    toggle.triggerEventHandler('click');
    fixture.detectChanges();

    expect(fixture.componentInstance.theme).toBe('dark');
    expect(localStorage.getItem('nextskill-theme')).toBe('dark');
  });
});
