import {
  CAREER_PATHS,
  getCareerBySlug,
  getCareersByCategory,
} from './careers.data';
import {
  CAREER_ROADMAPS,
  getRoadmapByCareerId,
  FREE_CAREER_RESOURCES,
} from './roadmaps.data';

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
  // Specialist & Advanced
  'ethical-hacker',
  'cloud-architect',
  'ml-engineer',
  'blockchain-developer',
  'sre-engineer',
  'platform-engineer',
  'ai-safety-researcher',
  'embedded-systems-engineer',
  'robotics-engineer',
  'cryptography-engineer',
  'reverse-engineer',
  'distributed-systems-engineer',
];

describe('CAREER_PATHS', () => {
  it('contains all 26 career paths', () => {
    expect(CAREER_PATHS).toHaveLength(26);
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
      expect(career.freeResources.length).toBeGreaterThanOrEqual(3);
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
      'specialist-advanced',
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

  it('returns all 12 specialist-advanced careers', () => {
    const results = getCareersByCategory('specialist-advanced');
    expect(results).toHaveLength(12);
    expect(results.every((c) => c.category === 'specialist-advanced')).toBe(
      true,
    );
  });
});

describe('specialist-advanced careers', () => {
  const SPECIALIST_SLUGS = [
    'ethical-hacker',
    'cloud-architect',
    'ml-engineer',
    'blockchain-developer',
    'sre-engineer',
    'platform-engineer',
    'ai-safety-researcher',
    'embedded-systems-engineer',
    'robotics-engineer',
    'cryptography-engineer',
    'reverse-engineer',
    'distributed-systems-engineer',
  ];

  it('all 12 specialist careers exist in career data', () => {
    const slugs = CAREER_PATHS.map((c) => c.slug);
    for (const slug of SPECIALIST_SLUGS) {
      expect(slugs).toContain(slug);
    }
  });

  it('all 12 specialist careers have difficultyLevel advanced', () => {
    for (const slug of SPECIALIST_SLUGS) {
      const career = getCareerBySlug(slug);
      expect(career?.difficultyLevel).toBe('advanced');
    }
  });

  it('all 12 specialist careers have beginnerFriendly false', () => {
    for (const slug of SPECIALIST_SLUGS) {
      const career = getCareerBySlug(slug);
      expect(career?.beginnerFriendly).toBe(false);
    }
  });

  it('all 12 specialist careers have required fields populated', () => {
    for (const slug of SPECIALIST_SLUGS) {
      const career = getCareerBySlug(slug);
      expect(career).toBeDefined();
      expect(career!.id).toBeTruthy();
      expect(career!.title).toBeTruthy();
      expect(career!.summary).toBeTruthy();
      expect(career!.description).toBeTruthy();
      expect(career!.whoItFits).toBeTruthy();
      expect(career!.salaryInsight).toBeTruthy();
      expect(career!.skills.length).toBeGreaterThan(0);
      expect(career!.tools.length).toBeGreaterThan(0);
      expect(career!.roadmapPreview.length).toBeGreaterThanOrEqual(5);
      expect(career!.entrepreneurshipIdeas.length).toBeGreaterThan(0);
    }
  });
});

describe('CAREER_ROADMAPS', () => {
  it('has a roadmap for every career', () => {
    for (const career of CAREER_PATHS) {
      const roadmap = getRoadmapByCareerId(career.id);
      expect(roadmap).toBeDefined();
    }
  });

  it('has 26 roadmap entries', () => {
    expect(CAREER_ROADMAPS).toHaveLength(26);
  });

  it('every roadmap has required fields', () => {
    for (const roadmap of CAREER_ROADMAPS) {
      expect(roadmap.careerId).toBeTruthy();
      expect(roadmap.totalEstimatedTime).toBeTruthy();
      expect(roadmap.steps.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('every roadmap step has required fields', () => {
    for (const roadmap of CAREER_ROADMAPS) {
      for (const step of roadmap.steps) {
        expect(step.step).toBeGreaterThan(0);
        expect(step.title).toBeTruthy();
        expect(step.description).toBeTruthy();
        expect(step.estimatedTime).toBeTruthy();
        expect([
          'foundation',
          'core',
          'practice',
          'advanced',
          'job-ready',
        ]).toContain(step.type);
        expect(step.resources.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('every roadmap step resource has a real URL', () => {
    for (const roadmap of CAREER_ROADMAPS) {
      for (const step of roadmap.steps) {
        for (const res of step.resources) {
          expect(res.url).toMatch(/^https?:\/\//);
          expect(res.title).toBeTruthy();
          expect(res.platform).toBeTruthy();
        }
      }
    }
  });

  it('getRoadmapByCareerId returns undefined for unknown id', () => {
    expect(getRoadmapByCareerId('does-not-exist')).toBeUndefined();
  });
});

describe('FREE_CAREER_RESOURCES', () => {
  it('has at least one resource', () => {
    expect(FREE_CAREER_RESOURCES.length).toBeGreaterThan(0);
  });

  it('every resource has required fields and a real URL', () => {
    for (const r of FREE_CAREER_RESOURCES) {
      expect(r.title).toBeTruthy();
      expect(r.url).toMatch(/^https?:\/\//);
      expect(r.platform).toBeTruthy();
      expect(r.careerId).toBeTruthy();
    }
  });
});
