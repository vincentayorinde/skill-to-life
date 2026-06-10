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
      neutral: 'bg-ns-canvasSubtle text-ns-muted',
      primary: 'bg-ns-primarySoft text-ns-primary',
      success: 'bg-ns-successSoft text-ns-success',
      warning: 'bg-ns-warningSoft text-ns-warning',
      accent: 'bg-ns-accentSoft text-ns-accent',
      purple: 'bg-ns-purpleSoft text-ns-purple',
    };

    return [
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-none',
      variants[this.variant],
    ].join(' ');
  }
}
