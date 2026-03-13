# Coding Conventions

**Analysis Date:** 2026-03-13

## Naming Patterns

**Files:**
- PascalCase for React components: `HeroSection.tsx`, `ProjectGrid.tsx`, `InsleyGrid.tsx`
- camelCase for utility files: `projects.ts`, `globals.css`
- Descriptive names based on function: section components use "Section" suffix (`HeroSection.tsx`, `PhilosophyBand.tsx`)
- UI components use context: `InsleyGrid.tsx`, `ArchDrawing.tsx`, `ProjectCard` (nested component)

**Functions:**
- camelCase for all function names
- Helper functions start with verb: `getProjectById()`, `getFeaturedProject()`, `chunk()`
- Event handlers use `handle` prefix: `handleKey()`, `handleClick()` (anonymous in this codebase, seen via arrow functions)
- React components are default exports with PascalCase names

**Variables:**
- camelCase for local variables and state: `menuOpen`, `scrolled80`, `tapped`, `reducedMotion`
- CONSTANT_CASE for module-level configuration arrays: `navLinks` (follows camelCase here, not constants)
- Descriptive names for refs: `sectionRef`, `ref` (generic when scope is clear)
- CSS custom property names use `--kebab-case`: `--ink`, `--vellum`, `--font-cormorant`

**Types:**
- PascalCase for interfaces: `Project`, `ProjectCardProps`, `ProjectGridProps`, `InsleyGridProps`
- Union types for strict enums: `type: 'Residence' | 'Development' | 'Condominium' | 'Commercial'`
- Discriminated types for variant-based rendering: `variant: 'hero' | 'section' | 'dark'`

## Code Style

**Formatting:**
- No explicit formatter configured (ESLint via `next lint` available but config minimal)
- Consistent indentation: 2 spaces observed throughout
- Inline styles dominate over className in section/page components
- Components use both inline styles and Tailwind utilities when minimal className usage

**Linting:**
- ESLint v8 via Next.js default config (`eslint-config-next`)
- `npm run lint` runs Next.js linting
- No .eslintrc config file — using Next.js default rules
- TypeScript strict mode enabled in `tsconfig.json`: `"strict": true`

**Line length:**
- No hard limit observed, but inline objects and JSX use consistent readable formatting
- Multi-line prop objects formatted with each property on its own line

## Import Organization

**Order:**
1. React/Next.js imports: `import { useState, useRef } from 'react'`
2. Next.js framework imports: `import Image from 'next/image'`, `import Link from 'next/link'`
3. Third-party libraries: `import { motion, useInView } from 'framer-motion'`
4. Local imports with `@/` alias: `import HeroSection from '@/components/sections/HeroSection'`

**Path Aliases:**
- `@/*` → `./src/*` (defined in `tsconfig.json`)
- All local imports use `@/` prefix for absolute paths
- Never use relative paths like `../../../components`
- Components organized by domain: `@/components/layout/`, `@/components/sections/`, `@/components/ui/`
- Library code in `@/lib/`

## Error Handling

**Patterns:**
- Next.js `notFound()` for missing dynamic routes (e.g., `src/app/projects/[slug]/page.tsx`)
- Explicit null-checks with optional chaining: `project?.featured`, `project?.subtitle`
- Nullish coalescing for fallbacks: `projects.find((p) => p.featured) ?? projects[0]`
- Guard clauses: `if (!project) notFound()` — early return pattern used
- No try-catch blocks observed — errors propagate to Next.js error boundary

**Validation:**
- TypeScript strict mode ensures type safety at compile time
- Interface-based validation for component props: `ProjectCardProps`, `InsleyGridProps`
- Data layer validation in `projects.ts` via `Project` interface with required/optional fields

## Logging

**Framework:** No logging library configured. Codebase uses browser console only if needed.

**Patterns:**
- No console.log statements observed in production code
- Client components use `'use client'` directive for browser-side code
- No structured logging; would use console methods if needed (console.log, console.error)

## Comments

