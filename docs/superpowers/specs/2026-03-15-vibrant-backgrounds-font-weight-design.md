# Design Spec: Vibrant Backgrounds + Responsive Font Weight

**Date:** 2026-03-15
**Status:** Approved

---

## Overview

Two visual improvements to the Voss Architecture site:

1. **InsleyGrid backgrounds** — dramatically increase color intensity across all five SVG variants so the architectural drawing aesthetic reads as bold, colored-pencil work rather than ghostly watermarks.
2. **Responsive font weight** — increase Cormorant Garamond weight on screens ≥1080px for legibility at large sizes, while keeping the current light (300) weight on mobile.

---

## 1. InsleyGrid Color Intensity

### Goal

Multiply colored line opacities approximately 8–10× from current values. The result should feel like Will Insley's colored pencil elevation drawings — vivid red and blue structural lines, prominent architectural geometry.

### Approach

Direct edits to `src/components/ui/InsleyGrid.tsx`. No new props or abstractions. All five variants updated:

#### `hero` / `section` variants (shared fallback `return` block, line ~218)
Both `hero` and `section` render from a single shared SVG return at the bottom of the file — there is no separate `if (variant === 'section')` branch. All changes below target this one block:
- Diagonal ray group: change `<g opacity="0.15">` → `<g opacity="0.85">`
- Update each individual ray's RGBA stroke color to the following exact values (the `stroke` attribute carries the opacity — there is no separate XML `opacity` attribute on these lines):
  - `rgba(140,110,180,0.7)` → `rgba(140,110,180,0.95)`
  - `rgba(140,110,180,0.6)` → `rgba(140,110,180,0.90)`
  - `rgba(130,140,200,0.65)` → `rgba(130,140,200,0.92)`
  - `rgba(130,140,200,0.55)` → `rgba(130,140,200,0.85)`
  - `rgba(210,160,140,0.5)` → `rgba(210,160,140,0.88)`
- Stroke widths on colored rays: `strokeWidth="1"` → `strokeWidth="1.5"`

#### `dark` variant (conditional group inside the shared fallback block)
The `dark` variant renders via `{variant === 'dark' && (...)}` conditional groups within the same shared SVG return — not a separate `if` branch. **Note: the dark variant stores opacity inside RGBA stroke color strings, not in XML `opacity` attributes.** Target those RGBA values directly:
- Pink band lines — update `stroke` RGBA values:
  - `rgba(210,160,140,0.55)` → `rgba(210,160,140,0.92)` (primary); strokeWidth `1.2` → `1.8`
  - `rgba(210,160,140,0.40)` → `rgba(210,160,140,0.82)` (secondary); strokeWidth `0.8` → `1.2`
  - `rgba(210,160,140,0.38)` → `rgba(210,160,140,0.80)` (secondary); strokeWidth `0.8` → `1.2`
- Blue band lines — update `stroke` RGBA values:
  - `rgba(140,165,210,0.50)` → `rgba(140,165,210,0.88)` (primary); strokeWidth `1.2` → `1.8`
  - `rgba(140,165,210,0.36)` → `rgba(140,165,210,0.78)` (secondary); strokeWidth `0.8` → `1.2`
  - `rgba(140,165,210,0.30)` → `rgba(140,165,210,0.75)` (secondary); strokeWidth `0.8` → `1.2`

#### `elevation` variant
- Terracotta ray group (upper-left fan): `0.28` → `0.90`
- Blue ray group (upper-right fan): `0.22` → `0.80`
- Denser terracotta fan: `0.15` → `0.70`
- Crosshatch band: `0.26` → `0.85`
- Bracket forms: `0.22` → `0.80`
- Stroke widths: change `strokeWidth` only within the three colored ray `<g>` groups — the terracotta upper-left fan (lines ~30–39), the blue upper-right fan (lines ~41–49), and the denser terracotta fan (lines ~51–58). Do NOT change stroke widths on the orthogonal grid, horizon line, building silhouette, crosshatch band (`<g opacity="0.26">` line ~82), or bracket forms (`<g opacity="0.22">` line ~86) — these groups also contain `strokeWidth="0.5"` and must not be touched. Make changes by editing each `<g>` start tag individually rather than doing a file-wide search-and-replace. Within the three fan groups only: `strokeWidth="0.5"` → `"1.0"` and `strokeWidth="0.4"` → `"0.8"`

#### `opaque-city` variant
This variant currently uses only `stroke="#1a1916"` (black/ink) — it is a monochrome isometric drawing. To make it colorful, introduce terracotta and blue strokes matching the palette used in other variants:

