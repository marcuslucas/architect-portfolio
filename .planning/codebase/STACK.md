# Technology Stack

**Analysis Date:** 2026-03-13

## Languages

**Primary:**
- TypeScript 5.x - All source code uses strict TypeScript (strict mode enabled)
- JSX/TSX - React components throughout

**Secondary:**
- JavaScript - Build configuration files (`next.config.js`, `postcss.config.js`)
- CSS - Tailwind CSS utilities and custom CSS variables in `src/styles/globals.css`

## Runtime

**Environment:**
- Node.js (no version pinned in `.nvmrc` or `engines` field)

**Package Manager:**
- npm (uses `package-lock.json`)
- Lockfile: present and committed

## Frameworks

**Core:**
- Next.js 16.1.6 - App Router framework for server/client components
- React 18 - UI library with hooks
- React DOM 18 - DOM rendering

**Styling:**
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- PostCSS 8.x - CSS processing pipeline with autoprefixer
- Autoprefixer 10.0.1 - Browser vendor prefix support

**Animation:**
- Framer Motion 11.3.8 - Animation and motion library (used for page transitions and component reveals)

**Utilities:**
- clsx 2.1.1 - Conditional className builder

**Fonts:**
- Cormorant Garamond - Loaded via `next/font/google` with weights 300, 400, 500 and italic style

## Key Dependencies

**Critical:**
- next 16.1.6 - Framework core; provides App Router, image optimization, font loading
- framer-motion 11.3.8 - Powers all page transitions and staggered animations (core to visual experience)
- tailwindcss 3.4.1 - Styling system; custom color tokens for design system

**Build/Dev Infrastructure:**
- typescript 5.x - Type checking at compile time
- eslint 8.x - Code linting
- eslint-config-next 14.2.5 - Next.js ESLint rules
- @types/react 18.x - Type definitions for React
- @types/react-dom 18.x - Type definitions for React DOM
- @types/node 20.x - Type definitions for Node.js runtime APIs
- postcss 8.x - CSS processor (required by Tailwind)
- autoprefixer 10.0.1 - Adds vendor prefixes to CSS

## Configuration

**Environment:**
- No `.env` file required for development (all content is static)
- No environment variables configured
- Static site compatible with standard hosting

**Build:**
- `next.config.js` - Minimal Next.js config with `images.unoptimized: true` (static export compatible)
- `tsconfig.json` - TypeScript compiler configuration with strict mode
- `tailwind.config.ts` - Tailwind theming and content paths
- `postcss.config.js` - PostCSS plugins (Tailwind + Autoprefixer)

**Design Tokens (CSS Custom Properties):**
Defined in `src/styles/globals.css`:
- `--ink` (#1a1916) - Primary dark color
- `--vellum` (#f4f1ea) - Light beige
- `--stone` (#c8c4b8) - Medium gray
- `--dust` (#e8e4dc) - Light gray
- `--pale` (#f9f7f3) - Off-white
- `--warm` (#faf8f4) - Warm white
- `--accent` (#c8a882) - Tan/bronze accent
- `--font-cormorant` - Typography variable from `next/font/google`
- `--font-suisse` - Typography variable (referenced in Tailwind but not loaded)

**Global Utility Classes:**
- `.eyebrow` - Uppercase label styling
- `.section-label` - Section heading styling
- `.btn-primary` - Primary button styling
- `.btn-outline` - Outlined button styling
- `.grid-bg` - Insley grid background pattern
- `.grid-bg-fine` - Fine-grain grid pattern

## Platform Requirements

**Development:**
- Node.js (version unspecified; recommend 18+ for Next.js 16)
- npm (latest version recommended)
- Modern browser with ES2017 support (TypeScript target)

**Production:**
- Static export compatible (no server functions)
- Can deploy to any static hosting: Vercel, Netlify, AWS S3, etc.
- Image optimization disabled (`images.unoptimized: true`) for static export
- No runtime dependencies on Node.js server

## Scripts

```bash
npm run dev       # Development server → http://localhost:3000
npm run build     # Production build (static export via next export)
npm run start     # Serve production build locally
npm run lint      # Run ESLint via next lint
```

## Module Resolution

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)

**Module Format:**
- ESM (ES modules) - All imports use ES6 syntax
- JSX transform enabled (via React 18's `jsx: react-jsx`)

---

*Stack analysis: 2026-03-13*
