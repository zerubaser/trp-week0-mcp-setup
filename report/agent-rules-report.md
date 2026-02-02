# Agent Rules Report (TRP Week 0)

## What I did
- IDE: VS Code
- Built a TypeScript Express API with Prisma (SQLite) to create a realistic playground for agent behavior testing.
- Configured Copilot Agent rules in `.github/copilot-instructions.md` and iteratively refined them based on observed behavior.
- Implemented and verified `PATCH /notes/:id` with Zod validation and minimal changes across service + route layers.

## What worked
- After strengthening the rules, the agent stopped coding immediately for ambiguous/security requests and asked clarifying questions first.
- For the update endpoint request, the agent produced a clear plan and correctly identified minimal file changes (`notes.ts`, `notesService.ts`) before editing.
- Verification was done using PowerShell `Invoke-RestMethod`:
  - PATCH title-only ✅
  - PATCH tags-only ✅
  - PATCH non-existing note returned 404 ✅
  - GET /notes confirmed final state ✅

## What didn't work
- Initially, the agent tried to implement authentication immediately (JWT/token-based) without confirmation.
- The agent introduced an uninstalled dependency (`jsonwebtoken`) and referenced a middleware name (`authenticateToken`) that did not exist, causing runtime errors.
- Fix: rolled back to simple header-based auth (`x-user-id`) and aligned middleware usage (`requireAuth`) to keep scope minimal and stable.

## Troubleshooting
- Prisma v7 broke the classic schema `url` configuration and required new config conventions; I resolved the config mismatch.
- Prisma client initialization errors were resolved by switching to Prisma v6 for stable local development.
- Express runtime error “argument handler must be a function” was fixed by correcting the auth middleware import/usage.

## Insights gained
- Agent rules significantly change behavior: explicit “ask before code” rules prevent assumption-based implementation (especially for security/auth tasks).
- Rules that enforce “plan + file list first” reduce scope creep and keep diffs minimal.
- Requiring verification steps prevents false confidence; adding explicit “don’t claim done without verification commands” led to reproducible checks with real requests.
