# Vibrant Backgrounds + Responsive Font Weight Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dramatically increase InsleyGrid SVG background color intensity site-wide, and add responsive font weight (300 mobile → 400/500 desktop) via CSS custom properties.

**Architecture:** Two independent changes. (1) Direct SVG opacity/color edits in `InsleyGrid.tsx` across all five variants. (2) CSS custom properties `--fw-body` and `--fw-heading` defined in `globals.css`, overridden at 1080px+, and referenced via `fontWeight: 'var(--fw-...)'` inline styles across 16 component/page files.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, inline React styles, SVG

**Spec:** `docs/superpowers/specs/2026-03-15-vibrant-backgrounds-font-weight-design.md`

---

## Chunk 1: InsleyGrid Color Intensity + CSS Variables

---

### Task 1: InsleyGrid — hero/section/dark variants

**Files:**
- Modify: `src/components/ui/InsleyGrid.tsx` (shared fallback `return` block, line ~218)

Context: Both `hero` and `section` render from a single shared SVG return block at line 218. The `dark` variant renders via `{variant === 'dark' && (...)}` conditional groups within that same block. The colored ray opacities and stroke RGBA values are the targets here.

- [ ] **Step 1: Open `src/components/ui/InsleyGrid.tsx` and locate the shared fallback `return` at line ~218**

Confirm you're looking at the block that starts with:
```tsx
return (
  <svg
    style={{ position: 'absolute', inset: 0, ... }}
    viewBox="0 0 1400 800"
```

- [ ] **Step 2: Boost the colored ray group opacity**

Find the `{variant !== 'dark' && (...)}` conditional group (line ~306). Inside it, find `<g opacity="0.15">`. Change to:
```tsx
<g opacity="0.85">
```

- [ ] **Step 3: Update each individual ray's RGBA stroke value**

Inside that same `<g opacity="0.85">` group, update the five `<line>` stroke values:

| Before | After |
|--------|-------|
| `stroke={'rgba(140,110,180,0.7)'}` | `stroke={'rgba(140,110,180,0.95)'}` |
| `stroke={'rgba(140,110,180,0.6)'}` | `stroke={'rgba(140,110,180,0.90)'}` |
| `stroke={'rgba(130,140,200,0.65)'}` | `stroke={'rgba(130,140,200,0.92)'}` |
| `stroke={'rgba(130,140,200,0.55)'}` | `stroke={'rgba(130,140,200,0.85)'}` |
| `stroke={'rgba(210,160,140,0.5)'}` | `stroke={'rgba(210,160,140,0.88)'}` |

- [ ] **Step 4: Boost colored ray stroke widths**

In that same group, change all `strokeWidth="1"` → `strokeWidth="1.5"` on the colored ray lines.

- [ ] **Step 5: Update dark variant pink band RGBA values**

Find the `{variant === 'dark' && (...)}` block (line ~327). Update the three pink `<line>` stroke RGBA values and strokeWidths:

| Before | strokeWidth | After | strokeWidth |
|--------|-------------|-------|-------------|
| `rgba(210,160,140,0.55)` | `1.2` | `rgba(210,160,140,0.92)` | `1.8` |
| `rgba(210,160,140,0.40)` | `0.8` | `rgba(210,160,140,0.82)` | `1.2` |
| `rgba(210,160,140,0.38)` | `0.8` | `rgba(210,160,140,0.80)` | `1.2` |

- [ ] **Step 6: Update dark variant blue band RGBA values**

Same block, three blue `<line>` stroke values:

| Before | strokeWidth | After | strokeWidth |
|--------|-------------|-------|-------------|
| `rgba(140,165,210,0.50)` | `1.2` | `rgba(140,165,210,0.88)` | `1.8` |
| `rgba(140,165,210,0.36)` | `0.8` | `rgba(140,165,210,0.78)` | `1.2` |
| `rgba(140,165,210,0.30)` | `0.8` | `rgba(140,165,210,0.75)` | `1.2` |

- [ ] **Step 7: Build check**

