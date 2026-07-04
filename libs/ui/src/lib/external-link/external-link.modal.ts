import { Component, inject } from '@angular/core';
import { NsExternalLinkService } from './external-link.service';

@Component({
  selector: 'ns-external-link-modal',
  standalone: true,
  imports: [],
  template: `
    @if (svc.pending(); as link) {
      <div
        class="ext-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="extlink-title"
        tabindex="-1"
        (click)="onOverlayClick($event)"
        (keydown.escape)="cancel()"
      >
        <div class="ext-modal-card">
          <button
            type="button"
            class="ext-modal-close"
            aria-label="Close"
            (click)="cancel()"
          >
            ✕
          </button>

          <div class="ext-modal-header">
            <div class="ext-modal-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
            <div class="ext-modal-header-text">
              <h3 id="extlink-title">You are heading to {{ link.domain }}</h3>
              <p>{{ link.title }} - {{ link.costLabel }}</p>
            </div>
          </div>

          <div class="ext-modal-resource-card">
            <span class="resource-title">{{ link.title }}</span>
            <span class="resource-domain">{{ link.domain }}</span>
          </div>

          <p class="ext-modal-body">
            You are about to open an external learning resource to help you
            progress on
            <strong>{{ careerPathLabel(link.careerTitle) }}</strong> path.
          </p>
          <p class="ext-modal-note">
            This opens in a new tab so you can come back and continue your
            roadmap any time.
          </p>

          <div class="ext-modal-actions">
            <button type="button" class="btn-secondary" (click)="cancel()">
              {{ link.cancelLabel }}
            </button>
            <button type="button" class="btn-primary" (click)="confirm()">
              <span class="btn-primary-label">Open</span>
              <span class="btn-primary-domain">{{ link.domain }} →</span>
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .ext-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }

      .ext-modal-card {
        background: var(--color-bg-card, var(--ns-color-card));
        border: 1px solid var(--color-border, var(--ns-color-border));
        border-radius: 16px;
        padding: 28px;
        max-width: 600px;
        width: 100%;
        position: relative;
        box-shadow: var(--shadow-lg, var(--ns-shadow-lg));
      }

      .ext-modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid var(--color-border, var(--ns-color-border));
        background: var(--color-bg-secondary, var(--ns-color-canvas-subtle));
        color: var(--color-text-secondary, var(--ns-color-muted));
        font-size: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ext-modal-close:hover {
        background: var(--color-bg-tertiary, var(--ns-color-card-elevated));
      }

      .ext-modal-header {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 16px;
      }

      .ext-modal-header-text {
        min-width: 0;
        padding-right: 34px;
      }

      .ext-modal-icon {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: var(--color-bg-secondary, var(--ns-color-canvas-subtle));
        border: 1px solid var(--color-border, var(--ns-color-border));
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--color-text-secondary, var(--ns-color-muted));
      }

      .ext-modal-header-text h3 {
        font-size: 15px;
        font-weight: 600;
        color: var(--color-text, var(--ns-color-text));
        margin: 0 0 2px;
        line-height: 1.35;
        overflow-wrap: anywhere;
      }

      .ext-modal-header-text p {
        font-size: 12px;
        color: var(--color-text-secondary, var(--ns-color-muted));
        margin: 0;
        line-height: 1.45;
        overflow-wrap: anywhere;
      }

      .ext-modal-resource-card {
        background: var(--color-bg-secondary, var(--ns-color-canvas-subtle));
        border: 1px solid var(--color-border, var(--ns-color-border));
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .resource-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-text, var(--ns-color-text));
        line-height: 1.35;
        overflow-wrap: anywhere;
      }

      .resource-domain {
        font-size: 12px;
        color: var(--color-text-secondary, var(--ns-color-muted));
        line-height: 1.35;
        overflow-wrap: anywhere;
      }

      .ext-modal-body {
        font-size: 14px;
        color: var(--color-text, var(--ns-color-text));
        line-height: 1.5;
        margin: 0 0 8px;
      }

      .ext-modal-note {
        font-size: 13px;
        color: var(--color-text-secondary, var(--ns-color-muted));
        line-height: 1.5;
        margin: 0 0 20px;
      }

      .ext-modal-actions {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 10px;
      }

      .btn-secondary,
      .btn-primary {
        padding: 10px 16px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 8px;
        cursor: pointer;
        min-width: 0;
        min-height: 48px;
        line-height: 1.25;
      }

      .btn-secondary {
        border: 1px solid var(--color-border, var(--ns-color-border));
        background: var(--color-bg-card, var(--ns-color-card));
        color: var(--color-text, var(--ns-color-text));
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .btn-secondary:hover {
        border-color: var(--color-accent, var(--ns-color-accent));
        color: var(--color-accent, var(--ns-color-accent));
      }

      .btn-primary {
        border: none;
        background: var(--color-accent, var(--ns-color-accent));
        color: #ffffff;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 4px;
        text-align: center;
        white-space: normal;
      }

      .btn-primary:hover {
        background: var(--color-accent-hover, var(--ns-color-primary-hover));
      }

      .btn-primary-label,
      .btn-primary-domain {
        display: block;
        max-width: 100%;
      }

      .btn-primary-domain {
        font-size: 13px;
        min-width: 0;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      @media (max-width: 520px) {
        .ext-modal-actions {
          display: flex;
          flex-direction: column-reverse;
        }
      }
    `,
  ],
})
export class NsExternalLinkModalComponent {
  protected readonly svc = inject(NsExternalLinkService);

  cancel(): void {
    this.svc.cancel();
  }

  confirm(): void {
    this.svc.confirm();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cancel();
    }
  }

  careerPathLabel(careerTitle: string): string {
    return careerTitle === 'your chosen' ? careerTitle : `your ${careerTitle}`;
  }
}
