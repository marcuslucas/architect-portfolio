---

# Implementation PRD — Dustin Brady Architecture

**Site:** dustin-brady-architecture.vercel.app **Audit Score:** 25/40 **Target Score:** 36+/40 **Stack:** Next.js / Vercel

---

## Progress tracker

**Tier 1 — MUST FIX NOW**

- [x] T1-01 · Homepage Heading Semantics
- [x] T1-02 · Contact Form Label Association
- [ ] T1-03 · prefers-reduced-motion Support
- [ ] T1-04 · Skip Navigation Link

**Tier 2 — SHOULD FIX NEXT**

- [ ] T2-01 · Hero Image Optimization
- [ ] T2-02 · Portfolio Card Labels
- [ ] T2-03 · Hero Section CTA
- [ ] T2-04 · Decorative Image aria-hidden and Alt Text Audit
- [ ] T2-05 · "All Projects" CTA Visual Weight

**Tier 3 — NICE TO HAVE**

- [ ] T3-01 · Portfolio Depth — Additional Project Photography
- [ ] T3-02 · Custom Keyboard Focus States
- [ ] T3-03 · Philosophy Section — Reduce Decorative Repetition
- [ ] T3-04 · Project Cards — Edge-to-Edge Spacing Fix
- [ ] T3-05 · Real Project Names and Metadata on Cards

## Tier 1 — MUST FIX NOW

_Correctness failures. These are broken, not just suboptimal. Fix before any visual work._

---

### T1-01 · Homepage Heading Semantics

**Category:** Accessibility / SEO **Effort:** 30 min **WCAG:** SC 1.3.1 (Info and Relationships) — AA

**Problem:** The homepage has zero semantic heading elements. The hero name and all section titles are `<span>` and `<div>` elements. Screen readers cannot navigate the page. Search engines cannot extract a primary content signal.

**Acceptance criteria:**

- `<h1>` wraps the studio name on the homepage (one per page, above the fold)
- "Portfolio" section label promoted to `<h2>`
- "Philosophy" section label promoted to `<h2>`
- Project titles within the grid use `<h3>`
- No visual change required — apply heading semantics to existing styled elements

**Implementation note:** In Next.js/React, replace `<span className="hero-title">` with `<h1 className="hero-title">`. The existing CSS class handles all visual styling — the tag change is purely semantic.

---

### T1-02 · Contact Form Label Association

**Category:** Accessibility **Effort:** 15 min **WCAG:** SC 1.3.1 + SC 4.1.2 — AA

**Problem:** All six contact form labels have `for="null"`. No inputs have `id` attributes. Labels are programmatically disconnected from their fields. Clicking a label does not focus its input. Screen readers announce placeholder text only, which disappears on focus.

**Acceptance criteria:**

- Every `<label>` has a `for` attribute matching its input's `id`
- Every `<input>` and `<textarea>` has a unique `id` attribute
- Pattern: `<label for="contact-name">` → `<input id="contact-name">`
- All required fields have the native `required` attribute
- Verify: clicking each label focuses its input

**Field list to fix:** `first-name`, `last-name`, `email`, `phone`, `project-type`, `message`

---

### T1-03 · `prefers-reduced-motion` Support

**Category:** Accessibility / Motion **Effort:** 20 min **WCAG:** SC 2.3.3 advisory — AA real-world expectation

**Problem:** No `prefers-reduced-motion` media query exists anywhere in the stylesheet. All scroll-triggered entrance animations fire for users with vestibular disorders, epilepsy risk, or OS-level motion sensitivity enabled.

**Acceptance criteria:**

- Global override rule added to the root stylesheet
- All transitions and animations are suppressed when `prefers-reduced-motion: reduce` is set
- Content remains fully visible and readable with motion disabled (no hidden-until-animated states)

**Implementation:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Additional requirement:** Any element that starts invisible (opacity: 0, transform: translateY) and becomes visible via JS scroll trigger must have its visible state set immediately when `prefers-reduced-motion: reduce` is active — not just have the transition suppressed.

---

### T1-04 · Skip Navigation Link

**Category:** Accessibility / Keyboard **Effort:** 20 min **WCAG:** SC 2.4.1 — AA

**Problem:** No skip-to-content link exists. Keyboard users tab through all five navigation items on every page load before reaching main content.

**Acceptance criteria:**

- A visually hidden "Skip to main content" link is the first focusable element in the DOM
- It becomes visible on focus (standard pattern)
- `<main>` has `id="main-content"`
- Works on all pages

