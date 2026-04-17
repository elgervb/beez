---
description: "Remediate npm audit findings by applying safe dependency updates to package.json/package-lock.json, then validating lint, tests, and build."
---

# Dependency Audit Remediation Prompt

Remediate vulnerabilities from npm audit with minimal risk and clear reporting.

## Inputs
- Scope: production deps only, or include dev deps.
- Risk tolerance: safe-only (no breaking changes) or allow targeted majors with approval.
- Validation is always required: lint, test and build.

## Workflow
1. Run `npm audit --json` and summarize findings by severity and package.
2. Run `npm audit fix` first and capture what changed.
3. If vulnerabilities remain, propose targeted package updates and apply non-breaking ones first.
4. Check `package.json` for an `overrides` section:
   - If present, validate each override is still required after updates (use audit results and resolved dependency tree).
   - Remove overrides that are no longer needed.
   - Keep required overrides and update versions if needed to align with the final dependency graph.
5. Regenerate lockfile as needed via normal npm install/update flow.
6. Re-run `npm audit` and summarize residual vulnerabilities.
7. Always validate in this order:
   - `ng lint`
   - `ng test --watch false`
   - `ng build`

## Guardrails
- Prefer minimal, incremental dependency updates.
- Avoid broad major-version upgrades unless explicitly approved.
- Treat `overrides` as temporary controls: remove stale entries, keep only justified ones.
- Keep `package.json` and `package-lock.json` consistent.
- Never skip non-watch tests, or build after dependency changes.
- If a required fix is breaking, pause and present options before proceeding.

## Deliverables
- Vulnerabilities before vs after.
- Exact dependency changes made.
- `overrides` review outcome: removed, retained, or changed entries with rationale.
- Files changed (`package.json`, `package-lock.json`, and any follow-up code/test changes).
- Validation results for `ng lint`, `ng test --watch false`, and `ng build`, plus remaining risks.
- Clear next steps if manual intervention is needed for any remaining issues.
- Short, concise summary of actions taken.
