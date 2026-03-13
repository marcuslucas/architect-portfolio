# Phase 3: Homepage & Navigation Redesign — Design Spec

**Project:** Dustin Brady Architecture Portfolio
**Date:** 2026-03-13
**Reference:** woodcliffe.ca
**Status:** Approved

---

## Overview

Full rebuild of the homepage layout, navigation, footer, and `/projects` page. The reference aesthetic is Woodcliffe — full-bleed photography, typography-first, asymmetric grid, extreme restraint. Implementation order: **shared infrastructure first** (Navigation → Footer), then homepage sections (Hero → Tagline → ProjectGrid → PhilosophyBand), then assemble `page.tsx`, then `/projects` page.

**Brand name throughout:** "Dustin Brady Architecture" — never "Voss Architecture" or "Brady Architecture" alone.

**Design constraints (all from MASTER.md):**
- Cormorant Garamond weight 300 only — all new components use `'use client'` at the top
- Palette: `var(--ink)` `#18181B`, `var(--vellum)` `#f4f1ea`, `var(--stone)` `#c8c4b8`, `var(--warm)` `#FAFAFA`
- No blue anywhere — not `#2563EB`, not any variant
- `border-radius: 0` on all elements — **do NOT use `btn-primary` from globals.css; it has `border-radius: 8px` and violates this constraint. Use `btn-outline` exclusively throughout Phase 3.**
- No box-shadow on cards
- No `transform: scale` on hover — opacity transitions only
- Borders: always `0.5px` hairline
- `prefers-reduced-motion`: all Framer Motion animations check `useReducedMotion()` and skip
- `cursor: pointer` on all clickable elements
- No horizontal scroll at any breakpoint

---

## Phase 2 Overrides

Phase 3 intentionally overrides two Phase 2 Navigation decisions. Developers implementing Phase 3 on top of a completed Phase 2 must apply these changes:

| Decision | Phase 2 Value | Phase 3 Value |
|----------|--------------|---------------|
| Nav vertical padding at rest | `24px` | `28px` |
| Nav vertical padding scrolled | `14px` | `16px` |
| Nav horizontal padding | `48px` | `56px` |
| Nav background | Transparent at rest, `rgba(250,248,244,0.92)` after 40px scroll | Always `rgba(250,248,244,0.92)` — no transparent state |
| Nav glassmorphism trigger | `scrollY > 40` boolean | Removed — always on |

The Phase 2 `scrolled` boolean state (for background) is **removed entirely** in Phase 3. Padding shrink at 80px is kept.

Additionally, Phase 2's InsleyGrid breathing animation (`variant="hero"`) becomes a visual no-op after Phase 3 ships — `HeroSection` no longer uses `InsleyGrid`. The animation code in `InsleyGrid.tsx` is not removed (it may be used in the future), but it will have no visible effect.

---

## Files Modified

| File | Change |
|------|--------|
| `src/components/layout/Navigation.tsx` | Full rebuild |
| `src/components/layout/Footer.tsx` | Full rebuild |
| `src/components/sections/HeroSection.tsx` | Full rebuild |
| `src/components/sections/TaglineSection.tsx` | New component |
| `src/components/sections/ProjectGrid.tsx` | New component (asymmetric grid) |
| `src/components/sections/PhilosophyBand.tsx` | Full rebuild |
| `src/app/page.tsx` | Full rebuild — 5 sections |
| `src/app/projects/page.tsx` | Full rebuild — asymmetric grid + filters |

**Do NOT modify:**
- `src/lib/projects.ts`
- `src/styles/globals.css`
- `src/components/ui/InsleyGrid.tsx`
- `src/app/projects/[slug]/page.tsx`
- Any other page (studio, process, journal, contact)

**Components removed from homepage** (not deleted — verify they are only used in `page.tsx` before leaving in place; currently they are only imported in `page.tsx`):
- `FeaturedProject.tsx`
- `ProjectsGrid.tsx`
- `ProcessSection.tsx`

---

## 1. Navigation

### File
`src/components/layout/Navigation.tsx` — full rebuild.

### Layout
```
[Dustin Brady Architecture]          [Portfolio] [Philosophy] [Studio] [Journal] [Contact]
top-left                             top-right, 5 items
```

### Route Map
| Label | Route |
|-------|-------|
| Portfolio | `/projects` |
| Philosophy | `/process` |
| Studio | `/studio` |
| Journal | `/journal` |
| Contact | `/contact` |

