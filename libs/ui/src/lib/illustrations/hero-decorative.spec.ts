import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsHeroDecorativeComponent } from './hero-decorative';

describe('NsHeroDecorativeComponent', () => {
  let fixture: ComponentFixture<NsHeroDecorativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsHeroDecorativeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NsHeroDecorativeComponent);
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders three decorative SVG lines', () => {
    const paths = fixture.nativeElement.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(3);
  });

  it('renders the stats card with key labels', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('26 careers');
    expect(text).toContain('30 scenario questions');
    expect(text).toContain('Free forever');
  });

  it('has aria-hidden on decorative SVG', () => {
    const svgs = fixture.nativeElement.querySelectorAll(
      'svg[aria-hidden="true"]',
    );
    expect(svgs.length).toBeGreaterThan(0);
  });
});
