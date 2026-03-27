# Beez Project Context

## Snapshot
- Project type: Angular application (standalone API style, no NgModule files).
- Angular version: 21.x.
- Test runner: Vitest through Angular unit-test builder.
- Package manager: npm.
- Current functional state: mobile-first beekeeping app MVP with local persistence and PWA support.

## Workspace Structure
- Root config: `angular.json`, `package.json`, `tsconfig*.json`, `.editorconfig`, `.prettierrc`.
- PWA config: `ngsw-config.json`.
- Public assets: `public/`, including `manifest.webmanifest` and app icons in `public/icons/`.
- App source: `src/`.
  - Entry point: `src/main.ts`.
  - App config: `src/app/app.config.ts`.
  - Routes: `src/app/app.routes.ts`.
  - Root component: `src/app/app.ts`, template in `src/app/app.html`, styles in `src/app/app.css`.
  - Shared UI components under `src/app/ui/`:
    - `app-shell/` — reusable mobile screen frame, compact flat header, and bottom primary nav strip.
    - `modal-sheet/` — modal dialog for forms and overlays.
    - `inspection-sparkline/` — mini chart for inspection trends.
    - `search-filter-bar/` — reusable expanding search control (toggle icon + animated input) used by apiary, hive, and inspection pages; emits `valueChange` and `expandedChange`.
    - `swipe-to-delete-row/` — reusable behavior directive that handles row swipe gestures, applies swipe state classes/transforms, and emits delete requests after threshold-based swipe-out animation.
    - `undo-bar/` — reusable undo action bar for post-delete feedback; accepts a message and emits a generic action event.
    - `badge/` — generic badge component with:
      - **Variants**: default, success, warning, danger, info, neutral
      - **Sizes**: xs, small, medium, large
      - **Styles**: solid (default), outline, soft (low emphasis)
      - **Features**: optional icons (check/warning/error/info/success), circular counter badges, pulse animation for urgency, custom colors (bgColor/textColor), improved ARIA labels for accessibility
      - **Used throughout app** for status, health scores, trends, inspection metadata, apiary hive counts, hive temperament indicators, sync-error warnings, bulk-selection count chips, and due-now urgency labels
  - Domain models: `src/app/data/models.ts`.
  - Local data store service: `src/app/data/bee-store.ts`.
  - Connectivity service: `src/app/data/connectivity.service.ts` for browser online/offline state and reconnect events.
  - Feature folders under `src/app/pages/`:
    - `apiary-list/` contains the route container plus `apiary-form/` and `apiary-list-view/` component folders
    - `hive-list/` contains the route container plus `hive-form/` and `hive-list-view/` component folders
    - `inspection-list/` contains the route container plus `inspection-form/` and `inspection-list-view/` component folders
  - Unit tests: `src/app/app.spec.ts`.

## Build and Run
- Start dev server: `npm run start` (maps to `ng serve`).
- Build: `npm run build`.
- Watch build: `npm run watch`.
- Run tests: `npm run test`.
- PWA note: service worker is enabled for production builds.

## Architecture Notes
- App boots with `bootstrapApplication(App, appConfig)` in `src/main.ts`.
- Dependency providers currently include:
  - `provideBrowserGlobalErrorListeners()`
  - `provideRouter(routes)`
  - `provideServiceWorker('ngsw-worker.js', ...)` with production-only registration.
