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
      'block rounded-ns border border-ns-border bg-ns-card text-ns-text shadow-ns transition duration-base ease-ns',
      this.elevated ? 'bg-ns-cardElevated shadow-ns-lg' : '',
      this.interactive
        ? 'cursor-pointer hover:-translate-y-0.5 hover:border-ns-border hover:shadow-glow'
        : '',
      this.padded ? 'p-5 sm:p-6' : '',
    ].join(' ');
  }
}
