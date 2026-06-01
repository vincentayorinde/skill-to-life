import { CAREER_PATHS } from 'types';
import type { CareerMatch, MatchTier } from 'types';
import { ALL_CAREER_IDS, QUESTION_SIGNALS } from './assessment-data';

// Pre-compute the maximum possible score each career can accumulate across all
// questions. For each question, the max is the highest weight that career
// appears with in any single option. Careers absent from a question contribute
// 0 for that question, so the question doesn't inflate their denominator.
const MAX_SCORES: Readonly<Record<string, number>> = (() => {
  const acc: Record<string, number> = Object.fromEntries(
    ALL_CAREER_IDS.map((id) => [id, 0]),
  );

  for (const optionMap of Object.values(QUESTION_SIGNALS)) {
    const best: Record<string, number> = {};
    for (const signals of Object.values(optionMap)) {
      for (const { careerId, weight } of signals) {
        best[careerId] = Math.max(best[careerId] ?? 0, weight);
      }
    }
    for (const [id, w] of Object.entries(best)) {
      acc[id] = (acc[id] ?? 0) + w;
    }
  }

  return acc;
})();

function toMatchTier(percentage: number): MatchTier {
  if (percentage >= 75) return 'strong';
  if (percentage >= 50) return 'good';
  return 'possible';
}

/**
 * Score all 14 careers against the user's answers and return them ranked
 * highest to lowest.
 *
 * @param answers - Map of question index (0–9) to the selected option label.
 *   Missing keys are treated as no signal for that question.
 * @returns Sorted CareerMatch array (all 14 careers). Returns [] for empty input.
 */
export function scoreAssessment(
  answers: Record<number, string>,
): CareerMatch[] {
  if (Object.keys(answers).length === 0) return [];

  const raw: Record<string, number> = Object.fromEntries(
    ALL_CAREER_IDS.map((id) => [id, 0]),
  );

  for (const [key, label] of Object.entries(answers)) {
    const signals = QUESTION_SIGNALS[Number(key)]?.[label];
    if (!signals) continue;
    for (const { careerId, weight } of signals) {
      if (raw[careerId] !== undefined) raw[careerId] += weight;
    }
  }

  const results: CareerMatch[] = ALL_CAREER_IDS.map((careerId) => {
    const career = CAREER_PATHS.find((c) => c.id === careerId)!;
    const score = raw[careerId] ?? 0;
    const max = MAX_SCORES[careerId] ?? 0;
    const percentage = max > 0 ? Math.round((score / max) * 100) : 0;

    return {
      careerId,
      title: career.title,
      emoji: career.emoji,
      score,
      percentage,
      matchTier: toMatchTier(percentage),
    };
  });

  // Stable sort: ties keep the original ALL_CAREER_IDS order.
  return results.sort((a, b) => b.percentage - a.percentage);
}
