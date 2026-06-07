## Context

Legacy content lives in `utils/tempDatas.json` (profile with HTML description,
`skillCategories` with leveled skills, `works` with responsive banner formats)
and is typed by `utils/baseTypes.ts`. The UI is a `HomePage` container rendering
three layers (`HomeLayer`, `AboutLayer` with `SkillBox`→`SubSkillBlock`→`Skill`,
`WorkLayer` with `WorkBlock`/`WorkBlockBox`), built from `@psycholog-studio/ui`
primitives (`BaseBox`, `MessageBox`) and Emotion styles keyed off `baseStyles`
tokens. This change rebuilds that DOM with own components + Tailwind v4 and a
typed content module, and removes Emotion + the internal lib.

## Goals / Non-Goals

**Goals:**
- Typed content model; sanitized profile rich-text.
- Faithful Tailwind reproduction of all three pages and shared components.
- Full removal of Emotion and `@psycholog-studio/ui` from the new app.

**Non-Goals:**
- Hosting cutover / SEO / GTM (next change). Fonts only if metric parity needs it.
- Scene/transition logic (owned by earlier changes); this consumes the chrome
  visibility state only.

## Decisions

### Typed TS content module
Port `tempDatas.json` into typed TS (reuse/port `baseTypes.ts`), so content is
type-checked and colocated. Rationale: structured data, three pages, no blog —
TS beats both raw JSON and MDX here.

### Faithful CSS port over re-idiomatization
Translate each Emotion style to Tailwind by reproducing the exact computed values
(px, hex, spacing) from the legacy `*.styles.ts`; where a rule is awkward in
utilities (complex selectors, the level bars), use arbitrary values or a scoped
CSS module. Rationale: the goal is visual parity, not idiomatic Tailwind.
Alternative (rewrite to idiomatic utilities) rejected: invites pixel drift.

### Own components replace library primitives
Recreate `BaseBox`/`MessageBox`/`Nav`/scrollable wrappers as small own
components. Rationale: removes the internal lib; thin wrappers keep call sites
close to legacy.

### Sanitize profile description
Keep an HTML sanitizer (e.g. the `xss` lib as legacy, or equivalent) and render
the sanitized description. Rationale: parity + safety.

## Risks / Trade-offs

- [Pixel drift between Emotion output and Tailwind] → Port exact values; spot-check
  against legacy at each breakpoint; use arbitrary values when needed.
- [Skill level bars / responsive banner formats are fiddly] → Reproduce the
  legacy markup/measurements directly; verify the leveled bars and `srcset`-style
  banner selection match.
- [Text metrics differ without the custom font] → If parity requires it, pull the
  `xingothic-tc` font wiring forward from the cutover change.

## Open Questions

- Sanitizer choice: reuse `xss` or adopt a maintained alternative?
- Whether the level indicator was a bar/number/other in legacy (confirm from
  `Skill`/`SubSkillBlock` styles when implementing).
