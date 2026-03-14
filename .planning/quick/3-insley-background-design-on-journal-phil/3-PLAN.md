---
phase: quick-3
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/journal/page.tsx
  - src/app/process/page.tsx
  - src/app/contact/page.tsx
autonomous: true
requirements: []
must_haves:
  truths:
    - InsleyGrid in the journal, process, and studio page heroes all render at the same opacity and with the same wrapper structure
    - No instance of "Enquire" or "Enquiry" appears anywhere in the codebase
  artifacts:
    - path: src/app/journal/page.tsx
      provides: Normalized InsleyGrid hero placement
    - path: src/app/process/page.tsx
      provides: Inquire spelling fix
    - path: src/app/contact/page.tsx
      provides: Inquire spelling fix (h1 + submit button)
  key_links:
    - from: journal/page.tsx InsleyGrid
      to: studio/page.tsx InsleyGrid
      via: Matching opacity={0.5} and gradient transparent 50%
    - from: process/page.tsx btn-primary link
      to: contact/page.tsx h1
      via: Consistent "Inquire" spelling
---

<objective>
Normalize InsleyGrid hero background placement across the journal, process (philosophy), and studio pages, and replace all British "Enquire/Enquiry" spellings with American "Inquire/Inquiry".

Purpose: Visual consistency — the three content pages should feel like a family. The spelling correction brings the UI into alignment with standard American English.
Output: Three updated page files with identical InsleyGrid hero wrapper patterns and correct spelling throughout.
</objective>

<execution_context>
@/Users/marcuslucas/.claude/get-shit-done/workflows/execute-plan.md
@/Users/marcuslucas/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md

## Current InsleyGrid hero pattern (studio/process — the reference)

```tsx
<section className="page-hero" style={{ position: 'relative', padding: '180px 48px 100px', overflow: 'hidden' }}>
  <div style={{ position: 'absolute', inset: 0 }}>
    <InsleyGrid variant="hero" opacity={0.5} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--warm) 100%)' }} />
  </div>
  ...
</section>
```

## Journal page current hero (needs normalizing)

```tsx
<section className="page-hero" style={{ position: 'relative', padding: '180px 48px 80px', overflow: 'hidden' }}>
  <div style={{ position: 'absolute', inset: 0 }}>
    <InsleyGrid variant="hero" opacity={0.4} />   {/* opacity differs */}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--warm) 100%)' }} />
  </div>
  ...
</section>
```

## Enquire occurrences to fix

- src/app/process/page.tsx line 62: `Enquire About Your Project` → `Inquire About Your Project`
- src/app/contact/page.tsx line 59: `Enquire About` → `Inquire About` (in h1)
- src/app/contact/page.tsx line 145: `Send Enquiry` → `Send Inquiry` (button label)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Normalize InsleyGrid opacity in journal page hero</name>
  <files>src/app/journal/page.tsx</files>
  <action>
    In the page-hero section, change the InsleyGrid opacity from 0.4 to 0.5, matching the studio and process page heroes exactly.

    Change: `<InsleyGrid variant="hero" opacity={0.4} />`
    To:     `<InsleyGrid variant="hero" opacity={0.5} />`

    The gradient overlay (`transparent 50%`) is already correct — do not change it. The section bottom padding (`80px`) is intentionally different from studio (`100px`) because the journal hero has less copy below it — leave it as-is.
  </action>
  <verify>
    grep -n "InsleyGrid" src/app/journal/page.tsx
    # Expected: opacity={0.5}
  </verify>
  <done>InsleyGrid in journal page hero renders at opacity 0.5, matching studio and process pages.</done>
</task>

<task type="auto">
  <name>Task 2: Replace Enquire/Enquiry with Inquire/Inquiry across all files</name>
  <files>src/app/process/page.tsx, src/app/contact/page.tsx</files>
  <action>
    Make the following targeted replacements:

    **src/app/process/page.tsx** (line ~62):
    - Change: `Enquire About Your Project`
    - To:     `Inquire About Your Project`

    **src/app/contact/page.tsx** (line ~59, inside the h1):
    - Change: `Enquire About`
    - To:     `Inquire About`

    **src/app/contact/page.tsx** (line ~145, button label):
    - Change: `Send Enquiry`
    - To:     `Send Inquiry`

    These are the only three occurrences. Do not change any other text.
  </action>
  <verify>
    grep -rn "Enquir" src/
    # Expected: no output (zero occurrences)
  </verify>
  <done>Zero occurrences of "Enquire" or "Enquiry" remain in the codebase. All three instances replaced with "Inquire"/"Inquiry".</done>
</task>

</tasks>

<verification>
After both tasks complete:
1. `grep -rn "Enquir" src/` returns no output
2. `grep -n "InsleyGrid" src/app/journal/page.tsx` shows `opacity={0.5}`
3. `npm run build` completes without errors
</verification>

<success_criteria>
- journal, process, and studio page heroes all use `InsleyGrid variant="hero" opacity={0.5}` inside `<div style={{ position: 'absolute', inset: 0 }}>` — visually identical background treatment
- No instance of "Enquire" or "Enquiry" exists anywhere under src/
- Build passes
</success_criteria>

<output>
After completion, create `.planning/quick/3-insley-background-design-on-journal-phil/3-SUMMARY.md`
</output>
