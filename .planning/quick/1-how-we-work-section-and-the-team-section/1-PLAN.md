---
phase: quick
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/ProcessSection.tsx
  - src/app/studio/page.tsx
autonomous: true
requirements: []
must_haves:
  truths:
    - "How We Work section collapses to 2 columns at 900px and 1 column at 600px"
    - "Team section collapses to 1 column on mobile (≤600px)"
    - "Studio statement collapses to 1 column on mobile (≤600px)"
    - "No horizontal overflow occurs on any of these sections at 375px viewport width"
  artifacts:
    - path: "src/components/sections/ProcessSection.tsx"
      provides: "Process grid with className-targeted media queries"
    - path: "src/app/studio/page.tsx"
      provides: "Team grid and studio statement with className-targeted mobile overrides"
  key_links:
    - from: "ProcessSection.tsx"
      to: ".process-grid className"
      via: "style tag media query"
      pattern: "\\.process-grid"
    - from: "studio/page.tsx"
      to: ".team-grid and .studio-statement classNames"
      via: "style tag media queries"
      pattern: "\\.team-grid|\\.studio-statement"
---

<objective>
Fix horizontal overflow on the How We Work section (ProcessSection.tsx) and the Team section (studio/page.tsx) by collapsing their fixed-column grids into a vertical stack on mobile.

Purpose: Mobile visitors currently see a 4-column layout that overflows the viewport — a hard blocker for any sub-400px screen.
Output: Two files updated; both sections are single-column on phones and two-column on small tablets.
</objective>

<execution_context>
@/Users/marcuslucas/.claude/get-shit-done/workflows/execute-plan.md
@/Users/marcuslucas/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/ProcessSection.tsx
@src/app/studio/page.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix ProcessSection.tsx — replace fragile CSS selector with className</name>
  <files>src/components/sections/ProcessSection.tsx</files>
  <action>
    The current `<style>` block targets `section > div:last-child` — this breaks if any ancestor or sibling changes. Replace it with an explicit className on the grid div and update both media query selectors to use that className.

    1. Add `className="process-grid"` to the grid `<div>` at line 81 (the one with `gridTemplateColumns: 'repeat(4, 1fr)'`).
    2. Replace the existing `<style>` block content with:

    ```css
    .process-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 900px) {
      .process-grid {
        grid-template-columns: 1fr 1fr !important;
        gap: 48px !important;
      }
    }
    @media (max-width: 600px) {
      .process-grid {
        grid-template-columns: 1fr !important;
        gap: 40px !important;
      }
      section { padding: 80px 24px !important; }
    }
    ```

    3. Remove the `display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)'` from the grid div's inline `style` prop (now handled by `.process-grid` in the style block). Keep all other inline styles on the grid div as-is.

    The per-column padding and borderRight inline styles on each `motion.div` are fine to leave — they are presentational, not structural.
  </action>
  <verify>
    <automated>npm run build 2>&1 | tail -20</automated>
  </verify>
  <done>
    ProcessSection.tsx compiles without error. The grid div carries `className="process-grid"`. The style block uses `.process-grid` selectors only — no `section > div` selectors remain.
  </done>
</task>

<task type="auto">
  <name>Task 2: Fix studio/page.tsx — Team grid and Studio statement mobile collapse</name>
  <files>src/app/studio/page.tsx</files>
  <action>
    Two grids on this page have no mobile column-collapse override:

    A. **Studio statement section** (line 52) — `gridTemplateColumns: '1fr 1fr'` inline, no override.
    B. **Team section** (line 71) — `gridTemplateColumns: 'repeat(4, 1fr)'` inline, no override.

    The existing `<style>` block only sets `padding-left`/`padding-right` at 900px.

    Steps:
    1. Add `className="studio-statement"` to the Studio statement `<section>` element (line 52).
    2. Add `className="team-grid"` to the Team grid `<div>` element (line 71, the one with `gridTemplateColumns: 'repeat(4, 1fr)'`).
    3. Replace the existing `<style>` block content with:

    ```css
    @media (max-width: 900px) {
      section { padding-left: 24px !important; padding-right: 24px !important; }
      .studio-statement { grid-template-columns: 1fr !important; gap: 40px !important; }
    }
    @media (max-width: 600px) {
      .team-grid { grid-template-columns: 1fr !important; }
    }
    ```

    The Awards section grid (`gridTemplateColumns: '80px 1fr auto'`) is a row-list pattern — each row is self-contained and does not overflow. Leave it unchanged in this task.
  </action>
  <verify>
    <automated>npm run build 2>&1 | tail -20</automated>
  </verify>
  <done>
    studio/page.tsx compiles without error. The studio-statement section and team-grid div carry their respective classNames. The style block overrides both grids to single-column at the specified breakpoints. The original padding override is preserved.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
    Both grids now collapse to a vertical stack on mobile:
    - ProcessSection: 4-col → 2-col at 900px → 1-col at 600px
    - Studio statement: 2-col → 1-col at 900px
    - Team grid: 4-col → 1-col at 600px
  </what-built>
  <how-to-verify>
    1. Run `npm run dev` and open http://localhost:3000
    2. Open DevTools → toggle device toolbar → set width to 375px
    3. Navigate to the homepage and scroll to "How We Work" — confirm 4 steps stack vertically, no horizontal scroll
    4. Navigate to http://localhost:3000/studio
    5. Confirm the two-column Studio statement collapses to one column
    6. Scroll to "The Team" — confirm 4 cards stack vertically
    7. At 768px width, confirm Studio statement is still single column and Process section is 2-col
    8. Confirm no horizontal scrollbar appears at any width down to 375px
  </how-to-verify>
  <resume-signal>Type "approved" if all sections stack correctly, or describe any remaining overflow</resume-signal>
</task>

</tasks>

<verification>
- `npm run build` exits 0 after both file edits
- No `section > div:last-child` selectors remain in ProcessSection.tsx
- `.process-grid`, `.team-grid`, `.studio-statement` classNames are present in their respective elements
- Human checkpoint confirms no horizontal overflow at 375px
</verification>

<success_criteria>
- ProcessSection renders 1-column on phones, 2-column on tablets, 4-column on desktop
- Studio statement renders 1-column at 900px and below
- Team grid renders 1-column at 600px and below
- No horizontal scrollbar on either page at 375px viewport width
- Build passes with zero errors
</success_criteria>

<output>
After completion, create `.planning/quick/1-how-we-work-section-and-the-team-section/1-SUMMARY.md`
</output>