**When to Comment:**
- Inline comments used sparingly
- Comments mark major architectural regions: `/* Logo */`, `/* Desktop nav */`, `/* Mobile overlay */`
- Comments explain intent of complex visual calculations
- JSDoc comments not used

**Example from `Navigation.tsx`:**
```typescript
// Module-level singleton — persists across route remounts in the same browser session
let navigationHasMounted = false

// Singleton mount flag: animates in once on first visit, skips on route changes
const [skipInitial] = useState(() => {
  const skip = navigationHasMounted
  if (typeof window !== 'undefined') navigationHasMounted = true
  return skip
})

// Reduced-motion fallback: snap padding at 80px threshold
useEffect(() => { ... })
```

## Function Design

**Size:**
- Small, single-responsibility functions preferred
- Helper functions 5-25 lines (e.g., `chunk<T>()` in `ProjectGrid.tsx`)
- Components often 50-150 lines, larger pages reach 170 lines with nested JSX

**Parameters:**
- Destructured props object standard for React components
- Type annotations on all parameters: `({variant, color = '#1a1916'}: ArchDrawingProps)`
- Default parameters used: `function chunk<T>(arr: T[], size: number): T[][]`

**Return Values:**
- Components return JSX wrapped in fragments or divs
- Explicit return types for functions with logic: `const getFeaturedProject = (): Project =>`
- Implicit returns in short lambdas: `navLinks.map((link) => ({ ...link }))`

## Module Design

**Exports:**
- Default exports for React components
- Named exports for utility functions: `export const getProjectById()`, `export const getFeaturedProject()`
- Interfaces exported as named exports: `export interface Project`
- Data arrays exported as named exports: `export const projects: Project[]`

**Barrel Files:**
- Not used in this codebase — components import directly from source files
- Each file has single export (component or utilities)

**Module Organization Pattern:**
```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── layout/          # Reusable layout wrappers (Navigation, Footer)
│   ├── sections/        # Page section components
│   └── ui/              # Primitive/utility components (InsleyGrid, ArchDrawing)
├── lib/                 # Pure functions and data (projects.ts)
└── styles/              # Global CSS
```

## Client Rendering

**Pattern:**
- All interactive components marked with `'use client'` directive
- Pages using Framer Motion, state, or event handlers are client components
- Layout.tsx is server component (metadata, font loading)
- No server functions or actions used — static site exportable

## Inline Styles vs CSS Classes

**Guidelines:**
- Dynamic values computed at runtime use inline `style` prop
- Static utility classes defined in `globals.css` used via `className`
- Responsive behavior via embedded `<style>` tags with media queries within components
- CSS variables (`--ink`, `--vellum`, etc.) used throughout inline styles
- Tailwind utilities available but rarely used — most styling is inline or CSS classes

**Example from `HeroSection.tsx`:**
```typescript
style={{
  position: 'relative',
  height: '100vh',
  minHeight: '640px',
  overflow: 'hidden',
}}
```

**Example of embedded responsive styles in `Navigation.tsx`:**
```typescript
<style>{`
  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-hamburger { display: block !important; }
  }
`}</style>
```

## Color Tokens

Design tokens from `globals.css`:
- `--ink` (#1a1916) — primary dark text
- `--vellum` (#f4f1ea) — light background/accent text
- `--stone` (#c8c4b8) — subtle neutral
- `--dust` (#e8e4dc) — lighter neutral
- `--pale` (#fafafa) — very light background
- `--warm` (#fafafa) — page background
- `--accent` (#2563eb) — action color

## Typography

**Font:**
- Cormorant Garamond (Google Fonts), weights 300, 400, 500, italic variants
- Loaded via `next/font/google` in `layout.tsx` with CSS variable `--font-cormorant`
- Weight 300 standard throughout (light, elegant aesthetic)
- Italic used sparingly for expressive moments (quotes, subtitles)
- Font sizes use `clamp(minpx, percentage, maxpx)` for responsive scaling

**Example:**
```typescript
fontSize: 'clamp(72px, 10vw, 160px)'  // Scales responsively
fontStyle: 'italic'                   // Expressive moments only
fontWeight: 300                       // Default weight
```

---

*Convention analysis: 2026-03-13*
