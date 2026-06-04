import { TestBed } from '@angular/core/testing';
import { NsScrollIndicatorComponent } from './scroll-indicator';

function makePageScrollable(docHeight = 2000, winHeight = 800): void {
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true,
    get: () => docHeight,
  });
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    get: () => winHeight,
  });
}

function setScrollY(y: number): void {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    get: () => y,
  });
}

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

  it('renders a mobile circle button with bottom-right positioning', () => {
    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    const mobileBtn = fixture.nativeElement.querySelector(
      'button.fixed.bottom-20.right-5',
    );
    expect(mobileBtn).not.toBeNull();
  });

  it('renders a desktop pill container with bottom-center positioning', () => {
    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    const desktopWrapper = fixture.nativeElement.querySelector(
      'div.fixed.bottom-8.left-1\\/2',
    );
    expect(desktopWrapper).not.toBeNull();
  });

  it('is hidden by default when page is not scrollable', () => {
    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    // jsdom scrollHeight === innerHeight — page not scrollable.
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('shows when page is scrollable and user is at top', () => {
    makePageScrollable(2000, 800);
    setScrollY(0);

    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    fixture.componentInstance.onScroll();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(true);
  });

  it('hides when window.scrollY reaches 150px', () => {
    makePageScrollable(2000, 800);
    setScrollY(0);

    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    fixture.componentInstance.onScroll();
    expect(fixture.componentInstance.visible()).toBe(true);

    setScrollY(150);
    fixture.componentInstance.onScroll();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('hides when page content is not taller than viewport', () => {
    makePageScrollable(800, 800);
    setScrollY(0);

    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    fixture.componentInstance.onScroll();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('hides when user is within 100px of the page bottom', () => {
    makePageScrollable(2000, 800);
    // scrollY(1101) + 800 = 1901 >= 2000 - 100 = 1900 → nearBottom
    setScrollY(1101);

    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    fixture.componentInstance.onScroll();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('scrollDown calls window.scrollBy with given amount', () => {
    const scrollBySpy = vi
      .spyOn(window, 'scrollBy')
      .mockImplementation(() => undefined);

    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();

    fixture.componentInstance.scrollDown(300);
    expect(scrollBySpy).toHaveBeenCalledWith({ top: 300, behavior: 'smooth' });

    fixture.componentInstance.scrollDown(400);
    expect(scrollBySpy).toHaveBeenCalledWith({ top: 400, behavior: 'smooth' });

    scrollBySpy.mockRestore();
  });

  it('mobile button click calls scrollDown(300)', () => {
    makePageScrollable(2000, 800);
    setScrollY(0);

    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    fixture.componentInstance.onScroll();
    fixture.detectChanges();

    const scrollDownSpy = vi.spyOn(fixture.componentInstance, 'scrollDown');
    const mobileBtn: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button.fixed.bottom-20',
    );
    mobileBtn.click();

    expect(scrollDownSpy).toHaveBeenCalledWith(300);
    scrollDownSpy.mockRestore();
  });

  it('mobile circle has z-40 so it sits above page content but below modals', () => {
    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    const mobileBtn = fixture.nativeElement.querySelector(
      'button.fixed.bottom-20.right-5',
    );
    expect(mobileBtn.classList.contains('z-40')).toBe(true);
  });

  it('desktop pill has z-40', () => {
    const fixture = TestBed.createComponent(NsScrollIndicatorComponent);
    fixture.detectChanges();
    const desktopWrapper =
      fixture.nativeElement.querySelector('div.fixed.bottom-8');
    expect(desktopWrapper.classList.contains('z-40')).toBe(true);
  });
});
