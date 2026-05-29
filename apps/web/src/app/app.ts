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
    { label: 'Open source', variant: 'success' },
    { label: 'Beginner friendly', variant: 'warning' },
    { label: 'Anonymous mode', variant: 'neutral' },
    { label: 'Shareable results', variant: 'purple' },
  ] as const;

  protected readonly problemCards = [
    {
      icon: '01',
      title: 'Too many options',
      copy: 'Coding, cyber, data, cloud, AI, design - where do you even start?',
    },
    {
      icon: '02',
      title: 'Too much hype',
      copy: 'Every week, a new skill looks like the one you must learn.',
    },
    {
      icon: '03',
      title: 'Not enough fit',
      copy: 'The best path is not always the trendiest one. It is the one that fits how you think.',
    },
  ];

  protected readonly howItWorks = [
    {
      icon: 'Ask',
      title: 'Answer simple questions',
      copy: 'Tell us what you enjoy, how you think, and what you want.',
    },
    {
      icon: 'Fit',
      title: 'See your top matches',
      copy: 'Get your top tech paths and why they fit.',
    },
    {
      icon: 'Map',
      title: 'Start with a roadmap',
      copy: 'Follow resources, projects, and next steps.',
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
      icon: 'SEC',
      title: 'Cybersecurity Analyst',
      copy: 'Help protect people and businesses by spotting risks early.',
      tags: ['Security', 'Investigation', 'Risk'],
    },
    {
      icon: 'CLD',
      title: 'Cloud Engineer',
      copy: 'Help apps stay online, scale up, and run reliably.',
      tags: ['Cloud', 'Infrastructure', 'Scale'],
    },
    {
      icon: 'OPS',
      title: 'DevOps Engineer',
      copy: 'Help teams ship updates faster and keep products reliable.',
      tags: ['Automation', 'Reliability', 'Delivery'],
    },
    {
      icon: 'BAR',
      title: 'Data Analyst',
      copy: 'Find patterns in information and turn them into decisions.',
      tags: ['Data', 'Insight', 'Business'],
    },
    {
      icon: 'UX',
      title: 'Product Designer',
      copy: 'Design how apps look, feel, and solve real problems.',
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
    {
      icon: 'AI',
      title: 'AI Engineer',
      copy: 'Build useful tools powered by models, data, and smart workflows.',
      tags: ['AI', 'Code', 'Models'],
    },
  ];

  protected readonly assessmentOptions = [
    {
      title: 'Building useful apps',
      description: 'Create tools and interfaces people use.',
      icon: '🛠️',
    },
    {
      title: 'Protecting systems',
      description: 'Spot risks and help keep systems safe.',
      icon: '🛡️',
    },
    {
      title: 'Finding patterns in data',
      description: 'Turn information into clearer decisions.',
      icon: '📊',
    },
    {
      title: 'Designing user experiences',
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

  protected readonly resources = [
    {
      title: 'Learning resources',
      copy: 'Free and paid resources matched to your recommended path.',
      icon: 'Book',
    },
    {
      title: 'Beginner projects',
      copy: 'Portfolio-friendly projects so you can practise, not just watch tutorials.',
      icon: 'Build',
    },
    {
      title: 'Salary insight',
      copy: 'Estimated earnings by role, experience level, and location.',
      icon: 'Pay',
    },
    {
      title: 'Entrepreneur path',
      copy: 'Ideas for freelancing, consulting, or building your own product around the skill.',
      icon: 'Start',
    },
  ];

  protected readonly footerColumns = [
    {
      title: 'Product',
      links: ['Assessment', 'Roadmaps', 'Results', 'Share cards'],
    },
    {
      title: 'Open Source',
      links: ['GitHub', 'Releases', 'Contributing', 'Security'],
    },
    {
      title: 'Community',
      links: ['Issues', 'Discussions', 'Roadmap', 'Good first issues'],
    },
    {
      title: 'Legal',
      links: ['Privacy', 'Terms'],
    },
  ];
}
