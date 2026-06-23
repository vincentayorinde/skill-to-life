import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { NsExternalLinkModalComponent } from './external-link.modal';
import { NsExternalLinkService } from './external-link.service';

describe('NsExternalLinkModalComponent', () => {
  let fixture: ComponentFixture<NsExternalLinkModalComponent>;
  let svc: NsExternalLinkService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsExternalLinkModalComponent],
      providers: [NsExternalLinkService],
    }).compileComponents();

    fixture = TestBed.createComponent(NsExternalLinkModalComponent);
    svc = TestBed.inject(NsExternalLinkService);
  });

  function openModal(options: { cost?: string; context?: 'roadmap' | 'resources' | 'career' | 'results' | 'default' } = {}): void {
    svc.openExternalLink({
      url: 'https://www.skillbuilder.aws/learn',
      title: 'AWS Skill Builder - free training',
      platform: 'AWS Skill Builder',
      careerTitle: 'Cloud Architect',
      cost: options.cost ?? 'free',
      context: options.context ?? 'roadmap',
    });
    fixture.detectChanges();
  }

  it('shows domain instead of raw URL', () => {
    openModal();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('You are heading to skillbuilder.aws');
    expect(text).toContain('skillbuilder.aws');
    expect(text).not.toContain('https://www.skillbuilder.aws/learn');
  });

  it('shows the resource title and career title in the retained design', () => {
    openModal();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('AWS Skill Builder - free training');
    expect(text).toContain('progress on your Cloud Architect path');
  });

  it('uses the chosen path fallback without duplicating "your"', () => {
    svc.openExternalLink({
      url: 'https://developer.mozilla.org/docs',
      title: 'MDN documentation',
      platform: 'MDN',
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('progress on your chosen path');
    expect(text).not.toContain('your your chosen path');
  });

  it('shows the free cost label', () => {
    openModal({ cost: 'free' });

    expect(fixture.nativeElement.textContent).toContain('free training');
  });

  it('shows the paid cost label', () => {
    openModal({ cost: 'paid' });

    expect(fixture.nativeElement.textContent).toContain('paid course');
  });

  it('shows cancel button text for the current context', () => {
    openModal({ context: 'resources' });

    expect(fixture.nativeElement.textContent).toContain('Stay on resources');
  });

  it('opens the correct URL in a new tab when confirmed', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    openModal();

    const primary = fixture.debugElement.query(By.css('.btn-primary'));
    primary.triggerEventHandler('click');

    expect(openSpy).toHaveBeenCalledWith(
      'https://www.skillbuilder.aws/learn',
      '_blank',
      'noreferrer,noopener',
    );
    expect(svc.pending()).toBeNull();
    vi.restoreAllMocks();
  });

  it('dismisses from the close button', () => {
    openModal();

    const close = fixture.debugElement.query(By.css('.ext-modal-close'));
    close.triggerEventHandler('click');

    expect(svc.pending()).toBeNull();
  });

  it('dismisses when clicking the overlay', () => {
    openModal();

    const overlay = fixture.debugElement.query(By.css('.ext-modal-overlay'));
    overlay.triggerEventHandler('click', {
      target: overlay.nativeElement,
      currentTarget: overlay.nativeElement,
    });

    expect(svc.pending()).toBeNull();
  });
});
