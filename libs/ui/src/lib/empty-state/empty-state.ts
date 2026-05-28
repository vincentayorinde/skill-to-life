import { Component, Input } from '@angular/core';

@Component({
  selector: 'ns-empty-state',
  standalone: true,
  template: `
    <div
      class="rounded-ns border border-dashed border-ns-border bg-ns-card p-6 text-center shadow-ns"
    >
      @if (icon) {
        <div
          class="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-ns-warningSoft text-2xl shadow-ns"
          aria-hidden="true"
        >
          {{ icon }}
        </div>
      }
      <h2 class="m-0 text-lg font-semibold text-ns-text">{{ title }}</h2>
      @if (description) {
        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-ns-muted">
          {{ description }}
        </p>
      }
      <div class="mt-4">
        <ng-content />
      </div>
    </div>
  `,
})
export class NsEmptyStateComponent {
  @Input() title = 'Nothing here yet';
  @Input() description = '';
  @Input() icon = '';
}
