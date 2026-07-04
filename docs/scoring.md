# Scoring Algorithm

This document explains how NextSkill maps assessment answers to career matches.
It is intended for contributors who want to improve or extend the weights.

---

## Overview

The scoring engine lives in `libs/shared/scoring/src/lib/score-assessment.ts`.
It scores the 30-question conversational assessment against the 26-career
library and returns the top 5 matches.

```typescript
scoreAssessment(answers: Record<number, string>): CareerMatch[]
```

- **Input** — `answers` maps question index `0`-`29` to the selected option
  label. Missing keys are treated as no signal for that question.
- **Output** — top 5 careers sorted highest to lowest by `percentage`.
  Returns `[]` if `answers` is empty.

---

## Categories

The assessment has 6 categories with 5 questions each:

| Question indexes | Category        | Breakdown key    |
| ---------------- | --------------- | ---------------- |
| 0-4              | Work Style      | `workStyle`      |
| 5-9              | Day to Day      | `dayToDay`       |
| 10-14            | Problem Solving | `problemSolving` |
| 15-19            | Temperament     | `temperament`    |
| 20-24            | Soft Skills     | `softSkills`     |
| 25-29            | Career Goals    | `careerGoals`    |

Each returned `CareerMatch` includes `categoryBreakdown`, a percentage for each
category showing how much that section supported the match.

---

## Signal Map

`assessment-data.ts` defines the full 30-question signal table:

```typescript
QUESTION_SIGNALS[questionIndex][optionLabel] = CareerSignal[]
```

Each `CareerSignal` has:

- `careerId` — a career slug in `CAREER_PATHS`, such as `frontend-developer`
- `weight` — how strongly this option points to that career, from 1 to 5

| Weight | Meaning                |
| ------ | ---------------------- |
| 5      | Definitive signal      |
| 4      | Strong signal          |
| 3      | Moderate signal        |
| 2      | Mild signal            |
| 1      | Weak or neutral signal |

The source-of-truth mappings are in
`libs/shared/scoring/src/lib/assessment-data.ts`. Keep option labels exactly in
sync with `apps/web/src/app/pages/assessment/questions.data.ts`.

---

## Scoring Steps

### 1. Raw Score

For each answer, the scorer looks up its signals and adds the weight to the
career's running score:

```typescript
raw[careerId] += signal.weight;
```

Signals for career ids that are not present in the current 26-career library
are ignored safely.

### 2. Maximum Possible Score

The max score per career is precomputed from the static signal map. For each
question, a career's max contribution is the highest weight it appears with in
any single option. If a career does not appear in that question, the question
does not increase its denominator.

```typescript
maxScore[careerId] = sum(max career weight per question)
```

### 3. Normalized Percentage

```typescript
percentage = round((raw[careerId] / maxScore[careerId]) * 100);
```

This lets a career reach 100% when the user consistently chooses the strongest
available signals for that career.

### 4. Match Tier

| Tier       | Threshold |
| ---------- | --------- |
| `strong`   | 75%+      |
| `good`     | 50-74%    |
| `possible` | below 50% |

### 5. Category Breakdown

The scorer repeats the same normalization inside each five-question category:

```typescript
categoryBreakdown.workStyle = round(
  (rawWorkStyle[careerId] / maxWorkStyle[careerId]) * 100,
);
```

The results page shows these six percentages as mini bars under "Why this fits
you."

### 6. Sort And Trim

Results are sorted descending by percentage. Ties preserve `ALL_CAREER_IDS`
order, then the scorer returns the top 5 matches.

---

## Updating Weights

1. Open `libs/shared/scoring/src/lib/assessment-data.ts`.
2. Find the question index and option label.
3. Adjust `{ careerId, weight }` entries.
4. Keep every question mapped to exactly 4 option labels.
5. Run:

```bash
pnpm nx test scoring
pnpm nx test web
```

If you add a new career id, also add a full `CareerPath` entry in
`libs/shared/types/src/lib/careers.data.ts` and update related roadmap, salary,
and entrepreneurship datasets as needed.
