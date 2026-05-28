import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsOptionCardComponent } from './option-card';

describe('NsOptionCardComponent', () => {
  let fixture: ComponentFixture<NsOptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsOptionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NsOptionCardComponent);
  });

  it('renders title and description', () => {
    fixture.componentRef.setInput('title', 'Build products');
    fixture.componentRef.setInput(
      'description',
      'I like turning ideas into interfaces.',
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Build products');
    expect(fixture.nativeElement.textContent).toContain(
      'I like turning ideas into interfaces.',
    );
  });

  it('renders selected state', () => {
    fixture.componentRef.setInput('title', 'Build products');
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLElement;
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.className).toContain('border-ns-primary');
  });
});
