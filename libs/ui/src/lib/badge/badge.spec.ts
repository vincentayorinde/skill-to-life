import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsBadgeComponent } from './badge';

describe('NsBadgeComponent', () => {
  let fixture: ComponentFixture<NsBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsBadgeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NsBadgeComponent);
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('has pill shape (rounded-full)', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('rounded-full');
  });

  it('default variant uses primary soft colours', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('bg-ns-primarySoft');
    expect(el.className).toContain('text-ns-primary');
  });

  it('success variant uses green colours', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('bg-ns-successSoft');
    expect(el.className).toContain('text-ns-success');
  });

  it('warning variant uses yellow colours', () => {
    fixture.componentRef.setInput('variant', 'warning');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('bg-ns-warningSoft');
    expect(el.className).toContain('text-ns-warning');
  });

  it('danger variant uses red colours', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('bg-ns-dangerSoft');
    expect(el.className).toContain('text-ns-danger');
  });
});
