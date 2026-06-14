import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { NsExternalLinkService } from './external-link.service';

describe('NsExternalLinkService', () => {
  let svc: NsExternalLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NsExternalLinkService] });
    svc = TestBed.inject(NsExternalLinkService);
  });

  it('should be created', () => {
    expect(svc).toBeTruthy();
  });

  it('pending() is null initially', () => {
    expect(svc.pending()).toBeNull();
  });

  it('openLink sets pending with the shared external modal data shape', () => {
    svc.openLink('https://example.com', 'Example');
    const p = svc.pending();
    expect(p?.url).toBe('https://example.com');
    expect(p?.title).toBe('Example');
    expect(p?.domain).toBe('example.com');
    expect(p?.careerTitle).toBe('your chosen');
    expect(p?.costLabel).toBe('external resource');
    expect(p?.cancelLabel).toBe('Stay on NextSkill');
    expect(p?.context).toBe('default');
  });

  it('openExternalLink sets pending with domain, cost, career title, and context label', () => {
    svc.openExternalLink({
      url: 'https://www.udemy.com/course',
      title: 'React Course',
      platform: 'Udemy',
      careerTitle: 'Frontend Developer',
      cost: 'paid',
      context: 'resources',
    });
    const p = svc.pending();
    expect(p?.url).toBe('https://www.udemy.com/course');
    expect(p?.title).toBe('React Course');
    expect(p?.platform).toBe('Udemy');
    expect(p?.domain).toBe('udemy.com');
    expect(p?.careerTitle).toBe('Frontend Developer');
    expect(p?.costLabel).toBe('paid course');
    expect(p?.cancelLabel).toBe('Stay on resources');
    expect(p?.context).toBe('resources');
  });

  it('cancel() clears pending', () => {
    svc.openLink('https://example.com');
    svc.cancel();
    expect(svc.pending()).toBeNull();
  });

  it('confirm() clears pending', () => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
    svc.openLink('https://example.com');
    svc.confirm();
    expect(svc.pending()).toBeNull();
    vi.restoreAllMocks();
  });

  it('confirm() opens the URL in a new tab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    svc.openLink('https://example.com');
    svc.confirm();
    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank', 'noreferrer,noopener');
    vi.restoreAllMocks();
  });

  it('confirm() does nothing if pending is null', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    svc.confirm();
    expect(openSpy).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('openExternalLink without careerTitle uses the chosen path fallback', () => {
    svc.openExternalLink({ url: 'https://mdn.com', title: 'MDN Docs', platform: 'MDN' });
    expect(svc.pending()?.careerTitle).toBe('your chosen');
  });

  it('shows free training for free resources', () => {
    svc.openExternalLink({ url: 'https://mdn.com', title: 'MDN Docs', platform: 'MDN', cost: 'free' });
    expect(svc.pending()?.costLabel).toBe('free training');
  });

  it('shows paid course for paid resources', () => {
    svc.openExternalLink({ url: 'https://udemy.com/course', title: 'Course', platform: 'Udemy', cost: 'paid' });
    expect(svc.pending()?.costLabel).toBe('paid course');
  });

  it('sets cancel button text from context', () => {
    svc.openExternalLink({
      url: 'https://example.com',
      title: 'Example',
      platform: 'Example',
      context: 'results',
    });
    expect(svc.pending()?.cancelLabel).toBe('Stay on my results');
  });

  it('extractDomain removes www from valid URLs and returns invalid input unchanged', () => {
    expect(svc.extractDomain('https://www.skillbuilder.aws/path')).toBe('skillbuilder.aws');
    expect(svc.extractDomain('not a url')).toBe('not a url');
  });
});
