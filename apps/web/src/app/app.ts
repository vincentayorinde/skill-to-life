import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NsAppShellComponent,
  NsBadgeComponent,
  NsButtonComponent,
  NsCardComponent,
  NsOptionCardComponent,
  NsProgressComponent,
} from 'ui';

@Component({
  imports: [
    RouterModule,
    NsAppShellComponent,
    NsBadgeComponent,
    NsButtonComponent,
    NsCardComponent,
    NsOptionCardComponent,
    NsProgressComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'NextSkill';

  protected readonly shellLinks = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Career paths', href: '#career-paths' },
    { label: 'Open source', href: '#open-source' },
  ];

  protected readonly trustBadges = [
    { label: 'Open source', variant: 'success' as const },
    { label: 'Beginner friendly', variant: 'warning' as const },
    { label: 'Anonymous mode', variant: 'neutral' as const },
    { label: 'Shareable results', variant: 'purple' as const },
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

  protected readonly careerPaths = [
    {
      icon: '</>',
      title: 'Frontend Developer',
      copy: 'Build the screens and experiences people click, scroll, and use every day.',
      tags: ['Visual', 'Code', 'Product'],
    },
    {
      icon: '{}',
      title: 'Backend Developer',
      copy: 'Build the behind-the-scenes logic that helps apps work smoothly.',
      tags: ['Systems', 'Logic', 'APIs'],
    },
    {
      icon: 'FS',
      title: 'Full-stack Developer',
      copy: 'Work across both the visible app and the systems behind it.',
      tags: ['Builder', 'Code', 'Product'],
    },
    {
      icon: '🛡️',
      title: 'Cybersecurity Analyst',
      copy: 'Help protect people and businesses by spotting risks early.',
      tags: ['Security', 'Investigation', 'Risk'],
    },
    {
      icon: 'SEC',
      title: 'Security Engineer',
      copy: 'Design and build the security systems that keep organisations safe.',
      tags: ['Security', 'Engineering', 'Infrastructure'],
    },
    {
      icon: 'CLD',
      title: 'Cloud Engineer',
      copy: 'Help apps stay online, scale up, and run reliably in the cloud.',
      tags: ['Cloud', 'Infrastructure', 'Scale'],
    },
    {
      icon: 'OPS',
      title: 'DevOps Engineer',
      copy: 'Help teams ship faster and keep products stable and reliable.',
      tags: ['Automation', 'Reliability', 'Delivery'],
    },
    {
      icon: '📊',
      title: 'Data Analyst',
      copy: 'Find patterns in information and turn them into decisions.',
      tags: ['Data', 'Insight', 'Business'],
    },
    {
      icon: 'DS',
      title: 'Data Scientist',
      copy: 'Use statistics and machine learning to answer hard questions with data.',
      tags: ['Data', 'Models', 'Research'],
    },
    {
      icon: 'AI',
      title: 'AI Engineer',
      copy: 'Build useful tools powered by models, data, and smart workflows.',
      tags: ['AI', 'Code', 'Models'],
    },
    {
      icon: '🎨',
      title: 'Product Designer',
      copy: 'Design how apps look, feel, and solve real problems for real people.',
      tags: ['Creative', 'UX', 'Research'],
    },
    {
      icon: 'PM',
      title: 'Product Manager',
      copy: 'Turn ideas, users, and business goals into a product plan.',
      tags: ['Strategy', 'People', 'Product'],
    },
    {
      icon: 'DOC',
      title: 'Technical Writer',
      copy: 'Explain technical ideas in a way people can actually understand.',
      tags: ['Writing', 'Docs', 'Teaching'],
    },
    {
      icon: 'QA',
      title: 'QA Engineer',
      copy: 'Test products, catch problems, and help teams ship with confidence.',
      tags: ['Quality', 'Testing', 'Detail'],
    },
  ];

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
        { label: 'Assessment', href: '#assessment' },
        { label: 'Career paths', href: '#career-paths' },
        { label: 'Roadmaps', href: '#how-it-works' },
        { label: 'Share cards', href: '#result-card' },
      ],
    },
    {
      title: 'Open source',
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/vincentayorinde/nextskill',
          external: true,
        },
        { label: 'Releases', href: '#open-source' },
        { label: 'Contributing', href: '#open-source' },
        { label: 'Security', href: '#open-source' },
      ],
    },
    {
      title: 'Community',
      links: [
        {
          label: 'Issues',
          href: 'https://github.com/vincentayorinde/nextskill/issues',
          external: true,
        },
        { label: 'Discussions', href: '#open-source' },
        { label: 'Roadmap', href: '#open-source' },
        { label: 'Good first issues', href: '#open-source' },
      ],
    },
  ];
}
