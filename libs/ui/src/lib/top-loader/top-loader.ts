import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-top-loader',
  standalone: true,
  template: `
    <div
      aria-hidden="true"
      class="pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-[3px]"
      [style.opacity]="active() ? '1' : '0'"
      style="transition: opacity 350ms ease"
    >
      <div
        class="relative h-full"
        [style.width]="progress() + '%'"
        [style.transition]="barTransition()"
        style="background: var(--ns-color-primary); box-shadow: 0 0 12px var(--ns-color-primary), 0 0 4px var(--ns-color-primary);"
      >
        <!-- Leading glow dot -->
        <span
          class="absolute -right-1 -top-[2px] h-[7px] w-[7px] rounded-full"
          style="background: var(--ns-color-primary); filter: blur(3px); opacity: 0.85;"
        ></span>
      </div>
    </div>
  `,
})
export class NsTopLoaderComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private sub?: Subscription;
  private doneTimer?: ReturnType<typeof setTimeout>;

  readonly active = signal(false);
  readonly progress = signal(0);
  readonly barTransition = signal('none');

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.start();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.finish();
      }
    });
  }

  private start(): void {
    clearTimeout(this.doneTimer);
    this.active.set(true);
    this.barTransition.set('none');
    this.progress.set(0);

    // One frame delay so the browser renders the reset before animating
    setTimeout(() => {
      this.barTransition.set('width 10s cubic-bezier(0.05, 0.8, 0.08, 1)');
      this.progress.set(90);
    }, 16);
  }

  private finish(): void {
    clearTimeout(this.doneTimer);
    this.barTransition.set('width 200ms ease-out');
    this.progress.set(100);

    this.doneTimer = setTimeout(() => {
      this.active.set(false);
      // Reset silently after fade-out
      setTimeout(() => {
        this.barTransition.set('none');
        this.progress.set(0);
      }, 350);
    }, 250);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    clearTimeout(this.doneTimer);
  }
}
