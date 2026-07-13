import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PrivacyComponent } from './privacy';

describe('PrivacyComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyComponent, RouterTestingModule],
    }).compileComponents();
  });

  function render() {
    const fixture = TestBed.createComponent(PrivacyComponent);
    fixture.detectChanges();
    return {
      fixture,
      text: (fixture.nativeElement.textContent as string).replace(/\s+/g, ' '),
      element: fixture.nativeElement as HTMLElement,
    };
  }

  it('renders without error', () => {
    const { fixture } = render();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows Privacy Policy heading and July 2026 date', () => {
    const { text } = render();

    expect(text).toContain('Privacy Policy');
    expect(text).toContain('Updated: July 2026');
  });

  it('renders all 13 sections', () => {
    const { element, text } = render();
    const sections = element.querySelectorAll('[data-privacy-section]');

    expect(sections).toHaveLength(13);
    expect(text).toContain('01 What is Personal Data');
    expect(text).toContain('02 When We Collect Your Data');
    expect(text).toContain('03 What Data We Collect');
    expect(text).toContain('04 How We Use Your Data');
    expect(text).toContain('05 AI Processing of Your Data');
    expect(text).toContain("06 Children's Data");
    expect(text).toContain('07 Legal Basis for Processing');
    expect(text).toContain('08 How We Share Your Data');
    expect(text).toContain('09 How We Protect Your Data');
    expect(text).toContain('10 Data Storage and Retention');
    expect(text).toContain('11 Your Rights');
    expect(text).toContain('12 Changes to This Policy');
    expect(text).toContain('13 Contact Us');
  });

  it('covers AI processing in section 5', () => {
    const { text } = render();

    expect(text).toContain('AI Processing of Your Data');
    expect(text).toContain('Anthropic (Claude)');
    expect(text).toContain('OpenAI (GPT-4)');
    expect(text).toContain('Google (Gemini)');
    expect(text).toContain(
      "it is not used to train these providers' AI models",
    );
  });

  it('states the data controller is Encrisoft Technologies Ltd', () => {
    const { text } = render();

    expect(text).toContain(
      'Encrisoft Technologies Ltd (registered in the United Kingdom)',
    );
    expect(text).toContain('We are the data controller for your personal data');
  });

  it('mentions the ICO complaint right', () => {
    const { text } = render();

    expect(text).toContain("UK Information Commissioner's Office (ICO)");
    expect(text).toContain('ico.org.uk');
  });

  it('shows the contact email', () => {
    const { element, text } = render();

    expect(text).toContain('skilltolife.contact@gmail.com');
    expect(
      element.querySelector('a[href="mailto:skilltolife.contact@gmail.com"]'),
    ).not.toBeNull();
  });

  it('includes no advertising and no selling statements', () => {
    const { text } = render();

    expect(text).toContain('We do not use advertising cookies');
    expect(text).toContain('We do not track you across other websites');
    expect(text).toContain('We do not sell your data');
    expect(text).toContain('We do not sell your personal data');
    expect(text).toContain(
      'We never use your assessment answers or CV content for advertising',
    );
  });
});
