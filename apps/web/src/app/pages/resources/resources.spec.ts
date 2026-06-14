import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { ResourcesComponent } from './resources';

describe('ResourcesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesComponent, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            currentUser$: of(null),
            isDev: true,
            loginWithGoogle: vi.fn(),
            devLogin: vi.fn(),
            logout: vi.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ResourcesComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should paginate resources by default', async () => {
    const fixture = TestBed.createComponent(ResourcesComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.filtered().length).toBeGreaterThan(12);
    expect(fixture.componentInstance.pageSize()).toBe(10);
    expect(fixture.componentInstance.paginatedResources()).toHaveLength(10);
    expect(fixture.componentInstance.currentPageSafe()).toBe(1);

    fixture.componentInstance.nextPage();

    expect(fixture.componentInstance.currentPageSafe()).toBe(2);
    expect(fixture.componentInstance.pageStart()).toBe(11);
  });

  it('should let users change resources shown per page', () => {
    const fixture = TestBed.createComponent(ResourcesComponent);
    fixture.detectChanges();

    fixture.componentInstance.setPageSize('20');

    expect(fixture.componentInstance.pageSize()).toBe(20);
    expect(fixture.componentInstance.paginatedResources()).toHaveLength(20);
  });

  it('should search resources', () => {
    const fixture = TestBed.createComponent(ResourcesComponent);
    fixture.detectChanges();

    fixture.componentInstance.setSearchQuery('google');
    const results = fixture.componentInstance.filtered();

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((resource) =>
        [resource.title, resource.platform, resource.careerTitle]
          .join(' ')
          .toLowerCase()
          .includes('google'),
      ),
    ).toBe(true);
    expect(fixture.componentInstance.currentPageSafe()).toBe(1);
  });

  it('should reset pagination when filters change', () => {
    const fixture = TestBed.createComponent(ResourcesComponent);
    fixture.detectChanges();

    fixture.componentInstance.goToPage(2);
    fixture.componentInstance.setActiveTab('paid');

    expect(fixture.componentInstance.currentPageSafe()).toBe(1);
    expect(
      fixture.componentInstance
        .filtered()
        .every((resource) => resource.cost === 'paid'),
    ).toBe(true);
  });

  it('should render pagination controls', async () => {
    const fixture = TestBed.createComponent(ResourcesComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Page 1 of');
    expect(fixture.nativeElement.textContent).toContain('Next');
  });
});