### Brand Logo
- Text: "Dustin Brady Architecture"
- 13px, Cormorant weight 300, letter-spacing 0.18em, uppercase
- `color: var(--ink)`, links to `/`

### Desktop Nav Links
- 11px, Cormorant weight 300, letter-spacing 0.2em, uppercase
- Opacity 0.55 at rest → 1 on hover, `transition: opacity 200ms`
- Active page: opacity 1, `borderBottom: '0.5px solid var(--stone)'`, `paddingBottom: '2px'`
- Active detection: `pathname.startsWith(link.href)` — ensures Portfolio highlights on `/projects/house-01` slug pages too

### Fixed Nav Chrome
- `position: fixed`, `top: 0`, `left: 0`, `right: 0`, `zIndex: 50`
- Background: `rgba(250,248,244,0.92)` with `backdropFilter: 'blur(16px)'` — **always on, not scroll-triggered** (Phase 2 override — transparent-at-rest behavior removed)
- `borderBottom: '0.5px solid rgba(26,25,22,0.08)'` — always on
- Mobile: `paddingLeft/Right: '24px'`

### Scroll-Linked Padding Shrink
**Phase 2 override:** Resting padding changes from 24px → 28px; scrolled padding from 14px → 16px; horizontal padding from 48px → 56px.

`useScroll` + `useTransform` drives `paddingTop`/`paddingBottom`:

```tsx
const { scrollY } = useScroll()
const reducedMotion = useReducedMotion()
const paddingYMotion = useTransform(scrollY, [0, 80], [28, 16])

// Reduced motion fallback: snap at 80px threshold (consistent with transform range)
const [scrolled80, setScrolled80] = useState(false)
useEffect(() => {
  const unsub = scrollY.on('change', (v) => setScrolled80(v > 80))
  return unsub
}, [scrollY])

const paddingY = reducedMotion ? (scrolled80 ? 16 : 28) : paddingYMotion
```

The `motion.nav` uses — **`padding` shorthand must NOT be used; it overrides MotionValue-driven properties:**
```tsx
style={{
  paddingTop: paddingY,
  paddingBottom: paddingY,
  paddingLeft: '56px',
  paddingRight: '56px',
}}
```

### Nav Re-animation Fix (replaces Phase 2 hasMounted approach)

Phase 2 specified a `useRef` hasMounted pattern. That pattern does not survive `PageTransitionProvider`'s pathname-keyed unmount/remount cycle — `hasMounted.current` resets to `false` on every remount, so the nav re-animates on every route change.

**Correct fix:** Use a module-level singleton that persists across remounts within the same browser session:

```tsx
// Module-level — outside the component, in Navigation.tsx
let navigationHasMounted = false

export default function Navigation() {
  const [skipInitial] = useState(() => {
    const skip = navigationHasMounted
    if (typeof window !== 'undefined') navigationHasMounted = true
    return skip
  })

  // On motion.nav:
  // initial={skipInitial ? false : { y: -20, opacity: 0 }}
  // animate={{ y: 0, opacity: 1 }}
  // transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
}
```

`useState` initializer runs once per mount. On the very first mount in the session, `skip` is `false` (animate in). On all subsequent mounts from route changes, `skip` is `true` (`initial={false}` skips the animation). SSR-safe: `typeof window !== 'undefined'` guard prevents setting the flag during server render.

### Mobile Hamburger
- Three lines: 20px wide, `0.5px` height, `var(--ink)`, spaced 5px apart
- CSS transform animation on open: top line `translateY(7.5px) rotate(45deg)`, middle `opacity: 0`, bottom `translateY(-7.5px) rotate(-45deg)`
- `display: none` on desktop via `.show-mobile` media query class

### Mobile Overlay Menu
- `AnimatePresence` fade 300ms, `background: var(--warm)`, full screen, `zIndex: 100`
- Nav items stacked vertically centered, 32px font size, Cormorant weight 300, `opacity: 0.5` at rest, `1` for active route
- Closes on link tap (via `useEffect` watching `pathname`) or hamburger/X tap
- Body scroll lock: `document.body.style.overflow = menuOpen ? 'hidden' : ''`, cleaned up in return
- Bottom annotation: "Miami · Naples · Palm Beach" — 11px, letter-spacing 0.18em, uppercase, opacity 0.3

---

## 2. Footer

### File
`src/components/layout/Footer.tsx` — full rebuild.

