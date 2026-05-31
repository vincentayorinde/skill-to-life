import { matchCareer } from './career-matcher';

function answers(q1: string, q3 = '', q7 = ''): Record<number, string> {
  return { 0: q1, 2: q3, 6: q7 };
}

describe('matchCareer', () => {
  it('returns a valid career for every Q1 option', () => {
    const q1Options = [
      'Building apps',
      'Protecting systems',
      'Analysing data',
      'Designing experiences',
      'Explaining things',
      'Testing quality',
      'Unknown option',
    ];

    for (const q1 of q1Options) {
      const result = matchCareer(answers(q1));
      expect(result.career).toBeDefined();
      expect(result.career.slug).toBeTruthy();
      expect(result.matchPercent).toBeGreaterThan(0);
    }
  });

  it('maps Building apps + enjoys code to fullstack-developer', () => {
    const result = matchCareer(
      answers('Building apps', 'I enjoy it or want to learn'),
    );
    expect(result.career.slug).toBe('fullstack-developer');
    expect(result.matchPercent).toBe(89);
  });

  it('maps Building apps + okay with code to frontend-developer', () => {
    const result = matchCareer(
      answers('Building apps', 'I am okay with some code'),
    );
    expect(result.career.slug).toBe('frontend-developer');
    expect(result.matchPercent).toBe(89);
  });

  it('maps Building apps + avoids code to product-designer', () => {
    const result = matchCareer(
      answers('Building apps', 'I would rather avoid it'),
    );
    expect(result.career.slug).toBe('product-designer');
    expect(result.matchPercent).toBe(78);
  });

  it('maps Protecting systems + avoids code to cybersecurity-analyst', () => {
    const result = matchCareer(
      answers('Protecting systems', 'I would rather avoid it'),
    );
    expect(result.career.slug).toBe('cybersecurity-analyst');
    expect(result.matchPercent).toBe(89);
  });

  it('maps Protecting systems + enjoys code to security-engineer', () => {
    const result = matchCareer(
      answers('Protecting systems', 'I enjoy it or want to learn'),
    );
    expect(result.career.slug).toBe('security-engineer');
  });

  it('maps Analysing data + maths comfortable to data-scientist', () => {
    const result = matchCareer(
      answers('Analysing data', '', 'Very comfortable — I enjoy it'),
    );
    expect(result.career.slug).toBe('data-scientist');
    expect(result.matchPercent).toBe(89);
  });

  it('maps Analysing data + maths not comfortable to data-analyst', () => {
    const result = matchCareer(
      answers('Analysing data', '', 'I find it difficult'),
    );
    expect(result.career.slug).toBe('data-analyst');
    expect(result.matchPercent).toBe(78);
  });

  it('maps Designing experiences to product-designer', () => {
    const result = matchCareer(answers('Designing experiences'));
    expect(result.career.slug).toBe('product-designer');
  });

  it('maps Explaining things to technical-writer', () => {
    const result = matchCareer(answers('Explaining things'));
    expect(result.career.slug).toBe('technical-writer');
  });

  it('maps Testing quality to qa-engineer', () => {
    const result = matchCareer(answers('Testing quality'));
    expect(result.career.slug).toBe('qa-engineer');
  });

  it('returns a fallback for unknown Q1 answers', () => {
    const result = matchCareer(answers('Completely unknown option'));
    expect(result.career).toBeDefined();
    expect(result.matchPercent).toBe(68);
  });

  it('includes a non-empty insight string', () => {
    const result = matchCareer(answers('Explaining things'));
    expect(result.insight.length).toBeGreaterThan(0);
  });

  it('works with empty answers object', () => {
    const result = matchCareer({});
    expect(result.career).toBeDefined();
  });
});
