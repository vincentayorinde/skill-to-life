import { Component, Input } from '@angular/core';

export type NsToastVariant = 'success' | 'error';

@Component({
  selector: 'ns-toast',
  standalone: true,
  styles: [
    `
      :host {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 200;
        pointer-events: none;
      }
    `,
  ],
  template: `
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      [class]="innerClasses"
      [style.opacity]="visible ? 1 : 0"
      [style.transform]="visible ? 'translateY(0)' : 'translateY(8px)'"
      style="transition: opacity 200ms ease, transform 200ms ease; white-space: nowrap;"
    >
      @if (variant === 'success') {
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      }
      {{ message }}
    </div>
  `,
})
export class NsToastComponent {
  @Input() message = '';
  @Input() variant: NsToastVariant = 'success';
  @Input() visible = false;

  get innerClasses(): string {
    const base =
      'inline-flex items-center gap-2 rounded-ns px-5 py-3 text-sm font-medium text-white shadow-ns-lg';
    return this.variant === 'error'
      ? `${base} bg-ns-danger`
      : `${base} bg-[#202124]`;
  }
}
