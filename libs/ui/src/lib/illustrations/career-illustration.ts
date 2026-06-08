import { Component, Input } from '@angular/core';

export type CareerIllustrationCategory =
  | 'development'
  | 'security'
  | 'data-ai'
  | 'design-product'
  | 'writing-qa'
  | 'specialist-advanced';

interface IllustrationConfig {
  bg: string;
  svgContent: string;
}

@Component({
  selector: 'ns-career-illustration',
  standalone: true,
  template: `
    <div
      class="flex h-20 w-full items-center justify-center rounded-ns"
      [style.background]="config.bg"
      aria-hidden="true"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        [innerHTML]="config.svgContent"
      ></svg>
    </div>
  `,
})
export class NsCareerIllustrationComponent {
  @Input() category: CareerIllustrationCategory = 'development';

  get config(): IllustrationConfig {
    const configs: Record<CareerIllustrationCategory, IllustrationConfig> = {
      development: {
        bg: '#E8F0FE',
        svgContent: `
          <rect x="8" y="14" width="32" height="20" rx="3" stroke="#006AFF" stroke-width="2" fill="none"/>
          <path d="M16 22 L12 26 L16 30" stroke="#006AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M32 22 L36 26 L32 30" stroke="#006AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="22" y1="20" x2="26" y2="32" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
        `,
      },
      security: {
        bg: '#FCE8E6',
        svgContent: `
          <path d="M24 8 L38 14 L38 26 C38 33 31 39 24 42 C17 39 10 33 10 26 L10 14 Z" stroke="#EA4335" stroke-width="2" fill="none" stroke-linejoin="round"/>
          <path d="M19 24 L23 28 L30 20" stroke="#D93025" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        `,
      },
      'data-ai': {
        bg: '#FEF7E0',
        svgContent: `
          <rect x="8" y="28" width="6" height="12" rx="1" fill="#FBBC04"/>
          <rect x="18" y="20" width="6" height="20" rx="1" fill="#FBBC04"/>
          <rect x="28" y="14" width="6" height="26" rx="1" fill="#F9AB00"/>
          <rect x="38" y="8" width="6" height="32" rx="1" fill="#F9AB00" opacity="0.7"/>
          <path d="M11 20 L21 14 L31 10 L41 6" stroke="#B06000" stroke-width="2" stroke-linecap="round" fill="none"/>
        `,
      },
      'design-product': {
        bg: '#F3E8FD',
        svgContent: `
          <circle cx="24" cy="24" r="10" stroke="#A142F4" stroke-width="2" fill="none"/>
          <circle cx="24" cy="24" r="4" fill="#A142F4"/>
          <line x1="24" y1="8" x2="24" y2="12" stroke="#A142F4" stroke-width="2" stroke-linecap="round"/>
          <line x1="24" y1="36" x2="24" y2="40" stroke="#A142F4" stroke-width="2" stroke-linecap="round"/>
          <line x1="8" y1="24" x2="12" y2="24" stroke="#A142F4" stroke-width="2" stroke-linecap="round"/>
          <line x1="36" y1="24" x2="40" y2="24" stroke="#A142F4" stroke-width="2" stroke-linecap="round"/>
        `,
      },
      'writing-qa': {
        bg: '#E6F4EA',
        svgContent: `
          <rect x="10" y="8" width="28" height="36" rx="3" stroke="#34A853" stroke-width="2" fill="none"/>
          <line x1="16" y1="16" x2="32" y2="16" stroke="#34A853" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="22" x2="32" y2="22" stroke="#34A853" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="28" x2="24" y2="28" stroke="#34A853" stroke-width="2" stroke-linecap="round"/>
          <path d="M26 32 L30 36 L38 28" stroke="#1E8E3E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        `,
      },
      'specialist-advanced': {
        bg: '#E4F7FB',
        svgContent: `
          <circle cx="24" cy="24" r="4" fill="#24C1E0"/>
          <circle cx="10" cy="16" r="3" fill="#24C1E0" opacity="0.7"/>
          <circle cx="38" cy="16" r="3" fill="#24C1E0" opacity="0.7"/>
          <circle cx="10" cy="32" r="3" fill="#24C1E0" opacity="0.7"/>
          <circle cx="38" cy="32" r="3" fill="#24C1E0" opacity="0.7"/>
          <line x1="13" y1="18" x2="20" y2="22" stroke="#24C1E0" stroke-width="1.5"/>
          <line x1="35" y1="18" x2="28" y2="22" stroke="#24C1E0" stroke-width="1.5"/>
          <line x1="13" y1="30" x2="20" y2="26" stroke="#24C1E0" stroke-width="1.5"/>
          <line x1="35" y1="30" x2="28" y2="26" stroke="#24C1E0" stroke-width="1.5"/>
        `,
      },
    };
    return configs[this.category] ?? configs['development'];
  }
}
