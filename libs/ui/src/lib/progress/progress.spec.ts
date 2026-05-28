import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NsProgressComponent } from './progress';

describe('NsProgressComponent', () => {
  let fixture: ComponentFixture<NsProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NsProgressComponent);
  });

  it('handles value as a percentage of max', () => {
    fixture.componentRef.setInput('value', 25);
    fixture.componentRef.setInput('max', 50);
    fixture.detectChanges();

    const bar = fixture.debugElement.query(By.css('[role="progressbar"]'));
    const fill = bar.nativeElement.firstElementChild as HTMLElement;

    expect(bar.attributes['aria-valuenow']).toBe('25');
    expect(fill.style.width).toBe('50%');
  });
});
