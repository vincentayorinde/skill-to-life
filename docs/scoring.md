# Scoring Algorithm

This document explains how NextSkill maps assessment answers to career matches.
It is intended for contributors who want to improve or extend the weights.

---

## Overview

The scoring engine lives in `libs/shared/scoring/src/lib/score-assessment.ts`.
It takes a map of question answers and returns all 14 careers ranked by how
well they match, expressed as a normalised percentage.

```
scoreAssessment(answers: Record<number, string>): CareerMatch[]
```

- **Input** — `answers` maps question index (0–9) to the selected option label.
  Missing keys are treated as no signal for that question (same as skipping).
- **Output** — all 14 careers sorted highest to lowest by `percentage`.
  Returns `[]` if `answers` is empty.

---

## Signal Map

`assessment-data.ts` defines `QUESTION_SIGNALS`:

```
QUESTION_SIGNALS[questionIndex][optionLabel] = CareerSignal[]
```

Each `CareerSignal` has:

- `careerId` — matches a career slug in `CAREER_PATHS` (e.g. `frontend-developer`)
- `weight` — how strongly this option points to that career (1–5)

**Weight guidelines:**
| Weight | Meaning |
|--------|---------|
| 5 | Definitive signal — the answer strongly points here |
| 4 | Strong signal |
| 3 | Moderate signal |
| 2 | Mild signal |
| 1 | Weak signal (used for "all careers" options) |

Question 1 (work type preference) uses weights 4–5 because it is the highest
signal question. Environment (Q6) and experience level (Q9) use weight 1 since
they are supplementary signals.

---

## Scoring Steps

### 1. Raw score

For each answer the user gave, look up the matching signals and add each
`weight` to that career's running total:

```
raw[careerId] += signal.weight
```

### 2. Maximum possible score

The max score per career is pre-computed once at module load from the static
signal map. For each question, the career's max contribution is the highest
weight it appears with in any single option on that question. If the career
does not appear in any option for a question, its max from that question is 0
(the question does not inflate its denominator).

```
maxScore[careerId] = Σ (max weight for career across all options, per question)
```

### 3. Normalised percentage

```
percentage = round((raw[careerId] / maxScore[careerId]) × 100)
```

This means a career that scores perfectly on all questions where it has
signals will reach 100%, regardless of how many questions it appears in.

### 4. Match tier

| Tier       | Threshold            |
| ---------- | -------------------- |
| `strong`   | percentage ≥ 75      |
| `good`     | 50 ≤ percentage < 75 |
| `possible` | percentage < 50      |

### 5. Sort

Results are sorted descending by percentage. JavaScript's `Array.sort` is
stable in all modern environments, so careers with equal percentages keep their
original `ALL_CAREER_IDS` order.

---

## Adding or Adjusting Weights

1. Open `libs/shared/scoring/src/lib/assessment-data.ts`.
2. Find the question index and option label you want to change.
3. Add, remove, or change `{ careerId, weight }` entries in the signals array.
4. Run the test suite to verify no regressions:
   ```
   pnpm nx test scoring
   ```
5. If you add a new career, also add its ID to `ALL_CAREER_IDS` and add a full
   `CareerPath` entry to `libs/shared/types/src/lib/careers.data.ts`.

---

## "All careers" Options

Some options (e.g. "A mix of both" for work environment, "Learn a valuable
skill" for main goal) are neutral signals that apply to every career with
weight 1. These use the `all(weight)` helper in `assessment-data.ts`:

```typescript
function all(weight: number): CareerSignal[] {
  return ALL_CAREER_IDS.map((careerId) => ({ careerId, weight }));
}
```

This ensures that selecting a neutral option slightly boosts all careers
rather than leaving some careers without any signal from that question.

---

## Running Tests

```bash
pnpm nx test scoring
```

The test suite covers:

- Empty input returns `[]`
- All 14 careers appear in results for any valid input
- Correct top career for known answer combinations
- Percentages are integers between 0 and 100
- Tier assignment matches thresholds
- Partial answer sets score correctly
- Tie-breaking preserves `ALL_CAREER_IDS` order