- Root component is now a minimal shell rendering only `RouterOutlet`.
- Forms use Angular Signals exclusively — no `FormsModule`, no `[(ngModel)]`. Each form is a `signal<FormObject>()` on the component, mutated via `.update()`. Conditional fields use `computed()`. Templates use `[value]`/`[checked]` + `(input)`/`(change)` event bindings.
- **Navigation flow**: Apiary list (`/`) → Hive list (`/apiary/:id`) → Inspection list (`/apiary/:id/hive/:id`). All routes are lazy-loaded.
- A shared `AppShellComponent` provides the mobile-app layout pattern: compact top header, scrollable content area, and a fixed bottom primary nav strip, with a centered phone-frame presentation on larger screens.
- Each route page is now a thin container: it loads store data, derives the relevant slice, and wires outputs from child components into the shared shell.
- Lists and forms are separated into dedicated standalone child components kept inside their owning feature folders, rather than a cross-feature shared components directory.
- Each standalone child component is in its own folder and uses separate `*.ts`, `*.html`, and `*.css` files rather than inline templates/styles.
- Each page uses an inline "Add" affordance toggled by a `showForm` signal, rendered in the header action slot; shell tabs visually track Apiaries/Hives/Inspections context.
- `Inspection` model fields: `id`, `hiveId`, `date`, `broodPattern` (`excellent|good|poor`), `storesLevel` (`high|medium|low`), `broodSeen` (bool), `open` (bool, only meaningful when `broodSeen` is true), `notes`, `inspector`, `createdAt`.
- `open` (open brood seen) is conditionally shown in the form only when `broodSeen` is checked; unchecking `broodSeen` resets `open` to `false`.
- Persistence strategy:
  - Browser `localStorage` under key `beez-data-v1` (offline/cold-start cache)
  - IDs generated with `crypto.randomUUID()` — same UUIDs reused when records are pushed to Supabase
  - Supabase remote store (`supabase-store.ts`) used when configured and authenticated
  - **Dual-store sync**: after every successful `fetchAll()`, `BeeStore.cacheFromRemote()` writes the data back to localStorage, resets the pending counter to 0, and stamps `beez-last-sync-at`
  - **Push-to-server**: explicit "Upload to Supabase" action in Settings calls `SupabaseStore.upsertAll()` (upsert by `id`, last-write-wins) for syncing offline mutations
  - `beez-pending-local` counter tracks unsynchronised local mutations; `beez-last-sync-at` is written after every successful sync direction
  - Reconnect behavior is pending-aware: pages auto-refresh cloud data only when the browser comes back online and there are no pending local changes; otherwise the shell warns the user to upload local changes first

## Quality and Tooling
- TypeScript strictness is enabled (`strict: true`, plus strict template/injection checks).
- Prettier is configured for 100 char line width and single quotes.
- EditorConfig enforces 2-space indentation and UTF-8.
- Angular production bundle budgets are active in `angular.json`.
- Latest verification status:
  - `npm run build`: passed
  - `npm run test`: passed (2/2, watch mode)

## Current Risks and Gaps
- Supabase sync is available but still manual/explicit; offline mutations require a deliberate "Upload to Supabase" step.
- No authentication/authorization (single-user local app assumptions).
- No edit/delete workflows yet for apiaries, hives, or inspections.
- Limited test coverage beyond root component rendering.
- No dedicated accessibility audit yet for field use under bright outdoor conditions.

## Suggested Next Actions
1. Add edit/delete capabilities and validation feedback for all forms.
2. Add export/import (JSON/CSV) for beekeeper data backup and migration.
3. Add offline mutation queue and sync strategy for future API integration.
4. Expand unit tests around `BeeStore` behavior, `AppShellComponent`, and feature-page form flows.
5. Add PWA update notification UX when a new service worker version is available.

## Changelog (recent)
- `varroaSeen` field replaced by `broodSeen` + `open` on `Inspection`.
- `open` field hidden in form until `broodSeen` is checked; auto-reset on uncheck.
- All forms converted from Angular template-driven forms (`FormsModule`/`ngModel`) to signal-based forms (`signal()` + `computed()`). `FormsModule` removed entirely.
- Lists and forms split into separate standalone components. Route pages now act as containers rather than mixing rendering and form state directly.
- Component ownership moved to a feature-based structure: child list/form components now live alongside their route containers under each page folder.
- Removed the unused legacy `home` page after routing fully moved to the apiary → hive → inspection flow.
- Each child component was further normalized into its own subfolder with separate template and stylesheet files.
- Added a shared mobile `app-shell` with sticky header, bottom action dock, safe-area handling, and a phone-frame presentation on larger screens.
- Updated visual theme to match the app icon yellow background and switched content surfaces to bright white floating cards/panels.
- Refined shell and pages to a flat/tight style: removed bottom action dock, moved primary actions to header slot, tightened spacing, reduced radii, and softened shadows across cards/forms.
- Shifted to a translator-app-inspired UI language: dark charcoal app backdrop, rounded yellow phone canvas, light-gray content cards, dark pill actions/badges, and a white bottom nav.
- Replaced unicode nav/header symbols with inline SVG icons and tuned typography/spacing (Nunito + Baloo heading style) for a closer match to the reference visual rhythm.
- Implemented a native app experience:
  - Created bottom-sheet modal system for form entry (slides up from bottom).
  - Refactored all list pages to open forms in modals instead of inline (better context preservation).
  - Refined tab bar to use Material/iOS-style underline indicator (no background fills).
  - Added CSS-based route and modal transitions (200-240ms ease-out) for smooth native-like flow.
  - Updated form styling to work cleanly inside modal containers (transparent backgrounds, larger touch targets).
  - Applied consistent spacing tokens (8-base grid) and refined heading typography (Baloo 2 for display).
