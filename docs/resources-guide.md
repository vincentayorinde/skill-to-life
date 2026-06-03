# Resources Guide

This guide explains how roadmap data and resources are structured in NextSkill, and how to add or update them.

## Files

```
libs/shared/types/src/lib/roadmaps.data.ts   # All roadmap and resource data
libs/shared/types/src/lib/types.ts            # TypeScript interfaces
apps/web/src/app/pages/resources/resources.ts # /resources page component
apps/web/src/app/pages/career-detail/career-detail.ts # career detail roadmap UI
```

## Data structures

### CareerRoadmap

```typescript
interface CareerRoadmap {
  careerId: string; // Must match a career id in CAREER_PATHS
  totalEstimatedTime: string; // e.g. "6–12 months"
  steps: RoadmapStep[];
}
```

### RoadmapStep

```typescript
interface RoadmapStep {
  step: number; // 1-indexed
  title: string; // Short, specific title
  description: string; // 2-3 sentences explaining what to do and why
  estimatedTime: string; // Honest estimate, e.g. "4–6 weeks" or "Ongoing"
  resources: RoadmapResource[];
  type: 'foundation' | 'core' | 'practice' | 'advanced' | 'job-ready';
}
```

### Step type guide

| Type         | Use for                                       | UI colour |
| ------------ | --------------------------------------------- | --------- |
| `foundation` | Prerequisites, basics, before everything else | Blue      |
| `core`       | The main skills of the path                   | Purple    |
| `practice`   | Projects, challenges, hands-on work           | Green     |
| `advanced`   | Deeper topics, specialisation                 | Orange    |
| `job-ready`  | Certification, portfolio, applying            | Teal      |

### RoadmapResource

```typescript
interface RoadmapResource {
  title: string;
  url: string; // Must be a real, working URL — no placeholders
  type: 'free' | 'paid' | 'book' | 'course' | 'video' | 'practice';
  platform: string; // Short name: "freeCodeCamp", "YouTube", "MDN"
  beginner: boolean; // true if appropriate for someone with no experience
}
```

### CareerResource

Used in `FREE_CAREER_RESOURCES` for the `/resources` page catalogue.

```typescript
interface CareerResource {
  title: string;
  url: string;
  type: 'course' | 'video' | 'book' | 'practice' | 'community' | 'tool';
  platform: string;
  cost: 'free' | 'paid' | 'freemium';
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string; // One sentence — shown in the /resources page
  recommended: boolean; // true = highlighted in results and career detail
  careerId: string; // Must match a career id in CAREER_PATHS
}
```

## How to add a roadmap

1. Open `libs/shared/types/src/lib/roadmaps.data.ts`
2. Add a new `CareerRoadmap` object to the `CAREER_ROADMAPS` array
3. Set `careerId` to exactly match the career's `id` field in `CAREER_PATHS`
4. Write 5–6 steps following the guidelines below

## Content guidelines

### Step descriptions

Be specific. Bad:

> "Learn JavaScript"

Good:

> "Learn variables, functions, arrays, objects, and async/await. Understand the difference between undefined and null. Study how the event loop works."

### Time estimates

Be honest — overestimates are better than underestimates.

- Use `"4–6 weeks"` format with em dash, not hyphen
- Use `"Ongoing"` for steps that never truly end (practice, open source)
- Add context when needed: `"8–10 weeks (with consistent daily study)"`

### Resource URLs

- Only use URLs you have verified exist
- Prefer stable root URLs over deep-linked pages that may move
- Use `beginner: false` for resources that require prior knowledge
- Label `type: 'paid'` for anything that costs money to access in full

## How to add a resource to the /resources page

Add a `CareerResource` to `FREE_CAREER_RESOURCES` in `roadmaps.data.ts`:

```typescript
{
  title: 'Resource name',
  url: 'https://example.com/specific-path',
  type: 'course',
  platform: 'Platform Name',
  cost: 'free',          // or 'paid' or 'freemium'
  level: 'beginner',
  description: 'One sentence about what this teaches and why it is good.',
  recommended: true,
  careerId: 'frontend-developer',
},
```

## Quality standards

All resources must be:

- **Real** — verify the URL works before adding
- **Useful** — genuinely helpful for someone learning the skill
- **Honest** — don't describe a paid resource as free or vice versa
- **Not affiliated** — no sponsored or affiliate links

## Exported helpers

```typescript
import { getRoadmapByCareerId } from 'types';
import { getResourcesByCareerId } from 'types';

const roadmap = getRoadmapByCareerId('frontend-developer');
const resources = getResourcesByCareerId('frontend-developer');
```
