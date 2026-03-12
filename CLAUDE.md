# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Development server → http://localhost:3000
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint via next lint
```

No test suite is configured.

## Architecture

Next.js 14 App Router site using TypeScript, Tailwind CSS, and Framer Motion. All pages are client-rendered (`'use client'`) and the site is statically exportable — no server functions.

**Data layer:** All project content lives in `src/lib/projects.ts` as a typed `Project[]` array. The `id` field is the URL slug. `featured: true` controls which project appears in the home page hero. To add/edit projects, only this file needs to change.

**Routing:** App Router pages under `src/app/`. The dynamic route `src/app/projects/[slug]/page.tsx` resolves slugs via `getProjectById(params.slug)` from the projects data file and calls `notFound()` for missing slugs.

**Styling approach:** A mix of Tailwind utilities and inline `style` props — inline styles dominate in section/page components. Design tokens are CSS custom properties defined in `src/styles/globals.css` (`--ink`, `--vellum`, `--stone`, `--dust`, `--pale`, `--warm`, `--accent`). Global utility classes (`.eyebrow`, `.section-label`, `.btn-primary`, `.btn-outline`, `.grid-bg`, `.grid-bg-fine`) are also defined there and used throughout.

**Visual language:** The design references Will Insley's ONECITY drawings. `InsleyGrid.tsx` is a pure SVG component (no animation) used as an absolute-positioned background layer. It accepts `variant: 'hero' | 'section' | 'dark'` to switch stroke colors and enable/disable colored diagonal rays. `ArchDrawing.tsx` renders architectural drawing placeholders (elevation/plan/section) and is meant to be replaced with real `<Image>` components when photography is available — store images in `public/images/`.

**Typography:** Cormorant Garamond (Google Fonts), weight 300 throughout, italic for expressive moments. Loaded via `next/font/google` in `src/app/layout.tsx` as CSS variable `--font-cormorant`.

**Animation:** Framer Motion `motion.div` with `initial/animate` props on page entry — typically `opacity: 0, y: 20` → `opacity: 1, y: 0` with staggered `delay` values.

## Content & Branding

To rebrand away from "Voss Architecture / Alejandro Voss", update these four files:
- `src/app/layout.tsx` — metadata title and description
- `src/components/layout/Navigation.tsx` — logo text
- `src/components/layout/Footer.tsx` — brand name and address
- `src/components/sections/HeroSection.tsx` — hero eyebrow and coordinate annotations
