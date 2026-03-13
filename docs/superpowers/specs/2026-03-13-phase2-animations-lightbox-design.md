# Phase 2: Animations & Lightbox — Design Spec

**Project:** Voss Architecture Portfolio
**Date:** 2026-03-13
**Status:** Approved

---

## Overview

Six animation and interaction features added to the existing Next.js 14 App Router portfolio. All features respect `prefers-reduced-motion`. Design constraints: Cormorant Garamond weight 300 only, warm monochrome palette (no blue in any **new** UI element — existing InsleyGrid SVG colors are grandfathered), `border-radius: 0` on all new elements, 0.5px hairline borders only.

Implementation approach: **Foundation-first** — build shared infrastructure components (`PageTransitionProvider`, `RevealOnScroll`, `Lightbox`) as standalone files first, then wire into pages/components in a second pass.

---

## Feature 1: Page Transitions

### Goal
Fade pages in/out at 400ms opacity on route change. No slides or transforms.

### Architecture
- **New file:** `src/components/layout/PageTransitionProvider.tsx` (`'use client'`)
- Root `layout.tsx` stays a server component (preserves metadata/SEO)

### Implementation

`PageTransitionProvider` wraps children in `<AnimatePresence mode="wait">`. It calls `usePathname()` and `useReducedMotion()` internally to key the motion wrapper and collapse animation duration when the user prefers reduced motion.

```tsx
// PageTransitionProvider.tsx
'use client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.4, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

`layout.tsx` body — Navigation and Footer are **not** moved into layout; they remain per-page as the current pattern dictates:
```tsx
<body>
  <PageTransitionProvider>{children}</PageTransitionProvider>
</body>
```

### Navigation Flicker Fix
The existing `Navigation.tsx` has `initial={{ y: -20, opacity: 0 }}` on its `motion.nav`. Because Navigation is inside each page component (which is inside `PageTransitionProvider`), it will re-animate on every route change. To prevent this, the `motion.nav` in `Navigation.tsx` must suppress its `initial` animation after first mount. Use a `hasMounted` ref:

```tsx
const hasMounted = useRef(false)
useEffect(() => { hasMounted.current = true }, [])

