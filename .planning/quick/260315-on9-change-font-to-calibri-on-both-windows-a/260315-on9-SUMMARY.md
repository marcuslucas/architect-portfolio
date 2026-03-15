---
phase: quick
plan: 260315-on9
subsystem: developer-environment
tags: [vscode, font, settings, calibri]
one_liner: "Set VS Code editor font to Calibri with cross-platform fallback stack"
key_files:
  modified:
    - C:/Users/marcu/AppData/Roaming/Code/User/settings.json
decisions:
  - "Use font stack 'Calibri, Helvetica Neue, Arial, sans-serif' — Calibri is primary on Windows and macOS 15+/Office; Helvetica Neue covers older macOS without Office"
  - "fontSize set to 13 — Calibri renders proportionally and appears slightly smaller than monospace fonts at the same nominal size"
metrics:
  duration: "< 5 minutes"
  completed: "2026-03-15"
  tasks_completed: 1
  files_modified: 1
---

# Quick Task 260315-on9: Change Font to Calibri Summary

Set the VS Code editor font to Calibri (with cross-platform fallbacks) via user-level settings.json. Applies globally to all color themes, including both Prism variants.

## Tasks Completed

| # | Name | Status | Notes |
|---|------|--------|-------|
| 1 | Add editor.fontFamily to VS Code settings | Done | Added fontFamily + fontSize to settings.json |

## What Was Done

Added two new entries to `C:/Users/marcu/AppData/Roaming/Code/User/settings.json`:

```json
"editor.fontFamily": "Calibri, 'Helvetica Neue', Arial, sans-serif",
"editor.fontSize": 13
```

All pre-existing keys were left untouched. The JSON remains valid.

## Font Stack Rationale

- **Windows:** Calibri is a system font — renders natively
- **macOS 15 (Sequoia) / macOS with Office:** Calibri is available natively
- **Older macOS without Office:** Falls back to Helvetica Neue (similar proportional sans-serif)
- **Ultimate fallback:** Arial, then generic sans-serif

## Verification

```
node -e "require('C:/Users/marcu/AppData/Roaming/Code/User/settings.json'); console.log('JSON valid')"
// → JSON valid

node -e "const s=require('C:/Users/marcu/AppData/Roaming/Code/User/settings.json'); console.log(s['editor.fontFamily'])"
// → Calibri, 'Helvetica Neue', Arial, sans-serif
```

## Deviations from Plan

None — plan executed exactly as written.

## Checkpoint: Human Verify

The plan included a `checkpoint:human-verify` after Task 1:

1. Switch focus to VS Code (or open it).
2. Open any code file.
3. Confirm editor text renders in Calibri — a proportional sans-serif, visibly different from monospace fonts like Consolas.
4. Switch between your two Prism theme variants and confirm Calibri is active in both.

VS Code picks up `editor.fontFamily` changes without a restart (takes effect on next window focus).

## Self-Check

- [x] `C:/Users/marcu/AppData/Roaming/Code/User/settings.json` — modified, JSON valid, `editor.fontFamily` key present with Calibri as primary
- [x] All pre-existing keys unchanged (verified by reading file before and after)

## Self-Check: PASSED
