# Testing Patterns

**Analysis Date:** 2026-03-13

## Test Framework

**Runner:**
- Not configured — no test suite installed

**Assertion Library:**
- No assertion library configured

**Run Commands:**
```bash
npm run dev       # Development server only
npm run build     # Production build validation
npm run lint      # ESLint via next lint
npm run start     # Serve production build
```

**Status:**
- `package.json` contains no test or testing-related dependencies
- No jest, vitest, mocha, or other test framework installed
- ESLint (`^8`) provides only code quality checks, not functional testing
- No TypeScript test utilities or mocking libraries installed

## Manual Testing & Validation

**Development Workflow:**
- `npm run dev` — Start local dev server at `http://localhost:3000`
- Manual browser testing via visual inspection
- TypeScript compiler provides static type checking
- ESLint provides code style validation via `npm run lint`

**Build Validation:**
- `npm run build` — Compiles all TypeScript and pages
- Next.js checks for errors during build process
- Static export ready (no dynamic routes generating content)

**Browser Testing Checklist (Implicit):**
- Visual inspection of responsive layouts (mobile: max-width 768px)
- Navigation state and menu interactions
- Framer Motion animations and scroll effects
- Image loading and optimization
- Link routing between pages

## Test Coverage

**Requirements:** None enforced — 0% coverage

**Static Validation:**
- TypeScript strict mode enabled (`"strict": true` in `tsconfig.json`)
- Type checking at compile time catches many potential errors
- Interface contracts define expected shapes: `Project`, `ProjectCardProps`, `InsleyGridProps`

## Potential Areas for Testing

If a test framework were added, these areas would benefit from coverage:

**Data Layer (`src/lib/projects.ts`):**
- `getProjectById()` — Test retrieval by slug, missing projects
- `getFeaturedProject()` — Test selection of featured project, fallback to first
- Project array validation — Test interface compliance

**Utility Functions (`src/components/sections/ProjectGrid.tsx`):**
- `chunk<T>()` — Test array chunking with various sizes

**Responsive Behavior:**
- Test media query breakpoints (768px) for layout changes
- Test mobile/desktop view rendering

**Navigation State (`src/components/layout/Navigation.tsx`):**
- Menu open/close state
- Scroll padding animation
- Reduced motion handling
- Route change menu closing

**Dynamic Routes (`src/app/projects/[slug]/page.tsx`):**
- Test `notFound()` for invalid slugs
- Test next project cycling
- Test project detail display

## Notes on Current Architecture

**No Need for Mocking:**
- No external API calls — all data in `projects.ts`
- No database dependencies — static data array
- Components are presentational with minimal logic
- Framer Motion animations tested via visual inspection

**TypeScript as Quality Tool:**
- Type annotations provide compile-time safety
- Strict mode catches null/undefined issues
- Interface contracts document component expectations
- Union types (`'Residence' | 'Development'`) enforce valid values

**Static Site Benefits:**
- No backend to test
- No server-side logic to unit test
- Build process validates all TypeScript and page compilation
- Manual testing sufficient for visual site

## Recommended Testing Setup (If Added)

If testing becomes a priority, consider:

**Framework:** Vitest (lightweight, Next.js compatible) or Jest (industry standard)

**For Data Layer:**
```typescript
// Example: would test getProjectById()
import { describe, it, expect } from 'vitest'
import { getProjectById, projects } from '@/lib/projects'

describe('projects', () => {
  it('should retrieve project by ID', () => {
    const project = getProjectById('house-01')
    expect(project).toBeDefined()
    expect(project?.title).toBe('Project I')
  })

  it('should return undefined for missing project', () => {
    const project = getProjectById('invalid-id')
    expect(project).toBeUndefined()
  })
})
```

**For Components:**
```typescript
// Example: would test ProjectCard rendering
import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/sections/ProjectCard'

describe('ProjectCard', () => {
  it('should render project title', () => {
    render(
      <ProjectCard
        project={mockProject}
        height="62vh"
        cardIndex={0}
        inView={true}
        reducedMotion={false}
      />
    )
    expect(screen.getByText('Project I')).toBeInTheDocument()
  })
})
```

**Dependencies to Add:**
- `vitest` or `jest`
- `@testing-library/react` (component testing)
- `@testing-library/user-event` (user interaction simulation)
- `framer-motion` testing utilities for animation assertions (optional)

---

*Testing analysis: 2026-03-13*
