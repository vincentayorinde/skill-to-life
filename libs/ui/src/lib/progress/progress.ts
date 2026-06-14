import { Component, Input } from '@angular/core';

@Component({
  selector: 'ns-progress',
  standalone: true,
  template: `
    <div
      class="h-[3px] w-full overflow-hidden rounded-full bg-ns-borderMuted"
      role="progressbar"
      [attr.aria-valuenow]="normalizedValue"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max"
      [attr.aria-label]="label"
    >
      <div
        class="h-full rounded-full bg-ns-primary transition-all duration-slow ease-ns"
        style="box-shadow: 0 0 8px var(--ns-color-primary);"
        [style.width.%]="percentage"
      ></div>
    </div>
  `,
})
export class NsProgressComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() label = 'Progress';

  get normalizedValue(): number {
    return Math.min(Math.max(this.value, 0), this.max);
  }

  get percentage(): number {
    if (this.max <= 0) {
      return 0;
    }

    return (this.normalizedValue / this.max) * 100;
  }
}
