import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NsAppShellComponent, NsGrowthBricksComponent } from 'ui';

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
});

async function createShellFixture(): Promise<ComponentFixture<NsAppShellComponent>> {
  await TestBed.configureTestingModule({
    imports: [NsAppShellComponent, RouterModule.forRoot([])],
  }).compileComponents();

  const fixture = TestBed.createComponent(NsAppShellComponent);
  fixture.detectChanges();

  return fixture;
}
