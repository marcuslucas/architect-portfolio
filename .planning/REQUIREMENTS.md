# Requirements: Voss Architecture Portfolio

**Defined:** 2026-03-14
**Core Value:** A polished portfolio that works flawlessly on every device — mobile visitors must never encounter layout bugs or jarring scroll state.

## v1 Requirements

### Mobile Layout

- [x] **MOB-01**: All pages show no horizontal scrollbar on 360–430px viewport widths
- [x] **MOB-02**: No content is clipped or hidden off-screen on 360–430px widths
- [x] **MOB-03**: Homepage sections (Hero, Tagline, Grid, Philosophy, Footer) are fully contained within viewport width on mobile
- [x] **MOB-04**: Projects page grid and filter controls fit within mobile viewport without overflow
- [x] **MOB-05**: Project detail page content is fully contained on mobile

### Navigation

- [ ] **NAV-01**: Scroll position resets to top when navigating from any page to any other page
- [ ] **NAV-02**: Scroll reset works for all navigation methods (link clicks, browser back/forward)

## v2 Requirements

### Mobile Polish

- **MPOLISH-01**: Touch targets for navigation and filter buttons meet 44px minimum size
- **MPOLISH-02**: Typography scales gracefully at 360px (no text overflow or truncation)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Desktop layout changes | Fixes must not regress desktop — desktop is already correct |
| New content or pages | This milestone is bug fixes only |
| CMS or dynamic data | Static `projects.ts` is intentional |
| Real photography | ArchDrawing placeholders stay until user replaces them |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MOB-01 | Phase 1 | Complete |
| MOB-02 | Phase 1 | Complete |
| MOB-03 | Phase 1 | Complete |
| MOB-04 | Phase 1 | Complete |
| MOB-05 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 7 total
- Mapped to phases: 7
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-14*
*Last updated: 2026-03-14 after roadmap creation*
