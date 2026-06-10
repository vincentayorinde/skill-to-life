# NextSkill Design System

NextSkill's design system follows Material Design 3 principles: a light-first layout built around warm grey surfaces, white cards, and Google-inspired typography. The palette keeps career discovery approachable and trustworthy without sacrificing clarity.

## Principles

- **Light-first**: the default theme is light; dark is an opt-in override via `[data-theme="dark"]`.
- **Trustworthy by default**: structured, calm layouts with enough warmth to feel approachable.
- **Friendly when guiding**: option cards, progress bars, and step illustrations make assessment moments encouraging.
- **Shareable when celebrating**: result cards are bold and expressive for social sharing.
- **Accessible as a baseline**: keyboard focus, semantic controls, disabled states, and sufficient contrast are part of the component contract.

---

## Theme Strategy

Theme state is applied with `data-theme="light"` or `data-theme="dark"` on `<html>` and on `NsAppShellComponent`. The shell reads and writes the selected theme from `localStorage` under the key `nextskill-theme`, defaulting to `"light"`.

Design tokens are CSS custom properties in `apps/web/src/styles.scss`. Tailwind maps `ns-*` colour and shadow classes to those variables in `tailwind.config.js`. Components use token classes — `bg-ns-card`, `text-ns-muted`, `border-ns-border`, `shadow-ns` — so they adapt to theme changes automatically.

---

## Colour System

### Light theme (`:root`)

| Token                      | Value     | Usage                                   |
| -------------------------- | --------- | --------------------------------------- |
| `--ns-color-bg`            | `#F8F9FA` | Page background                         |
| `--ns-color-canvas`        | `#FFFFFF` | Full-bleed section backgrounds          |
| `--ns-color-canvas-subtle` | `#F1F3F4` | Inset surfaces, tab containers          |
| `--ns-color-card`          | `#FFFFFF` | Card backgrounds                        |
| `--ns-color-card-elevated` | `#FFFFFF` | Modal / elevated surfaces               |
| `--ns-color-nav`           | `#FFFFFF` | Navigation bar                          |
| `--ns-color-text`          | `#202124` | Body text                               |
| `--ns-color-muted`         | `#5F6368` | Secondary / helper text                 |
| `--ns-color-muted-light`   | `#9AA0A6` | Placeholder / disabled text             |
| `--ns-color-primary`       | `#006AFF` | Brand accent, CTAs                      |
| `--ns-color-primary-hover` | `#0052CC` | CTA hover state                         |
| `--ns-color-primary-soft`  | `#E8F0FE` | Tinted backgrounds for primary elements |
| `--ns-color-success`       | `#1E8E3E` | Positive states                         |
| `--ns-color-success-soft`  | `#E6F4EA` | Tinted success backgrounds              |
| `--ns-color-warning`       | `#B06000` | Warning text / icons                    |
| `--ns-color-warning-raw`   | `#F9AB00` | Warning fills (charts, illustrations)   |
| `--ns-color-warning-soft`  | `#FEF7E0` | Tinted warning backgrounds              |
| `--ns-color-danger`        | `#D93025` | Error states                            |
| `--ns-color-danger-soft`   | `#FCE8E6` | Tinted error backgrounds                |
| `--ns-color-border`        | `#DADCE0` | Default borders                         |
| `--ns-color-border-muted`  | `#E8EAED` | Subtle dividers, progress track         |

### Dark theme (`[data-theme="dark"]` override)

| Token                      | Value                   |
| -------------------------- | ----------------------- |
| `--ns-color-bg`            | `#1F1F1F`               |
| `--ns-color-canvas`        | `#121212`               |
| `--ns-color-canvas-subtle` | `#2D2D2D`               |
| `--ns-color-card`          | `#2D2D2D`               |
| `--ns-color-card-elevated` | `#3C3C3C`               |
| `--ns-color-nav`           | `#1F1F1F`               |
| `--ns-color-text`          | `#E8EAED`               |
| `--ns-color-muted`         | `#9AA0A6`               |
| `--ns-color-muted-light`   | `#5F6368`               |
| `--ns-color-primary`       | `#4DA3FF`               |
| `--ns-color-primary-hover` | `#66B2FF`               |
| `--ns-color-primary-soft`  | `rgba(77,163,255,0.15)` |
| `--ns-color-border`        | `#3C3C3C`               |
| `--ns-color-border-muted`  | `#2D2D2D`               |

### Illustration palette

These colours are used exclusively inside SVG illustrations and decorative elements.

| Token                     | Value     | Named colour         |
| ------------------------- | --------- | -------------------- |
| `--ns-color-illus-blue`   | `#4285F4` | Google Blue          |
| `--ns-color-illus-yellow` | `#FBBC04` | Google Yellow        |
| `--ns-color-illus-green`  | `#34A853` | Google Green         |
| `--ns-color-illus-red`    | `#EA4335` | Google Red           |
| `--ns-color-illus-purple` | `#A142F4` | Material Purple      |
| `--ns-color-illus-teal`   | `#24C1E0` | Material Teal        |
| `--ns-color-illus-orange` | `#FF6D00` | Material Deep Orange |

