# Roadmap: Voss Architecture Portfolio

## Overview

Two focused bug-fix phases deliver the core value: a portfolio that works flawlessly on every device. Phase 1 eliminates horizontal overflow across all pages at mobile widths. Phase 2 ensures scroll position always resets to the top on every navigation. Desktop appearance is never touched.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Mobile Overflow** - Eliminate horizontal scrollbar and off-screen content on 360–430px viewports across all pages (completed 2026-03-14)
- [ ] **Phase 2: Scroll Reset** - Reset scroll position to top on every page navigation, including browser back/forward

## Phase Details

### Phase 1: Mobile Overflow
**Goal**: Mobile visitors can view all pages without horizontal overflow or clipped content
**Depends on**: Nothing (first phase)
**Requirements**: MOB-01, MOB-02, MOB-03, MOB-04, MOB-05
**Success Criteria** (what must be TRUE):
  1. No horizontal scrollbar appears on any page at 360–430px viewport width
  2. All content on the Homepage (Hero, Tagline, Grid, Philosophy, Footer) is fully visible within the viewport on mobile
  3. The Projects page grid and filter controls are fully contained within a mobile viewport
  4. A project detail page renders without any content pushed off-screen on mobile
  5. No element on any page causes the viewport to extend beyond its natural width on mobile
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Global overflow containment + homepage/nav/footer mobile fixes (MOB-01, MOB-02, MOB-03)
- [ ] 01-02-PLAN.md — Projects gallery page + project detail page mobile fixes (MOB-04, MOB-05)

### Phase 2: Scroll Reset
**Goal**: Users always land at the top of a page when navigating to any route
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02
**Success Criteria** (what must be TRUE):
  1. Clicking any internal link navigates to the target page scrolled to the top
  2. Using browser back and forward buttons restores the target page scrolled to the top
  3. Scroll reset works on mobile and desktop without visual flicker or layout shift
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Mobile Overflow | 2/2 | Complete   | 2026-03-14 |
| 2. Scroll Reset | 0/? | Not started | - |
