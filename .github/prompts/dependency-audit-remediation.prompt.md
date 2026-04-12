---
description: "Remediate npm audit findings in Beez by applying safe dependency updates to package.json/package-lock.json, then validating lint, tests, and build."
---

# Dependency Audit Remediation Prompt

Remediate vulnerabilities from npm audit with minimal risk and clear reporting.

## Inputs
- Scope: production deps only, or include dev deps.
- Risk tolerance: safe-only (no breaking changes) or allow targeted majors with approval.
- Validation is always required: test and build.

## Workflow
1. Run `npm audit --json` and summarize findings by severity and package.
2. Run `npm audit fix` first and capture what changed.
3. If vulnerabilities remain, propose targeted package updates and apply non-breaking ones first.
4. Regenerate lockfile as needed via normal npm install/update flow.
5. Re-run `npm audit` and summarize residual vulnerabilities.
6. Always validate in this order:
   - `ng test --watch false`
   - `ng build`

## Guardrails
- Prefer minimal, incremental dependency updates.
- Avoid broad major-version upgrades unless explicitly approved.
- Keep `package.json` and `package-lock.json` consistent.
- Never skip non-watch tests, or build after dependency changes.
- If a required fix is breaking, pause and present options before proceeding.

## Deliverables
- Vulnerabilities before vs after.
- Exact dependency changes made.
- Files changed (`package.json`, `package-lock.json`, and any follow-up code/test changes).
- Validation results for `ng test --watch false`, and `ng build`, plus remaining risks.
