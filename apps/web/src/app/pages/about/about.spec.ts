import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('renders without error', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows "About Skill to Life" heading', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('About Skill to Life');
  });

  it('mentions open source', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('open source');
  });

  it('mentions Encrisoft and keeps the founder attribution', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement.textContent as string).replace(
      /\s+/g,
      ' ',
    );

    expect(text).toContain(
      'Skill to Life is built and operated by Encrisoft Technologies Ltd.',
    );
    expect(text).toContain('Vincent Olagbemide');
  });
});
