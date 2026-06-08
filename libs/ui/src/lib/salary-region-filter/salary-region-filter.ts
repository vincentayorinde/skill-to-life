import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import type { SalaryRegion } from 'types';

const STORAGE_KEY = 'ns_salary_region';

const REGIONS: { value: SalaryRegion; label: string }[] = [
  { value: 'global', label: '🌍 Global' },
  { value: 'uk', label: '🇬🇧 UK' },
  { value: 'us', label: '🇺🇸 US' },
  { value: 'nigeria', label: '🇳🇬 Nigeria' },
  { value: 'europe', label: '🇪🇺 Europe' },
];

@Component({
  selector: 'ns-salary-region-filter',
  standalone: true,
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <span class="text-sm font-semibold text-ns-text">Region:</span>
      <div class="flex flex-wrap gap-2">
        @for (r of regions; track r.value) {
          <button
            type="button"
            class="rounded-full border px-3 py-1 text-sm font-semibold transition"
            [class]="
              selectedRegion === r.value
                ? 'border-ns-primary bg-ns-primary text-[#07111f]'
                : 'border-ns-border text-ns-muted hover:border-ns-primary hover:text-ns-text'
            "
            [attr.aria-pressed]="selectedRegion === r.value"
            (click)="select(r.value)"
          >
            {{ r.label }}
          </button>
        }
      </div>
    </div>
  `,
})
export class NsSalaryRegionFilterComponent implements OnInit {
  @Input() selectedRegion: SalaryRegion = 'uk';
  @Output() regionChange = new EventEmitter<SalaryRegion>();

  readonly regions = REGIONS;

  ngOnInit(): void {
    try {
      const saved = globalThis.localStorage?.getItem(STORAGE_KEY) as SalaryRegion | null;
      if (saved && REGIONS.some((r) => r.value === saved)) {
        this.selectedRegion = saved;
        this.regionChange.emit(saved);
      }
    } catch {
      // localStorage unavailable — use default
    }
  }

  select(region: SalaryRegion): void {
    this.selectedRegion = region;
    this.regionChange.emit(region);
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, region);
    } catch {
      // ignore
    }
  }
}
