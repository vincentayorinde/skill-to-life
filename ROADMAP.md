# Skill to Life Roadmap

Skill to Life is built milestone by milestone, in public. This roadmap tracks what has shipped and what comes next.

---

## ✅ v0.1.0 — Foundation

Open-source repository setup, documentation, and GitHub configuration.

- README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY
- GitHub issue templates, PR template
- CI placeholder, labels, milestones, project board

---

## ✅ v0.2.0 — Workspace & Tooling

Nx monorepo, Angular app, NestJS API, shared libraries.

- Angular app (`apps/web`), NestJS API (`apps/api`)
- Shared types, scoring, and UI libraries
- pnpm workspace, GitHub Actions CI
- `GET /api/health` endpoint

---

## ✅ v0.3.0 — Design System

Tailwind CSS, design tokens, and reusable Angular UI components.

- Dark/light theme with CSS variables
- NsButton, NsCard, NsBadge, NsProgress, NsOptionCard, NsTabs, NsPageHeader, NsAppShell

---

## ✅ v0.4.0 — Public Website

Consumer-friendly public landing page.

- Polished dark-first hero with dot grid background
- Problem → How it works → Career paths → Assessment preview → Result card → Open source
- Duolingo-style assessment mock and Spotify Wrapped-style result card
- Simplified nav: How it works · Career paths · Open source

---

## ✅ v0.5.0 — Career Library

Static career data layer with full listing and detail pages.

- 14 career paths with real, beginner-friendly content
- `/careers` listing page with tab filter by category
- `/careers/:slug` detail pages with roadmaps, resources, salary insight, and entrepreneurship ideas
- Angular lazy-loaded routes and scroll restoration
- RouterLink support in app shell navigation

## ✅ v0.11.0 — Roadmaps & Resources

Full structured learning roadmaps and a browsable resource directory.

- Structured `CareerRoadmap` data for all 26 careers — 5–6 steps with real URLs, time estimates, and step types
- Rich roadmap UI on `/careers/:slug` — colour-coded step cards replacing the simple string list
- New `/resources` page — filterable by cost (free/paid), type (course, book, practice, video), and career
- Assessment results roadmap preview shows step title, time estimate, and first resource link
- "Resources" added to main navigation
- 5+ real free resource URLs per career throughout

---

## ✅ v0.5.1 — Career Library Expansion

12 specialist and advanced career paths added to the library.

- Ethical Hacker / Penetration Tester, Cloud Architect, Machine Learning Engineer, Blockchain Developer
- Site Reliability Engineer, Platform Engineer, AI Safety Researcher, Embedded Systems Engineer
- Robotics Engineer, Cryptography Engineer, Reverse Engineer / Malware Analyst, Distributed Systems Engineer
- New "Specialist & Advanced" tab on the `/careers` listing page
- All 12 new careers included in the assessment scoring engine
- Career library grows from 14 to 26 paths

---

## ✅ v0.6.0 — Duolingo-Style Onboarding + Result Card

Includes result screen, Spotify Wrapped-style career card, share functionality, and rule-based career matcher (share card added ahead of v0.9.0 schedule).

Friendly, step-by-step assessment flow.

- One question per screen
- Progress bar
- Option cards with Duolingo-style feedback
- Mobile-first layout

---

## ✅ v0.7.0 — Assessment Engine

Weighted scoring engine replacing the v0.6.x rule-based matcher.

- Formal question/answer schema with career signals and weights in `libs/shared/types`
- Signal map: all 10 questions × all 14 careers, weights 1–5
- `scoreAssessment()` — normalised percentage scoring, stable sort, matchTier classification
- `/assessment/results` updated: real percentage, secondary match cards, error state
- Comprehensive Vitest unit tests for the scoring lib

---

## ✅ v0.8.0 — Scoring & Results

Full results page redesign powered by the v0.7.0 scoring engine.

- 8-section results layout: hero, why it fits, top 5 matches, roadmap preview, free resources, salary snapshot, entrepreneurship angle, retake CTA
- SVG circular progress ring (CSS-animated, tier-coloured) for the hero match
- Animated horizontal progress bars in match cards
- 800ms skeleton loading state; mobile sticky share button
- 18 component tests

---

## ✅ v0.9.0 — Shareable Results

Downloadable PNG result card and share modal improvements.

- `html-to-image` generates PNG from the hidden card element
- Square (1080×1080) and Story (1080×1920) formats with toggle
- `NsToastComponent` added to `libs/ui` — success/error bottom-centre notification
- Static OG image + `og:image` / `twitter:image` meta tags on results page
- Updated share modal: download first, "or share directly" divider, updated X/Twitter copy

---

## ✅ v0.10.0 — Auth & Saved Results

Google sign-in and result persistence.

- Google OAuth via NestJS Passport + JWT session management
- PostgreSQL database with Prisma 5 (`User` and `Result` models)
- Anonymous mode with anonymous-to-signed-in result claiming flow
- `POST /api/results` saves after every assessment (anon or authenticated)
- `/my-results` page showing past saved results, protected by `authGuard`
- Nav auth state: avatar + name + sign out for authenticated; sign in button for anonymous
- `APP_INITIALIZER` validates JWT on startup

---

## ✅ v0.12.0 — Salary & Entrepreneurship Insights

Real salary data and independent paths for every career.

- UK GBP salary ranges for all 26 careers — junior, mid, senior, lead levels with freelance day/hourly rates
- `/salaries` page — sortable salary overview across all careers with visual range display
- `/entrepreneurship` page — filterable independent paths: freelance, consulting, passive income, products
- Rich salary and entrepreneurship sections on every `/careers/:slug` detail page
- Assessment results upgraded to use real structured salary and easiest-path data
- "Salaries" and "Go independent" added to main navigation
- Tests for all 26 salary entries and all 26 entrepreneurship entries

---

## ✅ v1.0.0 — Stable Public Launch

Production-ready public launch.

- 404 not-found page + wildcard route for all unknown paths
- About, Privacy policy, and Terms of use pages
- Cookie notice on all pages (localStorage-persisted dismiss)
- Skip-to-main-content link for keyboard accessibility
- SEO meta titles and descriptions on every page
- `helmet` security headers on all API responses
- `@nestjs/throttler` rate limiting — global 100 req/min, tighter on write endpoints
- Enhanced `/api/health` endpoint — version, database status, timestamp
- Production config validation — clear startup errors for missing env vars
- Footer updated with working links to all pages including Privacy and Terms
- Package version bumped to 1.0.0

---

## 🔜 Future ideas

- Performance: Lighthouse CI integration, bundle size budgets
- SEO: sitemap.xml and robots.txt generation
- Content: More career paths (DevRel, Technical PM, Solutions Engineer)
- Features: Assessment retake history and comparison view
- Features: Career path comparison view (side-by-side)
- Internationalisation: Non-UK salary data for US, EU, and Asia-Pacific
- Community: Public API for career data
- Expanded 30-question conversational assessment with category scoring breakdown
- Performance and accessibility audit
- SEO and Open Graph
- Marketing site refinements
- Community and contribution onboarding
