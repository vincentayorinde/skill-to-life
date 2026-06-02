# Changelog

All notable changes to NextSkill are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] — Career Library Expansion

### Added

- 12 specialist and advanced career paths: Ethical Hacker / Penetration Tester, Cloud Architect, Machine Learning Engineer, Blockchain Developer, Site Reliability Engineer, Platform Engineer, AI Safety Researcher, Embedded Systems Engineer, Robotics Engineer, Cryptography Engineer, Reverse Engineer / Malware Analyst, Distributed Systems Engineer
- New `'specialist-advanced'` value added to the `CareerCategory` union type in `libs/shared/types`
- "Specialist & Advanced" tab on the `/careers` listing page
- All 12 new careers included in the assessment scoring engine with signals across all 10 questions
- Tests for new career data, category filter, scoring engine coverage for specialist paths
- `docs/career-library.md` updated with new career listings

### Changed

- `CAREER_PATHS` grows from 14 to 26 entries
- `ALL_CAREER_IDS` in the scoring engine grows from 14 to 26 entries

---

## [0.10.0] — Auth & Saved Results

### Added

- Google OAuth sign-in via `@nestjs/passport` + `passport-google-oauth20`
- JWT session management (`@nestjs/jwt`, `passport-jwt`) — stored as `ns_token` in localStorage
- PostgreSQL database integration with Prisma 5 (`User` and `Result` models)
- `PrismaModule` (global) — `PrismaService` with `OnModuleInit`/`OnModuleDestroy` lifecycle hooks
- `AuthModule` — `GET /api/auth/google` → Google redirect, `GET /api/auth/google/callback` → JWT issue + frontend redirect, `GET /api/auth/me`, `POST /api/auth/logout`
- `UsersModule` — `findById`, `findByEmail`, `findByGoogleId`, `updateUser`
- `ResultsModule` — `POST /api/results` (anon or authenticated), `GET /api/results` (auth required), `GET /api/results/:id`, `POST /api/results/:id/claim`
- `JwtAuthGuard` and `OptionalJwtGuard` for route protection
- `CurrentUser` param decorator
- CORS configuration in `main.ts` — allows `FRONTEND_URL` with credentials and `Authorization` header
- `apps/api/.env.example` with all required environment variables
- `db:setup`, `db:studio`, `db:reset` scripts in root `package.json`
- `AuthService` (Angular) — `currentUser$`, `isAuthenticated$`, `loginWithGoogle`, `handleCallback`, `logout`, `initFromStorage`
- `tokenInterceptor` — attaches `Authorization: Bearer` header to all `/api` requests
- `authGuard` — redirects unauthenticated users to `/`
- `/auth/callback` page — reads JWT from URL, stores it, claims any pending anonymous result, then redirects
- `/my-results` page (auth-protected) — lists past saved results newest-first with career emoji, match %, and date
- Result saving after assessment — calls `POST /api/results`; anonymous results store `ns_pending_claim` in sessionStorage for later claiming on sign-in
- Sign-in prompt on results page for anonymous users; "Result saved to your account" indicator for signed-in users
- Nav auth state in `NsAppShellComponent` — avatar + name + "My results" link + "Sign out" for authenticated users; "Sign in" button for anonymous users
- `APP_INITIALIZER` in `app.config.ts` — validates stored JWT on startup via `GET /api/auth/me`
- `environment.ts` and `environment.prod.ts` for Angular app
- `User` and `SavedResult` interfaces in `libs/shared/types`
- `NsAuthUser` interface and `signIn`/`signOut` outputs on `NsAppShellComponent`
- Backend tests: `AuthService.findOrCreateUser` (existing + new user), `AuthService.generateToken`, `ResultsService.create` (authenticated + anonymous), `ResultsService.claim` (success + not found + wrong token)
- Frontend tests: `AuthService.handleCallback`, `AuthService.logout`, `AuthService.getToken`, `tokenInterceptor` (adds/skips header), `AuthCallbackComponent` (calls callback + redirects)

### Changed

- `assessment-results` page now calls `POST /api/results` on load and shows contextual auth UI
- `NsAppShellComponent` accepts `[authUser]`, `(signIn)`, `(signOut)` bindings
- `home.html` passes auth state from `AuthService` to the app shell
- Existing `assessment-results.spec.ts` updated to provide `HttpClient` and flush the save request in `afterEach`

---

## [0.9.0] — Shareable Results

### Added