### Layout (Desktop — 3 columns)
```
Col 1: Brand          Col 2: Nav links (two sub-cols)    Col 3: Contact info
DUSTIN BRADY          Portfolio    Studio                  info@bradyarchitecture.com
ARCHITECTURE          Philosophy   Journal                 Miami, Florida
                      Contact
```

Note: "Contact" in Column 2 is a nav link to `/contact`. Column 3 contains the studio email address — these are different things and both are intentional.

### Bottom Bar
```
© 2026 Dustin Brady Architecture    "to contain spatial situations..."    Privacy
```

### Column 1 — Brand
- "DUSTIN BRADY" line 1, "ARCHITECTURE" line 2
- 18px, Cormorant weight 300, letter-spacing 0.12em, uppercase, `var(--ink)`

### Column 2 — Nav Links
- Two sub-columns within column 2: `[Portfolio, Philosophy, Contact]` left / `[Studio, Journal]` right
- Implemented as a nested 2-column grid inside column 2: `gridTemplateColumns: '1fr 1fr'`
- 11px, letter-spacing 0.2em, uppercase, `var(--ink)`
- Opacity 0.5 at rest → 1 on hover, 200ms
- Hover via CSS `:hover` in `<style>` block (not inline `onMouseEnter` — avoids TypeScript event handler complexity)

### Column 3 — Contact
- `info@bradyarchitecture.com` — `<a href="mailto:...">`, weight 300, 13px, not uppercase, opacity 0.5 → 1 on hover
- "Miami, Florida" — same style, margin-top 8px

### Bottom Bar
- Top border: `0.5px solid rgba(26,25,22,0.08)`
- `display: flex`, `justifyContent: 'space-between'`, `alignItems: 'center'`, `flexWrap: 'wrap'`, `gap: '12px'`
- All text: 10px, letter-spacing 0.18em, opacity 0.4, `var(--ink)`
- Left: `© {new Date().getFullYear()} Dustin Brady Architecture`
- Center: `"to contain spatial situations sympathetic to the horizon line."` — italic
- Right: `Privacy` (plain text, no link — placeholder)

### Chrome
- Background: `var(--warm)`
- Top border: `0.5px solid rgba(26,25,22,0.08)`
- Padding: `72px 56px 40px` desktop, `48px 24px 32px` mobile
- Grid: `gridTemplateColumns: '1.2fr 1fr 1fr'` desktop → `gridTemplateColumns: '1fr'` mobile

---

## 3. Hero Section

### File
`src/components/sections/HeroSection.tsx` — full rebuild. No InsleyGrid. No glass panel. No coordinate annotations. No CTA buttons.

### Structure
```
[full-bleed image: /images/projects/house-01/01.JPG]
[gradient overlay: darkens bottom 50%, nothing at top]

  DUSTIN BRADY         ← bottom-left, 56px from edges
  ARCHITECTURE

  Contemporary Architecture · Florida

        SCROLL         ← bottom-center, rotated, fades on scroll
```

### Image
```tsx
<Image
  src="/images/projects/house-01/01.JPG"
  alt="Dustin Brady Architecture"
  fill
  style={{ objectFit: 'cover', objectPosition: 'center' }}
  priority
/>
```
Note: `objectFit` and `objectPosition` are applied via `style` prop — NOT as direct `<Image>` props (those are invalid in Next.js 14+).

### Gradient Overlay
```tsx
<div style={{
  position: 'absolute', inset: 0, zIndex: 1,
  background: 'linear-gradient(to top, rgba(26,25,22,0.55) 0%, rgba(26,25,22,0.0) 50%)',
}} />
```

### Firm Name (bottom-left)
```tsx
<div style={{ position: 'absolute', bottom: '56px', left: '56px', zIndex: 2 }}>
  <motion.span style={{ display: 'block', ... }}>DUSTIN BRADY</motion.span>
  <motion.span style={{ display: 'block', ... }}>ARCHITECTURE</motion.span>
  <motion.span style={{ display: 'block', marginTop: '16px', ... }}>
    Contemporary Architecture · Florida
  </motion.span>
</div>
```

Typography:
- "DUSTIN BRADY" / "ARCHITECTURE": `clamp(72px, 10vw, 160px)`, Cormorant weight 300, `var(--vellum)`, line-height 0.9, letter-spacing -0.02em
- Eyebrow: 10px, letter-spacing 0.28em, uppercase, `var(--vellum)`, opacity 0.6

### Entry Animations
`ease: [0.25, 0.46, 0.45, 0.94]` throughout. When `useReducedMotion()` is true: `initial={{ opacity: 1, y: 0 }}`, `duration: 0` on all three.

