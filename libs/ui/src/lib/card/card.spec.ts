import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsCardComponent } from './card';

describe('NsCardComponent', () => {
  let fixture: ComponentFixture<NsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NsCardComponent);
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('has rounded-ns-card class for Material card style', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('rounded-ns-card');
  });

  it('has white background class', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('bg-ns-card');
  });

  it('has Material shadow', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('shadow-ns');
  });

  it('has border', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('border-ns-border');
  });

  it('interactive variant adds hover classes', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.className).toContain('hover:shadow-ns-hover');
  });
});
