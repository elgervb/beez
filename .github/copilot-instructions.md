# Beez Workspace Instructions

These instructions are always-on for this repository.

## Core Architecture
- Keep Angular standalone style. Do not introduce NgModule-based structure.
- Prefer thin route containers and focused child components in feature folders.
- Preserve current navigation model: apiary -> hive -> inspection.

## Angular Coding Rules
- Use signals-first state and computed values.
- Use field injection with inject(); do not use constructor injection.
- Keep forms on Angular Signal Forms patterns already used in the app.

## Data and Sync Safety
- Keep offline-first behavior intact.
- Avoid regressions in BeeStore local cache, pending counters, and reconnect behavior.
- For Supabase changes, keep local and remote consistency explicit and testable.

## i18n Rules
- Do not add hardcoded user-facing strings in templates.
- Add/modify translation keys in both language files:
  - public/assets/i18n/en.json
  - public/assets/i18n/nl.json
- Use existing feature namespaces for keys.

## Quality Gate
- Run tests for changed behavior when feasible.
- Keep changes minimal and aligned with existing style.
- Use PROJECT_CONTEXT.md as the canonical project map when architecture questions appear.