```bash
npm run build
```
Expected: No TypeScript errors. Fix any type errors before continuing.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/InsleyGrid.tsx
git commit -m "feat: boost InsleyGrid hero/section/dark variant color intensity"
```

---

### Task 2: InsleyGrid — elevation variant

**Files:**
- Modify: `src/components/ui/InsleyGrid.tsx` (`if (variant === 'elevation')` block, line ~26)

Context: This is a separate `if` block that returns early. It has three fan groups (terracotta upper-left, blue upper-right, denser terracotta) where stroke widths should be changed, plus crosshatch and bracket form groups where stroke widths must NOT be changed. The crosshatch band is `<g opacity="0.26">` at line ~82 and bracket forms are `<g opacity="0.22">` at line ~86 — do not touch strokeWidth on these.

- [ ] **Step 1: Boost terracotta upper-left fan group opacity**

Find `<g opacity="0.28">` (the first colored group, line ~30). Change:
```tsx
<g opacity="0.90">
```
Then change each line's `strokeWidth="0.5"` → `strokeWidth="1.0"` within this group only.

- [ ] **Step 2: Boost blue upper-right fan group opacity**

Find `<g opacity="0.22">` (the blue ray group, line ~41). Change:
```tsx
<g opacity="0.80">
```
Change `strokeWidth="0.5"` → `strokeWidth="1.0"` and `strokeWidth="0.4"` → `strokeWidth="0.8"` within this group only.

- [ ] **Step 3: Boost denser terracotta fan group opacity**

Find `<g opacity="0.15">` (the denser fan, line ~51). Change:
```tsx
<g opacity="0.70">
```
Change all `strokeWidth="0.4"` → `strokeWidth="0.8"` within this group only. (No `0.5` lines in this group.)

- [ ] **Step 4: Boost crosshatch band and bracket forms opacity (no stroke width changes)**

Find `<g opacity="0.26">` (crosshatch band, line ~82) → change to `<g opacity="0.85">`.
Find `<g opacity="0.22">` (bracket forms, line ~86) → change to `<g opacity="0.80">`.
**Do not change `strokeWidth` on either of these groups.**

- [ ] **Step 5: Build check**

```bash
npm run build
```
Expected: No TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/InsleyGrid.tsx
git commit -m "feat: boost InsleyGrid elevation variant color intensity"
```

---

### Task 3: InsleyGrid — opaque-city variant

**Files:**
- Modify: `src/components/ui/InsleyGrid.tsx` (`if (variant === 'opaque-city')` block, line ~101)

Context: This variant is currently all-black (`stroke="#1a1916"`). We're introducing terracotta and blue colors to the `<g>` elements. Change the `stroke` attribute on the `<g>` element itself (not on individual `<line>` children).

- [ ] **Step 1: Recolor isometric right-down lines group**

Find `<g opacity="0.14" stroke="#1a1916" strokeWidth="0.4">` (first `<g>` in this block, line ~105, contains right-down diagonal lines). Change to:
```tsx
<g opacity="0.65" stroke="#c07060" strokeWidth="0.8">
```

- [ ] **Step 2: Recolor isometric left-down lines group**

Find the second `<g opacity="0.14" stroke="#1a1916" strokeWidth="0.4">` (line ~111, contains left-down diagonal lines). Change to:
```tsx
<g opacity="0.65" stroke="#5070a0" strokeWidth="0.8">
```

- [ ] **Step 3: Boost vertical lines group**

Find `<g opacity="0.12" stroke="#1a1916" strokeWidth="0.3">` (line ~117). Change to:
```tsx
<g opacity="0.50" stroke="#1a1916" strokeWidth="0.5">
```

- [ ] **Step 4: Recolor crosshatch blocks group**

Find `<g opacity="0.16" fill="none" stroke="#1a1916" strokeWidth="0.3">` (line ~123). Change to:
```tsx
<g opacity="0.72" fill="none" stroke="#c07060" strokeWidth="0.6">
```

