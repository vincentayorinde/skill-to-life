import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NsCareerIllustrationComponent,
  CareerIllustrationCategory,
} from './career-illustration';

describe('NsCareerIllustrationComponent', () => {
  let fixture: ComponentFixture<NsCareerIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsCareerIllustrationComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NsCareerIllustrationComponent);
  });

  it('renders without errors', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders an SVG element', () => {
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  const categories: CareerIllustrationCategory[] = [
    'development',
    'security',
    'data-ai',
    'design-product',
    'writing-qa',
    'specialist-advanced',
  ];

  categories.forEach((cat) => {
    it(`returns correct background colour for category: ${cat}`, () => {
      fixture.componentRef.setInput('category', cat);
      fixture.detectChanges();
      const config = fixture.componentInstance.config;
      expect(config.bg).toBeTruthy();
      expect(config.svgContent).toBeTruthy();
    });
  });

  it('uses blue background for development', () => {
    fixture.componentRef.setInput('category', 'development');
    fixture.detectChanges();
    expect(fixture.componentInstance.config.bg).toBe('#E8F0FE');
  });

  it('uses red background for security', () => {
    fixture.componentRef.setInput('category', 'security');
    fixture.detectChanges();
    expect(fixture.componentInstance.config.bg).toBe('#FCE8E6');
  });

  it('uses yellow background for data-ai', () => {
    fixture.componentRef.setInput('category', 'data-ai');
    fixture.detectChanges();
    expect(fixture.componentInstance.config.bg).toBe('#FEF7E0');
  });

  it('uses purple background for design-product', () => {
    fixture.componentRef.setInput('category', 'design-product');
    fixture.detectChanges();
    expect(fixture.componentInstance.config.bg).toBe('#F3E8FD');
  });

  it('uses green background for writing-qa', () => {
    fixture.componentRef.setInput('category', 'writing-qa');
    fixture.detectChanges();
    expect(fixture.componentInstance.config.bg).toBe('#E6F4EA');
  });

  it('uses teal background for specialist-advanced', () => {
    fixture.componentRef.setInput('category', 'specialist-advanced');
    fixture.detectChanges();
    expect(fixture.componentInstance.config.bg).toBe('#E4F7FB');
  });
});
