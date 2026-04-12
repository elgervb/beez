---
description: "Use when editing Angular TypeScript files in src/app: enforce signals-first patterns, inject() field injection, and existing page/component architecture."
applyTo: "src/app/**/*.ts"
---

# Angular TS Instruction

## Required Patterns
- Use Angular standalone APIs and existing app structure.
- Prefer signal(), computed(), and effect() over imperative state mutation where practical.
- Use inject() in class fields for DI. Do not use constructor injection.
- Keep route page components as containers that delegate UI to child components.

## Forms
- Follow current Signal Forms conventions already present in feature forms.
- Keep validators in schema and template messages aligned with current patterns.

## Store and Service Changes
- Preserve offline-first behavior and pending-local semantics.
- Keep data model changes explicit in models and migration-safe in store methods.

## Review Checklist
1. Did I keep inject() field injection only?
2. Did I preserve lazy routes and current navigation flow?
3. Did I avoid introducing template-driven forms/ngModel?
4. Did I avoid regressions in sync/offline handling?
