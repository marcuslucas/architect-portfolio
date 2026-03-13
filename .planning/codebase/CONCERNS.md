# Codebase Concerns

**Analysis Date:** 2026-03-13

## Tech Debt

**Duplicate font loading:**
- Issue: `Cormorant Garamond` loaded twice — once via `next/font/google` in `src/app/layout.tsx` and again via `@import` in `src/styles/globals.css`
- Files: `src/app/layout.tsx`, `src/styles/globals.css` (line 1)
- Impact: Redundant network request and CSS parser overhead. The `@import` approach is slower (blocks rendering) than the `next/font` approach.
- Fix approach: Remove the `@import url()` from globals.css line 1 — the `next/font` load in layout.tsx is the correct modern approach and already sets `--font-cormorant` CSS variable.

**Inline styles dominating UI code:**
- Issue: Extensive inline `style` props used throughout components instead of Tailwind utilities or CSS classes
- Files: `src/app/projects/[slug]/page.tsx`, `src/components/sections/ProjectsGrid.tsx`, `src/components/sections/ProjectGrid.tsx`, `src/components/layout/Navigation.tsx`, and nearly all page/section components
- Impact: Makes styling harder to maintain, refactor, and test. CSS is scattered across JSX. Media queries require embedded `<style>` tags. No single source of truth for spacing/sizing.
- Fix approach: Gradually migrate to Tailwind utility classes. Create a `styles/components.css` file for complex patterns that can't be expressed as utilities. Keep design tokens as CSS custom properties but reference them via Tailwind config instead of inline access.

**Hard-coded project limit in home page grid:**
- Issue: `src/components/sections/ProjectsGrid.tsx` line 13 hard-codes `.slice(0, 6)` to display only 6 projects on home page
- Files: `src/components/sections/ProjectsGrid.tsx` (line 13)
- Impact: Adding a 5th project to portfolio will silently drop it from home page display. No indication to content editor that limit exists.
- Fix approach: Add `perPage` prop to `ProjectsGrid` component with default of 6. Document the limit in CLAUDE.md. Or remove limit entirely and use CSS grid to auto-wrap.

**Hardcoded filter mapping without validation:**
- Issue: `filterMap` in `src/app/projects/page.tsx` (line 10) uses string keys but relies on runtime inclusion in `Project['type']` enum — no compile-time validation that all types are mapped
- Files: `src/app/projects/page.tsx` (lines 10-14)
- Impact: If new project type added to `Project` interface but not mapped in `filterMap`, filter will silently fail for that type.
- Fix approach: Generate `filterMap` from `Project` type definition using `satisfies` constraint or create a type guard.

## Known Bugs

**Image fallback colors may not match actual image darkness:**
- Symptoms: On project detail pages, `coverColor` appears as background while image loads. If image takes >3s to load, user sees wrong color context.
- Files: `src/app/projects/[slug]/page.tsx` (line 35), `src/lib/projects.ts` (coverColor field)
- Trigger: Slow 3G network or large image files
- Workaround: Colors set to neutral grays (`#ddd8ce`, `#d4d0c8`, etc.) so mismatch is subtle

**Modal menu keyboard navigation incomplete:**
- Symptoms: Escape key closes mobile menu but no keyboard trap — Tab can escape menu and focus background elements
- Files: `src/components/layout/Navigation.tsx` (lines 52-57)
- Trigger: Open mobile menu, press Tab multiple times
- Workaround: None; accessibility issue

**Next project link wraps unexpectedly on narrow screens:**
- Symptoms: "Next Project" section link (title + location) wraps poorly below ~560px viewport width
- Files: `src/app/projects/[slug]/page.tsx` (lines 127-158)
- Trigger: Mobile landscape or small tablet
- Workaround: Manually resize viewport to portrait mode

## Security Considerations

**Content Security Policy not configured:**
- Risk: No CSP headers restrict script sources. Could allow malicious script injection if site is compromised or CDN is attacked.
- Files: `next.config.js`, `src/app/layout.tsx` (no headers configured)
- Current mitigation: None — relies on framework defaults and Next.js built-in protections
- Recommendations: Add CSP headers to `next.config.js` via `headers()` function. Restrict `script-src` to `self` and trusted analytics providers.

**Image URLs not validated before rendering:**
- Risk: `project.coverImage` and `project.images[]` paths come from `src/lib/projects.ts` without URL validation. Typos or malformed paths won't be caught until runtime.
- Files: `src/lib/projects.ts` (lines 37-40, 59-63, etc.), `src/app/projects/[slug]/page.tsx` (lines 40-46, 114-120)
- Current mitigation: Static file list in projects.ts reduces risk vs. user-uploaded content
- Recommendations: Add a validation schema (e.g., Zod) to `Project` interface to ensure all image paths start with `/images/` and match allowed pattern.

