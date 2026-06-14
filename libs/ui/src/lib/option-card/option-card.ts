import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ns-option-card',
  standalone: true,
  template: `
    <button
      type="button"
      class="group flex w-full items-start gap-4 rounded-ns border bg-ns-card p-4 text-left shadow-ns transition duration-base ease-ns hover:-translate-y-0.5 hover:border-ns-primary hover:shadow-glow focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus disabled:cursor-not-allowed disabled:opacity-60"
      [class.border-ns-primary]="selected"
      [class.bg-ns-primarySoft]="selected"
      [class.border-ns-border]="!selected"
      [disabled]="disabled"
      [attr.aria-pressed]="selected"
      (click)="optionSelected.emit()"
    >
      @if (icon) {
        <span
          class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ns-warningSoft text-xl"
          aria-hidden="true"
        >
          {{ icon }}
        </span>
      }
      <span class="min-w-0 flex-1">
        <span class="block text-base font-semibold text-ns-text">{{
          title
        }}</span>
        @if (description) {
          <span class="mt-1 block text-sm leading-6 text-ns-muted">
            {{ description }}
          </span>
        }
      </span>
      <span
        class="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-ns-sm border border-ns-border bg-ns-canvas transition group-hover:border-ns-primary"
        [class.border-ns-primary]="selected"
        [class.bg-ns-primary]="selected"
        aria-hidden="true"
      >
        @if (selected) {
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 3.5L3.8 6.5L9 1.5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
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
