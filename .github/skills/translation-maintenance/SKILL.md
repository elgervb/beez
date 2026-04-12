---
name: translation-maintenance
description: "Use when adding or changing UI text or translation keys in Beez. Updates translation keys in code, syncs en/nl JSON files, and checks for missing keys before finishing."
---

# Translation Maintenance Skill

Use this workflow for any i18n change that touches visible copy.

## Inputs
- The feature or screen being changed.
- New or updated source copy.
- Whether keys are new or existing.

## Workflow
1. Identify user-facing strings in changed UI/templates and runtime notices.
2. Convert new copy to translation keys in feature namespace.
3. Update both dictionaries:
   - public/assets/i18n/en.json
   - public/assets/i18n/nl.json
4. Verify placeholders are identical in both locales.
5. Scan for key usage and missing entries.
6. Run relevant tests or smoke checks when possible.

## Guardrails
- Do not keep fallback hardcoded copy unless explicitly required.
- Keep terminology consistent with existing beekeeper vocabulary.
- Keep mobile labels concise.

## Output
- List of added/changed keys.
- Files touched.
- Any unresolved translation decisions.