- [ ] **Step 5: Recolor ellipses group**

Find `<g opacity="0.16" fill="none" stroke="#1a1916" strokeWidth="0.4">` (line ~133). Change to:
```tsx
<g opacity="0.70" fill="none" stroke="#5070a0" strokeWidth="0.8">
```

- [ ] **Step 6: Boost vertical spires group**

Find `<g opacity="0.18" stroke="#1a1916" strokeWidth="0.4">` (line ~143). Change to:
```tsx
<g opacity="0.75" stroke="#1a1916" strokeWidth="0.7">
```

- [ ] **Step 7: Build check**

```bash
npm run build
```
Expected: No TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/InsleyGrid.tsx
git commit -m "feat: recolor InsleyGrid opaque-city variant with terracotta and blue"
```

---

### Task 4: InsleyGrid — passage variant

**Files:**
- Modify: `src/components/ui/InsleyGrid.tsx` (`if (variant === 'passage')` block, line ~154)

Context: This variant has concentric receding frames (13 `<rect>` elements), perspective lines, diagonal accents, and a fine grid. We're adding a terracotta background wash rect as the first child, boosting frame opacities using exact per-element targets (identified by `x` attribute), and boosting diagonal/structural line opacities.

- [ ] **Step 1: Add terracotta background wash as first child**

Immediately after the `<svg ...>` opening tag and before the existing `<g opacity="0.09">` fine graph paper grid group (currently the first child at line ~158), insert:
```tsx
<rect x="0" y="0" width="1200" height="480" fill="rgba(192,80,64,0.06)"/>
```

- [ ] **Step 2: Boost fine graph paper grid opacity**

Find `<g opacity="0.09" stroke="#1a1916" strokeWidth="0.3">`. Change to:
```tsx
<g opacity="0.22" stroke="#1a1916" strokeWidth="0.3">
```

- [ ] **Step 3: Boost outer border opacity**

Find `<rect x="0" y="0" width="1200" height="480" fill="none" stroke="#1a1916" strokeWidth="0.5" opacity="0.35"/>`. Change `opacity="0.35"` → `opacity="0.75"`.

- [ ] **Step 4: Update concentric frame opacities (exact per-element values)**

Find each `<rect>` by its `x` attribute value and update `opacity` as follows:

| `x=` | stroke | current opacity | target opacity |
|------|--------|-----------------|----------------|
| `30` | `#1a1916` | `0.30` | `0.65` |
| `70` | `#1a1916` | `0.28` | `0.62` |
| `115` | `#1a1916` | `0.26` | `0.58` |
| `165` | `#c05040` | `0.36` | `0.90` |
| `220` | `#1a1916` | `0.24` | `0.55` |
| `278` | `#5070a0` | `0.32` | `0.80` |
| `340` | `#1a1916` | `0.22` | `0.52` |
| `400` | `#c05040` | `0.32` | `0.85` |
| `460` | `#1a1916` | `0.20` | `0.50` |
| `510` | `#5070a0` | `0.28` | `0.75` |
| `545` | `#1a1916` | `0.18` | `0.48` |
| `568` | `#c05040` | `0.36` | `0.90` |
| `583` | `#1a1916` | `0.28` | `0.60` |

- [ ] **Step 5: Boost perspective corner lines**

Find `<g stroke="#1a1916" strokeWidth="0.5" opacity="0.18">` (4 corner-to-vanishing-point lines). Change `opacity="0.18"` → `opacity="0.65"`.

- [ ] **Step 6: Boost red accent diagonals**

Find `<g stroke="#c05040" strokeWidth="0.5" opacity="0.26">`. Change:
```tsx
<g stroke="#c05040" strokeWidth="1.0" opacity="0.80">
```

- [ ] **Step 7: Boost blue accent diagonals**

Find `<g stroke="#5070a0" strokeWidth="0.5" opacity="0.22">`. Change:
```tsx
<g stroke="#5070a0" strokeWidth="1.0" opacity="0.72">
```

- [ ] **Step 8: Boost red structural lines**