Tailwind class names: `text-ns-illusBlue`, `bg-ns-illusYellow`, etc.

---

## Typography

### Font stack

```
'Google Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

Google Sans is loaded from Google Fonts CDN in `apps/web/src/index.html`. Inter is the fallback for environments where Google Fonts is blocked.

### Type scale

| Role            | Class                    | Size / Weight |
| --------------- | ------------------------ | ------------- |
| Hero heading    | `text-5xl font-bold`     | 48 px / 700   |
| Page heading    | `text-3xl font-bold`     | 30 px / 700   |
| Section heading | `text-2xl font-semibold` | 24 px / 600   |
| Card title      | `text-lg font-semibold`  | 18 px / 600   |
| Body            | `text-base`              | 16 px / 400   |
| Small / helper  | `text-sm text-ns-muted`  | 14 px / 400   |
| Badge / label   | `text-xs font-medium`    | 12 px / 500   |

---

## Shadow System

Shadows use warm-grey RGBA values to stay soft on the light background.

| Token               | CSS value                                                      | Usage                   |
| ------------------- | -------------------------------------------------------------- | ----------------------- |
| `--ns-shadow-sm`    | `0 1px 2px rgba(60,64,67,.10), 0 1px 3px rgba(60,64,67,.08)`   | Subtle hover lift       |
| `--ns-shadow-md`    | `0 1px 3px rgba(60,64,67,.12), 0 2px 8px rgba(60,64,67,.10)`   | Default card shadow     |
| `--ns-shadow-lg`    | `0 2px 6px rgba(60,64,67,.15), 0 4px 16px rgba(60,64,67,.12)`  | Elevated modals, toasts |
| `--ns-shadow-hover` | `0 4px 12px rgba(60,64,67,.18), 0 8px 24px rgba(60,64,67,.12)` | Interactive card hover  |

Tailwind classes: `shadow-ns` (md), `shadow-ns-sm`, `shadow-ns-lg`, `shadow-ns-hover`.

---

## Border Radius

| Token             | Value  | Usage                                   |
| ----------------- | ------ | --------------------------------------- |
| `rounded-ns`      | `8px`  | Buttons, inputs, badges, small elements |
| `rounded-ns-card` | `12px` | Cards, section containers               |
| `rounded-ns-lg`   | `16px` | Feature sections, larger cards          |
| `rounded-ns-xl`   | `24px` | Hero panels, modal overlays             |

---

## Spacing System

Tailwind defaults apply throughout. Additional custom spacing:

| Class             | Value    | Usage                           |
| ----------------- | -------- | ------------------------------- |
| `max-w-container` | `1200px` | Page content max width          |
| `px-6`            | `24px`   | Default horizontal page padding |
| `gap-6`           | `24px`   | Default grid / flex gap         |

Section rhythm: `py-16` (64 px) for major page sections, `py-10` (40 px) for tighter sections.

---

## Motion

| Token           | Value                     | Usage                            |
| --------------- | ------------------------- | -------------------------------- |
| `duration-fast` | `120ms`                   | Micro-interactions (focus rings) |
| `duration-base` | `200ms`                   | Most transitions                 |
| `duration-slow` | `300ms`                   | Progress bars, page reveals      |
| `ease-ns`       | `cubic-bezier(0.2,0,0,1)` | Material standard easing         |

All animated elements should respect `prefers-reduced-motion` — use `motion-safe:` Tailwind variants when animating.

---

## Components

All components are Angular 21 standalone components exported from `libs/ui/src/index.ts`.

### NsButtonComponent

```html
<ns-button variant="primary" size="md">Get started</ns-button>
<ns-button variant="secondary">Learn more</ns-button>
<ns-button variant="ghost">Cancel</ns-button>
<ns-button variant="google">Continue with Google</ns-button>
```

**Variants:** `primary` | `secondary` | `ghost` | `danger` | `success` | `google`  
**Sizes:** `sm` (32 px min-height) | `md` (40 px) | `lg` (44 px)

Primary: filled `bg-ns-primary text-white`, 1 px elevation shadow, hover lifts with `shadow-ns-md`.  
Secondary: outlined `border border-ns-border bg-white text-ns-primary`.  
Ghost: `bg-transparent text-ns-primary`, tinted hover via `hover:bg-ns-primarySoft`.

### NsCardComponent

```html
<ns-card>Content</ns-card>
<ns-card [interactive]="true">Clickable content</ns-card>
<ns-card [elevated]="true">Modal-level card</ns-card>
```

Default: `rounded-ns-card border border-ns-border bg-ns-card shadow-ns`.  
Interactive adds: `cursor-pointer hover:-translate-y-0.5 hover:shadow-ns-hover hover:border-ns-borderStrong transition-all`.

### NsBadgeComponent

```html
<ns-badge>Default</ns-badge>
<ns-badge variant="success">Completed</ns-badge>
<ns-badge variant="warning">In progress</ns-badge>
<ns-badge variant="danger">Overdue</ns-badge>
```

Pill shape (`rounded-full`), no border, `px-3 py-1 text-xs font-medium`.

| Variant   | Background          | Text              |
| --------- | ------------------- | ----------------- |
| `default` | `bg-ns-primarySoft` | `text-ns-primary` |
| `success` | `bg-ns-successSoft` | `text-ns-success` |
| `warning` | `bg-ns-warningSoft` | `text-ns-warning` |
| `danger`  | `bg-ns-dangerSoft`  | `text-ns-danger`  |

### NsProgressComponent

```html
<ns-progress [value]="30" [max]="100"></ns-progress>
```

Track: `h-1.5 bg-ns-borderMuted rounded-full`. Fill: `bg-ns-primary transition-all duration-slow ease-ns`. Exposes `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`.

### NsOptionCardComponent

```html
<ns-option-card [selected]="isSelected" (selectedChange)="onSelect()">
  Option text
