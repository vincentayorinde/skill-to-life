# Salary Data Guide

This guide explains how salary data is structured in NextSkill, how to update it, and what sources to use.

---

## Data Structure

Salary data lives in `libs/shared/types/src/lib/salary.data.ts` and is exported from `libs/shared/types/src/index.ts`.

### `SalaryRange`

```ts
interface SalaryRange {
  level: 'junior' | 'mid' | 'senior' | 'lead';
  min: number; // annual salary in lowest unit (e.g. 28000)
  max: number; // annual salary in highest unit (e.g. 40000)
  currency: 'GBP' | 'USD' | 'EUR';
  location: string; // e.g. 'UK'
}
```

### `CareerSalaryData`

```ts
interface CareerSalaryData {
  careerId: string; // must match CareerPath.id
  lastUpdated: string; // year string e.g. '2025'
  summary: string; // 1-2 sentences on the role's earning situation
  ranges: SalaryRange[]; // at least 4: junior, mid, senior, lead
  freelanceRate?: {
    daily: { min: number; max: number; currency: string };
    hourly: { min: number; max: number; currency: string };
  };
  factors: string[]; // 3-5 honest factors that affect salary
  regionalNote: string; // global context (US, Europe comparisons)
  sources: string[]; // named sources used
}
```

---

## Adding a New Career Salary Entry

1. Open `libs/shared/types/src/lib/salary.data.ts`.
2. Add a new object to `CAREER_SALARY_DATA` following the existing structure.
3. The `careerId` must exactly match the career's `id` in `careers.data.ts`.
4. Always include all four levels: junior, mid, senior, lead.
5. Use GBP as the primary currency with `location: 'UK'`.
6. Include a `freelanceRate` if the role commonly takes freelance work.
7. Add the new `careerId` to the `REQUIRED_CAREER_IDS` list in `salary.data.spec.ts`.

---

## Updating Salary Ranges

Salary data should be reviewed annually. To update:

1. Check current ranges on the sources listed in the entry.
2. Update `min`, `max` values to reflect current market.
3. Update `lastUpdated` to the current year.
4. Run `pnpm test` to confirm all tests still pass.

---

## Sources

Use these sources to verify UK salary data:

- **ITJobsWatch** — `itjobswatch.co.uk` — UK-specific, permanent and contract roles
- **Glassdoor UK** — `glassdoor.co.uk` — employer-reported and employee-reported salaries
- **LinkedIn Salary** — `linkedin.com/salary` — self-reported, useful for comparison
- **Reed Technology** — `reed.co.uk` — UK job board with salary data
- **Levels.fyi** — `levels.fyi` — US-focused but useful for senior/FAANG comparison
- **Stack Overflow Developer Survey** — annual global survey with salary data by role

---

## Guidelines

**Be honest.** Do not inflate ranges to impress users. Use conservative mid-market estimates.

**UK first.** All base ranges should be UK GBP. Include a `regionalNote` with US and European context.

**Factors over numbers.** The `factors` array is as important as the ranges — tell users what actually moves the needle in salary negotiations.

**Date your data.** Always set `lastUpdated` to the year the data was last verified. Stale salary data is worse than no data.

**Freelance rates.** Only include a `freelanceRate` if freelancing is genuinely common in that role. Do not fabricate rates for roles where freelancing is rare.

---

## Helper Functions

```ts
// Get salary data for a career by its ID
getSalaryDataByCareerId(careerId: string): CareerSalaryData | undefined

// Format a salary range as a readable string: £28k–£40k
formatSalaryRange(min: number, max: number, currency: string): string
```
