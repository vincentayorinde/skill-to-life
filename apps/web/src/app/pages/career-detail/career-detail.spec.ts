import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CareerDetailComponent } from './career-detail';

function makeRoute(slug: string) {
  return {
    snapshot: { paramMap: { get: () => slug } },
  };
}

describe('CareerDetailComponent', () => {
  async function setup(slug: string) {
    await TestBed.configureTestingModule({
      imports: [CareerDetailComponent, RouterModule.forRoot([])],
      providers: [{ provide: ActivatedRoute, useValue: makeRoute(slug) }],
    }).compileComponents();

    const fixture = TestBed.createComponent(CareerDetailComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('should create', async () => {
    const fixture = await setup('frontend-developer');
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load the correct career by slug', async () => {
    const fixture = await setup('frontend-developer');
    expect(fixture.componentInstance.career?.title).toBe('Frontend Developer');
  });

  it('should display career title and summary', async () => {
    const fixture = await setup('cybersecurity-analyst');
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Cybersecurity Analyst');
    expect(text).toContain('Protect people and businesses');
  });

  it('should show not-found state for unknown slug', async () => {
    const fixture = await setup('does-not-exist');
    expect(fixture.componentInstance.career).toBeUndefined();
    expect(fixture.nativeElement.textContent).toContain('Career not found');
  });
});
