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
        <span class="text-base font-bold" aria-hidden="true">G</span>
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
      'border',
      'font-semibold',
      'leading-none',
      'no-underline',
      'shadow-ns',
      'transition',
      'duration-base',
      'ease-ns',
      'hover:-translate-y-0.5',
      'active:translate-y-0',
      'focus-visible:outline',
      'focus-visible:outline-3',
      'focus-visible:outline-offset-2',
      'focus-visible:outline-ns-focus',
      'disabled:pointer-events-none',
      'disabled:opacity-60',
      'aria-disabled:pointer-events-none',
      'aria-disabled:opacity-60',
      this.sizeClasses,
      this.variantClasses,
    ];
  }

  private get sizeClasses(): string {
    const sizes: Record<NsButtonSize, string> = {
      sm: 'min-h-9 px-3 text-sm',
      md: 'min-h-11 px-4 text-sm',
      lg: 'min-h-12 px-5 text-base',
    };

    return sizes[this.size];
  }

  private get variantClasses(): string {
    const variants: Record<NsButtonVariant, string> = {
      primary:
        'border-ns-primary bg-ns-primary text-ns-primaryFg hover:border-ns-primaryHover hover:bg-ns-primaryHover hover:shadow-glow',
      secondary:
        'border-ns-border bg-ns-card text-ns-text hover:border-ns-primary hover:bg-ns-cardElevated',
      ghost:
        'border-transparent bg-transparent text-ns-muted shadow-none hover:bg-ns-card hover:text-ns-text',
      danger:
        'border-ns-danger bg-ns-danger text-white hover:border-ns-dangerHover hover:bg-ns-dangerHover',
      success:
        'border-ns-success bg-ns-success text-white hover:border-ns-successHover hover:bg-ns-successHover',
      google:
        'border-ns-border bg-ns-cardElevated text-ns-text hover:border-ns-primary hover:bg-ns-card hover:shadow-glow',
    };

    return variants[this.variant];
  }
}