- Isometric right-down lines: update the `stroke` attribute on the `<g>` element to `#c07060` (terracotta); change `opacity` on the same `<g>` from `0.14` → `0.65`; change `strokeWidth` on the `<g>` from `0.4` → `0.8`
- Isometric left-down lines: update the `stroke` attribute on the `<g>` element to `#5070a0` (blue); change `opacity` from `0.14` → `0.65`; change `strokeWidth` from `0.4` → `0.8`
- Vertical lines: keep `#1a1916`, opacity `0.12` → `0.50`, stroke-width `0.3` → `0.5`
- Crosshatch blocks: change stroke to `#c07060`, opacity `0.16` → `0.72`, stroke-width `0.3` → `0.6`
- Ellipses: change stroke to `#5070a0`, opacity `0.16` → `0.70`, stroke-width `0.4` → `0.8`
- Vertical spires: keep `#1a1916`, opacity `0.18` → `0.75`, stroke-width `0.4` → `0.7`

#### `passage` variant
- Outer border: `0.35` → `0.75`
- Concentric receding frames — exact per-element targets (identified by `x` attribute):
  - `x=30` (black, 0.30) → `0.65`
  - `x=70` (black, 0.28) → `0.62`
  - `x=115` (black, 0.26) → `0.58`
  - `x=165` (red `#c05040`, 0.36) → `0.90`
  - `x=220` (black, 0.24) → `0.55`
  - `x=278` (blue `#5070a0`, 0.32) → `0.80`
  - `x=340` (black, 0.22) → `0.52`
  - `x=400` (red `#c05040`, 0.32) → `0.85`
  - `x=460` (black, 0.20) → `0.50`
  - `x=510` (blue `#5070a0`, 0.28) → `0.75`
  - `x=545` (black, 0.18) → `0.48`
  - `x=568` (red `#c05040`, 0.36) → `0.90`
  - `x=583` (black, 0.28) → `0.60`
- Perspective corner lines: `0.18` → `0.65`
- Red accent diagonals: `0.26` → `0.80`; stroke width `0.5` → `1.0`
- Blue accent diagonals: `0.22` → `0.72`; stroke width `0.5` → `1.0`
- Red structural lines: `0.30` → `0.82`; stroke width `0.5` → `1.0`
- Blue structural lines: `0.22` → `0.72`; stroke width `0.5` → `1.0`
- Fine graph paper grid: `0.09` → `0.22`
- Vanishing point mark: `0.65` → `0.90`; drop-line `0.75` → `0.95`
- Add subtle terracotta background wash as the **first child** of the SVG, inserted immediately after the opening `<svg ...>` tag and before the existing `<g opacity="0.09">` fine graph paper grid group (currently the first child at line ~158): `<rect x="0" y="0" width="1200" height="480" fill="rgba(192,80,64,0.06)"/>`

### What does NOT change
- Orthogonal/structural grid lines (pure `#1a1916`) — stay at or near current opacity values; they are legibility infrastructure
- SVG viewBox, preserveAspectRatio, and geometry — unchanged for all variants
- Stroke colors for `hero`, `section`, `dark`, `elevation`, and `passage` variants — these already have colored lines; only opacities and stroke widths change. Exception: `opaque-city` intentionally gains new colors (terracotta + blue) as described above.
- Component API (props, variant names) — unchanged

---

## 2. Responsive Font Weight

### Goal

On screens ≥1080px, increase Cormorant Garamond weights so text holds presence at large viewport sizes. Mobile retains the current weight-300 throughout.

### Why CSS-only won't work

`fontWeight: 300` is hardcoded as an inline React `style` prop across ~60 elements in 16 component/page files. CSS media queries cannot override inline styles. A CSS-variable approach is required.

### Approach: CSS Custom Properties

**Step 1 — Define variables in `globals.css`:**

- In the existing `:root` block (line ~7), add two new custom properties:
  ```css
  --fw-body: 300;
  --fw-heading: 300;
  ```

- Inside the existing `@media (min-width: 1080px)` block (line ~228), add a **new `:root { }` selector** containing the override values. The existing block only has `.page-hero` and `.wide-container` rules — add the `:root` block alongside them:
  ```css
  @media (min-width: 1080px) {
    /* existing rules — keep untouched */
    .page-hero { ... }
    .wide-container { ... }

    /* new */
    :root {
      --fw-body: 400;
      --fw-heading: 500;
    }
  }
  ```

Also update existing CSS class rules in `globals.css` to reference the vars. Do NOT add new rule blocks — edit the existing ones. Only `h1–h6` and `p` get the responsive vars; small-print classes (`.eyebrow`, `.section-label`, `.btn-primary`, `.btn-outline`) are ≤12px and intentionally stay at 300:

- Line ~69: existing `h1–h6` rule — change `font-weight: 300` → `font-weight: var(--fw-heading)`
- Line ~77: existing `p` rule — change `font-weight: 300` → `font-weight: var(--fw-body)`
- `.eyebrow`, `.section-label`, `.btn-primary`, `.btn-outline` — **do not change**; these are ≤12px decorative labels that stay at weight 300 at all screen sizes

**Step 2 — Update inline styles across all affected files:**

Replace `fontWeight: 300` with either `fontWeight: 'var(--fw-heading)'` or `fontWeight: 'var(--fw-body)'` depending on the element. Use this rule:

