# Voss Architecture Portfolio

## What This Is

A statically-exportable Next.js 14 App Router architect portfolio showcasing residential and development projects. The site renders client-side with Framer Motion animations, a Will Insley–inspired visual language, and a centralized project data layer in `src/lib/projects.ts`.

## Core Value

A polished, professional portfolio that works flawlessly on every device — mobile visitors must never encounter layout bugs or jarring scroll state.

## Requirements

### Validated

- ✓ Homepage with Hero, Tagline, Grid, Philosophy, and Footer sections — existing
- ✓ Projects page with asymmetric grid and dynamic filters (Residential / Development) — existing
- ✓ Project detail pages at `/projects/[slug]` resolved from `projects.ts` — existing
- ✓ InsleyGrid SVG background component with hero/section/dark variants — existing
- ✓ ArchDrawing placeholder component for project imagery — existing
- ✓ Navigation and Footer layout components — existing
- ✓ Design system with CSS custom properties (`--ink`, `--vellum`, `--stone`, etc.) — existing
- ✓ Cormorant Garamond typography via next/font — existing
- ✓ Framer Motion page-entry animations — existing

### Active

- [ ] Eliminate horizontal overflow / scrollbar on all pages at 360–430px mobile widths
- [ ] Scroll position resets to top on every page navigation (any route change)

### Out of Scope

- CMS integration — static data in `projects.ts` is intentional
- New pages or sections — content changes only if needed to fix layout
- Desktop layout changes — fixes must not regress desktop appearance
- Real photography — ArchDrawing placeholders remain until user swaps them

## Context

- Inline `style` props dominate layout sizing (not Tailwind utilities), making overflow harder to catch with utility-class audits — need to inspect computed widths
- App Router with all `'use client'` pages — scroll reset requires a client-side navigation listener since Next.js App Router does not reset scroll by default for client navigations
- InsleyGrid SVG component uses absolute positioning and may contribute to viewport overflow if its intrinsic size exceeds the container
- No test suite configured

## Constraints

- **Tech stack**: Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion — no new dependencies unless necessary
- **Static export**: No server functions — scroll-reset solution must be client-side only
- **Visual fidelity**: Desktop layout must be pixel-identical after changes

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fix overflow globally via `overflow-x: hidden` on root | Prevents any component from causing horizontal scroll | — Pending |
| Scroll reset via `usePathname` hook in layout | App Router provides `usePathname`; a `useEffect` watching it can call `window.scrollTo(0,0)` | — Pending |

---
*Last updated: 2026-03-14 after initialization*
