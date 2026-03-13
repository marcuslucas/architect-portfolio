# Phase 2: Animations & Lightbox — Design Spec

**Project:** Voss Architecture Portfolio
**Date:** 2026-03-13
**Status:** Approved

---

## Overview

Six animation and interaction features added to the existing Next.js 14 App Router portfolio. All features respect `prefers-reduced-motion`. Design constraints: Cormorant Garamond weight 300 only, warm monochrome palette (no blue), `border-radius: 0` on all new elements, 0.5px hairline borders only.

Implementation approach: **Foundation-first** — build shared infrastructure components (`PageTransitionProvider`, `RevealOnScroll`, `Lightbox`) as standalone files first, then wire into pages/components in a second pass.

---

## Feature 1: Page Transitions

### Goal
Fade pages in/out at 400ms opacity on route change. No slides or transforms.

### Architecture
- **New file:** `src/components/layout/PageTransitionProvider.tsx` (`'use client'`)
- Root `layout.tsx` stays a server component (preserves metadata/SEO)

### Implementation

`PageTransitionProvider` wraps children in `<AnimatePresence mode="wait">`. It calls `usePathname()` internally to key the motion wrapper.

```tsx
// PageTransitionProvider.tsx
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransitionProvider({ children }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

`layout.tsx` body:
```tsx
<body>
  <PageTransitionProvider>{children}</PageTransitionProvider>
</body>
```

Navigation and Footer are rendered per-page (already the pattern), so they correctly persist outside the transition wrapper.

### Reduced Motion
No special handling needed — `AnimatePresence` with `duration: 0` would be the fallback, but since the transition is opacity-only and 400ms, the standard `prefers-reduced-motion` media query handled by the browser covers this. If needed, check `useReducedMotion()` and set `duration: 0`.

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
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function RevealOnScroll({ children, className, style }) {
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
            duration: 0.6,
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

### Behaviour
- The outer `div` is the `ref` target. When it enters the viewport (60px before fully visible), all children animate in with staggered 80ms delays.
- `once: true` — no re-animation on scroll up.
- `reducedMotion: true` — `initial` collapses to `{ opacity: 1, y: 0 }`, delay is 0. Children render immediately with no motion.

### Usage
```tsx
<RevealOnScroll>
  <p>First — 0ms delay</p>
  <p>Second — 80ms delay</p>
  <p>Third — 160ms delay</p>
</RevealOnScroll>
```

---

## Feature 3: InsleyGrid Breathing Animation

### Goal
Very slow, atmospheric x-axis drift on the InsleyGrid SVG in HeroSection. 4px x-shift over 20 seconds, infinite loop. Disabled entirely under `prefers-reduced-motion`.

### Changed File
`src/components/ui/InsleyGrid.tsx` — no new file.

### Implementation

Convert `<svg>` to `<motion.svg>`. Add `useAnimation` and `useReducedMotion`:

```tsx
const controls = useAnimation()
const reducedMotion = useReducedMotion()

useEffect(() => {
  if (reducedMotion) return
  controls.start({
    x: [0, 4, 0],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  })
}, [controls, reducedMotion])

// <motion.svg animate={controls} ...>
```

### Constraints
- Only `x` translate — no scale, opacity, or y movement
- 4px over 20 seconds reads as atmospheric drift, not visible animation
- Only `HeroSection.tsx` uses `variant="hero"` — this is the only visible callsite
- When `reducedMotion` is true, `useEffect` returns early, SVG is completely static

---

## Feature 4: Project Card Hover Overlay

### Goal
On hover, dark overlay fades in over ProjectsGrid card image, revealing project title, location, and year. Opacity transition 200ms. No scale or transform on card. Split interaction: image area → Lightbox, info area below → project page navigation.

### Changed File
`src/components/sections/ProjectsGrid.tsx`

### Card Structure (post-change)

```
<article>
  <div onClick={openLightbox}>          ← image area, cursor: pointer
    <Image ... />                        ← cover photo
    <motion.div (overlay)>              ← fades in on hover
      title / location / year text
    </motion.div>
  </div>
  <Link href="/projects/[slug]">        ← info area navigates
    number / title / location row
  </Link>
</article>
```

### Hover State
`ProjectCard` adds `useState<boolean>(false)` for `hovered`. The image container div gets `onMouseEnter={() => setHovered(true)}` and `onMouseLeave={() => setHovered(false)}`.

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
  }}
>
  {/* title 19px, location 11px 0.12em spacing, year 11px — all Cormorant weight 300 */}
</motion.div>
```