| Element | initial | delay | duration |
|---------|---------|-------|----------|
| "DUSTIN BRADY" | `{ opacity: 0, y: 30 }` | 0 | 0.8s |
| "ARCHITECTURE" | `{ opacity: 0, y: 30 }` | 0.1s | 0.8s |
| Eyebrow | `{ opacity: 0, y: 30 }` | 0.2s | 0.8s |

### Scroll Indicator (bottom-center)
```tsx
const { scrollY } = useScroll()
const reducedMotion = useReducedMotion()
const scrollOpacity = useTransform(scrollY, [0, 100], [1, 0])

<motion.div
  style={{
    position: 'absolute', bottom: '40px', left: '50%',
    transform: 'translateX(-50%)', zIndex: 2,
    // When reducedMotion: plain opacity number. When not: MotionValue.
    opacity: reducedMotion ? 0.4 : scrollOpacity,
  }}
>
  <span style={{ writingMode: 'vertical-rl', /* 9px, letter-spacing 0.3em, uppercase, vellum */ }}>
    SCROLL
  </span>
</motion.div>
```

When `reducedMotion` is true: `opacity: 0.4` (plain number, no MotionValue). When false: `opacity: scrollOpacity` (MotionValue from `useTransform`). Both are valid in Framer Motion's `style` prop.

Hidden on mobile via `@media (max-width: 768px) { .scroll-indicator { display: none } }`.

### Section Chrome
- `height: '100vh'`, `minHeight: '640px'`, `overflow: 'hidden'`, `position: 'relative'`
- Mobile: `bottom`/`left` on firm name reduces from `56px` to `24px`

---

## 4. Tagline Section

### File
`src/components/sections/TaglineSection.tsx` — new file. Must include `'use client'` at top.

### Layout
```
[left 50%]                  [right 50% — empty breathing room]

Space
as intention.

——  About the Studio
```

### useInView Wiring Pattern
All sections using `useInView` follow this pattern:
```tsx
const ref = useRef<HTMLDivElement>(null)
const inView = useInView(ref, { once: true, margin: '-80px' })
const reducedMotion = useReducedMotion()

return (
  <section ref={ref}>
    <motion.div
      initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* content */}
    </motion.div>
  </section>
)
```
The outer element (`<section>`) holds the `ref`. The inner `motion.div` wraps all animated content. This pattern applies to TaglineSection, PhilosophyBand, and ProjectGrid.

### Left Column Content
**Tagline:**
- `clamp(36px, 5vw, 72px)`, Cormorant weight 300, italic, `var(--ink)`, line-height 1.1
- "Space" as `<span style={{ display: 'block' }}>`
- "as intention." as `<span style={{ display: 'block' }}>`

**About link (40px margin-top below tagline):**
- `className="btn-outline"` — inherits globals.css styles
- Text: "About the Studio", preceded by `.arrow-line` span
- `.arrow-line` width: 32px at rest → **56px** on hover (300ms) — matches globals.css `.btn-outline:hover .arrow-line { width: 56px }`
- Links to `/studio`

### Chrome
- Background: `var(--warm)`
- Padding: `120px 56px` desktop, `80px 24px` mobile
- Top border: `0.5px solid rgba(26,25,22,0.08)` full width
- Bottom border: same
- Grid: `display: 'grid'`, `gridTemplateColumns: '1fr 1fr'` desktop → `'1fr'` mobile
- Right column: empty `<div>` (breathing room, `display: none` on mobile)

---

## 5. Asymmetric Project Grid

### File
`src/components/sections/ProjectGrid.tsx` — new file. Must include `'use client'` at top. Reused on homepage and `/projects` page.

### Layout (4 projects — two identical asymmetric rows)
```
Row 1: [Project 1 — 55fr]  [Project 2 — 43fr]   gap: 3px   height: 62vh
Row 2: [Project 3 — 55fr]  [Project 4 — 43fr]   gap: 3px   height: 44vh
Row gap: 3px
```

### Props
```tsx
interface ProjectGridProps {
  projects: Project[]
  showViewAll?: boolean  // renders "All Projects →" link below grid
}
```