**No input sanitization on dynamic route slugs:**
- Risk: `[slug]` parameter in `src/app/projects/[slug]/page.tsx` is used directly in URL — if slug ever becomes user-controlled, XSS risk
- Files: `src/app/projects/[slug]/page.tsx` (lines 15-18)
- Current mitigation: Slugs are defined in static `projects.ts` array, not user input
- Recommendations: Add `notFound()` check (already present, good); validate slug matches `Project['id']` format before using in URLs.

## Performance Bottlenecks

**Unoptimized image dimensions:**
- Problem: Images in project detail gallery (3-column grid) use `sizes="33vw"` but actual rendered size varies with padding. Image served at larger resolution than needed on mobile.
- Files: `src/app/projects/[slug]/page.tsx` (line 118)
- Cause: Padding changes responsive breakpoints but `sizes` calculation doesn't account for it
- Improvement path: Calculate responsive width accounting for padding: `sizes="(max-width: 768px) calc(100vw - 48px), calc((100vw - 96px) / 3)"`

**Framer Motion animations on hero sections not optimized:**
- Problem: Initial load animates entire hero section (`opacity: 0, y: 20` → `1, 0`) with 0.8s duration on every page. Cumulative across multiple sections per page.
- Files: `src/app/projects/[slug]/page.tsx` (lines 56-59), `src/app/projects/page.tsx` (lines 40-46), multiple section components
- Cause: No request animation frame batching or GPU acceleration hints
- Improvement path: Use `will-change: opacity, transform` in CSS. Reduce animation duration to 0.5s. Add `transform: translateZ(0)` for GPU acceleration.

**Module-level singleton state in Navigation:**
- Problem: `navigationHasMounted` flag persists across route changes, requiring careful state management. On rapid navigation or browser back/forward, animation state may be inconsistent.
- Files: `src/components/layout/Navigation.tsx` (lines 16-17, 27-31)
- Cause: Non-React global variable used as hack to prevent animation on route change
- Improvement path: Use React Context or `sessionStorage` to track mount state, or simply remove the animation skip and accept brief flash on each page.

**No image lazy loading on below-fold content:**
- Problem: `<Image>` components on detail pages load all gallery images eagerly (3+ images @ 300KB+ each)
- Files: `src/app/projects/[slug]/page.tsx` (lines 114-120)
- Cause: No `loading="lazy"` prop or Intersection Observer
- Improvement path: Add `loading="lazy"` to gallery images below hero. Consider implementing virtual scrolling if gallery becomes >12 images.

## Fragile Areas

**ProjectsGrid hard-coded slice impacts home page:**
- Files: `src/components/sections/ProjectsGrid.tsx` (line 13)
- Why fragile: Changes to projects array or feature flags will silently break pagination. Adding 5th project cuts off visibility without warning.
- Safe modification: Extract slice limit to prop with default. Add comment explaining why limit exists.
- Test coverage: No tests — impossible to detect this breaks without manual page inspection

**Filter mapping requires manual sync:**
- Files: `src/app/projects/page.tsx` (lines 10-14, 18-20)
- Why fragile: `filterMap` keys must exactly match UI button labels and `Project['type']` enum values. No TypeScript validation of consistency.
- Safe modification: Use `as const` assertions and keyof checks. Create a test that validates all `Project['type']` values exist in `filterMap`.
- Test coverage: No tests

**CSS custom properties defined in two places:**
- Files: `src/styles/globals.css` (lines 7-27), implicitly in component inline styles (opacity values, colors like `#1a1916`, `#f4f1ea`)
- Why fragile: Design token values scattered across multiple files. Changing `--ink` color requires grep + replace, and some hard-coded versions will be missed.
- Safe modification: Create `src/styles/tokens.css` as single source of truth. Import into globals.css. Use CSS custom properties exclusively — ban hard-coded hex values in linter.
- Test coverage: Visual regression tests only; no unit tests

**InsleyGrid SVG uses hard-coded viewBox:**
- Files: `src/components/ui/InsleyGrid.tsx` (line 25, viewBox="0 0 1400 800")
- Why fragile: SVG coordinates are locked to specific viewport ratio. On ultra-wide (>2000px) or portrait (>1:1 aspect ratio) displays, grid distorts.
- Safe modification: Use `preserveAspectRatio="xMidYMid slice"` (already set, good). Test on 21:9 ultrawide and 9:16 portrait to verify no distortion.
- Test coverage: Manual visual inspection only

## Scaling Limits

**Project array scales linearly with home page render:**
- Current capacity: 4 projects fit in slice(0, 6) — works fine now
- Limit: Adding 10+ projects will make portfolio page slow with grid layout doing layout thrashing on 30+ cards
- Scaling path: Implement pagination (`page=1&limit=12` in URL) or infinite scroll with react-window virtualization

