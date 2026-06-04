import {
  CAREER_SALARY_DATA,
  getSalaryDataByCareerId,
  formatSalaryRange,
} from './salary.data';
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

describe('CAREER_SALARY_DATA', () => {
  it('contains salary data for all 26 careers', () => {
    expect(CAREER_SALARY_DATA).toHaveLength(26);
  });

  it('has salary data for every required career id', () => {
    const ids = CAREER_SALARY_DATA.map((s) => s.careerId);
    for (const id of REQUIRED_CAREER_IDS) {
      expect(ids).toContain(id);
    }
  });

  it('every salary entry has all required fields', () => {
    for (const entry of CAREER_SALARY_DATA) {
      expect(entry.careerId).toBeTruthy();
      expect(entry.lastUpdated).toBeTruthy();
      expect(entry.summary).toBeTruthy();
      expect(entry.ranges.length).toBeGreaterThanOrEqual(4);
      expect(entry.factors.length).toBeGreaterThanOrEqual(3);
      expect(entry.regionalNote).toBeTruthy();
      expect(entry.sources.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('every salary range has valid min, max, and currency', () => {
    for (const entry of CAREER_SALARY_DATA) {
      for (const range of entry.ranges) {
        expect(range.min).toBeGreaterThan(0);
        expect(range.max).toBeGreaterThan(range.min);
        expect(['GBP', 'USD', 'EUR']).toContain(range.currency);
        expect(range.location).toBeTruthy();
        expect(['junior', 'mid', 'senior', 'lead']).toContain(range.level);
      }
    }
  });

  it('every entry has junior, mid, senior, and lead ranges', () => {
    const levels = ['junior', 'mid', 'senior', 'lead'] as const;
    for (const entry of CAREER_SALARY_DATA) {
      for (const level of levels) {
        const range = entry.ranges.find((r) => r.level === level);
        expect(range).toBeDefined();
      }
    }
  });

  it('salary ranges are ordered junior → mid → senior → lead by min value', () => {
    for (const entry of CAREER_SALARY_DATA) {
      const junior = entry.ranges.find((r) => r.level === 'junior');
      const mid = entry.ranges.find((r) => r.level === 'mid');
      const senior = entry.ranges.find((r) => r.level === 'senior');
      const lead = entry.ranges.find((r) => r.level === 'lead');
      if (junior && mid) expect(mid.min).toBeGreaterThan(junior.min);
      if (mid && senior) expect(senior.min).toBeGreaterThan(mid.min);
      if (senior && lead) expect(lead.min).toBeGreaterThan(senior.min);
    }
  });

  it('freelance rate entries have valid daily and hourly ranges', () => {
    for (const entry of CAREER_SALARY_DATA) {
      if (!entry.freelanceRate) continue;
      expect(entry.freelanceRate.daily.min).toBeGreaterThan(0);
      expect(entry.freelanceRate.daily.max).toBeGreaterThan(
        entry.freelanceRate.daily.min,
      );
      expect(entry.freelanceRate.hourly.min).toBeGreaterThan(0);
      expect(entry.freelanceRate.hourly.max).toBeGreaterThan(
        entry.freelanceRate.hourly.min,
      );
    }
  });

  it('every career in CAREER_PATHS has matching salary data', () => {
    for (const career of CAREER_PATHS) {
      const data = getSalaryDataByCareerId(career.id);
      expect(data).toBeDefined();
    }
  });
});

describe('getSalaryDataByCareerId', () => {
  it('returns correct entry for a known career id', () => {
    const data = getSalaryDataByCareerId('frontend-developer');
    expect(data?.careerId).toBe('frontend-developer');
    expect(data?.ranges.length).toBeGreaterThan(0);
  });

  it('returns undefined for an unknown career id', () => {
    expect(getSalaryDataByCareerId('unknown-career')).toBeUndefined();
  });
});

describe('formatSalaryRange', () => {
  it('formats GBP ranges correctly', () => {
    expect(formatSalaryRange(28000, 40000, 'GBP')).toBe('£28k–£40k');
  });

  it('formats USD ranges correctly', () => {
    expect(formatSalaryRange(80000, 120000, 'USD')).toBe('$80k–$120k');
  });

  it('formats EUR ranges correctly', () => {
    expect(formatSalaryRange(50000, 75000, 'EUR')).toBe('€50k–€75k');
  });
});
