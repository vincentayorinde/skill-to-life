# Changelog

All notable changes to NextSkill are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.6.1] — Result Screen and Shareable Career Card

### Added

- `AssessmentStateService` — root-scoped singleton that persists assessment answers across the `/assessment` → `/assessment/results` route boundary
- `matchCareer()` in `libs/shared/scoring` — rule-based career matcher using Q1 (work preference), Q3 (coding comfort), and Q7 (maths comfort) as signals; maps to one of the 14 career library entries
- Spotify Wrapped-style result card at `/assessment/results` — dark gradient, ambient glow blobs, career emoji, title, match percentage badge, one-line insight, and `nextskill.dev` watermark
- Share modal with four options: X/Twitter (pre-filled tweet), LinkedIn, copy link (clipboard), and native Web Share API (mobile)
- "Copied!" confirmation state after copy link
- Open Graph and Twitter Card meta tags set via Angular's `Meta` and `Title` services
- No-results fallback state when user navigates directly to `/assessment/results`
- 1.8-second CSS spinner loading reveal before card animates in (fade-up keyframe)
- Matcher unit tests: all Q1 options, coding/maths signal combinations, fallback for unknown inputs
- Result screen tests: loading state, match computation, share modal open/close, copy link

### Changed

- `AssessmentComponent` now saves answers to `AssessmentStateService` before navigating to results
- `/assessment/results` "See my matches" link replaced with personalised result card and four CTAs

---

## [0.6.0] — Duolingo-Style Onboarding

### Added

- Assessment flow at `/assessment` — 10 questions, one per screen, no distractions
- Question data module with all 10 questions, options (emoji + label + description), and rotating microcopy
- Smooth 150ms CSS fade-and-slide transition between questions
- Progress header with step counter ("Step 3 of 10") and `NsProgressComponent` bar
- Back navigation with answer pre-population when returning to a previous question
- Arrow key cycling between option cards; Next/Back buttons fully keyboard accessible
- `canDeactivate` guard that prompts "Your progress will be lost" when navigating away mid-assessment
- Assessment results placeholder at `/assessment/results` — 2-second CSS spinner loading state, then CTAs (See my matches → `/careers`, Continue with Google, Try anonymously)
- `routerLink` input added to `NsButtonComponent` — renders an `<a [routerLink]>` element for SPA navigation
- "Start assessment" and "Start anonymously" CTAs on the landing page now route to `/assessment`
- Dark theme forced during assessment (`data-theme="dark"` on document root), restored on exit
- 8 unit tests covering: first question render, Next disabled before selection, question advance, back navigation, answer restore, progress percentage, `hasAnswers()` state, last question label

### Changed

- `NsButtonComponent` now supports `routerLink` input alongside existing `href`

---

## [0.5.0] — Career Library

### Added

- `CareerPath` TypeScript interface and supporting types (`DifficultyLevel`, `CareerCategory`, `ResourceLink`) in `libs/shared/types`
- Static career data for 14 tech career paths with full beginner-friendly content: Frontend Developer, Backend Developer, Full-stack Developer, Cybersecurity Analyst, Security Engineer, Cloud Engineer, DevOps Engineer, Data Analyst, Data Scientist, AI Engineer, Product Designer, Product Manager, Technical Writer, QA Engineer
- Career listing page at `/careers` with tab filter (All · Development · Security · Data & AI · Design & Product · Writing & QA)
- Career detail page at `/careers/:slug` with full sections: about, who it fits, skills, tools, starter projects, roadmap preview, free resources, paid resources, salary insight, entrepreneurship ideas, and assessment CTA
- `getCareerBySlug()` and `getCareersByCategory()` helper functions
- `RouterLink` support added to `NsAppShellComponent` — nav links now accept either `href` or `routerLink`
- Angular lazy-loaded routes for home, careers listing, and career detail
- `withScrollPositionRestoration('top')` on router for correct scroll behaviour between pages
- `docs/career-library.md` with data structure, content guidelines, and instructions for adding new careers
- Career data unit tests: all 14 slugs present, all fields populated, category and difficulty validation
- Component tests for `CareersComponent` and `CareerDetailComponent`

### Changed

- `AppComponent` simplified to a router shell (`<router-outlet />`) — landing page moved to `HomeComponent`
- Landing page career path cards now link to individual career detail pages at `/careers/:slug`
- Career paths nav link now routes to `/careers` using Angular `RouterLink`
- Open source release card updated to v0.5.0

---

## [0.4.0] — Public Website

### Added

- Dark-first public landing page with full sections: hero, problem, how it works, career path previews, assessment mock, shareable result card, open source, anonymous trust
- GitHub-inspired app shell and navigation
- Duolingo-style assessment preview component
- Spotify Wrapped-style result card preview
- Simplified navigation: How it works · Career paths · Open source
- Trust badges: Open source · Beginner friendly · Anonymous mode · Shareable results
- 12 career path preview cards with emoji anchors
- Polished hero copy: "Stop guessing your way into tech. Find the tech path that fits you."

---

## [0.3.0] — Design System

### Added

- Tailwind CSS and PostCSS integration
- Global CSS design tokens and dark/light theme
- Reusable Angular standalone UI components in `libs/ui`:
  - `NsAppShellComponent` — nav, theme toggle, mobile menu
  - `NsButtonComponent` — primary, secondary, ghost, google, danger, success variants
  - `NsCardComponent` — padded, elevated, interactive
  - `NsBadgeComponent` — neutral, primary, success, warning, accent, purple
  - `NsProgressComponent` — gradient progress bar
  - `NsOptionCardComponent` — assessment option card with selection state
  - `NsTabsComponent` — accessible tab filter bar
  - `NsPageHeaderComponent` — section heading with eyebrow and description
  - `NsEmptyStateComponent`

---

## [0.2.0] — Workspace & Tooling

### Added

- Nx monorepo with Angular (`apps/web`) and NestJS (`apps/api`)
- Shared TypeScript library (`libs/shared/types`)
- Scoring library (`libs/shared/scoring`)
- Angular UI component library (`libs/ui`)
- pnpm workspace configuration
- GitHub Actions CI workflow
- `GET /api/health` endpoint returning `{ status: "ok", service: "nextskill-api" }`
- Local dev scripts and README instructions

---

## [0.1.0] — Foundation

### Added

- Open-source repository foundation: README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, ROADMAP, CHANGELOG, AGENTS.md
- GitHub issue templates and PR template
- Placeholder CI and repository checks
- GitHub labels, milestones, and project board