- `html-to-image` package — generates PNG result cards from DOM elements
- Downloadable PNG result card: deep navy/purple gradient, large career emoji, title, match percentage badge, tier label, italic insight, "What's your NextSkill?" CTA, and `nextskill.dev` watermark; subtle grain texture overlay via CSS
- Square (1080×1080) and Story (1080×1920) format support with a "Square | Story" toggle — story layout uses a larger emoji and extra tagline
- "Download card" button in share modal with `Generating your card...` loading state and filename `my-nextskill-[career-slug].png`
- `NsToastComponent` in `libs/ui` — fixed bottom-centre notification with fade-in/out, `success` and `error` variants, `role="status"` and `aria-live="polite"` accessibility attributes
- Success toast after download: "Card downloaded — ready to share!"
- Success toast after copy link: "Link copied — share it anywhere!"
- Static OG image placeholder at `apps/web/public/og-default.svg` — branded dark gradient with NextSkill wordmark, tagline, and domain
- `og:image`, `og:image:width`, `og:image:height`, `twitter:image` meta tags on `/assessment/results`
- Updated `twitter:card` to `summary_large_image`
- Redesigned share modal: download section at top with format toggle, "or share directly" divider, then existing share buttons
- Updated X/Twitter pre-fill copy: `Just found my NextSkill 🎯 [emoji] [title] — [percentage]% match "[insight]" What's yours? 👇 nextskill.dev #NextSkill #TechCareers`

### Changed

- `copyLink()` now also triggers the "Link copied" toast in addition to the button state change
- Share modal layout reorganised — download is the primary action

---

## [0.8.0] — Scoring & Results

### Added

- Full results page redesign at `/assessment/results` — 8 distinct sections replacing the single-card layout
- **Section 1 — Hero Result:** SVG circular progress ring (CSS-animated, colour-coded by matchTier: green/blue/amber), career emoji overlay, match percentage, tier badge, one-line insight, and "Explore this path" / "Share my result" CTAs
- **Section 2 — Why This Fits You:** pulls `description` and top 3 `skills` as tags from the matched career data
- **Section 3 — Your Top 5 Matches:** ranked cards with animated horizontal progress bars, tier badges, one-line insights, and "View path" links; first card highlighted as #1
- **Section 4 — Roadmap Preview:** first 3 steps from the career's `roadmapPreview` as numbered cards, with "See the full roadmap" link
- **Section 5 — Free Resources Preview:** up to 3 `freeResources` from career data; graceful "coming soon" fallback if empty
- **Section 6 — Salary Snapshot:** `salaryInsight` with contextual copy about location variance
- **Section 7 — Entrepreneurship Angle:** first 2 `entrepreneurshipIdeas` from career data
- **Section 8 — Retake or Explore:** "Not quite right?" CTA section with "Retake assessment" and "Browse all careers" buttons
- Results summary header: "You answered X questions · [date] · [career] was your best fit"
- 800ms skeleton loading state with pulse animation before results appear
- Mobile sticky "Share my result" button fixed to the bottom of the viewport
- `NsBadgeComponent` integrated into match cards for tier display
- 18 component tests covering loading state, hero display, 5 match cards, empty state, error state, meta tags, share modal, tier helpers, and ring offset animation

### Changed

- "We could not find your results" replaces "No results yet" as the no-answers copy
- Page title format updated to `Your NextSkill — [Career title] | NextSkill`
- Share tweet uses live `percentage` from `scoreAssessment`

---

## [0.7.0] — Assessment Engine

### Added

- `CareerSignal`, `AssessmentOption`, `AssessmentQuestion`, `CareerMatch`, and `MatchTier` types in `libs/shared/types` — formal schema for the assessment and scoring layer
- `assessment-data.ts` in `libs/shared/scoring` — complete signal map for all 10 questions across all 14 careers, with per-option weights (1–5) derived from strength of fit
- `scoreAssessment(answers)` in `libs/shared/scoring` — weighted scoring engine that maps every answer to career signals, normalises each career's raw score against its maximum possible score, and returns all 14 careers sorted by percentage match
- `matchTier` classification: `strong` (75%+), `good` (50–74%), `possible` (below 50%)
- "Other paths that could suit you" section on `/assessment/results` showing the 2nd and 3rd career matches with emoji, title, percentage, and colour-coded tier badge; each card links to `/careers/[slug]`
- Error state on `/assessment/results` for the edge case where scoring returns no results — shows "Something went wrong" copy and "Retake assessment" CTA
- `docs/scoring.md` — contributor guide explaining the scoring algorithm and how to tune weights
- Comprehensive Vitest test suite in `libs/shared/scoring`: empty answers, all 14 careers present, correct top result for known answer combinations, percentage validity (0–100), tier assignment, partial answers, and tie-breaking behaviour

### Changed

- `/assessment/results` hero card now uses real percentage from `scoreAssessment` instead of the fixed rule-based value from v0.6.1
- Share tweet copy updated to use live percentage: `[emoji] [title] — [real percentage]% match`
- `assessment-results.spec.ts` updated to reflect the new `matches: CareerMatch[]` component API

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
