import type { CareerPath } from 'types';
import { CAREER_PATHS, getCareerBySlug } from 'types';

export interface MatchResult {
  career: CareerPath;
  matchPercent: number;
  insight: string;
}

type MatchStrength = 'strong' | 'medium' | 'weak';

const ENJOYS_CODE = ['I enjoy it or want to learn', 'I am okay with some code'];

const MATHS_OK = ['Very comfortable — I enjoy it', 'Fairly comfortable'];

const MATCH_PERCENT: Record<MatchStrength, number> = {
  strong: 89,
  medium: 78,
  weak: 68,
};

function resolveSlug(
  q1: string,
  q3: string,
  q7: string,
): { slug: string; strength: MatchStrength } {
  switch (q1) {
    case 'Building apps':
      if (ENJOYS_CODE.includes(q3)) {
        return {
          slug:
            q3 === 'I enjoy it or want to learn'
              ? 'fullstack-developer'
              : 'frontend-developer',
          strength: 'strong',
        };
      }
      return { slug: 'product-designer', strength: 'medium' };

    case 'Protecting systems':
      return {
        slug: ENJOYS_CODE.includes(q3)
          ? 'security-engineer'
          : 'cybersecurity-analyst',
        strength: 'strong',
      };

    case 'Analysing data':
      return {
        slug: MATHS_OK.includes(q7) ? 'data-scientist' : 'data-analyst',
        strength: MATHS_OK.includes(q7) ? 'strong' : 'medium',
      };

    case 'Designing experiences':
      return { slug: 'product-designer', strength: 'strong' };

    case 'Explaining things':
      return { slug: 'technical-writer', strength: 'strong' };

    case 'Testing quality':
      return { slug: 'qa-engineer', strength: 'strong' };

    default:
      return { slug: 'frontend-developer', strength: 'weak' };
  }
}

export function matchCareer(answers: Record<number, string>): MatchResult {
  const q1 = answers[0] ?? '';
  const q3 = answers[2] ?? '';
  const q7 = answers[6] ?? '';

  const { slug, strength } = resolveSlug(q1, q3, q7);
  const career = getCareerBySlug(slug) ?? CAREER_PATHS[0];

  const insight = career.whoItFits;

  return { career, matchPercent: MATCH_PERCENT[strength], insight };
}
