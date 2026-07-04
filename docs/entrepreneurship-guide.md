# Entrepreneurship Guide

This guide explains how entrepreneurship path data is structured in NextSkill and how to write or update paths.

---

## Data Structure

Entrepreneurship data lives in `libs/shared/types/src/lib/entrepreneurship.data.ts` and is exported from `libs/shared/types/src/index.ts`.

### `EntrepreneurshipPath`

```ts
interface EntrepreneurshipPath {
  title: string; // short, direct name — "Freelance Web Developer"
  description: string; // 1-2 sentences explaining what this path involves
  difficulty: 'low' | 'medium' | 'high';
  timeToFirstIncome: string; // e.g. '1–3 months'
  potentialIncome: string; // e.g. '£2,000–£8,000 per month'
  examples: string[]; // 3-5 specific, real-world examples
  gettingStarted: string[]; // 4-5 numbered action steps
}
```

### `CareerEntrepreneurshipData`

```ts
interface CareerEntrepreneurshipData {
  careerId: string; // must match CareerPath.id
  summary: string; // 1-2 sentences on why this skill enables independence
  paths: EntrepreneurshipPath[]; // at least 2 paths per career
  successStories: string[]; // 1-3 real or representative examples
  tools: string[]; // tools useful for going independent in this career
  communities: string[]; // places to find clients, peers, or customers
}
```

---

## Difficulty Scale

| Level    | Meaning                                                                        |
| -------- | ------------------------------------------------------------------------------ |
| `low`    | Can start within weeks, minimal upfront investment, clear path to first client |
| `medium` | Requires some credibility-building, certification, or portfolio first          |
| `high`   | Significant skill development or audience-building required before income      |

---

## Adding a New Entrepreneurship Entry

1. Open `libs/shared/types/src/lib/entrepreneurship.data.ts`.
2. Add a new object to `CAREER_ENTREPRENEURSHIP_DATA`.
3. `careerId` must match the career's `id` in `careers.data.ts`.
4. Include at least 2 paths per career.
5. At least one path should be accessible (low or medium difficulty) where possible.
6. Add the new `careerId` to `REQUIRED_CAREER_IDS` in `entrepreneurship.data.spec.ts`.

---

## Content Guidelines

**Be specific, not vague.** "Build websites for local businesses" is better than "offer web development services". Real examples help users visualise the path.

**Be honest about difficulty.** Do not mark everything as `low` difficulty to seem encouraging. If something takes 6+ months and real skill development, say so.

**Time to first income matters most.** This is the number users care about most. Give a realistic range based on what people actually experience — not the optimistic outlier case.

**Getting started steps should be immediately actionable.** Each step should be something the user can do this week, not a vague suggestion like "build your portfolio".

**No affiliate links.** Do not link to specific paid products, courses, or services. Mention platforms by name but do not promote them commercially.

**Success stories should feel real.** Use named examples where publicly known (Pieter Levels, Adrian Cantrill, etc.) or keep them representative ("Many QA engineers earn..."). Do not invent specific income claims.

---

## Helper Functions

```ts
// Get entrepreneurship data for a career by its ID
getEntrepreneurshipDataByCareerId(careerId: string): CareerEntrepreneurshipData | undefined

// Get the lowest-difficulty path for a career (falls back to first path)
getEasiestPath(careerId: string): EntrepreneurshipPath | undefined
```

---

## Common Path Types

| Type       | Example titles                                                             |
| ---------- | -------------------------------------------------------------------------- |
| Freelance  | "Freelance Web Developer", "Freelance QA Consulting"                       |
| Consulting | "Cloud Architecture Consulting", "Data Science Consulting"                 |
| Teaching   | "Cloud Training and Certification Coaching", "DevOps Training and Content" |
| Product    | "Micro-SaaS Product", "IoT Hardware Product Development"                   |
| Research   | "Independent Safety Research and Writing"                                  |
| Auditing   | "Smart Contract Auditing", "Cryptographic Security Auditing"               |

Use whichever types genuinely apply to the career. Do not force paths that are not realistic.