### Grid Implementation
```tsx
const rows = chunk(projects, 2)  // [[p1,p2],[p3,p4]]

return (
  <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
    {rows.map((row, rowIndex) => (
      <div
        key={rowIndex}
        style={{
          display: 'grid',
          gridTemplateColumns: row.length === 1 ? '1fr' : '55fr 43fr',
          gap: '3px',
        }}
      >
        {row.map((project, colIndex) => {
          const cardIndex = rowIndex * 2 + colIndex
          const height = rowIndex === 0 ? '62vh' : '44vh'
          return <ProjectCard key={project.id} project={project} height={height} cardIndex={cardIndex} inView={inView} reducedMotion={reducedMotion} />
        })}
      </div>
    ))}
  </div>
)
```

### useInView Wiring
Apply the standard pattern from §4: `ref` on the outer grid `div`, `inView` used for card animations.

### ProjectCard (internal component)
```tsx
function ProjectCard({ project, height, cardIndex, inView, reducedMotion }) {
  const [hovered, setHovered] = useState(false)
  const [tapped, setTapped] = useState(false)  // mobile only

  return (
    <motion.div
      initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : cardIndex * 0.1 }}
      style={{ position: 'relative', height, overflow: 'hidden', cursor: 'pointer' }}
    >
      <Link href={`/projects/${project.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 55vw"
        />
        <motion.div
          animate={{ opacity: hovered || tapped ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,22,0.72)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '12px', pointerEvents: 'none' }}
        >
          {/* project name — 28px italic vellum */}
          {/* type/status eyebrow — 10px uppercase vellum opacity 0.7 */}
          {/* "View Project" btn-outline inverted */}
        </motion.div>
      </Link>
    </motion.div>
  )
}
```

**Desktop hover:** `onMouseEnter={() => setHovered(true)}` / `onMouseLeave={() => setHovered(false)}` on the outer `motion.div`.

**Mobile tap (under 768px):**
- First tap: `setTapped(true)` — shows overlay, prevents navigation (via `e.preventDefault()` on the Link's onClick if `!tapped`)
- Second tap: allows navigation to proceed normally
- Tapping a different card: each card's `tapped` state is local — no cross-card coordination needed. Only one card can be tapped at a time from the user's perspective, but if a user taps two cards in sequence, both overlays show. This is acceptable — the tap target is clear.
- Implemented by wrapping `<Link>` with `onClick`: if `!tapped` → `e.preventDefault(); setTapped(true)`. If `tapped` → let default navigate.

### Overlay Type/Status Display
```tsx
const typeMap: Record<string, string> = {
  Residence: 'Residential',
  Condominium: 'Residential',
  Development: 'Development',
  Commercial: 'Commercial',
}
const statusMap: Record<string, string> = {
  Built: 'Completed',
  'Under Construction': 'Under Construction',
  'Design Development': 'Design Development',
  Concept: 'Concept',
}
// Overlay eyebrow: `${typeMap[project.type]} · ${statusMap[project.status]}`
```

### Zero Results State
When `projects` prop is empty (e.g. a filter returns no matches):
```tsx
{projects.length === 0 && (
  <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: 'var(--font-cormorant)',
    fontWeight: 300, fontSize: '14px', color: 'var(--ink)', opacity: 0.4 }}>
    No projects in this category
  </div>
)}
```

### Below Grid
When `showViewAll` is true:
```tsx
<div style={{ textAlign: 'center', marginTop: '48px' }}>
  <Link href="/projects" className="btn-outline" style={{ display: 'inline-flex' }}>
    <span className="arrow-line" />
    <span>All Projects</span>
  </Link>
</div>
```

### Mobile
```tsx
// In <style> block:
@media (max-width: 768px) {
  .project-grid-row { grid-template-columns: 1fr !important; }
  .project-card { height: 56vw !important; }
}
```

---

## 6. Philosophy Band

### File
`src/components/sections/PhilosophyBand.tsx` — full rebuild. Must include `'use client'` at top.

### Layout
```
[dark background — var(--ink)]
[InsleyGrid dark variant — absolute behind text, opacity 0.6]

——  Philosophy

"to contain spatial situations
 sympathetic to the horizon line."

— Will Insley, ONECITY Diaries

[ Read our Philosophy  →  ]
```

### useInView Wiring
Apply standard pattern from §4: `ref` on `<section>`, `motion.div` wraps all content.

### Chrome
- Background: `var(--ink)`
- Padding: `120px 56px` desktop, `80px 24px` mobile
- `InsleyGrid`: `variant="dark"`, wrapped in `<div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6, pointerEvents: 'none' }}>`
- All text content: `position: 'relative'`, `zIndex: 2`

### Typography
**Label:**
```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px',
  fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px',
  letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--vellum)', opacity: 0.4 }}>
  <span>——</span>
  <span>Philosophy</span>
