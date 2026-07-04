# Career Library

The career library is the first real data layer in NextSkill. It uses static TypeScript data with no database or API — careers are defined as typed objects and rendered by Angular components.

## How career data is structured

Each career is a `CareerPath` object defined in:

```
libs/shared/types/src/lib/careers.data.ts
```

The interface lives in:

```
libs/shared/types/src/lib/types.ts
```

### CareerPath interface

| Field                   | Type              | Description                                                                  |
| ----------------------- | ----------------- | ---------------------------------------------------------------------------- |
| `id`                    | `string`          | Same as slug. Used for keying.                                               |
| `title`                 | `string`          | Display name (e.g. "Frontend Developer")                                     |
| `slug`                  | `string`          | URL-safe identifier (e.g. "frontend-developer")                              |
| `emoji`                 | `string`          | Visual anchor used in cards and headers                                      |
| `category`              | `CareerCategory`  | One of: `development`, `security`, `data-ai`, `design-product`, `writing-qa` |
| `difficultyLevel`       | `DifficultyLevel` | `beginner`, `intermediate`, or `advanced`                                    |
| `remoteFriendly`        | `boolean`         | Whether the role is commonly remote                                          |
| `beginnerFriendly`      | `boolean`         | Whether someone new to tech can realistically enter this path                |
| `summary`               | `string`          | One sentence — used on listing cards                                         |
| `description`           | `string`          | 2–3 sentences — used on detail pages. Beginner-friendly.                     |
| `whoItFits`             | `string`          | One or two sentences describing the type of person this suits                |
| `skills`                | `string[]`        | Core skills needed                                                           |
| `tools`                 | `string[]`        | Common tools used in the role                                                |
| `tags`                  | `string[]`        | 2–4 short labels shown on cards                                              |
| `learningStyleFit`      | `string`          | How this path maps to a learning style                                       |
| `starterProjects`       | `string[]`        | Realistic beginner projects                                                  |
| `freeResources`         | `ResourceLink[]`  | Free learning resources with optional URLs                                   |
| `paidResources`         | `ResourceLink[]`  | Paid courses or certifications                                               |
| `salaryInsight`         | `string`          | Human-readable salary range string                                           |
| `entrepreneurshipIdeas` | `string[]`        | Practical freelance or business ideas                                        |
| `roadmapPreview`        | `string[]`        | Ordered list of steps to get started                                         |

### ResourceLink interface

```typescript
interface ResourceLink {
  title: string;
  url?: string; // optional — add when verified
}
```

## How to add a new career

1. Open `libs/shared/types/src/lib/careers.data.ts`

2. Add a new `CareerPath` object to the `CAREER_PATHS` array

3. Ensure all required fields are populated with real, beginner-friendly content

4. Set `id` and `slug` to the same kebab-case value

5. The career will automatically appear in:
   - The career listing page at `/careers`
   - The tab filter (based on category)
   - The home page preview (first 12 careers)

6. Add a test entry in `libs/shared/types/src/lib/careers.data.spec.ts` if the career needs specific coverage

## Content guidelines

**Tone** — Speak directly to someone who is new to tech. Avoid jargon where possible. Where you must use jargon, explain it in the same sentence.

**Descriptions** — 2–3 sentences. Focus on what the person actually does, not on the technology. Use phrases like "you work on", "you build", "you help teams".

**Who it fits** — Describe a type of person, not a list of prerequisites. Focus on personality and working style, not qualifications.

**Salary insight** — Use a range string in the format:

```
Junior: $50k–$70k · Mid: $80k–$110k · Senior: $120k–$160k+ (USD — varies by location)
```

**Starter projects** — Should be things a beginner can actually build in a few days or weeks. Avoid vague prompts like "build a social network".

**Resources** — Only link to resources you have verified exist. Leave `url` empty rather than guessing a URL.

## Routes

| Path             | Component               | Description                  |
| ---------------- | ----------------------- | ---------------------------- |
| `/careers`       | `CareersComponent`      | Listing page with tab filter |
| `/careers/:slug` | `CareerDetailComponent` | Full career detail           |

## Files involved

```
libs/shared/types/src/lib/types.ts            # CareerPath interface + CareerCategory type
libs/shared/types/src/lib/careers.data.ts     # All 26 career objects + helpers
libs/shared/types/src/index.ts                # Re-exports everything

apps/web/src/app/pages/careers/careers.ts     # Listing page
apps/web/src/app/pages/career-detail/career-detail.ts  # Detail page
apps/web/src/app/pages/home/home.ts           # Landing page (uses career preview)
apps/web/src/app/app.routes.ts                # Route definitions
```

## Career library (26 paths)

### Development (4)

| Slug                  | Title                |
| --------------------- | -------------------- |
| `frontend-developer`  | Frontend Developer   |
| `backend-developer`   | Backend Developer    |
| `fullstack-developer` | Full-Stack Developer |
| `cloud-engineer`      | Cloud Engineer       |

### Security (3)

| Slug                    | Title                 |
| ----------------------- | --------------------- |
| `cybersecurity-analyst` | Cybersecurity Analyst |
| `security-engineer`     | Security Engineer     |
| `devops-engineer`       | DevOps Engineer       |

### Data & AI (3)

| Slug             | Title          |
| ---------------- | -------------- |
| `data-analyst`   | Data Analyst   |
| `data-scientist` | Data Scientist |
| `ai-engineer`    | AI Engineer    |

### Design & Product (2)

| Slug               | Title            |
| ------------------ | ---------------- |
| `product-designer` | Product Designer |
| `product-manager`  | Product Manager  |

### Writing & QA (2)

| Slug               | Title            |
| ------------------ | ---------------- |
| `technical-writer` | Technical Writer |
| `qa-engineer`      | QA Engineer      |

### Specialist & Advanced (12)

| Slug                           | Title                               |
| ------------------------------ | ----------------------------------- |
| `ethical-hacker`               | Ethical Hacker / Penetration Tester |
| `cloud-architect`              | Cloud Architect                     |
| `ml-engineer`                  | Machine Learning Engineer           |
| `blockchain-developer`         | Blockchain Developer                |
| `sre-engineer`                 | Site Reliability Engineer           |
| `platform-engineer`            | Platform Engineer                   |
| `ai-safety-researcher`         | AI Safety Researcher                |
| `embedded-systems-engineer`    | Embedded Systems Engineer           |
| `robotics-engineer`            | Robotics Engineer                   |
| `cryptography-engineer`        | Cryptography Engineer               |
| `reverse-engineer`             | Reverse Engineer / Malware Analyst  |
| `distributed-systems-engineer` | Distributed Systems Engineer        |