// On motion.nav:
initial={hasMounted.current ? false : { y: -20, opacity: 0 }}
```

This means: on first page load, the nav animates in once. On subsequent route changes (re-renders via PageTransitionProvider keying), `initial={false}` tells Framer Motion to skip the initial animation entirely.

### Reduced Motion
`useReducedMotion()` is checked inside `PageTransitionProvider`. When true, `duration: 0` — transitions fire instantly with no visible animation. This is mandatory (CSS `prefers-reduced-motion` media queries do not affect Framer Motion JavaScript animations).

---

## Feature 2: RevealOnScroll

### Goal
Reusable wrapper that fades children up 20px over 600ms, staggering siblings by 80ms. Triggers once only. Respects `prefers-reduced-motion`.

### New File
`src/components/ui/RevealOnScroll.tsx` (`'use client'`)

### Props
```tsx
interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
```

### Implementation

```tsx
'use client'
import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function RevealOnScroll({ children, className, style }: RevealOnScrollProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()

  return (
    <div ref={ref} className={className} style={style}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            delay: reducedMotion ? 0 : index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
```

### Layout Constraint
Each child is wrapped in a `<motion.div>`. This means:
- Do **not** pass `<li>` elements as direct children (produces invalid HTML `<div>` inside `<ul>`/`<ol>`)
- Do **not** pass block elements that must be direct children of a flex/grid container — the `motion.div` wrapper will become the grid/flex child, which is intentional and fine for most use cases
- Callers should pass semantically neutral children (`<div>`, `<section>`, already-wrapped components) where layout correctness matters

### Behaviour
- The outer `div` is the `ref` target. When it enters the viewport (60px before fully visible), all children animate in with staggered 80ms delays.
- `once: true` — no re-animation on scroll up.
- `reducedMotion: true` — `initial` collapses to `{ opacity: 1, y: 0 }`, delay is 0, duration is 0. Children render immediately with no motion.

### Usage
```tsx
<RevealOnScroll>
  <div>First — 0ms delay</div>
  <div>Second — 80ms delay</div>
  <div>Third — 160ms delay</div>
</RevealOnScroll>
```

---

## Feature 3: InsleyGrid Breathing Animation

### Goal
Very slow, atmospheric x-axis drift on the InsleyGrid SVG in HeroSection. 4px x-shift over 20 seconds, infinite loop. Disabled entirely under `prefers-reduced-motion`.

### Changed File
`src/components/ui/InsleyGrid.tsx` — no new file.

### Grandfathered Colors
The existing SVG uses blue-purple tones (`rgba(130,140,200,...)`) in its diagonal rays and dark variant elevation bands. These are **not** changed — they are grandfathered existing colors, not new UI elements. The "no blue" constraint applies only to new elements added by this spec.

### Implementation

Use declarative Framer Motion animate array syntax (preferred over `useAnimation` for infinite loops — handles `reducedMotion` runtime changes automatically without needing `controls.stop()`):

```tsx
import { motion, useReducedMotion } from 'framer-motion'

// Inside the component:
const reducedMotion = useReducedMotion()

// Convert <svg> to <motion.svg>:
<motion.svg
  animate={reducedMotion ? {} : { x: [0, 4, 0] }}
  transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
  // ...existing svg props
>
```

When `reducedMotion` is true, `animate={}` — Framer Motion applies no animation. If the user enables `prefers-reduced-motion` mid-session, the declarative form responds automatically (no `controls.stop()` required).

### Constraints
- Only `x` translate — no scale, opacity, or y movement
- 4px over 20 seconds reads as atmospheric drift, not visible animation
- Only `HeroSection.tsx` uses `variant="hero"` — this is the only visible callsite
- `border-radius: 0` is not applicable (SVG element)

---

## Feature 4: Project Card Hover Overlay

### Goal
On hover, dark overlay fades in over ProjectsGrid card image, revealing project title, location, and year. Opacity transition 200ms. No scale or transform on card. Split interaction: image area → Lightbox, info area below → project page navigation.

### Changed File
`src/components/sections/ProjectsGrid.tsx`

### Structural Change: Remove Outer Link Wrapper
Currently, the entire card (image + info area) is wrapped in a single `<Link>`. This must be **restructured** — the outer `<Link>` wrapper is removed. The card becomes an `<article>` with two independently interactive children:

```
<article>
  <div                                  ← image area (NOT a Link)
    onClick={() => setLightboxOpen(true)}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    style={{ position: 'relative', cursor: 'pointer', ... }}
  >
    <Image ... />
    <motion.div (overlay, pointerEvents: none) />
  </div>
  <Link href="/projects/[slug]">        ← info area navigates to project page
    number / title / location row
  </Link>
</article>
```

The `<motion.div>` wrapper that currently wraps the entire card (for the stagger entry animation) wraps the `<article>` — this is unaffected by the restructure.

### Hover State
`ProjectCard` adds `useState<boolean>(false)` for `hovered` and `useState<boolean>(false)` for `lightboxOpen`. The image container div gets `onMouseEnter`/`onMouseLeave` toggling `hovered`.

Overlay `motion.div`:
```tsx
<motion.div
  animate={{ opacity: hovered ? 1 : 0 }}
  transition={{ duration: 0.2, ease: 'easeInOut' }}
  style={{
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(26,25,22,0.75) 0%, rgba(26,25,22,0.2) 100%)',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '20px 24px',
    pointerEvents: 'none',
    borderRadius: 0,
  }}
>
  {/* title 19px Cormorant weight 300, white */}
  {/* location 11px letter-spacing 0.12em opacity 0.7 */}
  {/* year 11px letter-spacing 0.12em opacity 0.7 */}
</motion.div>
```

### Existing CSS Removed
The `article:hover .card-overlay { opacity: 1 !important; }` rule and the `.card-overlay` class are removed — Framer Motion handles the overlay entirely.

### Lightbox Wiring in ProjectCard
The `lightboxOpen` state and `<Lightbox>` render live inside each `ProjectCard` (not at the grid level), keeping state local to each card:

```tsx
{lightboxOpen && (
  <Lightbox
    images={[project.coverImage]}
    onClose={() => setLightboxOpen(false)}
  />
)}
```

See Feature 5 for `AnimatePresence` placement.

---

## Feature 5: Lightbox Component

### Goal
Full-screen image viewer. Keyboard navigation (arrows, Escape), touch swipe, image counter, click-outside-to-close. Opens from ProjectsGrid card image click and [slug] page gallery.

### New File
`src/components/ui/Lightbox.tsx` (`'use client'`)

### Props
```tsx
interface LightboxProps {
  images: string[]       // array of image src paths
  initialIndex?: number  // default 0
  onClose: () => void
}
```

### AnimatePresence Placement
The `AnimatePresence` for the overlay **entry/exit animation lives inside `Lightbox.tsx`**, not at the call site. The Lightbox manages its own open/close via an internal `isVisible` state that starts `true` and transitions to `false` on close (triggering the exit animation before unmount). When exit animation completes, `onClose()` is called to unmount the component from the parent.

Pattern:
```tsx
// Inside Lightbox.tsx
const [isVisible, setIsVisible] = useState(true)

const handleClose = () => setIsVisible(false)  // triggers exit animation

// onExitComplete fires after exit animation finishes:
<AnimatePresence onExitComplete={onClose}>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      // ... overlay styles
    />
  )}
