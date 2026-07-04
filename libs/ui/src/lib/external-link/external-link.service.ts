import { Injectable, signal } from '@angular/core';

export type ExternalLinkContext =
  | 'roadmap'
  | 'resources'
  | 'career'
  | 'results'
  | 'default';

export interface ExternalLinkPending {
  url: string;
  title: string;
  platform?: string;
  domain: string;
  careerTitle: string;
  costLabel: string;
  cancelLabel: string;
  context: ExternalLinkContext;
}

@Injectable({ providedIn: 'root' })
export class NsExternalLinkService {
  readonly pending = signal<ExternalLinkPending | null>(null);

  openLink(url: string, title?: string): void {
    const domain = this.extractDomain(url);
    this.pending.set({
      url,
      title: title ?? domain,
      platform: domain,
      domain,
      careerTitle: 'your chosen',
      costLabel: this.getCostLabel('external'),
      cancelLabel: this.getCancelLabel('default'),
      context: 'default',
    });
  }

  openExternalLink(data: {
    url: string;
    title: string;
    platform: string;
    careerTitle?: string;
    cost?: string;
    context?: ExternalLinkContext;
  }): void {
    this.pending.set({
      url: data.url,
      title: data.title,
      platform: data.platform,
      domain: this.extractDomain(data.url),
      careerTitle: data.careerTitle ?? 'your chosen',
      costLabel: this.getCostLabel(data.cost ?? 'free'),
      cancelLabel: this.getCancelLabel(data.context ?? 'default'),
      context: data.context ?? 'default',
    });
  }

  confirm(): void {
    const link = this.pending();
    if (link) {
      window.open(link.url, '_blank', 'noreferrer,noopener');
    }
    this.pending.set(null);
  }

  cancel(): void {
    this.pending.set(null);
  }

  extractDomain(url: string): string {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  private getCostLabel(cost: string): string {
    switch (cost) {
      case 'free':
        return 'free training';
      case 'paid':
        return 'paid course';
      case 'freemium':
        return 'free to start';
      case 'book':
        return 'book';
      case 'video':
        return 'free video';
      case 'practice':
        return 'practice platform';
      default:
        return 'external resource';
    }
  }

  private getCancelLabel(context: string): string {
    switch (context) {
      case 'roadmap':
        return 'Stay on my roadmap';
      case 'resources':
        return 'Stay on resources';
      case 'career':
        return 'Stay on this path';
      case 'results':
        return 'Stay on my results';
      default:
        return 'Stay on Skill to Life';
    }
  }
}
