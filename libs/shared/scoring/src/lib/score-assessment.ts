import { CAREER_PATHS } from 'types';
import type { CareerMatch, CategoryBreakdown, MatchTier } from 'types';
import { ALL_CAREER_IDS, QUESTION_SIGNALS } from './assessment-data';

const CATEGORY_KEYS = [
  'workStyle',
  'dayToDay',
  'problemSolving',
  'temperament',
  'softSkills',
  'careerGoals',
] as const satisfies readonly (keyof CategoryBreakdown)[];

const QUESTION_COUNT = 30;
const QUESTIONS_PER_CATEGORY = 5;
const CAREER_ID_SET = new Set<string>(ALL_CAREER_IDS);

function emptyCategoryBreakdown(): CategoryBreakdown {
  return {
    workStyle: 0,
    dayToDay: 0,
    problemSolving: 0,
    temperament: 0,
    softSkills: 0,
    careerGoals: 0,
  };
}

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
        if (!CAREER_ID_SET.has(careerId)) continue;
        best[careerId] = Math.max(best[careerId] ?? 0, weight);
      }
    }
    for (const [id, w] of Object.entries(best)) {
      acc[id] = (acc[id] ?? 0) + w;
    }
  }

  return acc;
})();

const MAX_CATEGORY_SCORES: Readonly<
  Record<string, Readonly<Record<keyof CategoryBreakdown, number>>>
> = (() => {
  const acc: Record<
    string,
    Record<keyof CategoryBreakdown, number>
  > = Object.fromEntries(
    ALL_CAREER_IDS.map((id) => [id, emptyCategoryBreakdown()]),
  ) as Record<string, Record<keyof CategoryBreakdown, number>>;

  for (let questionIndex = 0; questionIndex < QUESTION_COUNT; questionIndex++) {
    const categoryKey =
      CATEGORY_KEYS[Math.floor(questionIndex / QUESTIONS_PER_CATEGORY)];
    const optionMap = QUESTION_SIGNALS[questionIndex];
    if (!optionMap || !categoryKey) continue;

    const best: Record<string, number> = {};
    for (const signals of Object.values(optionMap)) {
      for (const { careerId, weight } of signals) {
        if (!CAREER_ID_SET.has(careerId)) continue;
        best[careerId] = Math.max(best[careerId] ?? 0, weight);
      }
    }

    for (const [careerId, weight] of Object.entries(best)) {
      acc[careerId][categoryKey] += weight;
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
 * Score careers against the user's answers and return the top five ranked
 * highest to lowest.
 *
 * @param answers - Map of question index (0–29) to the selected option label.
 *   Missing keys are treated as no signal for that question.
 * @returns Sorted top-five CareerMatch array. Returns [] for empty input.
 */
export function scoreAssessment(
  answers: Record<number, string>,
): CareerMatch[] {
  if (Object.keys(answers).length === 0) return [];

  const raw: Record<string, number> = Object.fromEntries(
    ALL_CAREER_IDS.map((id) => [id, 0]),
  );
  const rawByCategory: Record<
    string,
    Record<keyof CategoryBreakdown, number>
  > = Object.fromEntries(
    ALL_CAREER_IDS.map((id) => [id, emptyCategoryBreakdown()]),
  ) as Record<string, Record<keyof CategoryBreakdown, number>>;

  for (const [key, label] of Object.entries(answers)) {
    const questionIndex = Number(key);
    const signals = QUESTION_SIGNALS[questionIndex]?.[label];
    if (!signals) continue;
    const categoryKey =
      CATEGORY_KEYS[Math.floor(questionIndex / QUESTIONS_PER_CATEGORY)];
    for (const { careerId, weight } of signals) {
      if (raw[careerId] === undefined) continue;
      raw[careerId] += weight;
      if (categoryKey) {
        rawByCategory[careerId][categoryKey] += weight;
      }
    }
  }

  const results: CareerMatch[] = ALL_CAREER_IDS.map((careerId) => {
    const career = CAREER_PATHS.find((c) => c.id === careerId)!;
    const score = raw[careerId] ?? 0;
    const max = MAX_SCORES[careerId] ?? 0;
    const percentage = max > 0 ? Math.round((score / max) * 100) : 0;
    const categoryBreakdown = emptyCategoryBreakdown();
    for (const key of CATEGORY_KEYS) {
      const categoryMax = MAX_CATEGORY_SCORES[careerId][key] ?? 0;
      const categoryScore = rawByCategory[careerId][key] ?? 0;
      categoryBreakdown[key] =
        categoryMax > 0
          ? Math.min(Math.round((categoryScore / categoryMax) * 100), 100)
          : 0;
    }

    return {
      careerId,
      title: career.title,
      emoji: career.emoji,
      score,
      percentage,
      matchTier: toMatchTier(percentage),
      categoryBreakdown,
    };
  });

  // Stable sort: ties keep the original ALL_CAREER_IDS order.
  return results.sort((a, b) => b.percentage - a.percentage).slice(0, 5);
}