Find `<g stroke="#c05040" strokeWidth="0.5" opacity="0.30">`. Change:
```tsx
<g stroke="#c05040" strokeWidth="1.0" opacity="0.82">
```

- [ ] **Step 9: Boost blue structural lines**

Find `<g stroke="#5070a0" strokeWidth="0.5" opacity="0.22">` (the structural lines group, not the accent group). Change:
```tsx
<g stroke="#5070a0" strokeWidth="1.0" opacity="0.72">
```

- [ ] **Step 10: Boost vanishing point mark and drop-line**

Find `<rect x="597" y="237" width="6" height="6" fill="#1a1916" opacity="0.65"/>` → change `opacity="0.65"` → `opacity="0.90"`.
Find `<line x1="600" y1="243" x2="600" y2="258" stroke="#c05040" strokeWidth="0.5" opacity="0.75"/>` → change `opacity="0.75"` → `opacity="0.95"`.

- [ ] **Step 11: Build check**

```bash
npm run build
```
Expected: No TypeScript errors.

- [ ] **Step 12: Commit**

```bash
git add src/components/ui/InsleyGrid.tsx
git commit -m "feat: boost InsleyGrid passage variant color intensity"
```

---

### Task 5: CSS Custom Properties — globals.css

**Files:**
- Modify: `src/styles/globals.css`

Context: Add `--fw-body` and `--fw-heading` custom properties to `:root` (line ~7). Override them inside the existing `@media (min-width: 1080px)` block (line ~228) with a new `:root` selector. Update existing `h1–h6` and `p` rules (lines ~69, ~77) to use these vars. Leave `.eyebrow`, `.section-label`, `.btn-primary`, `.btn-outline` unchanged at weight 300.

- [ ] **Step 1: Add variables to `:root`**

Find the `:root` block (line ~7). Add two new custom properties at the end of the block, before the closing `}`:
```css
--fw-body: 300;
--fw-heading: 300;
```

- [ ] **Step 2: Update existing `h1–h6` rule**

Find the existing rule (line ~69):
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-cormorant);
  font-weight: 300;
  line-height: 1.05;
}
```
Change `font-weight: 300` → `font-weight: var(--fw-heading)`.

- [ ] **Step 3: Update existing `p` rule**

Find the existing rule (line ~77):
```css
p {
  font-family: var(--font-cormorant);
  font-weight: 300;
  line-height: 1.7;
}
```
Change `font-weight: 300` → `font-weight: var(--fw-body)`.

- [ ] **Step 4: Add responsive override inside existing media query**

Find the existing `@media (min-width: 1080px)` block (line ~228). Add a new `:root` selector block inside it, after the existing `.wide-container` rule:
```css
:root {
  --fw-body: 400;
  --fw-heading: 500;
}
```

- [ ] **Step 5: Build check**

```bash
npm run build
```
Expected: No errors.

- [ ] **Step 6: Visual check**

```bash
npm run dev
```
Open http://localhost:3000. Resize browser to >1080px wide. Confirm headings and body text appear heavier than at narrow widths. Resize to <1080px and confirm weight reverts to light.

- [ ] **Step 7: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add responsive font weight CSS custom properties"
```

---

## Chunk 2: Inline Style Updates (16 files)

---

### Task 6: HeroSection inline styles

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

Rule: Elements ≤12px keep `fontWeight: 300` hardcoded. Large headline spans get `fontWeight: 'var(--fw-heading)'`. The tagline and scroll indicator stay at 300.

- [ ] **Step 1: Update first headline span**

Find line ~62 — the first `<motion.span>` with `fontWeight: 300` inside the `style` prop (displays "Dustin Brady"). Change `fontWeight: 300` → `fontWeight: 'var(--fw-heading)'`.

- [ ] **Step 2: Update second headline span**

Find line ~79 — the second `<motion.span>` (displays "Architecture"). Change `fontWeight: 300` → `fontWeight: 'var(--fw-heading)'`.

