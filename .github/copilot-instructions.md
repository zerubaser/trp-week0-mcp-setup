# Copilot Agent Rules — TRP Week 0

## Planning & clarity
- If a request is ambiguous, ask up to 3 clarifying questions before writing any code.
- For requests involving authentication, authorization, or security, you MUST ask clarifying questions before implementing anything.
- Do not generate implementation code for ambiguous requests until clarification is explicitly provided.
- For tasks that touch more than one file, propose a short plan first (max 6 bullets).
- Always list the files you plan to modify before making edits.

## Implementation discipline
- Prefer minimal diffs; avoid broad refactors unless explicitly requested.
- Do not assume files, APIs, or dependencies exist—search the repository first.
- Do not introduce new dependencies without explicit approval.
- Keep changes incremental and runnable.

## Verification
- Never claim a task is complete without a verification step.
- If tests or scripts exist, suggest the exact commands to run.
- If verification cannot be performed, clearly state what is unverified and why.

## Output format
For non-trivial tasks, respond using:
1) Plan
2) Files to change
3) Changes made
4) How to verify
5) Risks / follow-ups

## Safety
- Never print, log, or commit secrets or tokens.