- **Heading elements** (`h1`, `h2`, `h3`, large display `span`/`div` with fontSize ≥28px) → `fontWeight: 'var(--fw-heading)'`
- **Body text elements** (`p`, descriptive `span`/`div` with fontSize 14–27px) → `fontWeight: 'var(--fw-body)'`
- **Small utility labels** (fontSize ≤12px — eyebrows, nav items, metadata, timestamps, tiny uppercase labels) → **keep `fontWeight: 300`** hardcoded; these are decorative and should stay light at all sizes

**Font weight availability:** `globals.css` imports Cormorant Garamond weights 300, 400, 500; `layout.tsx` loads the same via `next/font`. No loading changes needed.

### Files requiring inline style updates

Apply the heading/body/keep rule above to every `fontWeight: 300` instance in these files:

| File | Notes |
|------|-------|
| `src/components/sections/HeroSection.tsx` | 2 headline spans → heading var; tagline + scroll → keep 300 |
| `src/components/sections/FeaturedProject.tsx` | Project title → heading; description/meta → body |
| `src/components/sections/PhilosophyBand.tsx` | Blockquote → heading; label/attribution → keep 300 |
| `src/components/sections/ProjectGrid.tsx` | Project titles → heading; metadata → keep 300 |
| `src/components/sections/ProjectsGrid.tsx` | Project titles → heading; excerpts → body; labels → keep 300 |
| `src/components/sections/ProcessSection.tsx` | Step headings → heading; descriptions → body |
| `src/components/sections/TaglineSection.tsx` | Large tagline text → heading |
| `src/components/layout/Navigation.tsx` | All nav items ≤12px → keep 300 |
| `src/components/layout/Footer.tsx` | Footer brand name → heading; address/links → keep 300 |
| `src/app/studio/page.tsx` | h1 → heading; body p → body; team labels → keep 300 |
| `src/app/process/page.tsx` | h1/h2 → heading; body p → body; labels → keep 300 |
| `src/app/journal/page.tsx` | h1/h2 → heading; excerpts → body; dates/labels → keep 300 |
| `src/app/projects/page.tsx` | h1 → heading; descriptions → body |
| `src/app/projects/[slug]/page.tsx` | h1 → heading; description/body p → body; metadata spans → keep 300 |
| `src/app/contact/page.tsx` | h1 → heading; body p → body; labels → keep 300 |
| `src/app/not-found.tsx` | `<h1>` → heading var; 10px eyebrow span + 11px button span → keep 300; remaining body text → body var |

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/ui/InsleyGrid.tsx` | Boost color opacities ~8–10× across all 5 variants |
| `src/styles/globals.css` | Add `--fw-body`/`--fw-heading` CSS vars; media query overrides; update class rules |
| `src/components/sections/HeroSection.tsx` | fontWeight inline style updates |
| `src/components/sections/FeaturedProject.tsx` | fontWeight inline style updates |
| `src/components/sections/PhilosophyBand.tsx` | fontWeight inline style updates |
| `src/components/sections/ProjectGrid.tsx` | fontWeight inline style updates |
| `src/components/sections/ProjectsGrid.tsx` | fontWeight inline style updates |
| `src/components/sections/ProcessSection.tsx` | fontWeight inline style updates |
| `src/components/sections/TaglineSection.tsx` | fontWeight inline style updates |
| `src/components/layout/Navigation.tsx` | fontWeight inline style updates (keep 300 on all) |
| `src/components/layout/Footer.tsx` | fontWeight inline style updates |
| `src/app/studio/page.tsx` | fontWeight inline style updates |
| `src/app/process/page.tsx` | fontWeight inline style updates |
| `src/app/journal/page.tsx` | fontWeight inline style updates |
| `src/app/projects/page.tsx` | fontWeight inline style updates |
| `src/app/projects/[slug]/page.tsx` | fontWeight inline style updates |
| `src/app/contact/page.tsx` | fontWeight inline style updates |
| `src/app/not-found.tsx` | fontWeight inline style updates |

---

## Success Criteria

- All InsleyGrid colored line groups render at their target opacities (≥0.65 for colored lines; see per-variant targets in section 1 above)
- `opaque-city` variant displays terracotta isometric right-down lines and blue isometric left-down lines (previously all black)
- `passage` variant SVG contains a full-bleed `<rect x="0" y="0" width="1200" height="480" fill="rgba(192,80,64,0.06)"/>` as its first child
- At viewport ≥1080px: heading elements (h1–h6, large display spans) render at weight 500; body text renders at weight 400
- At viewport ≤1079px (including mobile and mid-range tablets): all text remains weight 300 — visually unchanged from current
- `--fw-heading` and `--fw-body` CSS variables are defined in `:root` and overridden inside the `@media (min-width: 1080px)` block
- No layout shifts, no new dependencies, no regressions to existing color tokens or component APIs
