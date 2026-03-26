# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Voss Architecture
**Generated:** 2026-03-12 17:06:10
**Category:** Architecture / Luxury Residential

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Ink (Primary) | `#1a1916` | `--color-ink` |
| Vellum | `#f4f1ea` | `--color-vellum` |
| Stone | `#c8c4b8` | `--color-stone` |
| Dust | `#e8e4dc` | `--color-dust` |
| Pale | `#f9f7f3` | `--color-pale` |
| Warm White (Background) | `#faf8f4` | `--color-background` |
| Accent | `#c8a882` | `--color-accent` |

**Color Notes:** Warm monochrome. No blue. No gradients. Everything references architectural drawing materials — ink, vellum, stone, dust.

### Typography

- **Primary Font:** Cormorant Garamond
- **Weight:** 300 throughout. Italic for expressive and display moments.
- **No secondary sans-serif font.**
- **Mood:** Architectural precision, editorial restraint, drawn letterforms
- **Google Fonts:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');
```

**CSS Variable:**
```css
--font-primary: 'Cormorant Garamond', Georgia, serif;
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

Shadow usage is minimal. This is a flat, precise visual language. Shadows are reserved for glass panel effects only.

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(26,25,22,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(26,25,22,0.08)` | Glass panels |

---

## Component Specs

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: #1a1916;
  color: #faf8f4;
  padding: 15px 36px;
  border-radius: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  border: none;
  transition: opacity 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.8;
}

/* Ghost / Outline Button */
.btn-ghost {
  background: transparent;
  color: #1a1916;
  border: none;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  opacity: 0.55;
  transition: opacity 200ms ease;
  cursor: pointer;
}

.btn-ghost:hover {
  opacity: 1;
}
```

### Cards
```css
.card {
  background: #f9f7f3;
  border-radius: 0;
  border: 0.5px solid rgba(26,25,22,0.08);
  transition: opacity 200ms ease;
  cursor: pointer;
}

.card:hover {
  opacity: 0.85;
}
```

No border-radius on cards. No box-shadow. No transform on hover.

### Inputs
```css
.input {
  padding: 12px 0;
  border: none;
  border-bottom: 0.5px solid rgba(26,25,22,0.2);
  background: transparent;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300;
  font-size: 17px;
  color: #1a1916;
  transition: border-color 200ms ease;
  outline: none;
  width: 100%;
}

.input:focus {
  border-bottom-color: rgba(26,25,22,0.6);
}
```

### Navigation
```css
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 24px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(250,248,244,0.92);
  backdrop-filter: blur(16px);
  border-bottom: 0.5px solid rgba(26,25,22,0.08);
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```

---

## Style Guidelines

**Style:** Architectural Minimalism with Insley Grid Reference

**Keywords:** Precision, restraint, negative space, drawn line, vellum, horizon, threshold

**Best For:** Architecture, luxury residential, editorial, gallery

**Key Effects:** 0.5px hairline borders throughout. No border-radius except on navigation blur panel. Cormorant Garamond weight 300 at all sizes. SVG grid backgrounds referencing Will Insley's ONECITY drawings.

### Page Pattern

**Pattern Name:** Portfolio Gallery

- **Conversion Strategy:** Image-first. Architectural drawing placeholders until photography is available. Filter by project type. Hover reveals project details.
- **CTA Placement:** Hero actions + Contact page enquiry form
- **Section Order:** 1. Hero with Insley grid background, 2. Featured project, 3. Project grid, 4. Philosophy band (dark), 5. Process steps, 6. Footer

---

## Insley Design Reference

All background grid elements reference Will Insley's ONECITY drawings (1972–81):

- The primary grid is derived from Building No. 33, Passage Space Mountain (Isometric)
- Diagonal ray lines in muted pink/blue reference the ONECITY Building Room Section Red Green Elevation (1978–81)
- The diamond/rhombus form references the concentric hatching in his pencil elevation drawings
- The horizon line is a first-principle element — Insley described his buildings as existing to worship the horizon line

The site footer carries the Insley citation: *"to contain spatial situations sympathetic to the horizon line"*

---

## Anti-Patterns (Do NOT Use)

- NO blue accent colors
- NO rounded corners (border-radius: 0 on all cards, buttons, containers)
- NO box shadows on cards
- NO transform: translateY on hover
- NO AI purple/pink gradients
- NO Inter, Roboto, Space Grotesk, or sans-serif fonts
- NO emojis as icons — use SVG (Lucide, Heroicons)
- NO loud animations or bounce effects
- NO dark mode (this is a warm-light site)

### Additional Forbidden Patterns

- NO missing cursor:pointer on clickable elements
- NO layout-shifting hover effects
- NO low contrast text — maintain 4.5:1 minimum
- NO instant state changes — always use transitions 150–300ms
- NO invisible focus states

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons
- [ ] All icons from Lucide or Heroicons (SVG)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with transitions 150–300ms
- [ ] No border-radius on cards or buttons
- [ ] Cormorant Garamond weight 300 used throughout
- [ ] Warm monochrome palette only — no blue
- [ ] Text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] 0.5px hairline borders, not 1px or 2px