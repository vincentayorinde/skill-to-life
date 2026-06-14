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
        'Find the tech career path that fits how you think and work. Free 30-question assessment across 26 careers. No paywalls, no upsells.',
    });
  }
  protected readonly shellLinks: NsAppShellLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Career paths', routerLink: '/careers' },
    { label: 'Salaries', routerLink: '/salaries' },
    { label: 'Resources', routerLink: '/resources' },
  ];

  protected readonly stats = [
    { value: '26', label: 'career paths' },
    { value: '30', label: 'assessment questions' },
    { value: 'Free', label: 'free and open source' },
    { value: '6', label: 'salary regions' },
  ];

  protected readonly problemCards = [
    {
      icon: '01',
      title: 'Too many options',
      copy: 'Coding, cyber, data, cloud, AI, design — where do you even start?',
    },
    {
      icon: '02',
      title: 'Too much noise',
      copy: "Every week there's a new skill everyone says you must learn.",
    },
    {
      icon: '03',
      title: 'Wrong fit',
      copy: "The best path isn't always the trendiest one. It's the one that fits how you think.",
    },
  ];

  protected readonly howItWorks = [
    {
      step: '01',
      title: 'Answer a few quick questions',
      copy: 'Tell us how you think, what you enjoy, and what you want from a tech career.',
    },
    {
      step: '02',
      title: 'See your top matches',
      copy: 'Get your best-fit tech paths with a clear reason why each one fits you.',
    },
    {
      step: '03',
      title: 'Start with a roadmap',
      copy: 'Get beginner resources, starter projects, and the first thing to learn.',
    },
  ];

  protected readonly careerPreviews = CAREER_PATHS.slice(0, 12).map((c) => ({
    emoji: c.emoji,
    title: c.title,
    slug: c.slug,
    copy: c.summary,
    category: c.category,
    tags: c.tags.slice(0, 3),
  }));

  protected readonly assessmentOptions = [
    {
      title: 'Building apps',
      description: 'Create tools and interfaces people use.',
      icon: '🛠️',
    },
    {
      title: 'Protecting systems',
      description: 'Spot risks and help keep systems safe.',
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

  protected readonly openSourcePillars = [
    'Public roadmap',
    'GitHub releases',
    'Good first issues',
    'Transparent scoring model',
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
        {
          label: 'Roadmap',
          href: 'https://github.com/vincentayorinde/nextskill/blob/main/ROADMAP.md',
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
