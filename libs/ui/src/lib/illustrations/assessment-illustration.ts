import { Component, Input } from '@angular/core';

export type AssessmentStep = 1 | 2 | 3;

@Component({
  selector: 'ns-assessment-illustration',
  standalone: true,
  template: `
    <div
      class="flex h-20 w-full items-center justify-center rounded-ns"
      [style.background]="bg"
      aria-hidden="true"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        @if (step === 1) {
          <!-- Speech bubble with question mark -->
          <path
            d="M8 10 C8 7 11 6 13 6 L35 6 C37 6 40 7 40 10 L40 28 C40 31 37 32 35 32 L28 32 L22 40 L22 32 L13 32 C11 32 8 31 8 28 Z"
            stroke="#006AFF"
            stroke-width="2"
            fill="#E8F0FE"
            stroke-linejoin="round"
          />
          <text
            x="24"
            y="24"
            text-anchor="middle"
            font-size="16"
            font-weight="700"
            fill="#006AFF"
          >
            ?
          </text>
        }
        @if (step === 2) {
          <!-- Target / overlapping rings -->
          <circle
            cx="24"
            cy="24"
            r="16"
            stroke="#34A853"
            stroke-width="2"
            fill="#E6F4EA"
          />
          <circle
            cx="24"
            cy="24"
            r="10"
            stroke="#34A853"
            stroke-width="2"
            fill="white"
            opacity="0.7"
          />
          <circle cx="24" cy="24" r="4" fill="#34A853" />
        }
        @if (step === 3) {
          <!-- Winding path / stepping stones -->
          <ellipse cx="14" cy="36" rx="6" ry="4" fill="#FBBC04" opacity="0.9" />
          <ellipse cx="26" cy="28" rx="6" ry="4" fill="#FBBC04" />
          <ellipse cx="36" cy="18" rx="6" ry="4" fill="#F9AB00" opacity="0.9" />
          <path
            d="M14 32 Q20 26 26 24 Q32 20 36 14"
            stroke="#B06000"
            stroke-width="2"
            stroke-dasharray="3 2"
            fill="none"
            stroke-linecap="round"
          />
        }
      </svg>
    </div>
  `,
})
export class NsAssessmentIllustrationComponent {
  @Input() step: AssessmentStep = 1;

  get bg(): string {
    if (this.step === 1) return '#E8F0FE';
    if (this.step === 2) return '#E6F4EA';
    return '#FEF7E0';
  }
}
