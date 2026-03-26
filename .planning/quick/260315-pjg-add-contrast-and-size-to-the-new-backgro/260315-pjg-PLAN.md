---
phase: quick
plan: 260315-pjg
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ui/InsleyGrid.tsx
  - src/app/studio/page.tsx
  - src/app/process/page.tsx
  - src/app/journal/page.tsx
  - src/styles/globals.css
autonomous: true
requirements: []

must_haves:
  truths:
    - "InsleyGrid backgrounds are visibly more present — grid lines and drawing details readable at a glance"
    - "On 1080p+ screens, hero headings and body text read at a comfortable large scale without stretching to extreme widths"
    - "Section body content on studio, process, and journal has a max-width constraint so lines stay readable at wide viewports"
  artifacts:
    - path: "src/components/ui/InsleyGrid.tsx"
      provides: "Higher-contrast SVG variants for elevation, opaque-city, passage"
    - path: "src/styles/globals.css"
      provides: "1080p+ media query for hero padding / font scale"
    - path: "src/app/studio/page.tsx"
      provides: "Wide-screen max-width container on hero and body sections"
    - path: "src/app/process/page.tsx"
      provides: "Wide-screen max-width container on hero content"
    - path: "src/app/journal/page.tsx"
      provides: "Wide-screen max-width container on hero and posts section"
  key_links:
    - from: "InsleyGrid.tsx variant=elevation"
      to: "src/app/studio/page.tsx"
      via: "opacity prop + internal SVG opacity groups"
    - from: "InsleyGrid.tsx variant=passage"
      to: "src/app/process/page.tsx"
      via: "opacity prop + internal SVG opacity groups"
    - from: "InsleyGrid.tsx variant=opaque-city"
      to: "src/app/journal/page.tsx"
      via: "opacity prop + internal SVG opacity groups"
---

<objective>
Increase the visual presence of the InsleyGrid SVG backgrounds on the studio, process, and journal pages, and constrain content width so text reads comfortably at 1080p and larger screens.

Purpose: The backgrounds are currently too faint to register as a real visual element — boosting their contrast fulfils the design intent (Insley ONECITY reference). At 1920px wide, unrestricted content columns become uncomfortably wide.
Output: Richer, more visible backgrounds on three pages, plus a max-width wrapper pattern that keeps hero and body text readable at 1080p+.
</objective>

<execution_context>
@C:/Users/marcu/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/marcu/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md

Relevant source files (read before editing):
- src/components/ui/InsleyGrid.tsx
- src/app/studio/page.tsx
- src/app/process/page.tsx
- src/app/journal/page.tsx
- src/styles/globals.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Boost InsleyGrid contrast for elevation, opaque-city, and passage variants</name>
  <files>src/components/ui/InsleyGrid.tsx</files>
  <action>
Increase the internal SVG opacity values for the three named variants so the backgrounds are noticeably richer without overwhelming page content. The calling pages pass `opacity={0.4}` or `opacity={0.5}` as the outer wrapper opacity — do NOT change those props; increase the internal group opacities instead.

Target contrast levels (multiply existing values by ~1.8–2.5 but keep below visually dominant):

**variant="elevation"**
- Diagonal ray fan (terracotta, `g opacity="0.13"`) → `0.28`
- Diagonal rays from upper right (blue, `g opacity="0.10"`) → `0.22`
- Denser fan lines (terracotta, `g opacity="0.07"`) → `0.15`
- Orthogonal background grid (`g opacity="0.05"`) → `0.11`
- Horizon line (`opacity="0.12"`) → `0.25`
- Building elevation silhouette (`g opacity="0.09"`) → `0.20`
- Terracotta crosshatch band (`g opacity="0.12"`) → `0.26`
- Stepped bracket forms (`g opacity="0.1"`) → `0.22`

**variant="opaque-city"**
- Primary isometric lines right-down (`g opacity="0.06"`) → `0.14`
- Isometric lines left-down (`g opacity="0.06"`) → `0.14`
- Vertical lines (`g opacity="0.05"`) → `0.12`
- Crosshatch blocks (`g opacity="0.07"`) → `0.16`
- Ellipses (`g opacity="0.07"`) → `0.16`
- Vertical spires (`g opacity="0.08"`) → `0.18`

**variant="passage"**
- Fine graph paper micro grid (`g opacity="0.04"`) → `0.09`
- Outer border (`opacity="0.18"`) → `0.35`
- Each concentric receding frame: multiply all individual `opacity` attribute values by 2.0 (e.g. 0.15 → 0.30, 0.18 → 0.36, etc.)
- Perspective lines corner (`g ... opacity="0.08"`) → `0.18`
- Red accent diagonals (`opacity="0.12"`) → `0.26`
- Blue accent diagonals (`opacity="0.10"`) → `0.22`
- Red structural lines (`opacity="0.14"`) → `0.30`
- Blue structural lines (`opacity="0.10"`) → `0.22`
- Vanishing point mark (`opacity="0.4"`) → `0.65`
- Vanishing point tick line (`opacity="0.5"`) → `0.75`