### Existing CSS Removed
The `article:hover .card-overlay { opacity: 1 !important; }` rule and the `.card-overlay` class are removed — Framer Motion handles the overlay entirely.

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

### Overlay & Layout
- `position: fixed`, `inset: 0`, `zIndex: 100`
- `background: rgba(26,25,22,0.94)`
- Click directly on overlay → `onClose()`
- Click on image area → `stopPropagation()` (does not close)

### Animation
- Overlay: `AnimatePresence` + `motion.div`, `opacity: 0 → 1`, `duration: 200ms`
- Image: `motion.div` with `key={currentIndex}`, `initial={{ opacity: 0, scale: 0.96 }}`, `animate={{ opacity: 1, scale: 1 }}`, `transition={{ duration: 0.3 }}`

### Image Display
- `<Image>` component, `fill` layout inside a sized container
- Container: `max-width: 90vw`, `max-height: 85vh`, `position: relative`
- `objectFit: 'contain'`

### Navigation
- Two arrow buttons (`←` `→`) as SVG chevrons, positioned absolute left/right center of overlay
- `cursor: pointer`, no background, no border
- Wraps at boundaries: last → first, first → last
- Keyboard: `useEffect` adds `keydown` listener on mount, removes on unmount
  - `ArrowLeft` → prev
  - `ArrowRight` → next
  - `Escape` → `onClose()`

### Touch
- `onTouchStart` records `touchStartX`
- `onTouchEnd` computes delta; if `|delta| > 50px`: negative delta → next, positive → prev

### Counter
- Bottom center of overlay
- Format: `"01 / 04"` (zero-padded to 2 digits)
- Cormorant Garamond weight 300, 11px, letter-spacing 0.2em, opacity 0.5
- `pointerEvents: none`

### Body Scroll Lock
```tsx
useEffect(() => {
  document.body.style.overflow = 'hidden'
  return () => { document.body.style.overflow = '' }
}, [])
```

### Wiring

**ProjectsGrid cards:**
```tsx
// State in ProjectsGrid (or ProjectCard)
const [lightboxOpen, setLightboxOpen] = useState(false)

// Image div onClick
onClick={() => setLightboxOpen(true)}

// Render Lightbox
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

// Each photo div onClick
onClick={() => setLightboxIndex(i)}

// Render Lightbox
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
Navigation padding smoothly transitions from 24px to 14px when scrolled past 80px, driven by scroll position (not boolean snap).

### Changed File
`src/components/layout/Navigation.tsx`

### Implementation

Replace padding state with `useScroll` + `useTransform`:

```tsx
const { scrollY } = useScroll()
const paddingY = useTransform(scrollY, [0, 80], [24, 14])
```

The existing `motion.nav` gets `style={{ paddingTop: paddingY, paddingBottom: paddingY }}`.

The existing `scrolled` boolean state **stays** — it still controls the glassmorphism effect (backdrop-filter, background opacity). Only the padding becomes scroll-linked.

### Reduced Motion
```tsx
const reducedMotion = useReducedMotion()
// If reducedMotion: use scrolled boolean to snap padding (24 or 14),
// not useTransform interpolation
```

---

## File Change Summary

| File | Change Type |
|------|-------------|
| `src/components/layout/PageTransitionProvider.tsx` | **New** |
| `src/components/ui/RevealOnScroll.tsx` | **New** |
| `src/components/ui/Lightbox.tsx` | **New** |
| `src/app/layout.tsx` | Modified — add PageTransitionProvider wrapper |
| `src/components/ui/InsleyGrid.tsx` | Modified — add breathing animation |
| `src/components/sections/ProjectsGrid.tsx` | Modified — card hover + Lightbox wiring |
| `src/app/projects/[slug]/page.tsx` | Modified — gallery Lightbox wiring |
| `src/components/layout/Navigation.tsx` | Modified — scroll-linked padding |

---

## Design Constraints (from MASTER.md)

- Cormorant Garamond weight 300 only for all new text
- Warm monochrome palette — no blue in any new UI element
- `border-radius: 0` on all new elements (Lightbox overlay, arrows, counter)
- 0.5px hairline borders only — no thick borders
- `prefers-reduced-motion` respected in every animated feature
- Transition durations: 200ms (overlays), 300ms (lightbox image), 400ms (page), 600ms (scroll reveal), 20s (grid drift)
