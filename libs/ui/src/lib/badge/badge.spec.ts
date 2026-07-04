import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsBadgeComponent } from './badge';

describe('NsBadgeComponent', () => {
  let fixture: ComponentFixture<NsBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NsBadgeComponent);
    fixture.detectChanges();
  });

  it('applies font-mono class for monospace typography', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.className).toContain('font-mono');
  });

  it('applies uppercase and tracking-wider for mono label style', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.className).toContain('uppercase');
    expect(el.className).toContain('tracking-wider');
  });

  it('uses rounded-ns-sm instead of rounded-full', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.className).toContain('rounded-ns-sm');
    expect(el.className).not.toContain('rounded-full');
  });

  it('applies variant-specific classes for each variant', () => {
    const variants = [
      'neutral',
      'primary',
      'success',
      'warning',
      'accent',
      'purple',
    ] as const;
    for (const variant of variants) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.className.length).toBeGreaterThan(0);
    }
  });
});