Do not change the `svgStyle` outer opacity or the `opacity` prop path.
  </action>
  <verify>Run `npm run build` — no TypeScript errors. Visually compare: backgrounds should show distinct lines and details without competing with foreground text.</verify>
  <done>All three variants show readable architectural drawing elements at their respective page opacity settings.</done>
</task>

<task type="auto">
  <name>Task 2: Add 1080p max-width constraints to hero and body sections</name>
  <files>src/app/studio/page.tsx, src/app/process/page.tsx, src/app/journal/page.tsx, src/styles/globals.css</files>
  <action>
The goal is to keep text line-lengths readable at 1920px+ without altering the existing mobile/tablet layout.

**globals.css — add after the existing `.page-hero` mobile block:**

```css
/* ─── Wide screen (1080p+) hero scale ─── */
@media (min-width: 1080px) {
  .page-hero {
    padding-left: 80px !important;
    padding-right: 80px !important;
  }
  .wide-container {
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (min-width: 1440px) {
  .page-hero {
    padding-left: 120px !important;
    padding-right: 120px !important;
  }
}
```

**src/app/studio/page.tsx:**

1. In the page-hero section, the existing `div` wrapping the content already has `maxWidth: '720px'`. Increase that to `maxWidth: '900px'` so it breathes at 1080p.

2. Studio statement section (`className="studio-statement"`): wrap the entire inner content in a `<div className="wide-container">` so the two-column grid stays centred and readable. The inner grid div is currently at the section level — wrap it like this:
   ```jsx
   <section className="studio-statement" style={{ padding: '80px 48px', ... }}>
     <div className="wide-container">
       {/* existing grid columns */}
     </div>
   </section>
   ```

3. Awards section: similarly wrap the awards list `<div>` in `<div className="wide-container">`.

**src/app/process/page.tsx:**

1. In the page-hero section, the content `<div style={{ position: 'relative', zIndex: 2 }}>` has no maxWidth. Add `maxWidth: '900px'` to its inline style.

2. Extended philosophy text section (`padding: '80px 48px 120px'`): wrap the inner content (both `<div>` columns) in `<div className="wide-container">`.

3. CTA section: wrap the centred content in `<div className="wide-container">` — keep `textAlign: 'center'` on the wrapper div.

**src/app/journal/page.tsx:**

1. In the page-hero section, the content `<div style={{ position: 'relative', zIndex: 2 }}>` has no maxWidth. Add `maxWidth: '900px'` to its inline style.

2. Posts section (`padding: '40px 48px 120px'`): wrap the mapped articles in `<div className="wide-container">`. The articles currently map directly inside the section — wrap them so line lengths and the date/title/readtime grid stay proportional.

Do not touch any existing mobile `@media` blocks — only add to them or add new ones.
  </action>
  <verify>
`npm run build` passes. At browser width 1920px: hero text blocks should not exceed ~900px wide, studio statement columns should be visually centred, journal article list should have generous side margins. At 768px nothing should have changed from before.
  </verify>
  <done>
At 1080p+ screens hero content is bounded and well-proportioned. Body sections on all three pages centre within a max-width container. Mobile layout is unchanged.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Increased InsleyGrid background contrast across studio/process/journal pages, plus wide-screen max-width containers on all three pages.</what-built>
  <how-to-verify>
1. Run `npm run dev`
2. Visit http://localhost:3000/studio — the elevation drawing (terracotta rays, building silhouette, bracket forms) should be clearly visible as a background texture.
3. Visit http://localhost:3000/process — the passage drawing (concentric frames, vanishing point, perspective lines) should be readable.
4. Visit http://localhost:3000/journal — the opaque-city drawing (isometric lines, crosshatch blocks, vertical spires) should be visible.
5. Resize the browser to 1920px wide on each page — the hero text and body content should sit within a comfortable column, not stretching edge-to-edge.
6. Resize to 375px — check that nothing has changed on mobile layout.
  </how-to-verify>
  <resume-signal>Type "approved" or describe any contrast/layout issues to fix.</resume-signal>
</task>

</tasks>

<verification>
`npm run build` exits 0 with no type errors. All three pages have visibly enhanced backgrounds. Wide-screen content is contained to readable widths.
</verification>

<success_criteria>
- InsleyGrid elevation, opaque-city, and passage variants show distinct architectural drawing detail at their existing page opacity settings
- At 1920px viewport width, hero and body text on studio/process/journal pages never exceed a max-width container
- No regression on mobile (375px, 768px)
- Build passes
</success_criteria>

<output>
After completion, create `.planning/quick/260315-pjg-add-contrast-and-size-to-the-new-backgro/260315-pjg-SUMMARY.md`
</output>
