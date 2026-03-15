---
phase: quick
plan: 260315-pjg
subsystem: ui / pages
tags: [insley-grid, contrast, wide-screen, max-width, studio, process, journal]
depends_on: []
provides: [higher-contrast InsleyGrid backgrounds, 1080p max-width container pattern]
affects: [studio page, process page, journal page]
tech_stack:
  added: []
  patterns: [.wide-container CSS class, 1080p media query for .page-hero]
key_files:
  modified:
    - src/components/ui/InsleyGrid.tsx
    - src/styles/globals.css
    - src/app/studio/page.tsx
    - src/app/process/page.tsx
    - src/app/journal/page.tsx
decisions:
  - Moved grid layout from section element to .wide-container inner div in studio-statement so mobile media query could target .studio-statement .wide-container
  - .wide-container max-width set to 1400px at 1080p to leave breathing room at 1920px
metrics:
  duration: ~20min
  completed: 2026-03-15T22:28:58Z
  tasks_completed: 2
  files_modified: 5
---

# Phase quick Plan 260315-pjg: InsleyGrid Contrast and Wide-Screen Layout Summary

**One-liner:** Raised internal SVG opacity values 1.8-2.5x across elevation/opaque-city/passage variants and added a `.wide-container` (max-width 1400px) CSS pattern with `.page-hero` padding scale at 1080p/1440p applied to studio, process, and journal pages.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Boost InsleyGrid contrast for elevation, opaque-city, passage variants | f7f2d58 | src/components/ui/InsleyGrid.tsx |
| 2 | Add 1080p max-width constraints to hero and body sections | d14c646 | globals.css, studio/page.tsx, process/page.tsx, journal/page.tsx |

## What Was Built

### Task 1 — InsleyGrid contrast
All internal `<g opacity>` values in the three named variants were multiplied by ~1.8–2.5x:
- **elevation:** terracotta ray fans 0.13→0.28, blue rays 0.10→0.22, denser fans 0.07→0.15, grid 0.05→0.11, horizon 0.12→0.25, silhouette 0.09→0.20, crosshatch band 0.12→0.26, brackets 0.10→0.22
- **opaque-city:** isometric lines (both axes) 0.06→0.14, verticals 0.05→0.12, crosshatch blocks 0.07→0.16, ellipses 0.07→0.16, spires 0.08→0.18
- **passage:** micro grid 0.04→0.09, outer border 0.18→0.35, all concentric frames doubled, perspective lines 0.08→0.18, accent diagonals and structural lines raised, vanishing point mark 0.4→0.65, tick line 0.5→0.75

The outer `opacity` prop on each page call (0.4–0.5) was left untouched.

### Task 2 — Wide-screen layout
- `globals.css` gains `.wide-container` (max-width: 1400px, auto margins) and `.page-hero` padding scale at 1080p (80px H) and 1440p (120px H)
- `studio/page.tsx`: hero content maxWidth 720→900, studio-statement section loses inline grid (moved to `.wide-container` child), awards list wrapped in `.wide-container`
- `process/page.tsx`: hero content div gains maxWidth: 900px, philosophy two-column grid and CTA wrapped in `.wide-container`
- `journal/page.tsx`: hero content div gains maxWidth: 900px, posts list wrapped in `.wide-container`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] studio-statement grid moved from section to inner div**
- **Found during:** Task 2
- **Issue:** Plan said to wrap existing grid columns inside `.wide-container`, but the grid was set via `display: grid` directly on the section element. Moving the grid inline style to the `.wide-container` inner div was required for the plan's wrapping pattern to work.
- **Fix:** Removed `display: grid / gridTemplateColumns / gap` from the `<section>` inline style and placed them on the `<div className="wide-container">` child. Updated mobile media query from `.studio-statement` to `.studio-statement .wide-container`.
- **Files modified:** src/app/studio/page.tsx
- **Commit:** d14c646

**2. [Rule 2 - Missing] Added closing `</div>` for .wide-container in studio awards and journal posts sections**
- **Found during:** Task 2
- **Issue:** Inserting an opening `<div className="wide-container">` required a matching close before `</section>`.
- **Fix:** Added `</div>` before the closing `</section>` in both files.
- **Files modified:** src/app/studio/page.tsx, src/app/journal/page.tsx
- **Commit:** d14c646

## Verification

- `npm run build` exits 0, no TypeScript errors
- Human visual verification pending (checkpoint:human-verify)

## Self-Check

Files exist:
- src/components/ui/InsleyGrid.tsx: modified in place
- src/styles/globals.css: modified in place
- src/app/studio/page.tsx: modified in place
- src/app/process/page.tsx: modified in place
- src/app/journal/page.tsx: modified in place

Commits:
- f7f2d58: Task 1
- d14c646: Task 2

## Self-Check: PASSED
