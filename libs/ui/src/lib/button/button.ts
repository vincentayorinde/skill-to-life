import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type NsButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'google';
export type NsButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ns-button',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, RouterLink],
  template: `
    @if (href) {
      <a
        [href]="disabled ? null : href"
        [attr.target]="target"
        [attr.rel]="target === '_blank' ? 'noreferrer' : null"
        [attr.aria-disabled]="disabled || loading"
        [ngClass]="classes"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    } @else if (routerLink) {
      <a
        [routerLink]="disabled ? null : routerLink"
        [attr.aria-disabled]="disabled"
        [ngClass]="classes"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    } @else {
      <button
        [type]="type"
        [disabled]="disabled || loading"
        [attr.aria-busy]="loading"
        [ngClass]="classes"
      >
        <ng-container *ngTemplateOutlet="content" />
      </button>
    }

    <ng-template #content>
      @if (loading) {
        <span
          class="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        ></span>
      }
      @if (variant === 'google' && !loading) {
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      }
      <span><ng-content /></span>
    </ng-template>
  `,
})
export class NsButtonComponent {
  @Input() variant: NsButtonVariant = 'primary';
  @Input() size: NsButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() href?: string;
  @Input() routerLink?: string | string[];
  @Input() target?: '_blank' | '_self' | '_parent' | '_top';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get classes(): string[] {
    return [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'rounded-ns',
      'font-medium',
      'leading-none',
      'no-underline',
      'transition-all',
      'duration-base',
      'select-none',
      'focus-visible:outline',
      'focus-visible:outline-2',
      'focus-visible:outline-offset-2',
      'focus-visible:outline-ns-focus',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      'aria-disabled:pointer-events-none',
      'aria-disabled:opacity-50',
      this.sizeClasses,
      this.variantClasses,
    ];
  }

  private get sizeClasses(): string {
    const sizes: Record<NsButtonSize, string> = {
      sm: 'min-h-8 px-4 text-xs tracking-wide',
      md: 'min-h-10 px-6 text-sm tracking-wide',
      lg: 'min-h-11 px-7 text-sm tracking-wide',
    };
    return sizes[this.size];
  }

  private get variantClasses(): string {
    const variants: Record<NsButtonVariant, string> = {
      primary:
        'bg-ns-primary text-white border border-ns-primary shadow-ns hover:bg-ns-primaryHover hover:border-ns-primaryHover hover:shadow-ns-md hover:-translate-y-px active:translate-y-0 active:shadow-ns',
      secondary:
        'bg-white text-ns-primary border border-ns-border hover:bg-ns-primarySoft hover:border-ns-primary',
      ghost:
        'bg-transparent text-ns-primary border border-transparent shadow-none hover:bg-ns-primarySoft',
      danger:
        'bg-ns-danger text-white border border-ns-danger shadow-ns hover:bg-ns-dangerHover hover:border-ns-dangerHover hover:shadow-ns-md hover:-translate-y-px',
      success:
        'bg-ns-success text-white border border-ns-success shadow-ns hover:bg-ns-successHover hover:border-ns-successHover hover:shadow-ns-md hover:-translate-y-px',
      google:
        'bg-white text-ns-text border border-ns-border shadow-ns hover:bg-ns-canvasSubtle hover:shadow-ns-md hover:-translate-y-px',
    };
    return variants[this.variant];
  }
}