</AnimatePresence>
```

All close triggers (Escape key, overlay click, arrow that reaches end) call `handleClose()` internally — not `onClose()` directly.

### Overlay & Layout
- `position: fixed`, `inset: 0`, `zIndex: 100`, `borderRadius: 0`
- `background: rgba(26,25,22,0.94)`
- Click directly on overlay `motion.div` → `handleClose()`
- Image container: `e.stopPropagation()` on click (does not bubble to overlay)

### Image Display
- `<Image>` component inside a `motion.div` with `key={currentIndex}`
- `motion.div`: `initial={{ opacity: 0, scale: 0.96 }}`, `animate={{ opacity: 1, scale: 1 }}`, `transition={{ duration: 0.3 }}`
- Image container: `position: 'relative'`, `width: '90vw'`, `height: '85vh'`
- `<Image fill objectFit="contain" />`
- `borderRadius: 0` on image container

### Navigation
- Two SVG chevron buttons, `position: absolute`, vertically centered left/right of overlay
- `cursor: pointer`, `background: none`, `border: none`, `borderRadius: 0`, `color: rgba(255,255,255,0.6)`
- Wraps at boundaries: index goes `last → 0` and `0 → last`
- Keyboard `useEffect`:
  ```tsx
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentIndex])
  ```

### Touch
```tsx
const touchStartX = useRef(0)

onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
onTouchEnd={(e) => {
  const delta = e.changedTouches[0].clientX - touchStartX.current
  // delta = touchEnd - touchStart
  // Swipe left (negative delta) → next image
  // Swipe right (positive delta) → prev image
  if (delta < -50) next()
  if (delta > 50) prev()
}}
```

### Counter
- Bottom center of overlay, `position: absolute`, `bottom: 32px`
- Format: `"01 / 04"` — zero-pad with `String(n).padStart(2, '0')`
- Cormorant Garamond weight 300, 11px, letter-spacing 0.2em, opacity 0.5, color white
- `pointerEvents: none`, `borderRadius: 0`

### Body Scroll Lock
```tsx
useEffect(() => {
  document.body.style.overflow = 'hidden'
  return () => { document.body.style.overflow = '' }
}, [])
```

### Wiring at Call Sites
Call sites use conditional rendering (`{condition && <Lightbox />}`). The `AnimatePresence` is internal — exit animations work correctly because the internal `isVisible` state controls the `motion.div`, not the parent's conditional render. The Lightbox only unmounts (parent condition becomes false) after `onExitComplete` fires `onClose()`.

**ProjectsGrid — inside `ProjectCard`:**
```tsx
const [lightboxOpen, setLightboxOpen] = useState(false)

// image div onClick:
onClick={() => setLightboxOpen(true)}

