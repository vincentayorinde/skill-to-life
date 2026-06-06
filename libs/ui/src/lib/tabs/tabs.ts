import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface NsTabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'ns-tabs',
  standalone: true,
  template: `
    <div
      class="inline-flex rounded-ns border border-ns-border bg-ns-canvas p-0.5"
      role="tablist"
    >
      @for (tab of tabs; track tab.id) {
        <button
          type="button"
          role="tab"
          class="rounded-ns px-4 py-2 text-sm font-semibold text-ns-muted transition duration-base ease-ns hover:text-ns-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
          [class.bg-ns-primary]="tab.id === activeId"
          [class.text-white]="tab.id === activeId"
          [class.shadow-ns]="tab.id === activeId"
          [attr.aria-selected]="tab.id === activeId"
          (click)="activeIdChange.emit(tab.id)"
        >
          {{ tab.label }}
        </button>
      }
    </div>
  `,
})
export class NsTabsComponent {
  @Input() tabs: NsTabItem[] = [];
  @Input() activeId = '';
  @Output() activeIdChange = new EventEmitter<string>();
}
