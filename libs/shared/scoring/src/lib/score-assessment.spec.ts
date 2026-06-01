import { scoreAssessment } from './score-assessment';
import { ALL_CAREER_IDS } from './assessment-data';

// A complete answer set strongly biased toward frontend-developer.
const FRONTEND_ANSWERS: Record<number, string> = {
  0: 'Building apps',
  1: 'Watching and following along',
  2: 'I enjoy it or want to learn',
  3: 'Building things I am proud of',
  4: 'I look for creative solutions',
  5: 'Fully remote',
  6: 'Not my strength but I can manage',
  7: 'A working app or feature',
  8: 'Complete beginner — starting from zero',
  9: 'Get a job in tech',
};

// A complete answer set strongly biased toward technical-writer.
const WRITER_ANSWERS: Record<number, string> = {
  0: 'Explaining things',
  1: 'Reading and taking notes',
  2: 'I would rather avoid it',
  3: 'Doing work that feels meaningful',
  4: 'I talk them through with others',
  5: 'Fully remote',
  6: 'I find it difficult',
  7: 'A document or guide',
  8: 'Complete beginner — starting from zero',
  9: 'Get a job in tech',
};

// A complete answer set strongly biased toward data-analyst.
const ANALYST_ANSWERS: Record<number, string> = {
  0: 'Analysing data',
  1: 'Reading and taking notes',
  2: 'I am okay with some code',
  3: 'Good earning potential',
  4: 'I break them down step by step',
  5: 'A mix of both',
  6: 'Fairly comfortable',
  7: 'A report or data insight',
  8: 'Some professional experience',
  9: 'Learn a valuable skill',
};

// A complete answer set strongly biased toward cybersecurity-analyst.
const SECURITY_ANSWERS: Record<number, string> = {
  0: 'Protecting systems',
  1: 'Reading and taking notes',
  2: 'I am okay with some code',
  3: 'Good earning potential',
  4: 'I break them down step by step',
  5: 'A mix of both',
  6: 'Very comfortable — I enjoy it',
  7: 'A system that is secure and stable',
  8: 'Some professional experience',
  9: 'Get a job in tech',
};

