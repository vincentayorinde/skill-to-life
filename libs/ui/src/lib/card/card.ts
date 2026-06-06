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
      'block rounded-ns-md border border-ns-border bg-ns-card text-ns-text shadow-ns transition duration-base ease-ns',
      this.elevated ? 'shadow-ns-md' : '',
      this.interactive
        ? 'cursor-pointer hover:border-ns-borderStrong hover:shadow-ns-hover'
        : '',
      this.padded ? 'p-5 sm:p-6' : '',
    ].join(' ');
  }
}