// render:
{lightboxOpen && (
  <Lightbox
    images={[project.coverImage]}
    onClose={() => setLightboxOpen(false)}
  />
)}
```

**`[slug]/page.tsx` gallery:**
```tsx
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

// each photo div onClick:
onClick={() => setLightboxIndex(i)}

// render:
{lightboxIndex !== null && (
  <Lightbox
    images={project.images}
    initialIndex={lightboxIndex}
    onClose={() => setLightboxIndex(null)}
  />
)}
```

---

## Feature 6: Nav Scroll Shrink

### Goal
Navigation `paddingTop`/`paddingBottom` smoothly transitions from 24px to 14px as user scrolls from 0 to 80px. Driven by scroll position (smooth interpolation, not boolean snap). Falls back to instant snap under `prefers-reduced-motion`.

### Changed File
`src/components/layout/Navigation.tsx`

### Padding Shorthand Removal
The existing `motion.nav` has `padding: '24px 48px'` as a shorthand. This **must be split** into `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight` — otherwise the shorthand overrides the MotionValue-driven `paddingTop`/`paddingBottom`:

```tsx
// Before:
style={{ padding: '24px 48px', ... }}

// After:
style={{
  paddingTop: paddingY,
  paddingBottom: paddingY,
  paddingLeft: '48px',
  paddingRight: '48px',
  // ...rest of styles
}}
```

### Implementation

```tsx
const { scrollY } = useScroll()
const reducedMotion = useReducedMotion()
const paddingYMotion = useTransform(scrollY, [0, 80], [24, 14])

// For reduced motion: use scrolled boolean (snaps at 80px threshold, consistent with transform range)
const [scrolled80, setScrolled80] = useState(false)
useEffect(() => {
  const unsub = scrollY.on('change', (v) => setScrolled80(v > 80))
  return unsub
}, [scrollY])

const paddingY = reducedMotion
  ? (scrolled80 ? 14 : 24)
  : paddingYMotion
```

The `paddingY` value (either a MotionValue or a plain number) is passed to `style={{ paddingTop: paddingY, paddingBottom: paddingY }}`. Framer Motion's `motion.nav` accepts both MotionValues and plain numbers in `style`.

### Threshold Alignment
Both the animated path (`useTransform` range `[0, 80]`) and the reduced-motion fallback (`scrolled80` at `> 80px`) use 80px as the threshold — consistent behavior regardless of motion preference.

The existing `scrolled` boolean (currently triggers at 40px) is kept exclusively for the glassmorphism effect (background, backdrop-filter). It is not used for padding.

---

## File Change Summary

| File | Change Type | Notes |
|------|-------------|-------|
| `src/components/layout/PageTransitionProvider.tsx` | **New** | AnimatePresence wrapper |
| `src/components/ui/RevealOnScroll.tsx` | **New** | Scroll-triggered stagger component |
| `src/components/ui/Lightbox.tsx` | **New** | Full-screen image viewer |
| `src/app/layout.tsx` | Modified | Add `<PageTransitionProvider>` wrapper |
| `src/components/ui/InsleyGrid.tsx` | Modified | Add declarative breathing animation |
| `src/components/layout/Navigation.tsx` | Modified | Scroll-linked padding + hasMounted flicker fix |
| `src/components/sections/ProjectsGrid.tsx` | Modified | Restructure card, hover overlay, Lightbox wiring |
| `src/app/projects/[slug]/page.tsx` | Modified | Gallery Lightbox wiring |

---

## Design Constraints (from MASTER.md)

- Cormorant Garamond weight 300 only for all new text elements
- Warm monochrome palette — no blue in any **new** UI element; existing InsleyGrid SVG blue-purple tones are grandfathered
- `border-radius: 0` on all new elements (Lightbox overlay, image container, arrow buttons, counter)
- 0.5px hairline borders only — no thick borders on new elements
- `prefers-reduced-motion` respected in **every** animated feature via `useReducedMotion()` (CSS media queries alone do not affect Framer Motion JS animations)
- Transition durations: 200ms (card overlay, lightbox open/close), 300ms (lightbox image change), 400ms (page transition, or 0ms reduced), 600ms (scroll reveal, or 0ms reduced), 20s (grid drift, or static)