- [ ] **Step 3: Confirm tagline and scroll indicator are unchanged**

Line ~97 (subtitle `<motion.span>`, 10px, "Contemporary Architecture · Florida") — confirm `fontWeight: 300` is still there, unchanged.
Line ~128 (scroll indicator `<span>`, 9px, "Scroll") — confirm `fontWeight: 300` is still there, unchanged.

- [ ] **Step 4: Build check**

```bash
npm run build
```
Expected: No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: responsive font weight on hero headline spans"
```

---

### Task 7: FeaturedProject, PhilosophyBand, TaglineSection

**Files:**
- Modify: `src/components/sections/FeaturedProject.tsx`
- Modify: `src/components/sections/PhilosophyBand.tsx`
- Modify: `src/components/sections/TaglineSection.tsx`

Rule per element type:
- Project title / large heading text (fontSize ≥28px) → `fontWeight: 'var(--fw-heading)'`
- Body description text (fontSize 14–27px) → `fontWeight: 'var(--fw-body)'`
- Labels, metadata, eyebrow spans (fontSize ≤12px) → keep `fontWeight: 300`

- [ ] **Step 1: Update `FeaturedProject.tsx`**

Open `src/components/sections/FeaturedProject.tsx`. Exact per-line changes:

| Line | Element | fontSize | Change |
|------|---------|----------|--------|
| 68 | type/year eyebrow `<span>` | 10px | keep `300` |
| 84 | project title `<h2>` | clamp(28–40px) | → `'var(--fw-heading)'` |
| 103 | location `<span>` | 13px | → `'var(--fw-body)'` |
| 118 | description `<p>` | 16px | → `'var(--fw-body)'` |
| 150 | spec label `<span>` (Area/Year/etc) | 10px | keep `300` |
| 165 | spec value `<span>` (2,400 sqft/etc) | 22px | → `'var(--fw-body)'` |
| 193 | "View Full Project" button `<span>` | 11px | keep `300` |

- [ ] **Step 2: Update `PhilosophyBand.tsx`**

Open `src/components/sections/PhilosophyBand.tsx`. Apply same rule:
- Blockquote (large italic, fontSize clamp 28–52px) → `fontWeight: 'var(--fw-heading)'`
- Attribution paragraph (11px uppercase) → keep `fontWeight: 300`
- Philosophy label (10px uppercase) → keep `fontWeight: 300`

- [ ] **Step 3: Update `TaglineSection.tsx`**

Open `src/components/sections/TaglineSection.tsx`. Apply same rule:
- Large tagline text (fontSize ≥28px) → `fontWeight: 'var(--fw-heading)'`
- Any body/description text → `fontWeight: 'var(--fw-body)'`
- Small labels → keep `fontWeight: 300`

- [ ] **Step 4: Build check**

```bash
npm run build
```
Expected: No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/FeaturedProject.tsx src/components/sections/PhilosophyBand.tsx src/components/sections/TaglineSection.tsx
git commit -m "feat: responsive font weight on section components"
```

---

### Task 8: ProjectGrid, ProjectsGrid, ProcessSection

**Files:**
- Modify: `src/components/sections/ProjectGrid.tsx`
- Modify: `src/components/sections/ProjectsGrid.tsx`
- Modify: `src/components/sections/ProcessSection.tsx`

- [ ] **Step 1: Update `ProjectGrid.tsx`**

Open `src/components/sections/ProjectGrid.tsx`. For each `fontWeight: 300`:
- Project title text (fontSize ≥28px) → `fontWeight: 'var(--fw-heading)'`
- Project description/excerpt text (14–27px) → `fontWeight: 'var(--fw-body)'`
- Category labels, type tags, metadata (≤12px) → keep `fontWeight: 300`

- [ ] **Step 2: Update `ProjectsGrid.tsx`**

Open `src/components/sections/ProjectsGrid.tsx`. Same rule:
- Project title headings → `fontWeight: 'var(--fw-heading)'`
- Excerpt/description paragraphs → `fontWeight: 'var(--fw-body)'`
- Category labels, dates, small metadata → keep `fontWeight: 300`

