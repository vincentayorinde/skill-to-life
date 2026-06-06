import { Component, Input } from '@angular/core';

export type NsBadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'accent'
  | 'purple';

@Component({
  selector: 'ns-badge',
  standalone: true,
  host: {
    '[class]': 'classes',
  },
  template: '<ng-content />',
})
export class NsBadgeComponent {
  @Input() variant: NsBadgeVariant = 'neutral';

  get classes(): string {
    const variants: Record<NsBadgeVariant, string> = {
      neutral: 'border-ns-border bg-ns-card text-ns-muted',
      primary: 'border-ns-border bg-ns-primarySoft text-ns-primaryHover',
      success: 'border-ns-border bg-ns-successSoft text-ns-successHover',
      warning: 'border-ns-border bg-ns-warningSoft text-ns-warning',
      accent: 'border-ns-border bg-ns-accentSoft text-ns-accent',
      purple: 'border-ns-border bg-ns-purpleSoft text-ns-purple',
    };

    return [
      'inline-flex items-center rounded-ns border px-2.5 py-0.5 text-xs font-semibold leading-none',
      variants[this.variant],
    ].join(' ');
  }
}
