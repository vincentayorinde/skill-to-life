import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CareersComponent } from './careers';

describe('CareersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareersComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CareersComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show all 26 careers by default', async () => {
    const fixture = TestBed.createComponent(CareersComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.filtered().length).toBe(26);
  });

  it('should paginate careers by default', async () => {
    const fixture = TestBed.createComponent(CareersComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.totalPages()).toBe(3);
    expect(fixture.componentInstance.paginatedCareers()).toHaveLength(12);

    fixture.componentInstance.nextPage();

    expect(fixture.componentInstance.currentPageSafe()).toBe(2);
    expect(fixture.componentInstance.pageStart()).toBe(13);
  });

  it('should filter careers when a tab is selected', () => {
    const fixture = TestBed.createComponent(CareersComponent);
    fixture.detectChanges();
    fixture.componentInstance.setActiveTab('security');
    const results = fixture.componentInstance.filtered();
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((c) => c.category === 'security')).toBe(true);
    expect(fixture.componentInstance.currentPageSafe()).toBe(1);
  });

  it('should filter to 12 specialist-advanced careers', () => {
    const fixture = TestBed.createComponent(CareersComponent);
    fixture.detectChanges();
    fixture.componentInstance.setActiveTab('specialist-advanced');
    const results = fixture.componentInstance.filtered();
    expect(results).toHaveLength(12);
    expect(results.every((c) => c.category === 'specialist-advanced')).toBe(
      true,
    );
  });

  it('should render page heading', async () => {
    const fixture = TestBed.createComponent(CareersComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain(
      'Find the path that fits you.',
    );
  });
});
