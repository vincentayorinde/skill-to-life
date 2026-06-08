import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ns-option-card',
  standalone: true,
  template: `
    <button
      type="button"
      class="group flex w-full items-center gap-4 rounded-ns-card border-2 bg-ns-card p-4 text-left transition-all duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus disabled:cursor-not-allowed disabled:opacity-50"
      [class.border-ns-border]="!selected"
      [class.border-ns-primary]="selected"
      [class.bg-ns-primarySoft]="selected"
      [class.hover:border-ns-primary]="!selected"
      [class.hover:bg-ns-primarySoft\/30]="!selected"
      [class.shadow-ns]="selected"
      [disabled]="disabled"
      [attr.aria-pressed]="selected"
      (click)="optionSelected.emit()"
    >
      @if (icon) {
        <span
          class="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl transition-colors"
          [class.bg-ns-warningSoft]="!selected"
          [class.bg-ns-primarySoft]="selected"
          aria-hidden="true"
        >
          {{ icon }}
        </span>
      }
      <span class="min-w-0 flex-1">
        <span
          class="block text-sm font-medium leading-snug"
          [class.text-ns-text]="!selected"
          [class.text-ns-primary]="selected"
        >{{ title }}</span>
        @if (description) {
          <span class="mt-0.5 block text-xs leading-5 text-ns-muted">
            {{ description }}
          </span>
        }
      </span>

      <!-- Selection indicator -->
      <span
        class="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-base"
        [class.border-ns-borderStrong]="!selected"
        [class.bg-transparent]="!selected"
        [class.border-ns-primary]="selected"
        [class.bg-ns-primary]="selected"
        aria-hidden="true"
      >
        @if (selected) {
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      </span>
    </button>
  `,
})
export class NsOptionCardComponent {
  @Input({ required: true }) title = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() selected = false;
  @Input() disabled = false;
  @Output() optionSelected = new EventEmitter<void>();
}