- Added reconnect-aware sync behavior and store cleanup:
  - New `ConnectivityService` tracks browser online/offline state and emits reconnect events.
  - App shell now shows offline, reconnect, and pending-upload banners without falsely marking data as synced.
  - Settings disables Supabase upload while offline.
  - `BeeStore.exportData()` now uses `structuredClone`, event dispatches use `globalThis`, and `repairIntegrity()` returns `{ before, after }` for clearer reporting.
- Styled list and form checkboxes to match the dark/yellow visual system; fixed swipe-list checkbox regressions with a controlled toggle pattern in list views: checkbox selection now emits explicit toggles from touch/click/key handlers (instead of relying on native `change` inside swipe rows), action-column touches are excluded from swipe gesture handling in both hive and inspection lists, and removed `preventDefault()` from checkbox handlers on mobile so inputs can still toggle visually (while `stopPropagation()` prevents row-level events).
- Extracted swipe-to-delete touch behavior into a shared `SwipeToDeleteRowDirective` and replaced duplicated per-view touch state/handlers in apiary, hive, and inspection list views with declarative directive bindings.
- Extended `SwipeToDeleteRowDirective` with pointer-event support so swipe-to-delete also works with desktop mouse/trackpad drags (while keeping existing touch behavior).
- Fixed desktop navigation regression in `SwipeToDeleteRowDirective` by requiring a small left-drag threshold before activating pointer swipe handling, preserving normal row-link clicks (e.g., apiary to hive navigation).
- Refined inspection list card layout by moving checkbox/edit/delete controls out of `inspection-header` into a dedicated side action column, keeping header metadata compact and consistent with hive card ergonomics.
- Improved `SwipeToDeleteRowDirective` reliability for link-based rows (apiary/hive): pointer capture now starts on `pointerdown`, non-drag pointerups release capture without blocking clicks, and native `dragstart` is suppressed to avoid anchor drag interference with swipe gestures.
- Adjusted `SwipeToDeleteRowDirective` pointer-capture timing to preserve row-link navigation: pointer capture is now attached only after drag activation threshold is crossed (instead of on pointerdown), preventing click target retargeting on normal taps/clicks.
- Extracted shared `UndoBarComponent` from duplicated inline undo banners and migrated apiary, hive, and inspection pages to use a single reusable undo UI with consistent styles and behavior.
- Fixed inspection delete UX in remote (Supabase) mode: single-item deletes now surface an undo bar, and undo restores the deleted inspection via remote re-create followed by data refresh.
- Fixed the same remote-mode undo gap for hive and apiary deletes: both now preserve deleted bundle state for the undo window, show `UndoBar`, and restore records (including related children where applicable) via `SupabaseStore.upsertAll()` before refreshing cache.
- Switched GitHub Pages CI deployment from `actions/deploy-pages` environment flow to classic `gh-pages` branch publishing (`peaceiris/actions-gh-pages`) to align with repository deployment branch restrictions.

## Quick Health Verdict
This repository is now beyond scaffolding: it is a functional, installable, mobile-first MVP tailored for apiary and hive inspections. The next step is product hardening (editing flows, richer validation, data portability, and deeper tests).
