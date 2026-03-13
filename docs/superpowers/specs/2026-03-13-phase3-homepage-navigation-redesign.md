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
- Cormorant Garamond weight 300 only
- Palette: `var(--ink)` `#18181B`, `var(--vellum)` `#f4f1ea`, `var(--stone)` `#c8c4b8`, `var(--warm)` `#FAFAFA`
- No blue anywhere — not `#2563EB`, not any variant
- `border-radius: 0` on all elements
- No box-shadow on cards
- No `transform: scale` on hover — opacity transitions only
- Borders: always `0.5px` hairline
- `prefers-reduced-motion`: all Framer Motion animations check `useReducedMotion()` and skip
- `cursor: pointer` on all clickable elements
- No horizontal scroll at any breakpoint

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

**Components removed from homepage** (no longer used in `page.tsx`):
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
- `padding: '28px 56px'` at rest
- Background: `rgba(250,248,244,0.92)` with `backdropFilter: 'blur(16px)'` — always on (not scroll-triggered)
- `borderBottom: '0.5px solid rgba(26,25,22,0.08)'` — always on
- Mobile: `padding: '20px 24px'`

### Scroll-Linked Padding Shrink
`useScroll` + `useTransform` drives `paddingTop`/`paddingBottom`:

```tsx
const { scrollY } = useScroll()
const reducedMotion = useReducedMotion()
const paddingYMotion = useTransform(scrollY, [0, 80], [28, 16])

// Reduced motion fallback: snap at 80px threshold
const [scrolled80, setScrolled80] = useState(false)
useEffect(() => {
  const unsub = scrollY.on('change', (v) => setScrolled80(v > 80))
  return unsub
}, [scrollY])

const paddingY = reducedMotion ? (scrolled80 ? 16 : 28) : paddingYMotion
```

The `motion.nav` uses:
```tsx
style={{
  paddingTop: paddingY,
  paddingBottom: paddingY,
  paddingLeft: '56px',
  paddingRight: '56px',
}}
```

**Critical:** `padding` shorthand must NOT be used — it overrides MotionValue-driven `paddingTop`/`paddingBottom`. Always use the four individual properties.

### hasMounted Flicker Fix
Prevents nav re-animating on every route change (PageTransitionProvider from Phase 2):

```tsx
const hasMounted = useRef(false)
useEffect(() => { hasMounted.current = true }, [])

// On motion.nav:
initial={hasMounted.current ? false : { y: -20, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
```

### Mobile Hamburger
- Three lines: 20px wide, `0.5px` height, `var(--ink)`, spaced 5px
- CSS transform animation on open (top line rotates +45deg, middle fades, bottom rotates -45deg)
- `display: none` on desktop via `.show-mobile` class

### Mobile Overlay Menu
- `AnimatePresence` fade 300ms, `background: var(--warm)`
- Nav items stacked vertically centered, 32px font size, Cormorant weight 300
- Closes on link tap (via `useEffect` on `pathname`) or X tap
- Body scroll lock: `document.body.style.overflow = menuOpen ? 'hidden' : ''`
- Bottom annotation: "Miami · Naples · Palm Beach" — 11px, opacity 0.3

---

## 2. Footer

### File
`src/components/layout/Footer.tsx` — full rebuild.

### Layout (Desktop — 3 columns)
```
Col 1: Brand          Col 2: Nav links           Col 3: Contact
DUSTIN BRADY          Portfolio    Studio         info@vossarchitecture.com
ARCHITECTURE          Philosophy   Journal        Miami, Florida
                      Contact
```

### Bottom Bar
```
© 2026 Dustin Brady Architecture    "to contain spatial situations..."    Privacy
```

### Column 1 — Brand
- "DUSTIN BRADY" line 1, "ARCHITECTURE" line 2
- 18px, Cormorant weight 300, letter-spacing 0.12em, uppercase, `var(--ink)`

### Column 2 — Nav Links
- Two sub-columns: `[Portfolio, Philosophy, Contact]` / `[Studio, Journal]`
- 11px, letter-spacing 0.2em, uppercase
- Opacity 0.5 at rest → 1 on hover, 200ms
- Hover handled via CSS `:hover` in `<style>` block (not inline `onMouseEnter`)

### Column 3 — Contact
- `info@vossarchitecture.com` — weight 300, 13px, not uppercase, opacity 0.5 → 1 on hover
- "Miami, Florida" — same style, margin-top 8px

