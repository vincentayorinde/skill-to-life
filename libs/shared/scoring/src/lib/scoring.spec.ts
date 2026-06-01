import { scoreAssessment } from './scoring';

describe('scoring barrel', () => {
  it('re-exports scoreAssessment', () => {
    expect(typeof scoreAssessment).toBe('function');
  });

  it('scoreAssessment returns empty array for empty answers', () => {
    expect(scoreAssessment({})).toEqual([]);
  });
});
