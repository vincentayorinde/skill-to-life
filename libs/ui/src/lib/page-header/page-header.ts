import { Component, Input } from '@angular/core';

@Component({
  selector: 'ns-page-header',
  standalone: true,
  template: `
    <header class="mb-8 border-b border-ns-border pb-6">
      @if (eyebrow) {
        <p class="mb-2 text-sm font-semibold text-ns-primary">{{ eyebrow }}</p>
      }
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1
            class="m-0 text-3xl font-bold leading-tight tracking-normal text-ns-text sm:text-5xl"
          >
            {{ title }}
          </h1>
          @if (description) {
            <p
              class="mt-3 max-w-3xl text-base leading-7 text-ns-muted sm:text-lg"
            >
              {{ description }}
            </p>
          }
        </div>
        <div class="flex flex-wrap gap-3">
          <ng-content />
        </div>
      </div>
    </header>
  `,
})
export class NsPageHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() eyebrow = '';
  @Input() description = '';
}
