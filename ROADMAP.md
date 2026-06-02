# NextSkill Roadmap

NextSkill is built milestone by milestone, in public. This roadmap tracks what has shipped and what comes next.

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

## 🚧 v0.5.1 — Career Library Expansion

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

## 🔜 v0.11.0 — Roadmaps & Resources

Full beginner roadmaps and curated resource lists per career.

- Detailed week-by-week roadmaps
- Verified free and paid resource links
- Difficulty-gated roadmap sections

---

## 🔜 v0.12.0 — Salary & Entrepreneurship Insights

Structured salary data and entrepreneurship paths.

- Salary ranges by role, location, and experience
- Freelancing and consulting ideas
- Side project and SaaS ideas per path

---

## 🔜 v1.0.0 — Stable Public Launch

Production-ready launch.

- Performance and accessibility audit
- SEO and Open Graph
- Marketing site refinements
- Community and contribution onboarding
