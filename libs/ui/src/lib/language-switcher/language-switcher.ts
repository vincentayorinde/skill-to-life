import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';

export interface LangOption {
  code: string;
  label: string;
  nativeLabel: string;
}

export const LANGUAGE_OPTIONS: LangOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português' },
];

@Component({
  selector: 'ns-language-switcher',
  standalone: true,
  template: `
    <div class="relative">
      <button
        type="button"
        class="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-ns-border bg-ns-card px-3 text-sm font-semibold text-ns-muted transition duration-base ease-ns hover:border-ns-primary hover:text-ns-text focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
        [attr.aria-expanded]="open()"
        aria-haspopup="listbox"
        [attr.aria-label]="'Language: ' + currentLabel()"
        (click)="open.set(!open())"
      >
        <span aria-hidden="true">🌐</span>
        <span>{{ currentCode().toUpperCase() }}</span>
        <span aria-hidden="true" class="text-[10px]">{{ open() ? '▲' : '▼' }}</span>
      </button>

      @if (open()) {
        <div
          role="listbox"
          [attr.aria-label]="'Select language'"
          class="absolute right-0 top-full z-50 mt-1 w-44 rounded-ns border border-ns-border bg-ns-card shadow-ns"
        >
          @for (lang of languages; track lang.code) {
            <button
              type="button"
              role="option"
              class="flex w-full items-center justify-between px-3 py-2 text-sm font-semibold transition duration-base ease-ns first:rounded-t-ns last:rounded-b-ns hover:bg-ns-canvasSubtle"
              [class.text-ns-primaryHover]="lang.code === active"
              [class.text-ns-text]="lang.code !== active"
              [attr.aria-selected]="lang.code === active"
              (click)="selectLang(lang.code)"
            >
              <span>{{ lang.nativeLabel }}</span>
              @if (lang.code === active) {
                <span aria-hidden="true" class="text-ns-primary">✓</span>
              }
            </button>
          }
        </div>
      }
    </div>
  `,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NsLanguageSwitcherComponent {
  @Input() active = 'en';
  @Output() languageChange = new EventEmitter<string>();

  readonly open = signal(false);
  readonly languages = LANGUAGE_OPTIONS;

  get currentCode(): () => string {
    return () => this.active;
  }

  get currentLabel(): () => string {
    return () =>
      LANGUAGE_OPTIONS.find((l) => l.code === this.active)?.nativeLabel ?? 'EN';
  }

  selectLang(code: string): void {
    this.languageChange.emit(code);
    this.open.set(false);
  }

  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('ns-language-switcher')) {
      this.open.set(false);
    }
  }
}