### Bottom Bar
- Top border: `0.5px solid rgba(26,25,22,0.08)`
- `display: flex`, `justifyContent: 'space-between'`, `flexWrap: 'wrap'`
- All text: 10px, letter-spacing 0.18em, opacity 0.4
- Left: `© {new Date().getFullYear()} Dustin Brady Architecture`
- Center: `"to contain spatial situations sympathetic to the horizon line."` — italic
- Right: `Privacy` (no link target — placeholder text)

### Chrome
- Background: `var(--warm)`
- Top border: `0.5px solid rgba(26,25,22,0.08)`
- Padding: `72px 56px 40px` desktop, `48px 24px 32px` mobile
- Grid: `gridTemplateColumns: '1.2fr 1fr 1fr'` desktop → single column mobile

---

## 3. Hero Section

### File
`src/components/sections/HeroSection.tsx` — full rebuild.

### Structure
```
[full-bleed image: house-01/01.JPG]
[gradient overlay: darkens bottom half]

                        DUSTIN BRADY       ← bottom-left, 56px from edges
                        ARCHITECTURE

                        Contemporary Architecture · Florida

[SCROLL]  ← bottom-center, rotated
```

### Image
- Next.js `<Image fill objectFit="cover" objectPosition="center" priority />`
- `src="/images/projects/house-01/01.JPG"`
- `alt="Dustin Brady Architecture"`
- `zIndex: 0`

### Gradient Overlay
```tsx
background: 'linear-gradient(to top, rgba(26,25,22,0.55) 0%, rgba(26,25,22,0.0) 50%)'
position: 'absolute', inset: 0, zIndex: 1
```

### Firm Name (bottom-left)
- `position: absolute`, `bottom: '56px'`, `left: '56px'`, `zIndex: 2`
- "DUSTIN BRADY" — `display: block`, `clamp(72px, 10vw, 160px)`, Cormorant weight 300, `var(--vellum)`, line-height 0.9, letter-spacing -0.02em
- "ARCHITECTURE" — same, second `<span>`
- Eyebrow below: "Contemporary Architecture · Florida" — 10px, letter-spacing 0.28em, uppercase, vellum, opacity 0.6, margin-top 16px

### Entry Animations
All use `ease: [0.25, 0.46, 0.45, 0.94]`. `useReducedMotion()` collapses all to `initial={{ opacity: 1, y: 0 }}`, `duration: 0`:
- "DUSTIN BRADY": `initial={{ opacity: 0, y: 30 }}`, `animate={{ opacity: 1, y: 0 }}`, `duration: 0.8`
- "ARCHITECTURE": same, `delay: 0.1`
- Eyebrow: same, `delay: 0.2`

### Scroll Indicator (bottom-center)
- `position: absolute`, `bottom: '40px'`, `left: '50%'`, `transform: 'translateX(-50%)'`
- "SCROLL" — 9px, letter-spacing 0.3em, uppercase, `var(--vellum)`, rotated 90deg, opacity 0.4
- Scroll fade: `useTransform(scrollY, [0, 100], [1, 0])` on the indicator's `motion.div`
- `useReducedMotion()`: skip the `useTransform` — indicator stays at opacity 0.4 always
- Hidden on mobile via media query

### Section Chrome
- `height: '100vh'`, `minHeight: '640px'`, `overflow: 'hidden'`, `position: 'relative'`
- No InsleyGrid. No glass panel. No coordinate annotations. No buttons.
- Mobile: firm name padding reduces to 24px

---

## 4. Tagline Section

### File
`src/components/sections/TaglineSection.tsx` — new file.

### Layout
```
[left 50%]                  [right 50% — empty]

Space
as intention.

——  About the Studio
```

### Left Column Content
**Tagline:**
- `clamp(36px, 5vw, 72px)`, Cormorant weight 300, italic, `var(--ink)`, line-height 1.1
- "Space" as `<span style={{ display: 'block' }}>`
- "as intention." as `<span style={{ display: 'block' }}>`

**About link (40px below tagline):**
- `btn-outline` class from globals.css
- Text: "About the Studio"
- `.arrow-line` span: starts 32px, extends to 48px on hover, 300ms
- Links to `/studio`
- `opacity: 0.55` at rest → 1 on hover