describe('scoreAssessment', () => {
  describe('empty and edge cases', () => {
    it('returns empty array for empty answers', () => {
      expect(scoreAssessment({})).toEqual([]);
    });

    it('returns all 14 career matches for a full valid input', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      expect(results).toHaveLength(14);
    });

    it('returns all 14 careers even for partial answers (one question)', () => {
      const results = scoreAssessment({ 0: 'Building apps' });
      expect(results).toHaveLength(14);
    });

    it('all 14 career IDs appear in results', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      const ids = results.map((r) => r.careerId);
      for (const id of ALL_CAREER_IDS) {
        expect(ids).toContain(id);
      }
    });

    it('skipped questions are treated as no signal and do not cause errors', () => {
      const partialAnswers: Record<number, string> = {
        0: 'Building apps',
        // questions 1–9 intentionally skipped
      };
      const results = scoreAssessment(partialAnswers);
      expect(results).toHaveLength(14);
      expect(results[0].percentage).toBeGreaterThan(0);
    });

    it('unknown option labels are ignored without errors', () => {
      const badAnswers: Record<number, string> = {
        0: 'Something completely invalid',
        1: 'Also invalid',
      };
      const results = scoreAssessment(badAnswers);
      expect(results).toHaveLength(14);
      results.forEach((r) => expect(r.score).toBe(0));
    });
  });

  describe('percentage validity', () => {
    it('all percentages are between 0 and 100 for full answers', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      results.forEach((r) => {
        expect(r.percentage).toBeGreaterThanOrEqual(0);
        expect(r.percentage).toBeLessThanOrEqual(100);
      });
    });

    it('all percentages are between 0 and 100 for partial answers', () => {
      const results = scoreAssessment({
        0: 'Analysing data',
        2: 'I am okay with some code',
      });
      results.forEach((r) => {
        expect(r.percentage).toBeGreaterThanOrEqual(0);
        expect(r.percentage).toBeLessThanOrEqual(100);
      });
    });

    it('percentages are whole numbers (rounded)', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      results.forEach((r) => {
        expect(r.percentage).toBe(Math.round(r.percentage));
      });
    });
  });

  describe('matchTier assignment', () => {
    it('assigns "strong" tier when percentage >= 75', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      const top = results[0];
      // Top career for a fully biased answer set should be strong.
      if (top.percentage >= 75) {
        expect(top.matchTier).toBe('strong');
      }
    });

    it('assigns "good" tier when percentage is 50–74', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      const good = results.find((r) => r.percentage >= 50 && r.percentage < 75);
      if (good) {
        expect(good.matchTier).toBe('good');
      }
    });

    it('assigns "possible" tier when percentage < 50', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      const possible = results.find((r) => r.percentage < 50);
      if (possible) {
        expect(possible.matchTier).toBe('possible');
      }
    });

    it('every result has one of the three valid tiers', () => {
      const validTiers = new Set(['strong', 'good', 'possible']);
      const results = scoreAssessment(FRONTEND_ANSWERS);
      results.forEach((r) => {
        expect(validTiers.has(r.matchTier)).toBe(true);
      });
    });
  });

  describe('sort order', () => {
    it('results are sorted descending by percentage', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].percentage).toBeGreaterThanOrEqual(
          results[i].percentage,
        );
      }
    });

    it('produces a deterministic order on repeated calls with the same input', () => {
      // Verify the sort is stable: calling scoreAssessment twice with identical
      // answers always returns the same career order.
      const tiedAnswers: Record<number, string> = { 5: 'A mix of both' };
      const first = scoreAssessment(tiedAnswers).map((r) => r.careerId);
      const second = scoreAssessment(tiedAnswers).map((r) => r.careerId);
      expect(first).toEqual(second);
    });
  });

  describe('correct top result for known answer sets', () => {
    it('top result is frontend-developer for frontend-biased answers', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      expect(results[0].careerId).toBe('frontend-developer');
    });

    it('top result is technical-writer for writer-biased answers', () => {
      const results = scoreAssessment(WRITER_ANSWERS);
      expect(results[0].careerId).toBe('technical-writer');
    });

    it('top result is data-analyst for analyst-biased answers', () => {
      const results = scoreAssessment(ANALYST_ANSWERS);
      expect(results[0].careerId).toBe('data-analyst');
    });

    it('top result is cybersecurity-analyst for security-biased answers', () => {
      const results = scoreAssessment(SECURITY_ANSWERS);
      expect(results[0].careerId).toBe('cybersecurity-analyst');
    });
  });

  describe('CareerMatch shape', () => {
    it('each match has the required fields', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      results.forEach((r) => {
        expect(typeof r.careerId).toBe('string');
        expect(typeof r.title).toBe('string');
        expect(typeof r.emoji).toBe('string');
        expect(typeof r.score).toBe('number');
        expect(typeof r.percentage).toBe('number');
        expect(typeof r.matchTier).toBe('string');
      });
    });

    it('title and emoji match the career data for each result', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      const fe = results.find((r) => r.careerId === 'frontend-developer')!;
      expect(fe.title).toBe('Frontend Developer');
      expect(fe.emoji).toBe('🖥️');
    });

    it('raw score is non-negative for all careers', () => {
      const results = scoreAssessment(FRONTEND_ANSWERS);
      results.forEach((r) => expect(r.score).toBeGreaterThanOrEqual(0));
    });
  });

  describe('partial answer scoring', () => {
    it('careers relevant to a single strong Q1 answer score higher than others', () => {
      const results = scoreAssessment({ 0: 'Building apps' });
      const fe = results.find((r) => r.careerId === 'frontend-developer')!;
      const tw = results.find((r) => r.careerId === 'technical-writer')!;
      expect(fe.score).toBeGreaterThan(tw.score);
    });

    it('Q6/Q9/Q10 "all careers" options give equal scores to all careers', () => {
      const results = scoreAssessment({ 5: 'A mix of both' });
      const scores = results.map((r) => r.score);
      const allSame = scores.every((s) => s === scores[0]);
      expect(allSame).toBe(true);
    });
  });
});
