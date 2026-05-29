# NextSkill Design System

NextSkill's design system starts with a practical, open-source product feel: immersive public pages, clear hierarchy, accessible controls, and enough warmth to make career discovery feel approachable.

## Principles

- Trustworthy by default: layouts should feel structured, calm, and developer-friendly.
- Friendly when guiding: onboarding patterns should feel encouraging, mobile-first, and easy to complete one step at a time.
- Shareable when celebrating: future result cards can be bolder, more expressive, and optimized for social sharing.
- Accessible as a baseline: keyboard focus, semantic controls, disabled states, and readable contrast are part of the component contract.

## Visual Direction

Public pages and future dashboards are GitHub-inspired without copying GitHub branding: dark platform surfaces, sticky structured navigation, blue accents, subtle borders, and contributor-friendly release/roadmap language.

Onboarding foundations are Duolingo-inspired: option cards, progress bars, helper/empty states, and touch-friendly spacing. This warmth should appear around assessment moments rather than overtaking the public landing page.

Future result share cards can move toward a Spotify Wrapped-inspired style: bold color, confident composition, and highly shareable career identity moments.

The public website pattern combines a dark-first hero, dashboard preview,
relatable problem framing, career path previews, friendly assessment mockups,
open-source trust, education/resource value, privacy reassurance, and a
structured footer. Reuse existing UI components before adding new ones.

## Theme Strategy

The public landing page defaults to dark mode. Theme state is applied with `data-theme="dark"` or `data-theme="light"` on the app shell and mirrored to the document root when the shell initializes. The shell stores the selected theme in `localStorage` under `nextskill-theme`.

Design tokens are CSS variables in `apps/web/src/styles.scss`; Tailwind maps `ns-*` colours and shadows to those variables in `tailwind.config.js`. Components should use token classes such as `bg-ns-card`, `text-ns-muted`, `border-ns-border`, and `shadow-glow` so they respond automatically to theme changes.

## Tokens

Tailwind is configured at the workspace root in `tailwind.config.js` and loaded by the Angular app through `apps/web/src/styles.scss`.

- Colours: `ns-bg`, `ns-canvas`, `ns-card`, `ns-cardElevated`, `ns-text`, `ns-muted`, `ns-border`, `ns-nav`, `ns-primary`, `ns-success`, `ns-warning`, `ns-purple`, `ns-focus`.
- Typography: system UI stack with Inter first when available.
- Spacing: Tailwind defaults plus `18` and `22` for larger product rhythm.
- Radius: `rounded-ns` for reusable controls and cards.
- Shadows: `shadow-ns`, `shadow-ns-lg`, and `shadow-glow` for subtle product depth.
- Focus: visible yellow focus outline via `ns-focus`.
- Motion: `duration-fast`, `duration-base`, `duration-slow`, and `ease-ns`.

## Components

The Angular UI library exports standalone components from `libs/ui/src/index.ts`:

- `NsButtonComponent`
- `NsCardComponent`
- `NsBadgeComponent`
- `NsProgressComponent`
- `NsOptionCardComponent`
- `NsTabsComponent`
- `NsEmptyStateComponent`
- `NsPageHeaderComponent`
- `NsAppShellComponent`

Buttons include `primary`, `secondary`, `ghost`, `danger`, `success`, and `google` variants. The `google` variant is visual-only and does not implement OAuth.

Use component APIs conservatively. Prefer tokenized classes and simple inputs such as `variant`, `size`, `elevated`, and `interactive` over one-off styling APIs.

## Accessibility Expectations

Interactive components must expose semantic controls, visible focus states, disabled/loading states where relevant, and keyboard-friendly behavior. The app shell theme toggle has an accessible label, nav regions are labelled, and command/search inputs are UI-only until search exists. Components should avoid relying on color alone to communicate important states and should respect reduced motion preferences.
