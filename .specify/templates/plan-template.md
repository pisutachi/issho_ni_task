# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: React + Vite + MUI + React Router + React Hook Form + Zod + dayjs + TanStack Query,
Hono (Workers), Supabase  
**Storage**: Supabase Postgres  
**Testing**: [Specify tools; MUST satisfy constitution test policy]  
**Target Platform**: Web browsers (mobile-first), Cloudflare Workers
**Project Type**: Monorepo (apps/web + apps/api + packages/shared)  
**Performance Goals**: [Define; keep payloads small for Workers]  
**Constraints**: Workers compatibility, no Docker, nodejs_compat OFF by default  
**Scale/Scope**: [Define]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] Cloudflare Workers compatibility (no Node-only APIs, nodejs_compat OFF or justified)
- [ ] Supabase RLS enforces boundaries (auth/team boundary design included)
- [ ] Schema First: Zod schemas in packages/shared are the single source of truth
- [ ] API design: unified success/error format + Zod validation on all inputs
- [ ] Observability/tests: logging plan + test strategy documented
- [ ] Ops: no Docker, use Vite dev server / wrangler dev / wrangler deploy

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
笏懌楳笏 plan.md              # This file (/speckit.plan command output)
笏懌楳笏 research.md          # Phase 0 output (/speckit.plan command)
笏懌楳笏 data-model.md        # Phase 1 output (/speckit.plan command)
笏懌楳笏 quickstart.md        # Phase 1 output (/speckit.plan command)
笏懌楳笏 contracts/           # Phase 1 output (/speckit.plan command)
笏披楳笏 tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
apps/
├── web/
│   ├── src/
│   └── tests/
├── api/
│   ├── src/
│   └── tests/
packages/
└── shared/
    ├── schema/
    └── src/
docs/
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |



