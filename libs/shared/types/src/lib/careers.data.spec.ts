import {
  CAREER_PATHS,
  getCareerBySlug,
  getCareersByCategory,
} from './careers.data';

const REQUIRED_SLUGS = [
  'frontend-developer',
  'backend-developer',
  'fullstack-developer',
  'cybersecurity-analyst',
  'security-engineer',
  'cloud-engineer',
  'devops-engineer',
  'data-analyst',
  'data-scientist',
  'ai-engineer',
  'product-designer',
  'product-manager',
  'technical-writer',
  'qa-engineer',
];

describe('CAREER_PATHS', () => {
  it('contains all 14 career paths', () => {
    expect(CAREER_PATHS).toHaveLength(14);
  });

  it('includes every required slug', () => {
    const slugs = CAREER_PATHS.map((c) => c.slug);
    for (const slug of REQUIRED_SLUGS) {
      expect(slugs).toContain(slug);
    }
  });

  it('every career has all required fields populated', () => {
    for (const career of CAREER_PATHS) {
      expect(career.id).toBeTruthy();
      expect(career.title).toBeTruthy();
      expect(career.slug).toBeTruthy();
      expect(career.emoji).toBeTruthy();
      expect(career.summary).toBeTruthy();
      expect(career.description).toBeTruthy();
      expect(career.whoItFits).toBeTruthy();
      expect(career.salaryInsight).toBeTruthy();
      expect(career.skills.length).toBeGreaterThan(0);
      expect(career.tools.length).toBeGreaterThan(0);
      expect(career.tags.length).toBeGreaterThan(0);
      expect(career.starterProjects.length).toBeGreaterThan(0);
      expect(career.roadmapPreview.length).toBeGreaterThan(0);
      expect(career.entrepreneurshipIdeas.length).toBeGreaterThan(0);
    }
  });

  it('every career has a valid difficultyLevel', () => {
    const valid = ['beginner', 'intermediate', 'advanced'];
    for (const career of CAREER_PATHS) {
      expect(valid).toContain(career.difficultyLevel);
    }
  });

  it('every career has a valid category', () => {
    const valid = [
      'development',
      'security',
      'data-ai',
      'design-product',
      'writing-qa',
    ];
    for (const career of CAREER_PATHS) {
      expect(valid).toContain(career.category);
    }
  });

  it('slug matches id for every career', () => {
    for (const career of CAREER_PATHS) {
      expect(career.id).toBe(career.slug);
    }
  });
});

describe('getCareerBySlug', () => {
  it('returns the correct career for a known slug', () => {
    const career = getCareerBySlug('frontend-developer');
    expect(career?.title).toBe('Frontend Developer');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getCareerBySlug('unknown-path')).toBeUndefined();
  });
});

describe('getCareersByCategory', () => {
  it('returns only careers in the given category', () => {
    const results = getCareersByCategory('security');
    expect(results.every((c) => c.category === 'security')).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it('returns empty array for unknown category', () => {
    expect(getCareersByCategory('unknown')).toHaveLength(0);
  });
});
