# Architecture

**Analysis Date:** 2026-03-13

## Pattern Overview

**Overall:** Client-rendered Next.js 14 App Router portfolio with centralized data source and layout-driven composition.

**Key Characteristics:**
- All pages are client-rendered (`'use client'`) — no server functions
- Static-export capable — designed for CDN deployment
- Single source of truth: project content lives in `src/lib/projects.ts`
- Section-based page composition via reusable component library
- Inline style props dominate over className for layout (CSS-in-JS pattern)
- Design system tokens defined as CSS custom properties

## Layers

**Presentation Layer:**
- Purpose: React components that render the visual interface
- Location: `src/components/`
- Contains: Layout components (`Navigation`, `Footer`), section components (`HeroSection`, `ProjectGrid`, `PhilosophyBand`), and UI primitives (`InsleyGrid`, `ArchDrawing`)
- Depends on: Data layer (via `src/lib/projects.ts`), Framer Motion for animation, Next.js Image/Link for optimization
- Used by: App Router pages

**Data Layer:**
- Purpose: Type definitions and static project dataset
- Location: `src/lib/projects.ts`
- Contains: `Project` interface with required fields (`id`, `title`, `type`, `status`, etc.) and `projects` array; utility functions (`getProjectById()`, `getFeaturedProject()`)
- Depends on: Nothing (pure TypeScript)
- Used by: All pages and components that display projects

**Routing Layer:**
- Purpose: URL structure and page entry points
- Location: `src/app/` (Next.js App Router)
- Contains: Page components, dynamic routes, and global layout
- Depends on: Presentation layer, data layer
- Used by: Next.js router to match URLs to pages

**Styling Layer:**
- Purpose: Design system definition and global styles
- Location: `src/styles/globals.css`
- Contains: CSS custom properties (design tokens), Tailwind directives, utility classes (`.eyebrow`, `.section-label`, `.btn-primary`, `.grid-bg`), and global typography rules
- Depends on: Google Fonts (Cormorant Garamond), Tailwind CSS
- Used by: All components via CSS variables and class names

## Data Flow

**Project Display Flow:**

1. Page requests projects via import: `import { projects } from '@/lib/projects'`
2. Component receives project array as prop
3. Component maps projects to `ProjectCard` or detail view
4. `ProjectCard` renders `Image` from `project.coverImage` (from `public/images/`)
5. User navigation to detail page: `/projects/[slug]` resolves slug via `getProjectById()`
6. Detail page constructs "next project" by cycling array: `projects[(currentIndex + 1) % projects.length]`

**State Management:**
- Global state: Routing via Next.js (URL slug)
- Component state: UI toggles (`menuOpen`, `hovered`, `tapped`) managed per-component with `useState`
- Animation state: Handled by Framer Motion with `initial/animate` props; scroll-driven effects via `useScroll()` and `useTransform()`
- No global state library — all state is local or URL-derived

**Project Lookup:**
- Single-entry point: `getProjectById(id: string)` in `src/lib/projects.ts`
- Fallback: If project not found, `notFound()` (Next.js) triggers 404 page (`src/app/not-found.tsx`)
- Featured project: `getFeaturedProject()` returns first project with `featured: true` or fallback to `projects[0]`

## Key Abstractions

**Project Type:**
- Purpose: Typed structure for architecture project metadata
- Examples: `src/lib/projects.ts` (interface definition and export)
- Pattern: TypeScript interface with literal union types for `type` and `status` fields — enforces valid values at compile time

**ProjectCard Component:**
- Purpose: Reusable project grid cell with hover/tap states
- Examples: `src/components/sections/ProjectGrid.tsx` (nested `ProjectCard` function component)
- Pattern: Accepts `project`, `height`, `cardIndex`, `inView`, `reducedMotion` props; uses Framer Motion for staggered animations and hover overlays; mobile tap detection via `matchMedia`

**Section Components:**
- Purpose: Major page sections that compose pages
- Examples: `HeroSection`, `TaglineSection`, `ProjectGrid`, `PhilosophyBand` (in `src/components/sections/`)
- Pattern: All are client components; receive props for data or config; use inline styles for layout; animate on mount or scroll

**InsleyGrid SVG:**
- Purpose: Visual background layer referencing Will Insley's ONECITY drawings
- Examples: `src/components/ui/InsleyGrid.tsx`
- Pattern: Pure SVG component (no animation); accepts `variant: 'hero' | 'section' | 'dark'` to toggle stroke colors and ray visibility; absolutely positioned behind content

## Entry Points

**Home Page (`/`):**
- Location: `src/app/page.tsx`
- Triggers: Root URL or explicit navigation
- Responsibilities: Compose homepage from six sections (Navigation, HeroSection, TaglineSection, ProjectGrid, PhilosophyBand, Footer)

**Projects Gallery (`/projects`):**
- Location: `src/app/projects/page.tsx`
- Triggers: `/projects` URL
- Responsibilities: Display all projects with filter UI (`All`, `Residential`, `Development`, `Commercial`); manage filter state; pass filtered array to `ProjectGrid`

**Project Detail (`/projects/[slug]`):**
- Location: `src/app/projects/[slug]/page.tsx`
- Triggers: `/projects/{project.id}` URL
- Responsibilities: Resolve slug to project via `getProjectById()`; render hero with cover image; display project metadata in two-column intro; render image gallery; display next-project navigation link

**Other Pages:**
- `/process` — Philosophy page via `src/app/process/page.tsx`
- `/studio` — Studio page via `src/app/studio/page.tsx`
- `/journal` — Journal page via `src/app/journal/page.tsx`
- `/contact` — Contact page via `src/app/contact/page.tsx`

**Layout Wrapper:**
- Location: `src/app/layout.tsx`
- Triggers: Every page load
- Responsibilities: Load Cormorant Garamond font; set document metadata; apply global styles; render `<html>` and `<body>` with font variable

## Error Handling

**Strategy:** Shallow — only project detail pages handle errors explicitly.

**Patterns:**
- Dynamic route not found: `notFound()` from `next/navigation` triggers 404 page (`src/app/not-found.tsx`)
- Missing project: `getProjectById()` returns `undefined`; page checks `if (!project) notFound()`
- No try/catch blocks — relies on Next.js routing and TypeScript compile-time safety

## Cross-Cutting Concerns

**Logging:** None — this is a frontend-only portfolio with no analytics or error reporting configured.

**Validation:** Compile-time only via TypeScript interfaces. No runtime validation of project data.

**Authentication:** Not applicable — all pages are public.

**Accessibility:** Basic: ARIA labels on Navigation hamburger (`aria-label`, `aria-expanded`); semantic HTML (`<nav>`, `<main>`, `<section>`); Framer Motion respects `prefers-reduced-motion` via `useReducedMotion()` hook; color contrast defined by design tokens.

**Mobile Responsiveness:** Media queries in `globals.css` and inline styles. Breakpoint: 768px. Layout shifts: grid columns collapse to 1 column, padding reduces from 56px to 24px, images scale to viewport width.

**Performance:** Next.js Image optimization (responsive sizes, lazy loading); Framer Motion animations respect reduced-motion preference; scroll event listeners on Navigation use `useScroll()` (RAF-throttled by Framer Motion); no unnecessary re-renders (components memoized implicitly by React).

---

*Architecture analysis: 2026-03-13*