</div>
```

**Quote:** `"to contain spatial situations sympathetic to the horizon line."`
- `clamp(28px, 4vw, 52px)`, Cormorant weight 300, italic, `var(--vellum)`, line-height 1.3, `maxWidth: '760px'`

**Attribution:** `— Will Insley, ONECITY Diaries`
- 11px, letter-spacing 0.2em, uppercase, `var(--vellum)`, opacity 0.4, margin-top 32px

**CTA:** btn-outline inverted (vellum color):
```tsx
<Link
  href="/process"
  className="btn-outline"
  style={{ marginTop: '48px', display: 'inline-flex', color: 'var(--vellum)' }}
>
  <span className="arrow-line" style={{ background: 'var(--vellum)' }} />
  <span>Read our Philosophy</span>
</Link>
```

---

## 7. Homepage Assembly

### File
`src/app/page.tsx` — full rebuild. This is a server component (no `'use client'`).

```tsx
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import TaglineSection from '@/components/sections/TaglineSection'
import ProjectGrid from '@/components/sections/ProjectGrid'
import PhilosophyBand from '@/components/sections/PhilosophyBand'
import { projects } from '@/lib/projects'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <TaglineSection />
        <ProjectGrid projects={projects} showViewAll />
        <PhilosophyBand />
      </main>
      <Footer />
    </>
  )
}
```

**Removed from homepage** (not deleted — currently only used in `page.tsx`, safe to leave files in place):
- `FeaturedProject.tsx`
- `ProjectsGrid.tsx`
- `ProcessSection.tsx`

---

## 8. /projects Page

### File
`src/app/projects/page.tsx` — full rebuild. Must include `'use client'` at top (uses `useState` for filters).

### Page Header
- Padding: `180px 56px 64px` desktop (accommodates fixed nav), `140px 24px 56px` mobile
- "Portfolio" — `clamp(48px, 7vw, 96px)`, Cormorant weight 300, left-aligned, `var(--ink)`
- Entry: `motion.h1`, `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `duration: 0.8`
- `useReducedMotion()`: `initial={{ opacity: 1, y: 0 }}`, `duration: 0`

### Filter Bar
- Padding: `0 56px 48px` desktop, `0 24px 40px` mobile
- Bottom border: `0.5px solid rgba(26,25,22,0.08)`
- `display: flex`, `gap: '32px'`, `flexWrap: 'wrap'`
- Filter bar scrolls horizontally on mobile if needed: `overflowX: 'auto'`, `-webkit-overflow-scrolling: touch`

**Filter categories and data mapping:**
```tsx
const filterMap: Record<string, string[]> = {
  Residential: ['Residence', 'Condominium'],
  Development: ['Development'],
  Commercial: ['Commercial'],
}

// Dynamically show only filters with ≥1 match:
const visibleFilters = ['All', ...Object.keys(filterMap).filter(
  key => projects.some(p => filterMap[key].includes(p.type))
)]
// With current 4 projects: ['All', 'Residential', 'Development']
// 'Commercial' hidden — 0 matches
```

**Active filter style:** `opacity: 1`, `borderBottom: '0.5px solid var(--ink)'`, `paddingBottom: '2px'`
**Inactive filter style:** `opacity: 0.35`, no border
**Transition:** `opacity 200ms`
**State:** `const [activeFilter, setActiveFilter] = useState('All')`

### Filtered Grid
```tsx
const filtered = activeFilter === 'All'
  ? projects
  : projects.filter(p => filterMap[activeFilter]?.includes(p.type) ?? false)

// Pass to grid:
<ProjectGrid projects={filtered} showViewAll={false} />
```

**Edge cases (handled by ProjectGrid internally):**
- 0 results: "No projects in this category" message
- 1 project: single full-width card, `62vh`
- 2 projects: one row, `55fr 43fr`, `62vh`
- 3 projects: row 1 `55fr 43fr` `62vh`, row 2 single full-width `44vh`
- 4 projects: two rows `55fr 43fr`, `62vh` / `44vh`

---

## Implementation Order (Confirmed)

1. `Navigation.tsx` — shared, affects all pages
2. `Footer.tsx` — shared, affects all pages
3. `HeroSection.tsx`
4. `TaglineSection.tsx` — new
5. `ProjectGrid.tsx` — new, reused in steps 7 and 8
6. `PhilosophyBand.tsx`
7. `page.tsx` — assemble
8. `src/app/projects/page.tsx` — filters + reuse ProjectGrid