### Chrome
- Background: `var(--warm)`
- Padding: `120px 56px` desktop, `80px 24px` mobile
- Top border: `0.5px solid rgba(26,25,22,0.08)` — full width
- Bottom border: same
- Grid: `gridTemplateColumns: '1fr 1fr'` desktop. Right column: empty `<div>` (breathing room)
- Mobile: `gridTemplateColumns: '1fr'`, right column `display: none`

### Entry Animation
Whole section as one `motion.div`:
- `initial={{ opacity: 0, y: 20 }}`, `animate={inView ? { opacity: 1, y: 0 } : {}}`
- `useInView({ once: true, margin: '-80px' })`
- `duration: 0.8`, `ease: [0.25, 0.46, 0.45, 0.94]`
- `useReducedMotion()`: `initial={{ opacity: 1, y: 0 }}`, `duration: 0`

---

## 5. Asymmetric Project Grid

### File
`src/components/sections/ProjectGrid.tsx` — new file. Replaces `ProjectsGrid.tsx` on homepage.

### Layout (4 projects — Option C: two identical asymmetric rows)
```
Row 1: [Project 1 — 55fr]  [Project 2 — 43fr]   gap: 3px
Row 2: [Project 3 — 55fr]  [Project 4 — 43fr]   gap: 3px
Row gap: 3px
```

Row 1 card height: `62vh`. Row 2 card height: `44vh`.

### Props
```tsx
interface ProjectGridProps {
  projects: Project[]
  showViewAll?: boolean  // shows "All Projects →" link below grid
}
```

### Grid Implementation
Projects are chunked into rows of 2. Each row is a `div` with:
```tsx
style={{
  display: 'grid',
  gridTemplateColumns: '55fr 43fr',
  gap: '3px',
}}
```
Rows are stacked in a parent `div` with `gap: '3px'` between them.

**Graceful degradation:**
- 1 project remaining in a row: `gridTemplateColumns: '1fr'`, full width
- 2 projects: `55fr 43fr`

Row heights by row index:
- Row 0 (first): `62vh`
- Row 1+ (subsequent): `44vh`

### Each Card
- `position: 'relative'`, `overflow: 'hidden'`, no border-radius, no box-shadow
- `cursor: 'pointer'`
- `<Image fill objectFit="cover" src={project.coverImage} />`
- Wraps in `<Link href={/projects/${project.id}}>` — entire card navigates

### Hover Overlay (desktop)
```tsx
const [hovered, setHovered] = useState(false)

<motion.div
  animate={{ opacity: hovered ? 1 : 0 }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
  style={{
    position: 'absolute', inset: 0,
    background: 'rgba(26,25,22,0.72)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '12px',
    pointerEvents: 'none',
  }}
>
  {/* Project name: 28px italic Cormorant weight 300 vellum */}
  {/* Type eyebrow: 10px letter-spacing 0.22em uppercase vellum opacity 0.7 */}
  {/* "View Project" btn-outline inverted: color vellum, arrow-line background vellum */}
</motion.div>
```

**Type display mapping for overlay eyebrow:**
```
Residence   → "Residential"
Condominium → "Residential"
Development → "Development"
Commercial  → "Commercial"
```

Status display: `project.status` — e.g. "Built" → "Completed", "Under Construction" → "Under Construction". Map Built → "Completed" in the display.

### Mobile Behavior
- Single column: `gridTemplateColumns: '1fr'`
- Card height: `56vw`
- Tap interaction: first tap shows overlay (`tapped` state per card), second tap navigates
- On mobile, `onMouseEnter`/`onMouseLeave` are not used — use `onClick` for tap toggle

### Below Grid
When `showViewAll` is true:
- `<Link href="/projects">` centered, `marginTop: '48px'`
- `btn-outline` class, text "All Projects", `.arrow-line` span
- Opacity 0.55 at rest → 1 on hover

### Entry Animation
Cards stagger-reveal on scroll:
```tsx
// useInView on the grid container
initial={{ opacity: 0, y: 24 }}
animate={inView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.7, delay: cardIndex * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
```
`useReducedMotion()`: all cards `initial={{ opacity: 1, y: 0 }}`, `duration: 0`, no delay.

---

## 6. Philosophy Band

### File
`src/components/sections/PhilosophyBand.tsx` — full rebuild.

### Layout
```
[dark background — var(--ink)]
[InsleyGrid dark variant — absolute, opacity 0.6, behind text]

——  Philosophy

"to contain spatial situations
 sympathetic to the horizon line."

— Will Insley, ONECITY Diaries

[ Read our Philosophy  →  ]
```

