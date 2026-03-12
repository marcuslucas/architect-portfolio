# Voss Architecture — Portfolio Website

A high-end contemporary architecture portfolio site built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Design inspired by Will Insley's ONECITY drawings and chromic glass aesthetics.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout, fonts, metadata
│   ├── page.tsx              # Home
│   ├── projects/
│   │   ├── page.tsx          # Projects index
│   │   └── [slug]/page.tsx   # Individual project
│   ├── studio/page.tsx       # About the studio
│   ├── process/page.tsx      # Process & philosophy
│   ├── journal/page.tsx      # Writing / press
│   ├── contact/page.tsx      # Contact form
│   └── not-found.tsx         # 404
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx    # Fixed nav with mobile menu
│   │   └── Footer.tsx        # Site footer
│   ├── sections/
│   │   ├── HeroSection.tsx   # Home hero with animated grid
│   │   ├── FeaturedProject.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── PhilosophyBand.tsx # Dark quote section
│   │   └── ProcessSection.tsx
│   └── ui/
│       ├── InsleyGrid.tsx    # Will Insley-inspired SVG grid
│       └── ArchDrawing.tsx   # Architectural drawing placeholders
├── lib/
│   └── projects.ts           # ← ALL project content lives here
└── styles/
    └── globals.css           # Custom properties, base styles
```

## Content Editing

### Adding / editing projects
All project data lives in `src/lib/projects.ts`. Each project has:
- `id` — used as the URL slug (`/projects/casa-del-horizonte`)
- `coverColor` — hex background for drawing placeholder
- `featured: true` — marks the featured project on home page

### Adding real photography
Replace `ArchDrawing` components in project cards and detail pages with Next.js `<Image>` components:

```tsx
import Image from 'next/image'

// Replace ArchDrawing with:
<Image
  src="/images/casa-del-horizonte-hero.jpg"
  alt="Casa del Horizonte"
  fill
  style={{ objectFit: 'cover' }}
  priority
/>
```

Store images in `public/images/`.

### Changing the architect name / brand
- `src/app/layout.tsx` — metadata title/description
- `src/components/layout/Navigation.tsx` — logo text
- `src/components/layout/Footer.tsx` — brand and address
- `src/components/sections/HeroSection.tsx` — hero eyebrow and coord annotations

## Design Tokens

All design variables are in `src/styles/globals.css`:

```css
--ink: #1a1916        /* Primary text / dark */
--vellum: #f4f1ea     /* Warm off-white */
--stone: #c8c4b8      /* Mid gray */
--dust: #e8e4dc       /* Light warm gray */
--pale: #f9f7f3       /* Section background */
--warm: #faf8f4       /* Page background */
--accent: #c8a882     /* Warm gold accent */
```

Typography is Cormorant Garamond (Google Fonts), weight 300 throughout, italic for expressive moments.

## Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (follow prompts)
vercel

# Production deploy
vercel --prod
```

The site is purely static-exportable — no server functions required for the base version.

## Adding a CMS (future)

The `src/lib/projects.ts` data layer is designed to be easily swapped for a CMS. To connect Sanity, Contentful, or similar:

1. Install the CMS SDK
2. Create a `src/lib/cms.ts` that fetches from the CMS API
3. Replace the `projects` export in `projects.ts` with CMS-fetched data
4. Add `revalidate` to relevant page components for ISR

## Will Insley Design References

The visual language references Will Insley's ONECITY drawings throughout:
- `InsleyGrid.tsx` — the hero background grid is a direct translation of his labyrinthine isometric drawings
- `ArchDrawing.tsx` — elevation/plan/section drawings reference his architectural notation style
- The diamond/rhombus form in the hero references *Building No. 33, Passage Space Mountain (Isometric), 1972–81*
- The diagonal pink/blue ray lines reference the *ONECITY Building Room Section Red Green Elevation, 1978–81*
- The Insley quote in the footer: "to contain spatial situations sympathetic to the horizon line"

## Claude Code Workflow

This project is designed for iterative refinement via Claude Code:

- Use this chat for design direction, PRD updates, and visual decisions
- Use Claude Code in the terminal for implementing changes, pushing to git, and deploying

Suggested Claude Code prompts to try:
- "Add a smooth page transition using Framer Motion's AnimatePresence"
- "Add a lightbox image gallery component to the project detail page"
- "Make the navigation hide on scroll down and reappear on scroll up"
- "Add a cursor follower that shows 'view' on project card hover"