</ns-option-card>
```

`border-2 rounded-ns-card`. Unselected: `border-ns-border bg-ns-card`. Selected: `border-ns-primary bg-ns-primarySoft` with a checkmark SVG indicator in a blue circle.

### NsTabsComponent

```html
<ns-tabs [tabs]="tabs" [(activeTab)]="active"></ns-tabs>
```

Container: `bg-ns-canvasSubtle rounded-ns p-1`. Active tab: `bg-ns-card text-ns-primary shadow-ns rounded-ns`. Inactive: `text-ns-muted hover:text-ns-text`.

### NsAppShellComponent

Renders the 64 px navigation bar (`bg-ns-nav border-b border-ns-border shadow-ns`) and the main content slot. Provides theme toggle (sun/moon SVG icons) and hamburger menu for mobile. Theme stored in `localStorage` key `nextskill-theme`, defaulting to `"light"`.

### NsToastComponent (via NsToastService)

```ts
this.toast.show('Saved!', 'success');
this.toast.show('Something went wrong', 'error');
```

Dark pill `bg-[#202124] text-white rounded-ns shadow-ns-lg`, bottom-center position. Auto-dismisses after 3 seconds.

---

## Illustration Components

Illustration components render CSS/SVG decorative artwork with no external image dependencies. All SVGs carry `aria-hidden="true"`.

### NsHeroDecorativeComponent

```html
<ns-hero-decorative></ns-hero-decorative>
```

Renders three cubic-bezier sweep paths in `--ns-color-primary`, `--ns-color-illus-yellow`, and `--ns-color-illus-green`, two background circles, and a floating stats card showing 26 careers / 30 questions / Free forever.

### NsCareerIllustrationComponent

```html
<ns-career-illustration category="development"></ns-career-illustration>
<ns-career-illustration category="security"></ns-career-illustration>
```

**Categories and background colours:**

| Category              | Background              | Illustration     |
| --------------------- | ----------------------- | ---------------- |
| `development`         | `#E8F0FE` (blue soft)   | Code brackets    |
| `security`            | `#FCE8E6` (red soft)    | Shield           |
| `data-ai`             | `#FEF7E0` (yellow soft) | Bar chart        |
| `design-product`      | `#F3E8FD` (purple soft) | Target/crosshair |
| `writing-qa`          | `#E6F4EA` (green soft)  | Document         |
| `specialist-advanced` | `#E4F7FB` (teal soft)   | Network nodes    |

The component exposes a `config` property (`{ bg: string; svgContent: string }`) used in the template.

### NsAssessmentIllustrationComponent

```html
<ns-assessment-illustration [step]="1"></ns-assessment-illustration>
<ns-assessment-illustration [step]="2"></ns-assessment-illustration>
<ns-assessment-illustration [step]="3"></ns-assessment-illustration>
```

| Step | Background              | Illustration                     |
| ---- | ----------------------- | -------------------------------- |
| `1`  | `#E8F0FE` (blue soft)   | Speech bubble with question mark |
| `2`  | `#E6F4EA` (green soft)  | Target rings                     |
| `3`  | `#FEF7E0` (yellow soft) | Stepping stones                  |

The component exposes a `bg` property used for the container's inline background style.

---

## Accessibility Expectations

- All interactive components expose semantic HTML controls (`<button>`, `<a>`, `role="progressbar"`, etc.).
- Visible focus rings use `focus-visible:ring-2 ring-ns-primary ring-offset-2`.
- Color is never the sole indicator of state — shape, text, or icons reinforce it.
- Decorative SVGs use `aria-hidden="true"`.
- Theme toggle has an accessible `aria-label` that reflects the current state.
- Respect `prefers-reduced-motion` using `motion-safe:` Tailwind variants on animated elements.
