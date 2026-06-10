import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import {
  NsAppShellComponent,
  NsAppShellLink,
  NsBadgeComponent,
  NsButtonComponent,
  NsCardComponent,
  NsOptionCardComponent,
  NsProgressComponent,
  NsHeroDecorativeComponent,
  NsCareerIllustrationComponent,
  NsAssessmentIllustrationComponent,
  CareerIllustrationCategory,
} from 'ui';
import { CAREER_PATHS } from 'types';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    NsAppShellComponent,
    NsBadgeComponent,
    NsButtonComponent,
    NsCardComponent,
    NsOptionCardComponent,
    NsProgressComponent,
    NsHeroDecorativeComponent,
    NsCareerIllustrationComponent,
    NsAssessmentIllustrationComponent,
  ],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  protected readonly auth = inject(AuthService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle(
      'NextSkill — Discover your next tech career skill',
    );
    this.metaService.updateTag({
      name: 'description',
      content:
        'Find the tech career path that fits how you think and work. Free 30-question assessment across 26 careers.',
    });
  }

  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Salaries', routerLink: '/salaries' },
    { label: 'Go independent', routerLink: '/entrepreneurship' },
    { label: 'Resources', routerLink: '/resources' },
    { label: 'Open source', href: '#open-source' },
  ];

  protected readonly stats = [
    { value: '26', label: 'Career paths' },
    { value: '30', label: 'Assessment questions' },
    { value: '100%', label: 'Free forever' },
    { value: 'MIT', label: 'Open source licence' },
  ];

  protected readonly howItWorks: {
    step: 1 | 2 | 3;
    title: string;
    copy: string;
  }[] = [
    {
      step: 1,
      title: 'Answer 30 questions',
      copy: 'Scenario-based questions about how you think, work, and what drives you. No right answers.',
    },
    {
      step: 2,
      title: 'Get your career matches',
      copy: 'Ranked by how well they fit your answers, with a clear explanation of why each path suits you.',
    },
    {
      step: 3,
      title: 'Follow your roadmap',
      copy: 'What to learn, free resources, salary ranges, and exactly where to start.',
    },
  ];

  protected readonly careerPreviews = CAREER_PATHS.slice(0, 8).map((c) => ({
    emoji: c.emoji,
    title: c.title,
    slug: c.slug,
    summary: c.summary,
    difficulty: c.difficultyLevel,
    category: c.category as CareerIllustrationCategory,
  }));

  protected readonly assessmentOptions = [
    {
      title: 'Building apps',
      description: 'Create tools and interfaces people use.',
      icon: '🛠️',
    },
    {
      title: 'Protecting systems',
      description: 'Spot risks and keep systems safe.',
      icon: '🛡️',
    },
    {
      title: 'Analysing data',
      description: 'Turn information into clearer decisions.',
      icon: '📊',
    },
    {
      title: 'Designing experiences',
      description: 'Shape how products look and feel.',
      icon: '🎨',
    },
  ];

  protected readonly footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Take assessment', href: '/assessment' },
        { label: 'Career paths', href: '/careers' },
        { label: 'Resources', href: '/resources' },
        { label: 'Salaries', href: '/salaries' },
        { label: 'Go independent', href: '/entrepreneurship' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        {
          label: 'Open source',
          href: 'https://github.com/vincentayorinde/nextskill',
          external: true,
        },
        {
          label: 'Changelog',
          href: 'https://github.com/vincentayorinde/nextskill/blob/main/CHANGELOG.md',
          external: true,
        },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy policy', href: '/privacy' },
        { label: 'Terms of use', href: '/terms' },
      ],
    },
  ];
}