- [ ] **Step 3: Update `ProcessSection.tsx`**

Open `src/components/sections/ProcessSection.tsx`. Same rule:
- Step headings (fontSize ≥28px) → `fontWeight: 'var(--fw-heading)'`
- Step description paragraphs → `fontWeight: 'var(--fw-body)'`
- Step number labels, small eyebrows (≤12px) → keep `fontWeight: 300`

- [ ] **Step 4: Build check**

```bash
npm run build
```
Expected: No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ProjectGrid.tsx src/components/sections/ProjectsGrid.tsx src/components/sections/ProcessSection.tsx
git commit -m "feat: responsive font weight on project and process section components"
```

---

### Task 9: Navigation, Footer

**Files:**
- Modify: `src/components/layout/Navigation.tsx`
- Modify: `src/components/layout/Footer.tsx`

Note: Navigation items are all ≤12px — keep all at 300. Footer has brand name text that may be larger.

- [ ] **Step 1: Update `Navigation.tsx`**

Open `src/components/layout/Navigation.tsx`. All nav items are small-print (11px or less). Keep all `fontWeight: 300` unchanged — no substitutions needed in this file.

Verify by checking: all `fontWeight: 300` instances in this file should have `fontSize` values ≤12px or equivalent small sizes. If any element is ≥14px (e.g., a mobile nav heading), apply `fontWeight: 'var(--fw-heading)'` or `fontWeight: 'var(--fw-body)'` as appropriate.

- [ ] **Step 2: Update `Footer.tsx`**

Open `src/components/layout/Footer.tsx`. Exact per-line changes:

| Line | Element | fontSize | Change |
|------|---------|----------|--------|
| 41 | brand name `<div>` ("Dustin Brady / Architecture") | 18px | → `'var(--fw-body)'` |
| 71 | nav links `<Link>` (Portfolio/Philosophy/etc) | 11px | keep `300` |
| 95 | email `<a>` | 13px | → `'var(--fw-body)'` |
| 108 | "Miami, Florida" `<span>` | 13px | → `'var(--fw-body)'` |
| 134 | copyright `<span>` | 10px | keep `300` |
| 147 | footer quote `<span>` | 10px | keep `300` |
| 162 | Privacy `<Link>` | 10px | keep `300` |

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navigation.tsx src/components/layout/Footer.tsx
git commit -m "feat: responsive font weight on navigation and footer"
```

---

### Task 10: App pages — studio, process, journal

**Files:**
- Modify: `src/app/studio/page.tsx`
- Modify: `src/app/process/page.tsx`
- Modify: `src/app/journal/page.tsx`

- [ ] **Step 1: Update `src/app/studio/page.tsx`**

For each `fontWeight: 300`:
- `<h1>` (clamp 40–72px) → `fontWeight: 'var(--fw-heading)'`
- Member name `<div>` (20px) → `fontWeight: 'var(--fw-body)'`
- Body `<p>` elements (14–20px) → `fontWeight: 'var(--fw-body)'`
- Eyebrow spans (10px uppercase), role labels (10px), award year (12px), italic project names — keep `fontWeight: 300`

- [ ] **Step 2: Update `src/app/process/page.tsx`**

For each `fontWeight: 300`:
- `<h1>` (clamp 40–72px) → `fontWeight: 'var(--fw-heading)'`
- `<h2>` elements (italic, 32px) → `fontWeight: 'var(--fw-heading)'`
- Body `<p>` elements (16–18px) → `fontWeight: 'var(--fw-body)'`
- Eyebrow spans (10px), CTA label (10px) — keep `fontWeight: 300`

- [ ] **Step 3: Update `src/app/journal/page.tsx`**

For each `fontWeight: 300`:
- `<h1>` (clamp 40–72px) → `fontWeight: 'var(--fw-heading)'`
- Post title `<h2>` (22px) → `fontWeight: 'var(--fw-heading)'`
- Post excerpt `<p>` (15px) → `fontWeight: 'var(--fw-body)'`
- Category labels (10px uppercase), dates (13px), read-time (11px) — keep `fontWeight: 300`