**Implementation:**

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  padding: 0.5rem 1rem;
  background: #18181b;
  color: #fafafa;
  font-size: 0.875rem;
}
.skip-link:focus {
  top: 1rem;
}
```

---

## Tier 2 — SHOULD FIX NEXT

_Structural and quality issues that materially affect user experience, performance, and credibility._

---

### T2-01 · Hero Image Optimization (Next.js `<Image>`)

**Category:** Performance / LCP **Effort:** 1–2 hrs

**Problem:** The hero image (01.JPG, 5504×3072px) is served as a single unoptimized JPG with no responsive `srcset`, no `sizes` attribute, no `fetchpriority`, and no next-gen format (WebP/AVIF). On mobile connections this is the primary LCP bottleneck.

**Acceptance criteria:**

- Hero image uses Next.js `<Image>` component with `priority` prop
- All other project images use `<Image>` with `loading="lazy"` (default)
- No image is served at a resolution wider than its rendered size
- WebP is served to supporting browsers automatically (Vercel handles this via `next/image`)
- `width` and `height` props set on all `<Image>` components to prevent layout shift

**Implementation note:** `priority` on `<Image>` sets both `fetchpriority="high"` and a `<link rel="preload">` in the document head — the correct LCP optimization for a hero asset.

---

### T2-02 · Portfolio Card Labels (Visible on All Viewports)

**Category:** Portfolio Presentation / Mobile UX **Effort:** 1 hr

**Problem:** Project titles and metadata are only visible on hover. Mobile users see four identical-looking photo cards with no distinguishing information — no name, no year, no location, no typology. There is no hover state on touch devices.

**Acceptance criteria:**

- Project name is permanently visible on every card — not hover-only
- Each card shows at minimum: project name + one secondary descriptor (location or year)
- Labels are legible against the image (use a gradient overlay or a below-image text block — not centered overlay text on an uncontrolled background)
- On hover/focus (desktop), a secondary state may reveal additional info or visual treatment
- Labels meet 4.5:1 contrast ratio against their background

**Recommended pattern:** Text block below image (not overlaid), with project name as `<h3>` and location/year as a `<p>`. Cleaner, more accessible, no contrast management required.

---

### T2-03 · Hero Section CTA

**Category:** Clarity / Conversion **Effort:** 45 min

**Problem:** No call to action exists in the hero frame. A prospective client who wants to start a project has no obvious next step above the fold. The "Scroll" indicator is low-contrast rotated text — not a functional affordance.

**Acceptance criteria:**

- At least one CTA link exists inside the hero viewport on desktop and mobile
- Options: "View Portfolio" (links to `/portfolio`) or "Begin an Inquiry" (links to `/contact`)
- CTA is typographically consistent with the site's restrained style — no filled button required; a small-caps text link with arrow is sufficient
- The "Scroll" indicator should either be improved in contrast or removed; it is not carrying its weight

---

### T2-04 · Decorative Image `aria-hidden` and Alt Text Audit

**Category:** Accessibility **Effort:** 1 hr **WCAG:** SC 1.1.1 — AA

**Problem:** Decorative images (hero background, project thumbnails, SVG line patterns) are not marked `aria-hidden="true"` and will be announced to screen readers. The alt text "Dustin Brady Architecture" is duplicated across the logo and the hero image, which creates redundant announcements.

**Acceptance criteria:**

- Hero background image: `aria-hidden="true"` or `alt=""` (empty string — not omitted)
- Decorative SVG patterns: `aria-hidden="true"` on the `<svg>` element
- Project thumbnail images: meaningful `alt` text describing the project (e.g., `alt="Miami Beach Residence — exterior view"`)
- Logo image: `alt="Dustin Brady Architecture"` (retained — this is correct)
- No duplicate alt text across a single page

---

### T2-05 · "All Projects" CTA Visual Weight

**Category:** Visual Hierarchy / Navigation **Effort:** 30 min

**Problem:** The "All Projects" link below the homepage grid is a low-weight small-caps text link with a dash prefix. It is easy to miss. This is the primary path to the full portfolio from the homepage.

**Acceptance criteria:**

- "All Projects" link has sufficient visual weight to be noticed without scrolling past it accidentally
- Minimum: increase font size to body scale, remove the dash prefix, add a directional arrow (`→`)
- It does not need to be a button — the typographic style is appropriate — but it must register as a clear affordance
- Keyboard focus state must be visible

---

## Tier 3 — NICE TO HAVE

_Quality-of-life improvements that raise the ceiling once the floor is solid._

---

### T3-01 · Portfolio Depth — Additional Project Photography

**Category:** Portfolio Presentation **Effort:** Content dependency (client-side)

Each project currently shows two photographs. For a residential architecture studio targeting discerning clients, two images is thin. The written voice on project pages is strong — it deserves more visual support.

**Target:** 6–10 images per project including: exterior hero, exterior detail, interior key space, interior detail, site context or plan. Even three additional images per project would materially improve credibility.

**Note:** This is a content dependency, not a code task. Flag to client.

---

### T3-02 · Custom Keyboard Focus States

**Category:** Accessibility / Polish **Effort:** 1 hr

The site currently relies on the browser default `outline: auto 1px` which is low-contrast on the cream background. A styled focus indicator consistent with the site's palette would improve both accessibility and perceived quality.

**Suggested pattern:**

```css
:focus-visible {
  outline: 2px solid #18181b;
  outline-offset: 3px;
}
:focus:not(:focus-visible) {
  outline: none;
}
```

---

### T3-03 · Philosophy Section — Reduce Decorative Repetition

**Category:** Premium Feel **Effort:** 30 min

The blueprint-grid SVG motif appears twice on a single scroll journey (philosophy section + contact page). Used once it reads as a signature detail; used twice in close succession it begins to feel like a template asset.

**Recommendation:** Remove the SVG from one instance (suggest: contact page). Keep it in the philosophy section where it has the most tonal support from the surrounding content.

---

### T3-04 · Project Cards — Edge-to-Edge Spacing Fix

**Category:** Visual Hierarchy / Premium Feel **Effort:** 20 min

Portfolio grid cards sit directly edge-to-edge with no gap between pairs. This undermines the breathing room established elsewhere on the page and causes images to visually bleed together.

**Acceptance criteria:**

- A consistent gap (suggest: `gap: 2px` to `gap: 1rem` — test visually) is applied to the project grid
- The gap is consistent with the spacing system used elsewhere on the page

---

### T3-05 · Real Project Names and Metadata on Cards

**Category:** Portfolio Presentation / Credibility **Effort:** Content + 30 min code

Projects are labeled "Project I" through "Project IV." This reads as placeholder content to any discerning visitor.

**Acceptance criteria:**

- Each project has a real name (or location-based name, e.g., "Alys Beach Residence")
- Each project card shows: name + year or typology
- Project detail pages reflect the same naming

**Note:** Content dependency. Flag to client for real project names and dates.

---

## Tier 4 — IGNORE FOR NOW

_These are low-ROI relative to the Tier 1–2 work. Do not spend time here until the above is complete._

| Item                                  | Reason to defer                                            |
| ------------------------------------- | ---------------------------------------------------------- |
| Complex parallax effects              | Conflicts with brief's explicit direction. Do not add.     |
| Cinematic page transitions            | Tier 1 motion work (reduced-motion) must come first        |
| Additional animation layers           | Site needs structural fixes before more motion             |
| SVG/canvas generative art backgrounds | No functional value for this audience                      |
| Dark mode                             | Not in scope; significant design effort for unclear return |
| CMS integration                       | Content is sparse — fix content first, then consider CMS   |

---

## Implementation Order

```
Week 1 — Fix what is broken
  T1-01  Heading semantics          (30 min)
  T1-02  Form label association     (15 min)
  T1-03  prefers-reduced-motion     (20 min)
  T1-04  Skip navigation link       (20 min)

Week 1 — Structural quality
  T2-01  next/image hero + all imgs (2 hrs)
  T2-02  Portfolio card labels      (1 hr)
  T2-03  Hero CTA                   (45 min)
  T2-04  Alt text audit             (1 hr)
  T2-05  All Projects CTA weight    (30 min)

Week 2 — Polish pass
  T3-02  Focus states               (1 hr)
  T3-03  SVG repetition             (30 min)
  T3-04  Grid spacing               (20 min)
  T3-05  Real project names         (30 min + client)
  T3-01  Photography depth          (client dependency)
```

**Total estimated engineering time (excluding client content):** ~9–10 hours **Expected audit score after Tier 1+2:** 34–36 / 40

---

## Usage in Claude Code

Paste this document into your repo root as `IMPROVEMENT_PRD.md`. When starting a Claude Code session, reference it directly:

```
Read IMPROVEMENT_PRD.md. Begin with T1-01.
Do not proceed to the next task until the current one meets its acceptance criteria.
Do not make visual changes beyond what is specified.
```
