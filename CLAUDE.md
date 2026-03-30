# CLAUDE.md

This file is read by Claude Code for all sessions in this repository.
Follow every rule in this file before taking any action.

---

## Project identity

**Site:** Dustin Brady Architecture  
**URL:** dustin-brady-architecture.vercel.app  
**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion  
**Hosting:** Vercel (static export compatible)

**Site goal:** A premium, client-ready architecture portfolio. The aesthetic is calm,
editorial, and spatial. The work carries the persuasion — the site's job is to stay
out of its way and make it credible.

---

## Commands

```bash
npm run dev       # Development server → http://localhost:3000
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint via next lint
```

No test suite is configured. Verification is manual — see the verification
checklist at the bottom of each task in IMPROVEMENT_PRD.md.

---

## Architecture

**Data layer:** `src/lib/projects.ts` — single source of truth for all project content.
The `id` field is the URL slug. `featured: true` controls homepage hero selection.
To add or edit projects, change only this file.

Typed constraints:

- `type`: `'Residence' | 'Development' | 'Condominium' | 'Commercial'`
- `status`: `'Built' | 'Under Construction' | 'Design Development' | 'Concept'`

**Routing:** App Router pages under `src/app/`. Dynamic route
`src/app/projects/[slug]/page.tsx` resolves slugs via `getProjectById(params.slug)`.
Calls `notFound()` for missing slugs.

**Styling:** Mix of Tailwind utilities and inline `style` props. Inline styles dominate
in section and page components. Design tokens are CSS custom properties in
`src/styles/globals.css`:

```
--ink     (near-black)
--vellum  (cream background)
--stone
--dust
--pale
--warm
--accent
```

Global utility classes defined in `globals.css` and used throughout:
`.eyebrow`, `.section-label`, `.btn-primary`, `.btn-outline`, `.grid-bg`, `.grid-bg-fine`

**Visual reference:** Will Insley's ONECITY drawings.

**Key components:**

- `InsleyGrid.tsx` — pure SVG, no animation, absolute-positioned background.
  Accepts `variant: 'hero' | 'section' | 'dark'`
- `ArchDrawing.tsx` — architectural drawing placeholders. Replace with real
  `<Image>` components when photography is available. Store images in `public/images/`

**Typography:** Cormorant Garamond via `next/font/google` in `src/app/layout.tsx`
as CSS variable `--font-cormorant`. Weight 300 throughout. Italic for expressive moments.
`globals.css` contains a legacy `@import` for the same font — the `next/font` load
takes precedence. Leave both in place.

**Animation:** Framer Motion `motion.div` with `initial/animate` on page entry.
Pattern: `opacity: 0, y: 20` → `opacity: 1, y: 0` with staggered `delay` values.

**Rebranding:** To update studio name from "Voss Architecture / Alejandro Voss":

- `src/app/layout.tsx` — metadata title and description
- `src/components/layout/Navigation.tsx` — logo text
- `src/components/layout/Footer.tsx` — brand name and address
- `src/components/sections/HeroSection.tsx` — hero eyebrow and coordinate annotations

---

## Design principles

These govern every decision. Apply them before writing any code.

1. **The work comes first.** Every design choice must make the architecture look
   better, clearer, or more credible. If it only makes the site look more impressive,
   remove it.

2. **Structure before polish.** Fix broken semantics and layout before adding
   visual refinement. Add motion only after structure is sound.

3. **Restraint over expression.** Whitespace is not emptiness — it is intent.
   One well-placed element is worth ten competing ones.

4. **Typography carries the brand.** Cormorant Garamond at display scale is the
   site's primary brand signal. Protect it. Do not introduce additional typefaces.

5. **Motion must earn its place.** Every transition must improve the perception
   of quality or aid comprehension. If you cannot state why a motion exists,
   remove it.

---

## Accessibility requirements

Target: WCAG 2.1 AA minimum. These are non-negotiable.

- Every page must have exactly one `<h1>`. Heading structure must be logical
  (H1 → H2 → H3). Never skip levels.
- All form `<label>` elements must have a `for` attribute matching their input's `id`.
  All inputs must have unique `id` attributes.
- All interactive elements must have a visible focus state. Do not suppress
  `outline` without providing an equivalent custom focus indicator.
- Every page must have a skip-to-content link as the first focusable element.
  Target: `<main id="main-content">`.
- Decorative images must have `alt=""` (empty string) or `aria-hidden="true"`.
  Decorative SVGs must have `aria-hidden="true"` on the root `<svg>`.
  Informational images must have descriptive `alt` text.
- No hardcoded text colors that fail 4.5:1 contrast against their background.
- All animation must respect `prefers-reduced-motion`. The global override rule
  must be present in `globals.css` at all times:

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

- Any element that starts invisible (opacity: 0, transform, etc.) via a scroll
  animation must be immediately visible when `prefers-reduced-motion: reduce` is
  active — not just have its transition suppressed. Use:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## Performance requirements

- Hero image must use Next.js `<Image>` with the `priority` prop.
- All below-fold images must use `<Image>` with default lazy loading.
- All `<Image>` components must have explicit `width` and `height` props.
- No image served wider than its maximum rendered size.
- No `<img>` elements for project photography — use `next/image` only.

---

## Do not overreach — scope rules

These are mandatory constraints for every session.

**Fix only the listed task.** Each task in IMPROVEMENT_PRD.md is scoped
to specific files and elements. Do not modify anything outside that scope
unless it is directly required by the acceptance criteria.

