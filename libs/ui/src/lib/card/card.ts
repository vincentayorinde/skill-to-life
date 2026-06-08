import { Component, Input } from '@angular/core';

@Component({
  selector: 'ns-card',
  standalone: true,
  host: {
    '[class]': 'classes',
  },
  template: '<ng-content />',
})
export class NsCardComponent {
  @Input() padded = true;
  @Input() elevated = false;
  @Input() interactive = false;

  get classes(): string {
    return [
      'block rounded-ns-card border border-ns-border bg-ns-card text-ns-text shadow-ns transition-all duration-base',
      this.elevated ? 'shadow-ns-md' : '',
      this.interactive
        ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-ns-hover hover:border-ns-borderStrong'
        : '',
      this.padded ? 'p-6' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
