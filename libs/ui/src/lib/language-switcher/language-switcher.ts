import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const STORAGE_KEY = 'ns_language';

interface LangOption {
  code: string;
  flag: string;
  label: string;
}

const LANGUAGES: LangOption[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'pt', flag: '🇵🇹', label: 'Português' },
  { code: 'yo', flag: '🇳🇬', label: 'Yorùbá' },
  { code: 'ha', flag: '🇳🇬', label: 'Hausa' },
  { code: 'ig', flag: '🇳🇬', label: 'Igbo' },
];

@Component({
  selector: 'ns-language-switcher',
  standalone: true,
  template: `
    <div class="relative">
      <button
        type="button"
        class="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-ns-border bg-ns-card px-3 text-sm font-semibold text-ns-muted transition duration-base ease-ns hover:border-ns-primary hover:text-ns-text focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ns-focus"
        [attr.aria-expanded]="open"
        aria-haspopup="listbox"
        aria-label="Select language"
        (click)="open = !open"
      >
        <span aria-hidden="true">🌐</span>
        <span>{{ currentLang().toUpperCase() }}</span>
      </button>

      @if (open) {
        <div
          class="absolute right-0 top-full z-50 mt-1 min-w-40 rounded-ns border border-ns-border bg-ns-card shadow-ns-lg"
          role="listbox"
          aria-label="Languages"
        >
          @for (lang of languages; track lang.code) {
            <button
              type="button"
              role="option"
              class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-ns-text transition hover:bg-ns-canvasSubtle"
              [class.text-ns-primary]="currentLang() === lang.code"
              [attr.aria-selected]="currentLang() === lang.code"
              (click)="select(lang.code)"
            >
              <span aria-hidden="true">{{ lang.flag }}</span>
              <span>{{ lang.label }}</span>
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class NsLanguageSwitcherComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly el = inject(ElementRef);

  open = false;
  readonly languages = LANGUAGES;

  currentLang(): string {
    return this.translate.currentLang || this.translate.defaultLang || 'en';
  }

  ngOnInit(): void {
    try {
      const saved = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        this.translate.use(saved);
      } else {
        const browser = globalThis.navigator?.language?.split('-')[0] ?? 'en';
        const supported = LANGUAGES.some((l) => l.code === browser);
        this.translate.use(supported ? browser : 'en');
      }
    } catch {
      this.translate.use('en');
    }
  }

  select(code: string): void {
    this.translate.use(code);
    this.open = false;
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }
}
