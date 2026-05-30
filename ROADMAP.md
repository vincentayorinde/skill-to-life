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

---

## ✅ v0.6.0 — Duolingo-Style Onboarding + Result Card

Includes result screen, Spotify Wrapped-style career card, share functionality, and rule-based career matcher (share card added ahead of v0.9.0 schedule).

Friendly, step-by-step assessment flow.

- One question per screen
- Progress bar
- Option cards with Duolingo-style feedback
- Mobile-first layout

---

## 🔜 v0.7.0 — Assessment Engine

Core assessment logic and question bank.

- Question bank (personality, interests, work style, goals)
- Answer collection and session state
- Assessment routing

---

## 🔜 v0.8.0 — Scoring & Results

Weighted career matching and result page.

- Scoring model in `libs/shared/scoring`
- Match percentage calculation
- Result page with top 3 matches and reasoning

---

## 🔜 v0.9.0 — Shareable Results

Spotify Wrapped-style shareable result cards.

- Result card component
- Share link generation
- Social card preview (Open Graph)

---

## 🔜 v0.10.0 — Auth & Saved Results

Google sign-in and result persistence.

- Google OAuth via NestJS Passport
- Anonymous mode with upgrade flow
- Result saving to PostgreSQL via Prisma

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
