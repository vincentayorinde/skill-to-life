import { Component } from '@angular/core';

@Component({
  selector: 'ns-hero-decorative',
  standalone: true,
  template: `
    <div class="relative h-full w-full" aria-hidden="true">
      <!-- Background circles -->
      <svg
        class="absolute inset-0 h-full w-full"
        viewBox="0 0 600 400"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <circle cx="480" cy="120" r="180" fill="#E8EAED" opacity="0.5"/>
        <circle cx="380" cy="280" r="120" fill="#DADCE0" opacity="0.4"/>

        <!-- Sweep line 1 — blue -->
        <path
          d="M 600 -20 C 500 40 300 80 100 200 C 20 240 -30 300 -50 400"
          stroke="#006AFF"
          stroke-width="4"
          stroke-linecap="round"
          fill="none"
          opacity="0.7"
        />
        <!-- Sweep line 2 — yellow -->
        <path
          d="M 650 60 C 520 100 400 140 260 240 C 160 300 80 340 0 380"
          stroke="#FBBC04"
          stroke-width="4"
          stroke-linecap="round"
          fill="none"
          opacity="0.7"
        />
        <!-- Sweep line 3 — green -->
        <path
          d="M 620 140 C 500 160 380 200 280 280 C 200 340 120 370 30 400"
          stroke="#34A853"
          stroke-width="4"
          stroke-linecap="round"
          fill="none"
          opacity="0.7"
        />
      </svg>

      <!-- Stats card floating -->
      <div
        class="absolute bottom-8 right-4 w-56 rounded-ns-card border border-ns-border bg-ns-card p-5 shadow-ns-md"
      >
        <p class="mb-3 text-xs font-medium uppercase tracking-wide text-ns-muted">At a glance</p>
        <div class="space-y-2.5">
          <div class="flex items-center gap-3">
            <span class="h-2 w-2 rounded-full bg-ns-illusBlue"></span>
            <span class="text-sm text-ns-text">26 careers matched</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="h-2 w-2 rounded-full bg-ns-illusYellow"></span>
            <span class="text-sm text-ns-text">30 scenario questions</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="h-2 w-2 rounded-full bg-ns-illusGreen"></span>
            <span class="text-sm text-ns-text">Free forever</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NsHeroDecorativeComponent {}
