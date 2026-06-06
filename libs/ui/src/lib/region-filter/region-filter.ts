import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { SalaryRegion } from 'types';

export interface RegionOption {
  value: SalaryRegion;
  label: string;
  flag: string;
}

export const REGION_OPTIONS: RegionOption[] = [
  { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'us', label: 'United States', flag: '🇺🇸' },
  { value: 'nigeria', label: 'Nigeria', flag: '🇳🇬' },
  { value: 'europe', label: 'Europe', flag: '🇪🇺' },
  { value: 'global', label: 'Global', flag: '🌍' },
];

@Component({
  selector: 'ns-region-filter',
  standalone: true,
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-sm font-semibold text-ns-text">Region:</span>
      @for (option of options; track option.value) {
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-ns border px-3 py-1.5 text-sm font-semibold transition duration-fast ease-ns focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
          [class]="
            active === option.value
              ? 'border-ns-primary bg-ns-primary text-white'
              : 'border-ns-border bg-transparent text-ns-muted hover:border-ns-borderStrong hover:text-ns-text'
          "
          [attr.aria-pressed]="active === option.value"
          (click)="regionChange.emit(option.value)"
        >
          <span aria-hidden="true">{{ option.flag }}</span>
          {{ option.label }}
        </button>
      }
    </div>
  `,
})
export class NsRegionFilterComponent {
  @Input() active: SalaryRegion = 'uk';
  @Output() regionChange = new EventEmitter<SalaryRegion>();

  readonly options = REGION_OPTIONS;
}