### Chrome
- Background: `var(--ink)`
- Padding: `120px 56px` desktop, `80px 24px` mobile
- InsleyGrid: `variant="dark"`, `position: absolute`, `inset: 0`, `opacity: 0.6`, `zIndex: 0`, `pointerEvents: none`
- All content: `position: relative`, `zIndex: 2`

### Typography
**Label:** `——  Philosophy`
- `——` rendered as `<span style={{ marginRight: '16px' }}>——</span>`
- 10px, letter-spacing 0.28em, uppercase, `var(--vellum)`, opacity 0.4
- Margin-bottom 40px

**Quote:** `"to contain spatial situations sympathetic to the horizon line."`
- `clamp(28px, 4vw, 52px)`, Cormorant weight 300, italic, `var(--vellum)`, line-height 1.3
- `maxWidth: '760px'`

**Attribution:** `— Will Insley, ONECITY Diaries`
- 11px, letter-spacing 0.2em, uppercase, `var(--vellum)`, opacity 0.4, margin-top 32px

**CTA:** `btn-outline` inverted
- Text: "Read our Philosophy"
- `color: var(--vellum)`, `.arrow-line` background: `var(--vellum)`
- opacity 0.55 → 1 on hover
- Links to `/process`
- Margin-top 48px

### Entry Animation
Single `motion.div` wrapping all content:
- `useInView({ once: true, margin: '-80px' })`
- `initial={{ opacity: 0, y: 20 }}`, `animate={inView ? { opacity: 1, y: 0 } : {}}`
- `duration: 0.8`, `ease: [0.25, 0.46, 0.45, 0.94]`
- `useReducedMotion()`: skip animation

---

## 7. Homepage Assembly

### File
`src/app/page.tsx` — full rebuild.

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

**Removed from homepage:** `FeaturedProject`, `ProjectsGrid`, `ProcessSection`. These components are not deleted — they may still be used elsewhere — but they are not imported in `page.tsx`.

---

## 8. /projects Page

### File
`src/app/projects/page.tsx` — full rebuild. Replaces the current Schemata-style Works list.

### Page Header
- Padding: `180px 56px 64px` (accommodates fixed nav)
- "Portfolio" — `clamp(48px, 7vw, 96px)`, Cormorant weight 300, left-aligned, `var(--ink)`
- Entry: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `duration: 0.8`

### Filter Bar
- Padding: `0 56px 48px`
- Bottom border: `0.5px solid rgba(26,25,22,0.08)`
- Filters rendered dynamically — only categories with ≥1 matching project are shown

**Filter categories and data mapping:**
```
"All"         → all projects (always shown)
"Residential" → type === 'Residence' || type === 'Condominium'
"Development" → type === 'Development'
"Commercial"  → type === 'Commercial' (hidden if 0 matches)
```

**Active filter style:**
- `opacity: 1`, `borderBottom: '0.5px solid var(--ink)'`, `paddingBottom: '2px'`

**Inactive filter style:**
- `opacity: 0.35`, `border: 'none'`

**Transition:** `opacity 200ms`

**State:** `useState<string>('All')` — client-side filtering, no page reload.

### Filtered Grid
```tsx
const filtered = activeFilter === 'All'
  ? projects
  : projects.filter(p => filterMap[activeFilter].includes(p.type))
```

Passes `filtered` to `<ProjectGrid projects={filtered} showViewAll={false} />`.

**Edge cases:**
- 1 project: single full-width card, `62vh`
- 2 projects: one row, `55fr 43fr`, `62vh`
- 3 projects: row 1 `55fr 43fr` `62vh`, row 2 single full-width `44vh`
- 4 projects: two rows, `55fr 43fr`, `62vh` / `44vh`

### Mobile
- Filter bar scrolls horizontally if overflow — `overflowX: 'auto'`, no scrollbar styling
- Grid single-column `56vw` per card

---

## Implementation Order (Confirmed)

1. `Navigation.tsx` — shared, affects all pages
2. `Footer.tsx` — shared, affects all pages
3. `HeroSection.tsx` — page-specific
4. `TaglineSection.tsx` — new component
5. `ProjectGrid.tsx` — new component, reused in two places
6. `PhilosophyBand.tsx` — rebuild
7. `page.tsx` — assemble from sections
8. `src/app/projects/page.tsx` — reuse ProjectGrid + add filters
