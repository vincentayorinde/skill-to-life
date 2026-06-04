import { TestBed } from '@angular/core/testing';
import { NsScrollIndicatorComponent } from './scroll-indicator';

describe('NsScrollIndicatorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsScrollIndicatorComponent],
    }).compileComponents();
  });

  it('renders without error', () => {
    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('is hidden by default (not yet scrollable)', () => {
    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    // jsdom document height equals window height — page is not scrollable.
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('hides when window.scrollY is >= 150px', () => {
    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();

    // Simulate page being tall enough to scroll
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      get: () => 2000,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      get: () => 800,
    });

    // Scroll to 100px — should be visible
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => 100,
    });
    fixture.componentInstance.onScroll();
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(true);

    // Scroll past 150px — should hide
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => 160,
    });
    fixture.componentInstance.onScroll();
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('hides when page content is not taller than viewport', () => {
    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      get: () => 800,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      get: () => 800,
    });
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => 0,
    });

    fixture.componentInstance.onScroll();
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
  });
});
