import { Component, HostListener, OnInit, signal } from '@angular/core';

@Component({
  selector: 'ns-scroll-indicator',
  standalone: true,
  styles: [
    `
      /* Mobile bounce — pure Y, no translate side effects */
      .bounce-mobile {
        display: inline-flex;
        animation: bounce-mobile 1.5s ease-in-out infinite;
      }
      @keyframes bounce-mobile {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(5px);
        }
      }

      /* Desktop bounce — wrapped so it doesn't fight translateX(-50%) on parent */
      .bounce-desktop {
        animation: bounce-desktop 1.5s ease-in-out infinite;
      }
      @keyframes bounce-desktop {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(7px);
        }
      }
    `,
  ],
  template: `
    <!--
      Mobile (<768px): 40×40px circle, fixed bottom-right.
      bottom-20 (80px) clears the sticky "Share my result" button on results page.
    -->
    <button
      type="button"
      aria-label="Scroll down to see more"
      class="fixed bottom-20 right-5 z-40 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-sm transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 md:hidden"
      [class.opacity-0]="!visible()"
      [class.pointer-events-none]="!visible()"
      (click)="scrollDown(300)"
    >
      <span class="bounce-mobile" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </button>

    <!--
      Desktop (>=768px): pill, fixed bottom-center.
      Outer div handles positioning + opacity; inner div handles bounce;
      button handles visuals + click — keeping transforms on separate layers
      avoids conflicts between the animation and hover states.
    -->
    <div
      class="fixed bottom-8 left-1/2 z-40 hidden -translate-x-1/2 transition-opacity duration-300 md:block"
      [class.opacity-0]="!visible()"
      [class.pointer-events-none]="!visible()"
    >
      <div class="bounce-desktop">
        <button
          type="button"
          aria-label="Scroll down to see more content"
          class="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13px] font-medium text-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-[12px] transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
          (click)="scrollDown(400)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          Scroll to explore
        </button>
      </div>
    </div>
  `,
})
export class NsScrollIndicatorComponent implements OnInit {
  readonly visible = signal(false);

  ngOnInit(): void {
    this.checkVisibility();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.checkVisibility();
  }

  scrollDown(amount: number): void {
    try {
      window.scrollBy({ top: amount, behavior: 'smooth' });
    } catch {
      // Scroll API unavailable.
    }
  }

  private checkVisibility(): void {
    try {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearBottom = scrolled + winHeight >= docHeight - 100;
      this.visible.set(
        scrolled < 150 && docHeight > winHeight + 100 && !nearBottom,
      );
    } catch {
      this.visible.set(false);
    }
  }
}