- [ ] **Step 4: Build check**

```bash
npm run build
```
Expected: No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/studio/page.tsx src/app/process/page.tsx src/app/journal/page.tsx
git commit -m "feat: responsive font weight on studio, process, journal pages"
```

---

### Task 11: App pages — projects index, project slug, contact, not-found

**Files:**
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/not-found.tsx`

- [ ] **Step 1: Update `src/app/projects/page.tsx`**

For each `fontWeight: 300`:
- Page `<h1>` (clamp size) → `fontWeight: 'var(--fw-heading)'`
- Descriptive body text (≥14px) → `fontWeight: 'var(--fw-body)'`
- Labels and metadata (≤12px) → keep `fontWeight: 300`

- [ ] **Step 2: Update `src/app/projects/[slug]/page.tsx`**

For each `fontWeight: 300`:
- Project `<h1>` (clamp 36–72px) → `fontWeight: 'var(--fw-heading)'`
- Description `<p>` elements (16–22px) → `fontWeight: 'var(--fw-body)'`
- Metadata label spans (9px uppercase), detail value spans (18px) — label stays 300; value (18px) → `fontWeight: 'var(--fw-body)'`
- Eyebrow span (10px) → keep `fontWeight: 300`

- [ ] **Step 3: Update `src/app/contact/page.tsx`**

For each `fontWeight: 300`:
- `<h1>` → `fontWeight: 'var(--fw-heading)'`
- Address line spans (16px) → `fontWeight: 'var(--fw-body)'`
- Tagline italic span (28px) → `fontWeight: 'var(--fw-heading)'`
- Body `<p>` (16–18px) → `fontWeight: 'var(--fw-body)'`
- "Get in Touch" eyebrow span (10px), button label (11px) → keep `fontWeight: 300`

- [ ] **Step 4: Update `src/app/not-found.tsx`**

For each `fontWeight: 300`:
- `<h1>` (clamp 32–60px) → `fontWeight: 'var(--fw-heading)'`
- Remaining body text (≥14px) → `fontWeight: 'var(--fw-body)'`
- 10px eyebrow span and 11px button span → keep `fontWeight: 300`

- [ ] **Step 5: Build check**

```bash
npm run build
```
Expected: No TypeScript errors.

- [ ] **Step 6: Visual verification**

```bash
npm run dev
```
Visit each page. At viewport >1080px wide, confirm:
- Page headings are visibly heavier than before
- Body paragraphs are slightly heavier and more legible
- Eyebrow labels, nav items, metadata remain light (weight 300)
- InsleyGrid backgrounds on all pages show vivid colored lines

Resize to <1080px and confirm everything returns to weight 300.

- [ ] **Step 7: Commit**

```bash
git add src/app/projects/page.tsx "src/app/projects/[slug]/page.tsx" src/app/contact/page.tsx src/app/not-found.tsx
git commit -m "feat: responsive font weight on remaining pages"
```

---

### Task 12: Final lint check

- [ ] **Step 1: Run lint**

```bash
npm run lint
```
Expected: No errors. Fix any lint issues before proceeding.

- [ ] **Step 2: Final build**

```bash
npm run build
```
Expected: Clean build.

- [ ] **Step 3: Final visual review**

```bash
npm run dev
```

Visit these routes and verify at 1080px+ viewport:
- `/` — hero photo + InsleyGrid dark variant in philosophy band; headings bold
- `/studio` — InsleyGrid elevation on page sections if present; h1/body weight correct
- `/process` — InsleyGrid passage variant visible with vivid red/blue; h1/h2 heavier
- `/journal` — body text readable at large sizes
- `/projects` — grid titles heavier on desktop
- Any project detail page — h1 heading prominent

- [ ] **Step 4: Tag completion**

```bash
git tag vibrant-backgrounds-v1
```
