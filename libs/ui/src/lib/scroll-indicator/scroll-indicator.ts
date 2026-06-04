import { Component, HostListener, OnInit, signal } from '@angular/core';

@Component({
  selector: 'ns-scroll-indicator',
  standalone: true,
  styles: [
    `
      .bounce-down {
        animation: bounce-down 1.5s ease-in-out infinite;
      }
      @keyframes bounce-down {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(6px);
        }
      }
    `,
  ],
  template: `
    <div
      class="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transition-opacity duration-300"
      [class.opacity-0]="!visible()"
      [class.opacity-100]="visible()"
      aria-hidden="true"
    >
      <div
        class="bounce-down flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm"
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
          class="text-ns-muted"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span class="hidden text-xs font-medium text-ns-muted sm:inline"
          >Scroll to explore</span
        >
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

  private checkVisibility(): void {
    try {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      this.visible.set(scrolled < 150 && docHeight > winHeight + 100);
    } catch {
      this.visible.set(false);
    }
  }
}
