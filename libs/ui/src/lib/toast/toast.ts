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
        z-index: 100;
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
      style="transition: opacity 300ms ease, transform 300ms ease; white-space: nowrap;"
    >
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
      'inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold shadow-xl';
    return this.variant === 'error'
      ? `${base} bg-red-600 text-white`
      : `${base} bg-green-600 text-white`;
  }
}
