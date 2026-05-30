# Changelog

All notable changes to NextSkill are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
