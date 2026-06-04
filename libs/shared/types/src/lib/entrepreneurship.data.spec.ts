import {
  CAREER_ENTREPRENEURSHIP_DATA,
  getEntrepreneurshipDataByCareerId,
  getEasiestPath,
} from './entrepreneurship.data';
import { CAREER_PATHS } from './careers.data';

const REQUIRED_CAREER_IDS = [
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

describe('CAREER_ENTREPRENEURSHIP_DATA', () => {
  it('contains entrepreneurship data for all 26 careers', () => {
    expect(CAREER_ENTREPRENEURSHIP_DATA).toHaveLength(26);
  });

  it('has data for every required career id', () => {
    const ids = CAREER_ENTREPRENEURSHIP_DATA.map((e) => e.careerId);
    for (const id of REQUIRED_CAREER_IDS) {
      expect(ids).toContain(id);
    }
  });

  it('every entry has all required fields', () => {
    for (const entry of CAREER_ENTREPRENEURSHIP_DATA) {
      expect(entry.careerId).toBeTruthy();
      expect(entry.summary).toBeTruthy();
      expect(entry.paths.length).toBeGreaterThanOrEqual(2);
      expect(entry.tools.length).toBeGreaterThanOrEqual(1);
      expect(entry.communities.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('every path has all required fields', () => {
    for (const entry of CAREER_ENTREPRENEURSHIP_DATA) {
      for (const path of entry.paths) {
        expect(path.title).toBeTruthy();
        expect(path.description).toBeTruthy();
        expect(['low', 'medium', 'high']).toContain(path.difficulty);
        expect(path.timeToFirstIncome).toBeTruthy();
        expect(path.potentialIncome).toBeTruthy();
        expect(path.examples.length).toBeGreaterThanOrEqual(1);
        expect(path.gettingStarted.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it('every career in CAREER_PATHS has matching entrepreneurship data', () => {
    for (const career of CAREER_PATHS) {
      const data = getEntrepreneurshipDataByCareerId(career.id);
      expect(data).toBeDefined();
    }
  });
});

describe('getEntrepreneurshipDataByCareerId', () => {
  it('returns correct entry for a known career id', () => {
    const data = getEntrepreneurshipDataByCareerId('frontend-developer');
    expect(data?.careerId).toBe('frontend-developer');
    expect(data?.paths.length).toBeGreaterThan(0);
  });

  it('returns undefined for an unknown career id', () => {
    expect(getEntrepreneurshipDataByCareerId('unknown-career')).toBeUndefined();
  });
});

describe('getEasiestPath', () => {
  it('returns a low-difficulty path when one exists', () => {
    const path = getEasiestPath('frontend-developer');
    expect(path).toBeDefined();
    expect(path?.difficulty).toBe('low');
  });

  it('returns the first path when no low-difficulty path exists', () => {
    const data = getEntrepreneurshipDataByCareerId('ai-safety-researcher');
    const path = getEasiestPath('ai-safety-researcher');
    expect(path).toBeDefined();
    if (data && !data.paths.some((p) => p.difficulty === 'low')) {
      expect(path).toEqual(data.paths[0]);
    }
  });

  it('returns undefined for an unknown career id', () => {
    expect(getEasiestPath('unknown-career')).toBeUndefined();
  });
});
