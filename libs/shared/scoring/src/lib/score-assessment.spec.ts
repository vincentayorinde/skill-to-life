import { scoreAssessment } from './score-assessment';
import { ALL_CAREER_IDS, QUESTION_SIGNALS } from './assessment-data';

const FRONTEND_ANSWERS: Record<number, string> = {
  2: 'I enjoy it or actively want to learn',
  3: 'Something visual I can see and use',
  6: 'The bug — it feels more immediately satisfying',
  7: 'Getting started on something straight away',
  8: 'Looking at how it looks and feels to use',
  19: 'I ship something people actually use',
  22: 'Share prototypes early and get feedback often',
  28: 'Excites me — that is genuinely the goal',
  29: 'I genuinely enjoy my work most days',
};

const WRITER_ANSWERS: Record<number, string> = {
  0: 'Read the docs and figure it out myself',
  5: 'Would rather send a written report instead',
  6: 'The report — I enjoy making sense of things in writing',
  8: 'Reading through for clarity and accuracy',
  13: 'Write it out clearly in a document',
  20: 'Point them to the right resources and check back',
  21: 'Document your concerns clearly and move on',
  22: 'Send clear written updates and let them trust you',
  23: 'Help someone learn, grow, or change their path',
  29: 'I helped more people than I ever expected',
};

describe('scoreAssessment', () => {
  it('returns empty array for empty answers', () => {
    expect(scoreAssessment({})).toEqual([]);
  });

  it('has signal maps for all 30 questions', () => {
    expect(Object.keys(QUESTION_SIGNALS)).toHaveLength(30);

    for (let index = 0; index < 30; index++) {
      expect(QUESTION_SIGNALS[index]).toBeDefined();
      expect(Object.keys(QUESTION_SIGNALS[index])).toHaveLength(4);
    }
  });

  it('returns the top 5 ranked career matches for valid input', () => {
    const results = scoreAssessment(FRONTEND_ANSWERS);

    expect(results).toHaveLength(5);
    for (const result of results) {
      expect(ALL_CAREER_IDS).toContain(result.careerId);
    }
  });

  it('skipped questions are treated as no signal and do not cause errors', () => {
    const results = scoreAssessment({
      0: 'Read the docs and figure it out myself',
    });

    expect(results).toHaveLength(5);
    expect(results[0].percentage).toBeGreaterThan(0);
  });

  it('unknown option labels are ignored without errors', () => {
    const results = scoreAssessment({
      0: 'Something completely invalid',
      1: 'Also invalid',
    });

    expect(results).toHaveLength(5);
    results.forEach((result) => expect(result.score).toBe(0));
  });

  it('keeps percentages between 0 and 100', () => {
    const results = scoreAssessment(FRONTEND_ANSWERS);

    results.forEach((result) => {
      expect(result.percentage).toBeGreaterThanOrEqual(0);
      expect(result.percentage).toBeLessThanOrEqual(100);
      expect(result.percentage).toBe(Math.round(result.percentage));
    });
  });

  it('assigns valid match tiers', () => {
    const validTiers = new Set(['strong', 'good', 'possible']);
    const results = scoreAssessment(FRONTEND_ANSWERS);

    results.forEach((result) => {
      expect(validTiers.has(result.matchTier)).toBe(true);
    });
  });

  it('sorts results descending by percentage', () => {
    const results = scoreAssessment(FRONTEND_ANSWERS);

    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].percentage).toBeGreaterThanOrEqual(
        results[i].percentage,
      );
    }
  });

  it('produces deterministic ordering for repeated calls', () => {
    const tiedAnswers: Record<number, string> = {
      4: 'Depends entirely on the task',
      9: 'Depends on the team and format',
      28: 'Maybe eventually but not something I think about now',
    };

    const first = scoreAssessment(tiedAnswers).map((result) => result.careerId);
    const second = scoreAssessment(tiedAnswers).map(
      (result) => result.careerId,
    );

    expect(first).toEqual(second);
  });

  it('surfaces frontend-developer for frontend-biased answers', () => {
    const top3 = scoreAssessment(FRONTEND_ANSWERS)
      .slice(0, 3)
      .map((result) => result.careerId);

    expect(top3).toContain('frontend-developer');
  });

  it('surfaces technical-writer for writing-biased answers', () => {
    const top3 = scoreAssessment(WRITER_ANSWERS)
      .slice(0, 3)
      .map((result) => result.careerId);

    expect(top3).toContain('technical-writer');
  });

  it('includes category breakdown percentages on each match', () => {
    const results = scoreAssessment(FRONTEND_ANSWERS);

    for (const result of results) {
      expect(result.categoryBreakdown).toEqual({
        workStyle: expect.any(Number),
        dayToDay: expect.any(Number),
        problemSolving: expect.any(Number),
        temperament: expect.any(Number),
        softSkills: expect.any(Number),
        careerGoals: expect.any(Number),
      });

      Object.values(result.categoryBreakdown).forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      });
    }
  });

  it('calculates category breakdown from the relevant question ranges', () => {
    const [top] = scoreAssessment({
      0: 'Read the docs and figure it out myself',
      5: 'Would rather send a written report instead',
      10: 'Check the logs and trace exactly what changed',
      15: 'I want to understand exactly what was wrong',
      20: 'Point them to the right resources and check back',
      25: 'A deep specialist — the go-to person in my field',
    });

    expect(
      Object.values(top.categoryBreakdown).some((value) => value > 0),
    ).toBe(true);
  });
});
