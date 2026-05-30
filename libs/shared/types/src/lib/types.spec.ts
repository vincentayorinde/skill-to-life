import type { CareerPath, DifficultyLevel, CareerCategory } from './types';

describe('CareerPath types', () => {
  it('allows constructing a valid CareerPath object', () => {
    const career: CareerPath = {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      slug: 'frontend-developer',
      emoji: '🖥️',
      category: 'development',
      difficultyLevel: 'beginner',
      remoteFriendly: true,
      beginnerFriendly: true,
      summary: 'Build the screens people use every day.',
      description: 'Frontend developers build web interfaces.',
      whoItFits: 'Visual thinkers who enjoy fast feedback.',
      skills: ['HTML', 'CSS', 'JavaScript'],
      tools: ['VS Code', 'Git'],
      tags: ['Visual', 'Code'],
      learningStyleFit: 'Hands-on learners.',
      starterProjects: ['Portfolio site'],
      freeResources: [
        { title: 'freeCodeCamp', url: 'https://freecodecamp.org' },
      ],
      paidResources: [],
      salaryInsight:
        'Junior: $50k–$70k · Mid: $80k–$110k · Senior: $120k–$160k+',
      entrepreneurshipIdeas: ['Freelance web development'],
      roadmapPreview: ['Learn HTML', 'Learn CSS', 'Learn JS'],
    };

    expect(career.slug).toBe('frontend-developer');
    expect(career.category).toBe('development');
    expect(career.difficultyLevel).toBe('beginner');
  });

  it('DifficultyLevel covers all expected values', () => {
    const levels: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];
    expect(levels).toHaveLength(3);
  });

  it('CareerCategory covers all expected values', () => {
    const categories: CareerCategory[] = [
      'development',
      'security',
      'data-ai',
      'design-product',
      'writing-qa',
    ];
    expect(categories).toHaveLength(5);
  });
});
