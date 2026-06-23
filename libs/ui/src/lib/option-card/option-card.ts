import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ns-option-card',
  standalone: true,
  template: `
    <button
      type="button"
      class="ns-option-card"
      [class.ns-option-selected]="selected"
      [disabled]="disabled"
      [attr.aria-pressed]="selected"
      (click)="optionSelected.emit()"
    >
      @if (icon) {
        <span class="ns-option-icon" aria-hidden="true">{{ icon }}</span>
      }
      <span class="ns-option-copy">
        <span class="ns-option-title">{{ title }}</span>
        @if (description) {
          <span class="ns-option-description">{{ description }}</span>
        }
      </span>
      <span class="ns-option-check" aria-hidden="true">
        @if (selected) {
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 3.5L3.8 6.5L9 1.5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        }
      </span>
    </button>
  `,
  styles: [
    `
      .ns-option-card {
        width: 100%;
        display: flex;
        align-items: flex-start;
        gap: 16px;
        border: 1px solid var(--color-border, var(--ns-color-border));
        border-radius: var(--radius-md, var(--ns-radius-md));
        background: var(--color-bg-card, var(--ns-color-card));
        color: var(--color-text, var(--ns-color-text));
        cursor: pointer;
        padding: 16px;
        text-align: left;
        box-shadow: var(--ns-shadow-sm);
        transition:
          border-color var(--ns-motion-base) ease,
          background-color var(--ns-motion-base) ease,
          transform var(--ns-motion-base) ease;
      }

      .ns-option-card:not(.ns-option-selected):hover {
        border-color: rgba(255, 255, 255, 0.15);
        background: var(--color-bg-secondary, var(--ns-color-canvas-subtle));
      }

      :host-context([data-theme='light']) .ns-option-card:not(.ns-option-selected):hover {
        border-color: rgba(0, 0, 0, 0.15);
      }

      .ns-option-card:focus-visible {
        outline: 3px solid var(--ns-color-focus);
        outline-offset: 3px;
      }

      .ns-option-card:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      .ns-option-selected {
        border: 1px solid rgba(0, 106, 255, 0.5);
        background: rgba(0, 106, 255, 0.08);
      }

      .ns-option-icon {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        flex-shrink: 0;
        border-radius: 999px;
        background: var(--ns-color-warning-soft);
        font-size: 20px;
      }

      .ns-option-copy {
        min-width: 0;
        flex: 1;
      }

      .ns-option-title {
        display: block;
        color: var(--color-text, var(--ns-color-text));
        font-size: 16px;
        font-weight: 600;
      }

      .ns-option-description {
        display: block;
        margin-top: 4px;
        color: var(--color-text-secondary, var(--ns-color-muted));
        font-size: 14px;
        line-height: 1.5;
      }

      .ns-option-check {
        width: 18px;
        height: 18px;
        display: grid;
        place-items: center;
        flex-shrink: 0;
        margin-top: 4px;
        border: 1px solid var(--color-border, var(--ns-color-border));
        border-radius: 3px;
        background: var(--ns-color-canvas);
      }

      .ns-option-selected .ns-option-check {
        width: 16px;
        height: 16px;
        border: 0;
        background: var(--color-accent, var(--ns-color-primary));
        opacity: 0.9;
      }
    `,
  ],
})
export class NsOptionCardComponent {
  @Input({ required: true }) title = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() selected = false;
  @Input() disabled = false;
  @Output() optionSelected = new EventEmitter<void>();
}