**No pagination on projects page:**
- Current capacity: All projects display in single grid
- Limit: Adding 20+ projects will cause:
  - DOM with 60+ image elements (20 projects × 3 images)
  - Main thread blocked during scroll layout calculations
  - Memory usage grows linearly with project count
- Scaling path: Split projects page into paginated view (12 per page). Use `<Image>` `priority={false}` on non-first-page items.

**CSS grid media queries not responsive below 600px:**
- Current capacity: Grid works acceptably down to 768px breakpoint
- Limit: Below 600px, padding `24px` + 3-column grid = oversquished cards (< 85px width)
- Scaling path: Add additional media query for `max-width: 480px` that switches to single-column layout. Update `sizes` prop to account for mobile padding.

## Dependencies at Risk

**Next.js v16.1.6 — recent major version:**
- Risk: Next.js 16 is a recent major release (released late 2024). May contain unpatched security issues or breaking changes in minor updates. App Router still evolving.
- Impact: If bug is discovered in v16, upgrade to v16.x requires testing all client components due to React 18 bundling changes.
- Migration plan: Pin to `^16.1.0` rather than latest. Monitor security advisories weekly. Test before upgrading minor versions.

**Framer Motion v11.3.8 — no version constraint:**
- Risk: Package.json allows `^11.3.8` which accepts v12+. Major version changes often introduce breaking animation API changes.
- Impact: `npm update` could break all animations if Framer Motion v12 changes `useInView` or `motion.div` behavior.
- Migration plan: Change to `~11.3.8` to lock minor version. Add `engines: { "node": "18+" }` constraint.

**No automated dependency auditing:**
- Risk: Security vulnerabilities in React, Next, or Tailwind won't be detected until manual `npm audit` run
- Impact: Could deploy vulnerable code unknowingly
- Migration plan: Add `dependabot` or `renovate` to repo for weekly security update PRs

## Missing Critical Features

**No 404 error tracking:**
- Problem: `src/app/not-found.tsx` renders but has no analytics or logging. If project slug becomes invalid, no notification to site owner.
- Blocks: Can't detect broken links or malformed URLs in the wild
- Fix: Add event tracking (GA4 event or server log) when `notFound()` is called

**No image optimization for older browsers:**
- Problem: `src/app/projects/[slug]/page.tsx` uses `objectFit: 'cover'` which requires CSS Grid support
- Blocks: Older Safari versions (<14) will display images stretched instead of cropped
- Fix: Add `-webkit-background-size: cover` fallback or use `<picture>` element

**No analytics or page view tracking:**
- Problem: No Google Analytics, Plausible, or custom tracking implemented
- Blocks: Can't measure which projects users visit, time on page, bounce rate
- Fix: Add `next-plausible` package and `<Script>` tag in layout.tsx

**No server-side rendering option for social sharing:**
- Problem: All pages are client-rendered (`'use client'`). Open Graph metadata set but actual page content not pre-rendered
- Blocks: Social media link previews will show generic title/description, not project-specific details
- Fix: Move `getProjectById()` call to server component, or generate static metadata via `generateMetadata()` export

## Test Coverage Gaps

**No tests for project filtering logic:**
- What's not tested: Filter button clicks, `filterMap` validation, edge case where filter returns 0 projects
- Files: `src/app/projects/page.tsx` (lines 22-32)
- Risk: Could deploy broken filter without knowing. Regression in filter logic won't be caught.
- Priority: High — filtering is critical user interaction

**No tests for dynamic route resolution:**
- What's not tested: `getProjectById()` returning undefined, `notFound()` behavior, slug validation
- Files: `src/lib/projects.ts`, `src/app/projects/[slug]/page.tsx` (lines 18-19)
- Risk: Adding new project with duplicate ID will silently fail. Broken links undetected.
- Priority: High — routing is critical infrastructure

**No responsive layout tests:**
- What's not tested: Media query breakpoints (768px, 600px) actually trigger at correct widths, grid layouts don't break, padding adjustments apply correctly
- Files: Embedded `<style>` tags in all page components
- Risk: Mobile experience regression. CSS media queries untested.
- Priority: Medium — caught by manual testing but should be automated

**No navigation accessibility tests:**
- What's not tested: Keyboard navigation (Tab, Escape, Enter), screen reader announcements, focus management in mobile menu
- Files: `src/components/layout/Navigation.tsx`
- Risk: Keyboard-only users or screen reader users encounter broken navigation. WCAG compliance issue.
- Priority: Medium-High — accessibility is legal/ethical requirement

**No image loading error handling tests:**
- What's not tested: Behavior when `coverImage` or gallery images fail to load (404, timeout)
- Files: `src/app/projects/[slug]/page.tsx` (lines 40-46, 114-120)
- Risk: Blank images on broken CDN or slow network. User sees no fallback.
- Priority: Low-Medium — edge case but impacts user experience

---

*Concerns audit: 2026-03-13*
