import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsGrowthBricksComponent } from './growth-bricks';

describe('NsGrowthBricksComponent', () => {
  let fixture: ComponentFixture<NsGrowthBricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsGrowthBricksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NsGrowthBricksComponent);
    fixture.detectChanges();
  });

  it('renders 20 brick elements', () => {
    const bricks = fixture.nativeElement.querySelectorAll('.brick');
    expect(bricks.length).toBe(20);
  });

  it('renders a fixed pointer-inert container', () => {
    const container = fixture.nativeElement.querySelector('.bricks-container');
    const styles = getComputedStyle(container);

    expect(container).not.toBeNull();
    expect(styles.position).toBe('fixed');
    expect(styles.pointerEvents).toBe('none');
  });

  it('assigns bounce animation to every fourth brick', () => {
    const bricks = fixture.componentInstance.bricks;
    const bouncing = bricks.filter(
      (brick) => brick.style['animationName'] === 'brick-bounce',
    );

    expect(bouncing.length).toBe(5);
  });
});