**Do not redesign unrelated sections.** If a task says "fix contact form labels",
do not change the form layout, colors, or surrounding content.

**Do not add motion unless the task explicitly requires it.** Improving a heading's
semantic structure does not require or permit adding a new transition.

**Preserve layout unless the acceptance criteria require a change.** If fixing
an accessibility issue can be done without touching CSS, do it without touching CSS.

**Do not change design tokens, font choices, or color palette** unless a task
explicitly requires it.

**Do not add new npm packages** without a clear necessity. The stack is stable.
If you believe a package is needed, state why before installing.

**One task at a time.** Complete a task fully — including its verification
checklist — before moving to the next.

---

## Task execution protocol

For every task from IMPROVEMENT_PRD.md, follow this sequence exactly:

1. **State the task ID and title** (e.g., "Starting T1-02 · Contact Form Label Association").
2. **Identify the files you will modify** and confirm they match the task scope.
3. **Make the change.** Stay within the listed scope.
4. **Run the verification checklist** defined for that task.
5. **Report the result** — pass or fail for each checklist item.
6. **Stop.** Do not proceed to the next task unless instructed.
7. **Update progress.** When verification passes, mark [TASK ID] as complete in the Progress tracker section of IMPROVEMENT_PRD.md. Use [x] for completed tasks.

---

## Verification checklists

Each task has a defined verification method. Run these before marking a task complete.

### T1-01 · Homepage Heading Semantics

- [ ] Open the homepage in the browser. Run in console:
      `document.querySelectorAll('h1').length` → must return `1`
- [ ] Run: `document.querySelector('h1').textContent` → must contain "Dustin Brady"
- [ ] Run: `document.querySelectorAll('h2').length` → must be ≥ 2
- [ ] Visually confirm no layout change has occurred
- [ ] Run `npm run build` — no TypeScript or lint errors

### T1-02 · Contact Form Label Association

- [ ] Open `/contact`. Click each visible label text.
      Each click must move keyboard focus to its paired input.
- [ ] Run in console:
      `document.querySelectorAll('label[for]').length` → must equal total label count
- [ ] Run: `document.querySelectorAll('input[id], textarea[id]').length`
      → must equal total input/textarea count
- [ ] Tab through the form with keyboard only — every field must be reachable
      and its label must be announced correctly
- [ ] Run `npm run build` — no errors

### T1-03 · prefers-reduced-motion Support

- [ ] Search `globals.css` for `prefers-reduced-motion` — must be present
- [ ] In Chrome DevTools → Rendering → Enable "Emulate CSS media feature
      prefers-reduced-motion: reduce"
- [ ] Scroll through all pages — no entrance animations should play
- [ ] Confirm all content is visible at page load — nothing hidden behind
      a suppressed animation
- [ ] Run `npm run build` — no errors

### T1-04 · Skip Navigation Link

- [ ] Open homepage. Press Tab once. A "Skip to main content" link must
      become visible.
- [ ] Press Enter on that link. Focus must move to `<main id="main-content">`.
- [ ] Confirm the link is present on every page (check `/portfolio` and `/contact`)
- [ ] Run `npm run build` — no errors

### T2-01 · Hero Image Optimization

- [ ] Inspect hero image in DOM — must be `<Image>` from `next/image`, not `<img>`
- [ ] Confirm `priority` prop is present on hero `<Image>`
- [ ] Confirm all project images on `/portfolio` use `<Image>` with no `priority` prop
- [ ] Run `npm run build` — confirm no `<img>` warnings from next/image
- [ ] Open Network tab in DevTools — hero image should have `rel=preload` in document head
- [ ] Confirm no CLS on scroll (Lighthouse or manual observation)

### T2-02 · Portfolio Card Labels

- [ ] Open `/portfolio` on a mobile viewport (375px width in DevTools)
- [ ] All four project cards must show a visible project name without hovering
- [ ] Secondary descriptor (location or year) must be visible on each card
- [ ] Text must be legible — check contrast manually against card background
- [ ] On desktop, confirm hover state still functions if one exists
- [ ] Run `npm run build` — no errors

### T2-03 · Hero Section CTA

- [ ] Open homepage. Within the hero viewport, at least one link must be
      visible without scrolling.
- [ ] The link must navigate correctly to its target (`/portfolio` or `/contact`)
- [ ] The link must be keyboard focusable with a visible focus state
- [ ] Confirm no layout shift has been introduced above the fold
- [ ] Check on 375px mobile viewport — CTA must remain visible and tappable

### T2-04 · Decorative Image Alt Text Audit

- [ ] Run in console on homepage:
      `document.querySelectorAll('img[alt="Dustin Brady Architecture"]').length`
      → must return `1` (logo only, not the hero background)
- [ ] Hero image must have `alt=""` or `aria-hidden="true"`
- [ ] All `<svg>` used as decoration must have `aria-hidden="true"`
- [ ] All project thumbnail `<img>` or `<Image>` must have descriptive `alt` text
- [ ] Run `npm run build` — no errors

### T2-05 · "All Projects" CTA Weight

- [ ] Open homepage. Scroll to the portfolio section.
- [ ] The "All Projects" link must be immediately noticeable without hunting.
- [ ] The link must be keyboard focusable with a visible focus state.
- [ ] Confirm the link navigates correctly to `/portfolio`
- [ ] Check on 375px mobile — link must be clearly visible
